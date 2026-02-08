"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import GButton from "@/components/GButton";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function initSession() {
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setError(error.message);
          }
        }

        const { data } = await supabase.auth.getSession();
        setReady(!!data.session);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    }

    initSession();
  }, [code]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated. Redirecting to login…");
    setTimeout(() => router.push("/login"), 1200);
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium tracking-tight">
            Reset password
          </h1>
          <p className="text-sm text-foreground/60">
            Choose a new password for your account.
          </p>
        </div>

        {!ready && !error && (
          <p className="text-sm text-foreground/60 text-center">
            Opening secure session…
          </p>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-foreground/70">{message}</p>}

        {ready && (
          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="password"
              placeholder="New password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary placeholder:text-foreground/40"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary placeholder:text-foreground/40"
            />

            <GButton
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Updating…" : "Update password"}
            </GButton>
          </form>
        )}
      </div>
    </main>
  );
}

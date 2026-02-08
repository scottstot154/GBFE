"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import GButton from "@/components/GButton";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/reset-password`
          : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset link sent. Check your email.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium tracking-tight">
            Forgot password
          </h1>
          <p className="text-sm text-foreground/60">
            Enter your email to receive a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary placeholder:text-foreground/40"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-foreground/70">{message}</p>}

          <GButton
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={loading}
          >
            {loading ? "Sending…" : "Send reset link"}
          </GButton>
        </form>

        <p className="text-xs text-center text-foreground/50">
          Remembered your password?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

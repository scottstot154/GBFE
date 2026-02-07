"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GButton from "@/components/GButton";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email,
          },
        },
      });

      if (error) {
        throw error;
      }

      // Email confirmation enabled → no session yet
      if (!data.session) {
        setInfo("Check your email to confirm your account.");
        return;
      }

      router.push(redirectTo);
    } catch (err: unknown) {
      // Friendly error mapping
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as Error).message === "string"
      ) {
        const message = (err as { message: string }).message;
        if (message.includes("already registered")) {
          setError("An account with this email already exists.");
        } else {
          setError(message || "Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium tracking-tight text-center">
          Create an account
        </h1>

        <p className="mt-2 text-sm text-foreground/60 text-center">
          Sign up to start shopping
        </p>

        <form onSubmit={handleSignup} className="mt-10 space-y-6">
          <input
            type="email"
            placeholder="Email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary"
          />

          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary"
          />

          <input
            type="password"
            placeholder="Confirm password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-green-600">{info}</p>}

          <GButton
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Sign up"}
          </GButton>
        </form>

        <p className="mt-8 text-xs text-center text-foreground/50">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${redirectTo}`}
            className="underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

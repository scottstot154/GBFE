"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GButton from "@/components/GButton";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium tracking-tight text-center">
          Sign in
        </h1>

        <p className="mt-2 text-sm text-foreground/60 text-center">
          Enter your details to continue
        </p>

        <form onSubmit={handleLogin} className="mt-10 space-y-6">
          <input
            type="email"
            placeholder="Email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary placeholder:text-foreground/40"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-[color:var(--border)] bg-transparent py-3 text-sm focus:outline-none focus:border-primary placeholder:text-foreground/40"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <GButton
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </GButton>
        </form>

        <p className="mt-8 text-xs text-center text-foreground/50">
          New here?{" "}
          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

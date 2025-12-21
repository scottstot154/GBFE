"use client";

import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const fakeToken = "scaffold-token-123";
    if (typeof window !== "undefined") {
      localStorage.setItem("token", fakeToken);
    }
    router.push("/");
  }

  return (
    <>
      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-foreground">Login</h1>
        <p className="text-sm text-foreground/70 mt-1">
          Sign in to manage your account and orders.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-card p-6 rounded-lg shadow-sm"
        >
          {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

          <label className="block">
            <span className="text-sm font-medium text-foreground/80">
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full rounded-md border border-[color:var(--border)] bg-transparent px-3 py-2 text-foreground shadow-sm focus:ring-primary focus:border-primary"
              placeholder="you@example.com"
            />
          </label>

          <label className="block mt-4">
            <span className="text-sm font-medium text-foreground/80">
              Password
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full rounded-md border border-[color:var(--border)] bg-transparent px-3 py-2 text-foreground shadow-sm focus:ring-primary focus:border-primary"
              placeholder="••••••••"
            />
          </label>

          <div className="mt-6 flex items-center justify-between">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Sign in
            </button>
            <a className="text-sm text-primary" href="#">
              Forgot?
            </a>
          </div>
        </form>
      </main>
    </>
  );
}

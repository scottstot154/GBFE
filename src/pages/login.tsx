import Head from "next/head";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Simple client-side validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Mock login: Accept any email/password for this scaffold
    const fakeToken = "scaffold-token-123";
    if (typeof window !== "undefined") {
      localStorage.setItem("token", fakeToken);
    }

    // redirect to home
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login - Boutique</title>
      </Head>

      <NavBar />

      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sign in to manage your account and orders.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-6 rounded-lg shadow-sm"
        >
          {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </label>

          <label className="block mt-4">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </label>

          <div className="mt-6 flex items-center justify-between">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Sign in
            </button>
            <Link className="text-sm text-indigo-600" href="#">
              Forgot?
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

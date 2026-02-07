"use client";

import { useSession } from "@/lib/useSession";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import GButton from "@/components/GButton";

export default function AccountPage() {
  const { session, loading } = useSession();
  const router = useRouter();

  // 1️⃣ Still checking session — do nothing
  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-sm text-foreground/50">Loading…</p>
      </main>
    );
  }

  // 2️⃣ Not logged in — redirect
  if (!session) {
    router.push("/login?redirect=/account");
    return null;
  }

  // 3️⃣ Logged in — render page
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-medium tracking-tight">Account</h1>

      <p className="mt-6 text-sm text-foreground/70 max-w-prose">
        You’re signed in as{" "}
        <span className="font-medium">{session.user.email}</span>.
      </p>

      <div className="mt-12">
        <GButton
          variant="outline"
          className="rounded-full px-10"
          onClick={handleLogout}
        >
          Sign out
        </GButton>
      </div>
    </main>
  );
}

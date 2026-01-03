"use client";

import Link from "next/link";
import { useSession } from "@/lib/useSession";

export default function NavBar() {
  const { session } = useSession();

  return (
    <nav className="bg-background border-b border-[color:var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-wide">
          Boutique
        </Link>

        <div className="text-sm">
          {session ? (
            <Link
              href="/account"
              className="text-foreground/70 hover:text-foreground transition"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-foreground/70 hover:text-foreground transition"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

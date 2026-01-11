"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGetCartQuery } from "@/store/api/cartApi";
import { Icons } from "./Icons";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  // 🔐 Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setOpenAccount(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 🛒 Cart (only when logged in)
  const { data } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const itemCount = data?.items?.length ?? 0;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <nav className="border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-medium">
          Boutique
        </Link>

        {/* Right */}
        <div className="flex items-center gap-6 relative">
          <Link
            href="/"
            className={pathname === "/" ? "font-medium" : "text-foreground/70"}
          >
            Home
          </Link>

          {/* CART */}
          {isLoggedIn && (
            <Link href="/cart" className="relative flex items-center gap-1">
              <Icons.cart className="w-5 h-5" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center text-xs font-medium rounded-full bg-primary text-primary-foreground w-5 h-5">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {/* ACCOUNT */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setOpenAccount((v) => !v)}
                className="flex items-center gap-1 text-foreground/70 hover:text-foreground"
              >
                <Icons.user className="w-5 h-5" />
                <span>Account</span>
              </button>

              {openAccount && (
                <div className="absolute right-0 top-10 w-40 rounded-xl border bg-card shadow-sm overflow-hidden z-50">
                  <Link
                    href="/orders"
                    onClick={() => setOpenAccount(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                  >
                    <Icons.list className="w-4 h-4" />
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-left"
                  >
                    <Icons.logout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={
                pathname === "/login"
                  ? "font-medium flex items-center gap-1"
                  : "text-foreground/70 flex items-center gap-1"
              }
            >
              <Icons.login className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

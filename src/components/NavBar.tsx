"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGetCartQuery } from "@/store/api/cartApi";
import { Icons } from "./Icons";
import AccountDrawer from "@/components/drawer/AccountDrawer";
import clsx from "clsx";

export default function NavBar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // 🔐 Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setOpenDrawer(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 🛒 Cart
  const { data } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const itemCount = data?.items?.length ?? 0;

  const linkClass = (href: string) =>
    pathname === href
      ? "text-foreground font-medium"
      : "text-foreground/60 hover:text-foreground transition";

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* BRAND */}
        <Link href="/" className="text-lg font-medium tracking-tight">
          Boutique
        </Link>

        {/* NAV ACTIONS */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={clsx(
              "text-sm transition-colors",
              pathname === "/"
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            Home
          </Link>

          {/* CART */}
          {isLoggedIn && (
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
            >
              <Icons.cart className="w-4 h-4" />
              <span>Cart</span>

              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {/* ACCOUNT */}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setOpenDrawer(true)}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
              >
                <Icons.user className="w-4 h-4" />
                Account
              </button>

              <AccountDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              />
            </>
          ) : (
            <Link
              href="/signup"
              className="
                px-5 py-2
                rounded-full
                bg-primary
                text-primary-foreground
                text-sm font-medium
                hover:opacity-90
                transition
              "
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

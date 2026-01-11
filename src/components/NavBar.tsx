"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGetCartQuery } from "@/store/api/cartApi";
import { Icons } from "./Icons";
import AccountDrawer from "@/components/drawer/AccountDrawer";

export default function NavBar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
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
      setOpenAccount(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 🛒 Cart (only when logged in)
  const { data } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const itemCount = data?.items?.length ?? 0;

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
          {isLoggedIn && (
            <>
              <button
                onClick={() => setOpenDrawer(true)}
                className="flex items-center gap-1 text-foreground/70 hover:text-foreground"
              >
                <Icons.user className="w-5 h-5" />
                Account
              </button>

              <AccountDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              />
            </>
          )}

          {!isLoggedIn && (
            <Link
              href="/signup"
              className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

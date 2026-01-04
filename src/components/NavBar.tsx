"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGetCartQuery } from "@/store/api/cartApi";

export default function NavBar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state once
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Only fetch cart if logged in
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

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={pathname === "/" ? "font-medium" : "text-foreground/70"}
          >
            Home
          </Link>

          {/* CART — only when logged in */}
          {isLoggedIn && (
            <Link href="/cart" className="relative flex items-center gap-1">
              Cart
              {itemCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center text-xs font-medium rounded-full bg-primary text-primary-foreground w-5 h-5">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          <Link
            href={isLoggedIn ? "/account" : "/login"}
            className={
              pathname === "/account" || pathname === "/login"
                ? "font-medium"
                : "text-foreground/70"
            }
          >
            {isLoggedIn ? "Account" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

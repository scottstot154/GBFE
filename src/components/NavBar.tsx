"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGetCartQuery } from "@/store/api/cartApi";
import { Icons } from "./Icons";
import clsx from "clsx";

export default function NavBar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 🔐 Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setOpenMenu(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setEmail(null);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;

    function handleOutsideClick(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [openMenu]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setOpenMenu(false);
    router.refresh();
  }

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
          Gauri Boutique
        </Link>

        {/* NAV ACTIONS */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={clsx(
              "text-sm transition-colors",
              pathname === "/"
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground",
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
            <div className="relative">
              <button
                onClick={() => setOpenMenu((v) => !v)}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
                aria-haspopup="menu"
                aria-expanded={openMenu}
              >
                <Icons.menu className="w-5 h-5" />
                <span className="hidden md:inline">Account</span>
              </button>

              {openMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-3 z-50 w-64 rounded-xl border border-border bg-card shadow-xl"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium">Account</p>
                    {email && (
                      <p className="text-xs text-foreground/60 truncate">
                        {email}
                      </p>
                    )}
                  </div>

                  <nav className="p-2 space-y-1">
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition"
                    >
                      <Icons.list className="w-4 h-4" />
                      My Orders
                    </Link>
                    <Link
                      href="/account/addresses"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition"
                    >
                      <Icons.mapPin className="w-4 h-4" />
                      Addresses
                    </Link>
                  </nav>

                  <div className="p-2 border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600/80 hover:text-red-600 hover:bg-red-50/60 transition"
                    >
                      <Icons.logout className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Drawer from "./Drawer";
import { supabase } from "@/lib/supabaseClient";
import { Icons } from "@/components/Icons";

export default function AccountDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    onClose();
    router.refresh();
    router.push("/");
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex h-full flex-col">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-background">
          <div>
            <h2 className="text-lg font-medium">Account</h2>
            {email && (
              <p className="text-sm text-foreground/60 truncate">{email}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5"
            aria-label="Close"
          >
            <Icons.close className="w-4 h-4" />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 px-6 py-6 space-y-1">
          <Link
            href="/orders"
            onClick={onClose}
            className="
              flex items-center gap-3
              rounded-lg px-3 py-2
              text-sm
              text-foreground/70
              hover:bg-muted hover:text-foreground
              transition
            "
          >
            <Icons.list className="w-4 h-4" />
            My Orders
          </Link>

          <Link
            href="/account/addresses"
            onClick={onClose}
            className="
              flex items-center gap-3
              rounded-lg px-3 py-2
              text-sm
              text-foreground/70
              hover:bg-muted hover:text-foreground
              transition
            "
          >
            <Icons.mapPin className="w-4 h-4" />
            Addresses
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="px-6 py-5 border-t border-border">
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3
              text-sm
              text-red-600/80
              hover:text-red-600
              transition
            "
          >
            <Icons.logout className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </Drawer>
  );
}

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
    router.push("/");
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex flex-col h-full">
        {/* HEADER */}
        <div className="px-4 py-4 border-b space-y-1">
          <h2 className="text-lg font-medium">Account</h2>
          {email && (
            <p className="text-sm text-foreground/60 truncate">{email}</p>
          )}
        </div>

        {/* LINKS */}
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link
            href="/orders"
            onClick={onClose}
            className="flex items-center gap-3 text-sm hover:text-primary"
          >
            <Icons.list className="w-5 h-5" />
            My Orders
          </Link>

          <Link
            href="/account/addresses"
            onClick={onClose}
            className="flex items-center gap-3 text-sm hover:text-primary"
          >
            <Icons.mapPin className="w-5 h-5" />
            Addresses
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="px-4 py-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm text-red-600"
          >
            <Icons.logout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </Drawer>
  );
}

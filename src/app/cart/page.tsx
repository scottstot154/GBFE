"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
} from "@/store/api/cartApi";
import Image from "next/image";
import GButton from "@/components/GButton";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // 🔐 Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login?redirect=/cart");
      } else {
        setIsLoggedIn(true);
      }
    });
  }, [router]);

  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [removeItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();

  if (isLoggedIn === null) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-foreground/60">
        Checking session…
      </div>
    );
  }

  if (isLoading || !data) {
    return <div className="max-w-4xl mx-auto px-4 py-20">Loading cart…</div>;
  }

  if (data.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-medium">Your cart is empty</h1>
        <p className="text-foreground/60">
          Looks like you haven’t added anything yet.
        </p>
        <GButton onClick={() => router.push("/")}>Continue shopping</GButton>
      </div>
    );
  }

  const total = data.items.reduce(
    (sum, item) => sum + BigInt(item.price) * BigInt(item.quantity),
    BigInt(0)
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-[1.4fr_0.6fr]">
      {/* LEFT — CART ITEMS */}
      <section className="space-y-6">
        <h1 className="text-2xl font-medium tracking-tight">Shopping Cart</h1>

        <div className="space-y-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 rounded-xl border bg-card"
            >
              {/* IMAGE */}
              <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item.image || "/dress-placeholder.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-foreground/60 mt-1">
                    Size: {item.size}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-medium">{formatPrice(item.price)}</span>

                  <button
                    onClick={() => removeItem({ cart_item_id: item.id })}
                    disabled={isRemoving}
                    className="text-sm text-foreground/50 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT — SUMMARY */}
      <aside className="sticky top-24 h-fit rounded-xl border bg-card p-6 space-y-6">
        <h2 className="text-lg font-medium">Order Summary</h2>

        <div className="flex justify-between text-sm text-foreground/70">
          <span>Items</span>
          <span>{data.items.length}</span>
        </div>

        <div className="flex justify-between font-medium text-base">
          <span>Total</span>
          <span>{formatPrice(String(total))}</span>
        </div>

        <GButton size="lg" className="w-full rounded-full">
          Checkout
        </GButton>

        <p className="text-xs text-foreground/50 text-center">
          Shipping & taxes calculated at checkout
        </p>
      </aside>
    </main>
  );
}

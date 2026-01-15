"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/store/api/cartApi";
import Image from "next/image";
import GButton from "@/components/GButton";
import { formatPrice } from "@/lib/formatPrice";
import { Icons } from "@/components/Icons";

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

  const { data, isLoading, isFetching } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [removeItem, { isLoading: removing }] = useRemoveCartItemMutation();

  const [clearCart, { isLoading: clearing }] = useClearCartMutation();

  if (isLoggedIn === null) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-foreground/60">
        Checking session…
      </div>
    );
  }

  if (isLoading || isFetching) {
    return <div className="max-w-4xl mx-auto px-4 py-20">Loading cart…</div>;
  }

  if (!data || data.items.length === 0) {
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

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-[1.4fr_0.6fr]">
      {/* LEFT — ITEMS */}
      <section className="space-y-6">
        <h1 className="heading-page">Shopping Cart</h1>
        <p className="text-muted">Shipping & taxes calculated at checkout</p>

        <div className="space-y-4">
          {data.items.map((item) => (
            <div
              key={item.item_id}
              className="flex gap-4 p-4 border rounded-xl bg-card"
            >
              <div className="relative w-24 h-32 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-foreground/60">
                    Size: {item.size}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {formatPrice(Number(item.price))}
                  </span>

                  <button
                    disabled={removing}
                    className="flex items-center gap-1 text-sm text-foreground/50 hover:text-red-600"
                    onClick={() => removeItem({ item_id: item.item_id })}
                  >
                    <Icons.trash className="inline w-4 h-4 mr-1" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT — SUMMARY */}
      <aside className="sticky top-24 h-fit border rounded-xl bg-card p-6 space-y-6">
        <h2 className="text-lg font-medium">Order Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Items</span>
          <span>{data.items.length}</span>
        </div>

        <div className="flex justify-between font-medium text-base">
          <span>Total</span>
          <span>{formatPrice(Number(data.total_price))}</span>
        </div>

        <GButton
          size="lg"
          className="w-full rounded-full"
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </GButton>

        <GButton
          variant="outline"
          disabled={clearing}
          onClick={() => clearCart()}
        >
          {clearing ? "Removing…" : "Remove all"}
        </GButton>
      </aside>
    </main>
  );
}

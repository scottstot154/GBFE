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

export default function CartPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login?redirect=/cart");
      } else {
        setIsLoggedIn(true);
      }
    });
  }, [router]);

  // 🚫 Do not fetch cart until logged in
  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [removeItem] = useRemoveCartItemMutation();

  if (isLoggedIn === null) {
    return <div className="p-6">Checking session…</div>;
  }

  if (isLoading || !data) {
    return <div className="p-6">Loading cart…</div>;
  }

  if (data.items.length === 0) {
    return <div className="p-6 text-foreground/60">Your cart is empty.</div>;
  }

  const total = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-medium">Your Cart</h1>

      {data.items.map((item) => (
        <div key={item.id} className="flex gap-4 border-b pb-4">
          <div className="relative w-20 h-28 bg-card rounded-md overflow-hidden">
            <Image
              src={item.image || "/dress-placeholder.png"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-foreground/60">Size: {item.size}</p>
            <p className="text-sm font-medium">₹{item.price.toFixed(0)}</p>

            <button
              onClick={() => removeItem({ cart_item_id: item.id })}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-6 border-t">
        <span>Total</span>
        <span className="font-bold">₹{total.toFixed(0)}</span>
      </div>

      <GButton size="lg" className="w-full">
        Checkout
      </GButton>
    </main>
  );
}

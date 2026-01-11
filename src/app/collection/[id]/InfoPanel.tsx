"use client";

import { useRouter } from "next/navigation";
import GButton from "@/components/GButton";
import SizeSelector, { SelectedSize } from "./SizeSelector";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { useEffect, useState } from "react";
import { Dress } from "@/types";
import Snackbar from "@/components/Snackbar";
import { supabase } from "@/lib/supabaseClient";

export default function InfoPanel({ dress }: { dress: Dress }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  async function handleAddToCart() {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/dress/${dress.collection_id}`);
      return;
    }

    if (!selectedSize) return;

    try {
      await addToCart({
        item_id: selectedSize.item_id,
      }).unwrap();

      router.push("/cart");
    } catch (err) {
      if (err?.data?.code === "23505") {
        setSnackbar("Item already in cart");
        return;
      }

      setSnackbar("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* TITLE */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          {dress.name}
        </h1>
        <div className="text-xl font-medium">₹{dress.cost.toFixed(0)}</div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
        {dress.description}
      </p>

      {/* SIZE */}
      <SizeSelector
        sizes={dress.sizes}
        value={selectedSize}
        onChange={setSelectedSize}
      />

      {/* CTA */}
      <div className="space-y-4">
        <GButton
          size="lg"
          disabled={!selectedSize || isLoading}
          onClick={handleAddToCart}
          className="w-full"
        >
          {isLoading ? "Adding…" : "Add to Cart"}
        </GButton>

        {!isLoggedIn && (
          <p className="text-sm text-foreground/60">
            Please log in to add items to your cart.
          </p>
        )}

        {snackbar && (
          <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import GButton from "@/components/GButton";
import SizeSelector, { SelectedSize } from "./SizeSelector";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { useState } from "react";
import { Dress } from "@/types";
import Snackbar from "@/components/Snackbar";

export default function InfoPanel({ dress }: { dress: Dress }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  async function handleAddToCart() {
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

        {snackbar && (
          <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />
        )}
      </div>
    </div>
  );
}

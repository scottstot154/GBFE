"use client";

import { useRouter } from "next/navigation";
import GButton from "@/components/GButton";
import SizeSelector, { SelectedSize } from "./SizeSelector";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { useState } from "react";
import { Dress } from "@/types";

export default function InfoPanel({ dress }: { dress: Dress }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  async function handleAddToCart() {
    if (!selectedSize) return;

    try {
      await addToCart({
        item_id: selectedSize.item_id,
      }).unwrap();

      router.push("/cart");
    } catch {
      alert("Unable to add item to cart");
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
        {/* SizeSelector is rendered ABOVE this */}
        <GButton
          disabled={!selectedSize || isLoading}
          onClick={handleAddToCart}
          className="w-full"
        >
          {selectedSize ? `Add ${selectedSize.size} to Cart` : "Select a size"}
        </GButton>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GButton from "@/components/GButton";
import SizeSelector, { SelectedSize } from "./SizeSelector";
import { Dress } from "@/types";

export default function InfoPanel({ dress }: { dress: Dress }) {
  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null);

  const router = useRouter();

  function handleBuy() {
    router.push(`/login?redirect=/dress/${dress.collection_id}`);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* TITLE + PRICE */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          {dress.name}
        </h1>

        <div className="text-xl font-medium">₹{dress.cost.toFixed(0)}</div>
      </div>

      {/* DESCRIPTION */}
      <p className="max-w-prose text-sm md:text-base leading-relaxed text-foreground/70">
        {dress.description || "Beautiful handcrafted dress."}
      </p>

      {/* SIZE */}
      <SizeSelector
        sizes={dress.sizes}
        value={selectedSize}
        onChange={setSelectedSize}
      />

      {/* CTA */}
      <div className="pt-4">
        <GButton
          size="lg"
          disabled={!selectedSize}
          className="rounded-full px-12 font-medium"
          onClick={handleBuy}
        >
          Buy
        </GButton>

        {!selectedSize && dress.sizes && (
          <p className="mt-2 text-xs text-foreground/50">
            Please select a size
          </p>
        )}
      </div>
    </div>
  );
}

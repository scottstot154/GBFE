"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GButton from "@/components/GButton";
import SizeSelector from "./SizeSelector";
import { Dress } from "@/types";

export default function InfoPanel({ dress }: { dress: Dress }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-medium">{dress.name}</h1>
        <p className="text-lg text-foreground/70">
          ₹{(dress.cost / 100).toFixed(0)}
        </p>
      </div>

      {/* Description */}
      {dress.description && (
        <p className="text-base leading-relaxed text-foreground/70">
          {dress.description}
        </p>
      )}

      {/* Size */}
      {dress.sizes && (
        <SizeSelector
          sizes={dress.sizes}
          value={selectedSize}
          onChange={setSelectedSize}
        />
      )}

      {/* CTA */}
      <GButton
        size="lg"
        disabled={!selectedSize}
        className="w-full rounded-full"
        onClick={() => router.push("/cart")}
      >
        Add to Cart
      </GButton>
    </div>
  );
}

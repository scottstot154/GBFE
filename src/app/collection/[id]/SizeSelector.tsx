"use client";

import { SizeInventoryItem, SizesMap } from "@/types";
import clsx from "clsx";

export type SelectedSize = {
  size: string;
  item_id: string;
};

export default function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes?: SizesMap | null;
  value: SelectedSize | null;
  onChange: (v: SelectedSize) => void;
}) {
  if (!sizes) return null;

  const availableSizes = Object.entries(sizes)
    .map(([size, items]) => {
      const item = items.find((i) => i.status === "available");
      return item ? { size, item } : null;
    })
    .filter(Boolean) as { size: string; item: SizeInventoryItem }[];

  if (availableSizes.length === 0) return null;

  // ✅ Free Size auto-select
  if (
    availableSizes.length === 1 &&
    /free/i.test(availableSizes[0].size) &&
    !value
  ) {
    onChange({
      size: availableSizes[0].size,
      item_id: availableSizes[0].item.item_id,
    });
  }

  return (
    <div className="pt-6">
      <p className="text-sm text-foreground/60 mb-3">Available size</p>

      <div className="flex gap-3 flex-wrap">
        {availableSizes.map(({ size, item }) => {
          const isSelected = value?.size === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() =>
                onChange({
                  size,
                  item_id: item.item_id,
                })
              }
              className={clsx(
                "px-4 py-2 text-sm rounded-full border transition",
                isSelected
                  ? "border-foreground text-foreground"
                  : "border-[color:var(--border)] text-foreground/60 hover:border-foreground hover:text-foreground"
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}

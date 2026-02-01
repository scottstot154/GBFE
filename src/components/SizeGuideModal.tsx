"use client";

import { X } from "lucide-react";
import clsx from "clsx";
import { SizeGuide } from "@/types";

export default function SizeGuideModal({
  open,
  onClose,
  sizes,
}: {
  open: boolean;
  onClose: () => void;
  sizes: SizeGuide[];
}) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Modal / Bottom Sheet */}
      <div
        className={clsx(
          "fixed z-50 bg-card shadow-xl",
          "w-full md:w-[520px]",
          "bottom-0 md:bottom-auto md:top-1/2 md:left-1/2",
          "md:-translate-x-1/2 md:-translate-y-1/2",
          "rounded-t-2xl md:rounded-2xl",
          "p-6"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-section">Size Guide</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {sizes.map((size) => (
            <div
              key={size.label}
              className="border border-[color:var(--border)] rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{size.label}</span>
                <span className="text-muted">{size.description}</span>
              </div>

              {(size.bust || size.waist || size.hips) && (
                <div className="mt-2 text-sm text-foreground/70 space-y-1">
                  {size.bust && <div>Bust: {size.bust}</div>}
                  {size.waist && <div>Waist: {size.waist}</div>}
                  {size.hips && <div>Hips: {size.hips}</div>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-xs text-foreground/50 mt-4">
          Measurements are approximate. Fit may vary by style.
        </p>
      </div>
    </>
  );
}

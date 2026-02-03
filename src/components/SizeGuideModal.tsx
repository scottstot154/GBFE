"use client";

import { useRef } from "react";
import { X } from "lucide-react";
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
  const startY = useRef<number | null>(null);

  if (!open) return null;

  function onTouchStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (startY.current === null) return;

    const diff = e.touches[0].clientY - startY.current;

    // swipe down → close
    if (diff > 80) {
      startY.current = null;
      onClose();
    }
  }

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Modal */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        className="
          fixed z-50 bg-card shadow-xl
          w-full md:w-[520px]

          /* MOBILE */
          bottom-0 left-0
          rounded-t-2xl
          animate-slide-up

          /* DESKTOP */
          md:top-1/2 md:left-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          md:bottom-auto
          md:rounded-2xl
          md:animate-none

          p-6
        "
      >
        {/* Drag handle (mobile affordance) */}
        <div className="md:hidden flex justify-center mb-3">
          <div className="h-1.5 w-12 rounded-full bg-foreground/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-section">Size Guide</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {sizes.map((size) => (
            <div
              key={size.label}
              className="border border-[color:var(--border)] rounded-lg p-4"
            >
              <div className="flex justify-between">
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

        <p className="text-xs text-foreground/50 mt-4">
          Measurements are approximate. Fit may vary by style.
        </p>
      </div>
    </>
  );
}

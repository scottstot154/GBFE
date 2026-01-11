"use client";

import { ReactNode, useRef } from "react";
import clsx from "clsx";

export default function Drawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const startX = useRef<number | null>(null);

  if (!open) return null;

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (startX.current === null) return;

    const diff = e.touches[0].clientX - startX.current;

    // swipe right → close
    if (diff > 80) {
      startX.current = null;
      onClose();
    }
  }

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Panel */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        className={clsx(
          "fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-card z-50 shadow-xl",
          "transition-transform duration-300 ease-out translate-x-0"
        )}
      >
        {children}
      </div>
    </>
  );
}

"use client";

import { ReactNode, useRef } from "react";
import clsx from "clsx";
import { NAVBAR_HEIGHT } from "@/config/layout";

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
    if (diff > 80) onClose();
  }

  return (
    <>
      {/* Overlay — BELOW navbar, fade in to avoid hard edge */}
      <div
        onClick={onClose}
        style={{ top: NAVBAR_HEIGHT }}
        className="fixed inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/50 z-40"
      />

      {/* Drawer — BELOW navbar */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ top: NAVBAR_HEIGHT }}
        className={clsx(
          `
    fixed right-0 bottom-0 z-50
    w-[360px] max-w-[90vw]
    h-[calc(100vh-64px)]
    
   bg-white border-l border-[color:var(--border)] shadow-2xl

    text-foreground
    
    transition-transform duration-300 ease-out
    `,
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full bg-white">{children}</div>
      </div>
    </>
  );
}

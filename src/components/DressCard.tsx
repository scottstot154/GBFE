import React, { useState, useRef } from "react";
import Image from "next/image";
import GButton from "./GButton";
import Link from "next/link";

export type Dress = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  images?: string[];
  description?: string;
};

const DressCard: React.FC<{ dress: Dress }> = ({ dress }) => {
  const images = dress.images?.length
    ? dress.images
    : dress.image
    ? [dress.image]
    : ["/dress-placeholder.png"];

  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // Arrow Navigation
  // -----------------------------
  function prev() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  // -----------------------------
  // Touch Drag / Swipe Support
  // -----------------------------
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  }

  function onTouchEnd() {
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }
  }

  // -----------------------------
  // Desktop Hover Zoom
  // -----------------------------
  function enableZoom() {
    setZoom(true);
  }
  function disableZoom() {
    setZoom(false);
  }

  // -----------------------------
  // Mobile Long-press Zoom
  // -----------------------------
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  function onTouchHoldStart() {
    pressTimer.current = setTimeout(() => setZoom(true), 300); // long press
  }
  function onTouchHoldEnd() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    setZoom(false);
  }

  return (
    <div className="bg-card border border-[color:var(--border)] rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* IMAGE CAROUSEL */}
      <div
        className="relative h-56 w-full overflow-hidden rounded-t-lg bg-[color:var(--card)]"
        onMouseEnter={enableZoom}
        onMouseLeave={disableZoom}
        onTouchStart={(e) => {
          onTouchStart(e);
          onTouchHoldStart();
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={(e) => {
          onTouchEnd();
          onTouchHoldEnd();
        }}
      >
        {/* SLIDER */}
        <div
          ref={sliderRef}
          className={`flex h-full transition-transform duration-300 ${
            zoom ? "scale-110" : "scale-100"
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative h-56 w-full flex-shrink-0">
              <Image
                src={img}
                alt={`${dress.name} image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* ARROWS */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute top-1/2 left-2 -translate-y-1/2 
                bg-black/20 backdrop-blur px-2 py-1 rounded-full text-white text-xs 
                hover:bg-black/30 transition"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute top-1/2 right-2 -translate-y-1/2 
                bg-black/20 backdrop-blur px-2 py-1 rounded-full text-white text-xs 
                hover:bg-black/30 transition"
            >
              ›
            </button>
          </>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  idx === index ? "bg-primary" : "bg-[color:var(--border)]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground">{dress.name}</h3>

        <p className="text-sm text-foreground/70 mt-1">
          {dress.description || "Beautiful handcrafted dress."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-foreground">
            ₹{dress.cost.toFixed(0)}
          </span>

          <Link href={`/collection/${dress.collection_id}`}>
            <GButton variant="primary" size="sm">
              View
            </GButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DressCard;

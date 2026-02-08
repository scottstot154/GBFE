"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Dress } from "@/types";
import { Icons } from "@/components/Icons";
import { formatPrice } from "@/lib/formatPrice";

export default function DressCard({ dress }: { dress: Dress }) {
  const images = dress.images?.length
    ? dress.images
    : dress.image
    ? [dress.image]
    : ["/dress-placeholder.png"];

  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  /* ------------------------------
     Carousel Navigation
  --------------------------------*/
  function prev() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  /* ------------------------------
     Touch Swipe
  --------------------------------*/
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
    if (Math.abs(delta) > 60) {
      delta > 0 ? prev() : next();
    }
  }

  /* ------------------------------
     Long Press Zoom (Mobile)
  --------------------------------*/
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  function onPressStart() {
    pressTimer.current = setTimeout(() => setZoom(true), 250);
  }

  function onPressEnd() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    setZoom(false);
  }

  return (
    <div className="bg-card rounded-xl transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* IMAGE */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl bg-card"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onTouchStart={(e) => {
          onTouchStart(e);
          onPressStart();
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={() => {
          onTouchEnd();
          onPressEnd();
        }}
      >
        {/* SLIDER */}
        <div
          className="flex h-full transition-transform duration-300"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <Image
                src={img}
                alt={`${dress.name} image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={clsx(
                  "object-cover transition-transform duration-300",
                  zoom && idx === index && "scale-110"
                )}
              />
            </div>
          ))}
        </div>

        {/* ARROWS */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/25 backdrop-blur p-1.5 text-white opacity-0 hover:bg-black/35 transition group-hover:opacity-100"
            >
              <Icons.chevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/25 backdrop-blur p-1.5 text-white opacity-0 hover:bg-black/35 transition group-hover:opacity-100"
            >
              <Icons.chevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={clsx(
                  "h-1.5 w-1.5 rounded-full cursor-pointer transition",
                  i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-5 flex flex-col flex-1 min-h-[140px]">
        <div className="space-y-2">
          <h3 className="heading-card">{dress.name}</h3>

          {dress.description && (
            <p className="text-muted line-clamp-2">{dress.description}</p>
          )}
        </div>

        <div className="pt-3 flex items-center justify-between mt-auto">
          <span className="text-price">{formatPrice(dress.cost)}</span>

          <Link
            href={`/collection/${dress.collection_id}`}
            className="text-sm text-link"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}

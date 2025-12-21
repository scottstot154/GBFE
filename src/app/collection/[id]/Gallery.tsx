"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

type Props = {
  images: string[];
  name: string;
};

export default function Gallery({ images, name }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div>
        {/* MAIN IMAGE */}
        <div
          className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[color:var(--card)] shadow-sm cursor-zoom-in"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onClick={() => setLightboxOpen(true)}
        >
          <div
            className={`absolute inset-0 transition-transform duration-300 ${
              zoom ? "scale-110" : "scale-100"
            }`}
          >
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(
                    activeIndex === 0 ? images.length - 1 : activeIndex - 1
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur text-white px-3 py-1 rounded-full"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(
                    activeIndex === images.length - 1 ? 0 : activeIndex + 1
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur text-white px-3 py-1 rounded-full"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-20 rounded-md overflow-hidden border ${
                  idx === activeIndex
                    ? "border-[color:var(--primary)]"
                    : "border-[color:var(--border)]"
                }`}
              >
                <Image src={img} alt="" fill className="object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

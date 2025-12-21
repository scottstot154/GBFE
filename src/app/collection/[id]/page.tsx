"use client";

import { useGetCollectionQuery } from "@/store/api";
import GButton from "@/components/GButton";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import { useParams, useRouter } from "next/navigation";

export default function CollectionDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const {
    data: dress,
    isLoading,
    isError,
  } = useGetCollectionQuery(id as string, { skip: !id });

  const images: string[] = dress?.images?.length
    ? dress.images
    : dress?.image
    ? [dress.image]
    : ["/dress-placeholder.png"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- BUY HANDLER ---------------- */
  async function handleBuy() {
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;

    if (!token) {
      router.push(`/login?redirect=/dress/${id}`);
      return;
    }
    setLoading(false);
  }

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !dress) return <div className="p-6">Dress not found.</div>;

  return (
    <>
      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE GALLERY */}
          <div>
            <div
              className="relative w-full h-96 rounded-lg overflow-hidden bg-[color:var(--card)] shadow-sm cursor-zoom-in"
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
                  alt={dress.name}
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

            {/* Thumbnails */}
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

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">
              {dress.name}
            </h1>

            <p className="text-foreground/70">
              {dress.description || "Beautiful handcrafted dress."}
            </p>

            <div className="text-2xl font-bold text-foreground">
              ₹{dress.cost.toFixed(0)}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block pt-4">
              <GButton size="lg" onClick={handleBuy} disabled={loading}>
                Buy Now
              </GButton>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- MOBILE STICKY CTA ---------------- */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-[color:var(--border)] px-4 py-3 flex items-center justify-between z-40">
        <span className="font-semibold text-foreground">
          ₹{dress.cost.toFixed(0)}
        </span>
        <GButton size="md" onClick={handleBuy} disabled={loading}>
          Buy Now
        </GButton>
      </div>

      {/* ---------------- FULLSCREEN LIGHTBOX ---------------- */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onChange={setActiveIndex}
        />
      )}
    </>
  );
}

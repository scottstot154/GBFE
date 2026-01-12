import React from "react";
import Image from "next/image";

type BannerProps = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

const Banner: React.FC<BannerProps> = ({
  title = "New Arrivals",
  subtitle,
  imageUrl,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-muted">
      {/* Fixed-height container for Image(fill) */}
      <div className="relative w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px]">
        {/* IMAGE */}
        <Image
          src={imageUrl || "/images/banner-placeholder.jpg"}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10">
          <div className="h-full max-w-6xl mx-auto px-4 flex items-center">
            <div className="max-w-xl text-white space-y-5">
              {/* TITLE */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                {title}
              </h1>

              {/* SUBTITLE */}
              {subtitle && (
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  {subtitle}
                </p>
              )}

              {/* CTA (optional, CMS-ready) */}
              {ctaLabel && onCtaClick && (
                <button
                  onClick={onCtaClick}
                  className="inline-flex items-center rounded-full bg-white text-black px-6 py-2.5 text-sm font-medium hover:bg-white/90 transition"
                >
                  {ctaLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

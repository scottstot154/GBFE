import React from "react";
import Image from "next/image";

type BannerProps = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
};

const Banner: React.FC<BannerProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <section className="relative overflow-hidden rounded-lg shadow-sm">
      {/* parent must have a height so Image(fill) can size correctly */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[520px]">
        <Image
          src={imageUrl || "/images/banner-placeholder.jpg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent flex items-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-white max-w-xl">
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-base md:text-lg text-white/90 max-w-md">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

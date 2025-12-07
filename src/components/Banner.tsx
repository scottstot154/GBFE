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

        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-white max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
              {subtitle && (
                <p className="mt-2 text-sm sm:text-base">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

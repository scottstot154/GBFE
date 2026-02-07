import Image from "next/image";

type BannerProps = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export default function Banner({
  title = "Summer Collection",
  subtitle,
  imageUrl,
  ctaLabel,
  onCtaClick,
}: BannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      <div className="relative h-[420px] md:h-[520px]">
        <Image
          src={imageUrl || "/images/banner-placeholder.jpg"}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        {/* Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent">
          <div className="h-full max-w-6xl mx-auto px-6 flex items-center">
            <div className="max-w-xl space-y-6">
              <h1 className="heading-hero text-white">{title}</h1>

              {subtitle && (
                <p className="text-base md:text-lg text-white/85 leading-relaxed">
                  {subtitle}
                </p>
              )}

              {ctaLabel && (
                <button
                  onClick={onCtaClick}
                  className="
                    mt-4
                    inline-flex items-center
                    rounded-full
                    bg-primary text-primary-foreground
                    px-8 py-3
                    text-sm font-medium
                    hover:bg-primary/90
                    transition
                  "
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
}

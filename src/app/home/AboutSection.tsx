import React from "react";

export default function AboutSection() {
  return (
    <section className="bg-card border border-[color:var(--border)] rounded-xl px-6 py-8 md:px-12 md:py-12">
      <div className="max-w-3xl mx-auto space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          About Our Boutique
        </h2>

        <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
          Our boutique was created with a simple belief — clothing should feel
          personal, thoughtful, and timeless. Each piece you see here is
          carefully curated to celebrate craftsmanship, comfort, and quiet
          elegance.
        </p>

        <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
          We work closely with skilled artisans and small creators to bring you
          designs that blend traditional techniques with modern silhouettes.
          Every collection is produced in limited quantities, ensuring quality
          over excess.
        </p>

        <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
          Thank you for supporting slow fashion and choosing pieces that are
          made with intention.
        </p>
      </div>
    </section>
  );
}

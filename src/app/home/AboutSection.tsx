type CmsBlock = {
  title?: string;
  subtitle?: string;
  content?: {
    paragraphs?: string[];
  };
  image_url?: string;
  cta?: {
    label: string;
    href: string;
  };
};

export default function AboutSection({ about }: { about: CmsBlock }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            {about.title ?? "About Our Boutique"}
          </h2>

          {about.subtitle && (
            <p className="text-sm uppercase tracking-widest text-foreground/50">
              {about.subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {about.content?.paragraphs?.map((p, idx) => (
            <p
              key={idx}
              className="text-base md:text-lg leading-relaxed text-foreground/70"
            >
              {p}
            </p>
          ))}
        </div>

        {/* CTA */}
        {about.cta && (
          <div className="pt-6">
            <a
              href={about.cta.href}
              className="
                inline-flex items-center
                rounded-full
                bg-primary text-primary-foreground
                px-8 py-3
                text-sm font-medium
                hover:bg-primary/90
                transition
              "
            >
              {about.cta.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

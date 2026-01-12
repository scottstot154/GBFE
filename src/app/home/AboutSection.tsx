type CmsBlock = {
  title?: string;
  subtitle?: string;
  content?: {
    paragraphs?: string[];
  };
  image_url?: string;
};

export default function AboutSection({ about }: { about: CmsBlock }) {
  return (
    <section className="bg-card border border-[color:var(--border)] rounded-xl px-6 py-8 md:px-12 md:py-12">
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          About Our Boutique
        </h2>
        {about.content?.paragraphs?.map((p: string, idx: number) => (
          <p key={idx} className="text-foreground/70 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

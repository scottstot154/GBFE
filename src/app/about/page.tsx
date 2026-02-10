import { getCmsPageServer } from "@/lib/cmsServer";
import { HOME_ABOUT_DEFAULT } from "@/config/homeDefaults";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Gauri Boutique, our story, and the craftsmanship behind our collections.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const about = await getCmsPageServer("home-about", HOME_ABOUT_DEFAULT);

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">
          {about.title ?? "About Us"}
        </h1>
        {about.subtitle && (
          <p className="text-foreground/70">{about.subtitle}</p>
        )}
      </header>

      <section className="space-y-3">
        {about.content?.paragraphs?.map((p, idx) => (
          <p key={idx} className="text-foreground/80 leading-relaxed">
            {p}
          </p>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2 text-foreground/70">
          <li>Small-batch production and minimal waste.</li>
          <li>Transparent sourcing and fair working conditions.</li>
          <li>Designs that celebrate comfort, elegance, and longevity.</li>
        </ul>
      </section>
    </main>
  );
}

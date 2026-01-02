"use client";

import DressCard from "@/components/DressCard";
import Banner from "@/components/Banner";
import AboutSection from "./AboutSection";

type Collection = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  images?: string[];
  description?: string;
};

export default function HomeClient({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <>
      <Banner
        title="Summer Collection — Light & Breezy"
        subtitle="Handpicked pieces for the sunny season. Limited stocks available."
        imageUrl="/images/banner-summer.jpg"
      />

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Featured Collection
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Handmade · Ethically sourced
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((d) => (
            <DressCard key={d.collection_id} dress={d} />
          ))}
        </div>
      </section>

      <AboutSection />
    </>
  );
}

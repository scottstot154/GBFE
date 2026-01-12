"use client";

import Banner from "@/components/Banner";
import DressCard from "@/components/DressCard";
import { Collection } from "@/types";
import AboutSection from "./AboutSection";

type CmsBlock = {
  title?: string;
  subtitle?: string;
  content?: {
    paragraphs?: string[];
  };
  image_url?: string;
};

export default function HomeClient({
  collections,
  banner,
  about,
}: {
  collections: Collection[];
  banner: CmsBlock;
  about: CmsBlock;
}) {
  return (
    <>
      {/* HERO */}
      <Banner
        title={banner.title}
        subtitle={banner.subtitle}
        imageUrl={banner.image_url}
      />

      {/* COLLECTIONS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">Featured Collection</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((dress) => (
            <DressCard key={dress.collection_id} dress={dress} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection about={about} />
    </>
  );
}

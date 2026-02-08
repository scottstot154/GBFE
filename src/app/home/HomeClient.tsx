"use client";

import Banner from "@/components/Banner";
import DressCard from "@/components/DressCard";
import GButton from "@/components/GButton";
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
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="heading-section">Featured</h2>
          <div className="flex items-center gap-4">
            <span className="text-small">Handcrafted</span>
            <GButton as="a" href="/collection">
              View all
            </GButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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

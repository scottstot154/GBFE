"use client";

import DressCard from "@/components/DressCard";
import { Dress } from "@/types";

export default function CollectionGrid({
  collections,
}: {
  collections: Dress[];
}) {
  return (
    <section
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-8
      "
    >
      {collections.map((dress) => (
        <DressCard key={dress.collection_id} dress={dress} />
      ))}
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Dress } from "@/types";
import { formatPrice } from "@/lib/formatPrice";

export default function MoreLikeThisCarousel({
  collections,
}: {
  collections: Dress[];
}) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-2 snap-x snap-mandatory">
        {collections.map((dress) => {
          const image =
            dress.images?.length ? dress.images[0] : dress.image ?? "/dress-placeholder.png";

          return (
            <Link
              key={dress.collection_id}
              href={`/collection/${dress.collection_id}`}
              className="min-w-[220px] max-w-[220px] snap-start rounded-xl border bg-card hover:-translate-y-0.5 transition-transform"
            >
              <div className="relative w-full aspect-[3/4] rounded-t-xl overflow-hidden bg-card">
                <Image
                  src={image}
                  alt={dress.name}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>

              <div className="p-3 space-y-1">
                <p className="text-sm font-medium line-clamp-1">{dress.name}</p>
                <p className="text-sm text-foreground/70">
                  {formatPrice(dress.cost)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

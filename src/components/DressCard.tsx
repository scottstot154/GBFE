import React from "react";
import Image from "next/image";
import GButton from "./GButton";
import Link from "next/link";

export type Dress = {
  collection_id: string;
  name: string;
  cost: number;
  image?: string;
  description?: string;
};

const DressCard: React.FC<{ dress: Dress }> = ({ dress }) => {
  return (
    <div className="bg-card border border-[color:var(--border)] rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Image wrapper */}
      <div className="relative h-56 w-full bg-[color:var(--card)]">
        <Image
          src={dress.image || "/dress-placeholder.png"}
          alt={dress.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground">{dress.name}</h3>

        <p className="text-sm text-foreground/70 mt-1">
          {dress.description || "Beautiful handcrafted dress."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-foreground">
            ₹{dress.cost.toFixed(0)}
          </span>

          <Link href={`/collection/${dress.collection_id}`}>
            <GButton variant="primary" size="sm">
              View
            </GButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DressCard;

import React from "react";
import Image from "next/image";
import GButton from "./GButton";

export type Dress = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

const DressCard: React.FC<{ dress: Dress }> = ({ dress }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      {/* Parent must be relative + fixed height for Image fill */}
      <div className="relative h-56 w-full bg-gray-100">
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
        <h3 className="font-semibold text-lg">{dress.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {dress.description || "Beautiful handcrafted dress."}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold">₹{dress.price.toFixed(0)}</span>
          <GButton variant="primary" size="sm">
            View
          </GButton>
        </div>
      </div>
    </div>
  );
};

export default DressCard;

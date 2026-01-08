"use client";

import { useState } from "react";
import GButton from "@/components/GButton";
import { Icons } from "@/components/Icons";
import { Address } from "@/types";

export default function AddressSelector({
  addresses,
  onAddNew,
}: {
  addresses: Address[];
  onAddNew: () => void;
}) {
  const defaultAddress =
    addresses.find((a) => a.is_default)?.id ?? addresses[0].id;

  const [selectedId, setSelectedId] = useState<string>(defaultAddress);

  function handleContinue() {
    console.log("Selected address:", selectedId);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Select delivery address</h1>

        <button
          onClick={onAddNew}
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <Icons.plus className="w-4 h-4" />
          Add new
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            className={`block border rounded-xl p-4 cursor-pointer transition
              ${
                selectedId === addr.id
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
          >
            <input
              type="radio"
              checked={selectedId === addr.id}
              onChange={() => setSelectedId(addr.id)}
              className="hidden"
            />

            <div className="space-y-1">
              <p className="font-medium">
                {addr.name}{" "}
                <span className="text-sm text-foreground/60">
                  ({addr.label})
                </span>
              </p>

              <p className="text-sm text-foreground/70">
                {addr.line1}, {addr.city}, {addr.state} {addr.postal_code}
              </p>

              <p className="text-sm text-foreground/70">Phone: {addr.phone}</p>
            </div>
          </label>
        ))}
      </div>

      <GButton size="lg" className="rounded-full" onClick={handleContinue}>
        Continue
      </GButton>
    </main>
  );
}

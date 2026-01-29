"use client";

import { Address } from "@/types";
import { useDeleteAddressMutation } from "@/store/api/addressApi";
import { Icons } from "@/components/Icons";

export default function AddressList({
  addresses,
  onAddNew,
}: {
  addresses: Address[];
  onAddNew: () => void;
}) {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="heading-page">Saved Addresses</h1>

        <button onClick={onAddNew} className="text-sm text-link">
          + Add address
        </button>
      </div>

      {/* ADDRESSES */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-xl p-4 bg-card flex justify-between items-start"
          >
            <div className="text-sm space-y-1">
              <p className="font-medium">{address.label}</p>
              <p>{address.name}</p>
              <p>{address.line1}</p>
              <p>
                {address.city}, {address.state} {address.postal_code}
              </p>
              <p className="text-muted">{address.phone}</p>
            </div>

            <button
              disabled={isLoading}
              onClick={() => deleteAddress(address.id)}
              className="text-foreground/50 hover:text-red-600 transition"
              aria-label="Remove address"
            >
              <Icons.trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

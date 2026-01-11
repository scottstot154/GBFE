import type { Address } from "@/types";

export default function AddressCard({ address }: { address: Address }) {
  return (
    <div className="border rounded-xl bg-card p-4 space-y-1">
      <p className="font-medium">{address.name}</p>
      <p className="text-sm">{address.line1}</p>
      <p className="text-sm">
        {address.city}, {address.state} {address.postal_code}
      </p>
      <p className="text-sm text-foreground/60">Phone: {address.phone}</p>

      {address.is_default && (
        <span className="inline-block text-xs mt-2 text-primary">Default</span>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  useGetAddressesQuery,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/store/api/addressApi";
import Modal from "@/components/Modal";
import { Address } from "@/types";
import AddAddressForm from "./AddAddressForm";

export default function AddressesPage() {
  const { data, isLoading } = useGetAddressesQuery();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefault] = useSetDefaultAddressMutation();

  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<Address | null>(null);

  if (isLoading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <AddressSkeleton key={i} />
        ))}
      </main>
    );
  }

  if (mode === "add") {
    return <AddAddressForm onDone={() => setMode("list")} />;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-page">Saved Addresses</h1>
        <button
          onClick={() => setMode("add")}
          className="text-sm font-medium text-primary hover:underline"
        >
          + Add address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((address) => (
          <div
            key={address.id}
            className="rounded-xl border bg-card p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{address.label}</span>

              {address.is_default && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  Default
                </span>
              )}
            </div>

            <div className="text-sm space-y-1 text-foreground/70">
              <p className="font-medium text-foreground">{address.name}</p>
              <p>{address.line1}</p>
              <p>
                {address.city}, {address.state} {address.postal_code}
              </p>
              <p>{address.phone}</p>
            </div>

            <div className="pt-3 flex items-center gap-4 text-sm">
              {!address.is_default && (
                <button
                  onClick={() => setDefault(address.id)}
                  className="text-primary hover:underline"
                >
                  Set as default
                </button>
              )}

              <button
                onClick={() => {
                  setEditing(address);
                  setMode("edit");
                }}
                className="text-foreground/60 hover:text-foreground"
              >
                Edit
              </button>

              <button
                onClick={() => deleteAddress(address.id)}
                className="text-red-600 hover:underline ml-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {mode === "edit" && editing && (
        <Modal onClose={() => setMode("list")}>
          <AddAddressForm
            initialData={editing}
            onDone={() => setMode("list")}
          />
        </Modal>
      )}
    </main>
  );
}

/* ---------------- Skeleton ---------------- */

function AddressSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4 animate-pulse">
      <div className="h-3 w-20 bg-muted rounded" />
      <div className="h-4 w-32 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-3/4 bg-muted rounded" />
      <div className="h-8 w-full bg-muted rounded" />
    </div>
  );
}

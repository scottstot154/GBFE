"use client";

import { useState } from "react";
import { useGetAddressesQuery } from "@/store/api/addressApi";
import AddressSelector from "./AddressSelector";
import AddAddressForm from "./AddAddressForm";
import BackButton from "@/components/navigation/BackButton";

export default function CheckoutPage() {
  const { data, isLoading } = useGetAddressesQuery();
  const [mode, setMode] = useState<"select" | "add">("select");

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">Loading checkout…</div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      {/* NAVIGATION CONTEXT */}
      <div className="space-y-1">
        <BackButton fallback="/cart" />
      </div>

      {/* CONTENT */}
      {!data || data.addresses.length === 0 ? (
        <AddAddressForm onDone={() => setMode("select")} />
      ) : mode === "add" ? (
        <AddAddressForm onDone={() => setMode("select")} />
      ) : (
        <AddressSelector
          addresses={data.addresses}
          onAddNew={() => setMode("add")}
        />
      )}
    </main>
  );
}

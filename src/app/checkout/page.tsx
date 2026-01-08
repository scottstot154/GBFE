"use client";

import { useState } from "react";
import { useGetAddressesQuery } from "@/store/api/addressApi";
import AddressSelector from "./AddressSelector";
import AddAddressForm from "./AddAddressForm";

export default function CheckoutPage() {
  const { data, isLoading } = useGetAddressesQuery();
  const [mode, setMode] = useState<"select" | "add">("select");

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">Loading checkout…</div>
    );
  }

  // No addresses → force add mode
  if (!data || data.addresses.length === 0) {
    return <AddAddressForm onDone={() => setMode("select")} />;
  }

  if (mode === "add") {
    return <AddAddressForm onDone={() => setMode("select")} />;
  }

  return (
    <AddressSelector
      addresses={data.addresses}
      onAddNew={() => setMode("add")}
    />
  );
}

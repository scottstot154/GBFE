"use client";

import { useState } from "react";
import { useAddAddressMutation } from "@/store/api/addressApi";
import GButton from "@/components/GButton";
import { useRouter } from "next/navigation";

export default function AddAddressForm({ onDone }: { onDone: () => void }) {
  const router = useRouter();

  const [addAddress, { isLoading, error }] = useAddAddressMutation();

  const [form, setForm] = useState({
    label: "Home",
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    is_default: true,
  });

  function updateField(key: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // 🔑 THIS is critical
      await addAddress(form).unwrap();

      // after success → refresh checkout
      router.refresh();
      onDone();
    } catch (err) {
      console.error("Add address failed:", err);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-medium mb-6">Add delivery address</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="input"
        />

        <input
          required
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="input"
        />

        <input
          required
          placeholder="Address line"
          value={form.line1}
          onChange={(e) => updateField("line1", e.target.value)}
          className="input"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            required
            placeholder="City"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="input"
          />

          <input
            required
            placeholder="State"
            value={form.state}
            onChange={(e) => updateField("state", e.target.value)}
            className="input"
          />
        </div>

        <input
          required
          placeholder="Postal code"
          value={form.postal_code}
          onChange={(e) => updateField("postal_code", e.target.value)}
          className="input"
        />

        {error && (
          <p className="text-sm text-red-600">
            Failed to save address. Please try again.
          </p>
        )}

        <GButton
          size="lg"
          type="submit" // 🔑 REQUIRED
          className="rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Saving…" : "Save & Continue"}
        </GButton>
      </form>
    </main>
  );
}

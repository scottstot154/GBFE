"use client";

import { useState } from "react";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/store/api/addressApi";
import { Address } from "@/types";
import GButton from "@/components/GButton";

export default function AddAddressForm({
  initialData,
  onDone,
}: {
  initialData?: Address;
  onDone: () => void;
}) {
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const [form, setForm] = useState({
    label: initialData?.label ?? "",
    name: initialData?.name ?? "",
    phone: initialData?.phone ?? "",
    line1: initialData?.line1 ?? "",
    city: initialData?.city ?? "",
    state: initialData?.state ?? "",
    postal_code: initialData?.postal_code ?? "",
  });

  async function handleSubmit() {
    if (initialData) {
      await updateAddress({ id: initialData.id, data: form });
    } else {
      await addAddress(form);
    }
    onDone();
  }

  return (
    <div className="bg-card rounded-xl p-6 space-y-5 max-w-md mx-auto">
      <h2 className="heading-section">
        {initialData ? "Edit address" : "Add new address"}
      </h2>

      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          placeholder={key.replace("_", " ")}
          value={value}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="input"
        />
      ))}

      <div className="pt-4 flex gap-3">
        <GButton onClick={handleSubmit} className="flex-1">
          Save
        </GButton>
        <button onClick={onDone} className="text-sm text-foreground/60">
          Cancel
        </button>
      </div>
    </div>
  );
}

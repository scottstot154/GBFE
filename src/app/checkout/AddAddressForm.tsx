"use client";

import { useRouter } from "next/navigation";
import AccountAddAddressForm from "@/app/account/addresses/AddAddressForm";

export default function AddAddressForm({ onDone }: { onDone: () => void }) {
  const router = useRouter();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-medium mb-6">Add delivery address</h1>

      <AccountAddAddressForm
        setDefaultOnCreate
        afterSave={() => router.refresh()}
        onDone={onDone}
      />
    </main>
  );
}

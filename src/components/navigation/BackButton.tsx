"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";

export default function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground"
    >
      <Icons.arrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}

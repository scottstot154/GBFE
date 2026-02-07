"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallback?: string;
  label?: string;
};

export default function BackButton({
  fallback = "/",
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    // If browser history exists, go back
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}

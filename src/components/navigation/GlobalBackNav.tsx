"use client";

import { usePathname } from "next/navigation";
import BackButton from "./BackButton";

export default function GlobalBackNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      <BackButton />
    </div>
  );
}

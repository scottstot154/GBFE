import { Address } from "@/types";

export function formatAddress(a: Address): string {
  return `${a.line1}, ${a.city}, ${a.state} ${a.postal_code}`;
}

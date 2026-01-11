// src/lib/formatPrice.ts
export function formatPrice(value: number | bigint) {
  const paise = typeof value === "bigint" ? Number(value) : value;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

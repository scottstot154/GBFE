export function formatPrice(value: string | number) {
  const amount = typeof value === "string" ? BigInt(value) : BigInt(value);

  return `₹${amount.toLocaleString("en-IN")}`;
}

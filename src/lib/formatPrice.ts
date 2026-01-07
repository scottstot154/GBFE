/**
 * Accepts BIGINT price in paise (string | number | bigint)
 * Returns formatted INR string in rupees
 */
export function formatPrice(value: string | number | bigint) {
  const paise = typeof value === "bigint" ? value : BigInt(value);

  const rupees = Number(paise) / 100;

  return rupees.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
}

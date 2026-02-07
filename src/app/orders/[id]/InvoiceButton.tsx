"use client";

import { useState } from "react";
import GButton from "@/components/GButton";
import Snackbar from "@/components/Snackbar";
import { generateInvoicePdf } from "@/lib/generateInvoicePdf";
import { downloadPdf } from "@/lib/downloadPdf";
import type { Order, OrderItem } from "@/types";

export default function InvoiceButton({
  order,
  items,
}: {
  order: Order;
  items: OrderItem[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    try {
      setLoading(true);

      const pdfBytes = await generateInvoicePdf(order, items);

      console.log("PDF generated, size:", pdfBytes.byteLength);

      downloadPdf(pdfBytes, `invoice-${order.id.slice(0, 8)}.pdf`);
    } catch (err) {
      console.error("❌ INVOICE ERROR", err);
      alert(err instanceof Error ? err.message : JSON.stringify(err));
      setError("Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <GButton variant="outline" onClick={handleDownload} disabled={loading}>
        {loading ? "Generating…" : "Download Invoice"}
      </GButton>

      {error && <Snackbar message={error} onClose={() => setError(null)} />}
    </>
  );
}

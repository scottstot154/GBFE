import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { Order, OrderItem } from "@/types";

function toRupees(value: bigint | number | string) {
  if (typeof value === "bigint") return Number(value) / 100;
  if (typeof value === "number") return value / 100;
  return Number(value) / 100;
}

export async function generateInvoicePdf(order: Order, items: OrderItem[]) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 780;

  const draw = (text: string, size = 12, isBold = false) => {
    page.drawText(text, {
      x: 50,
      y,
      size,
      font: isBold ? bold : font,
      color: rgb(0, 0, 0),
    });
    y -= size + 6;
  };

  draw("INVOICE", 20, true);
  y -= 10;

  draw(`Order ID: ${order.id}`);
  draw(`Date: ${new Date(order.created_at).toLocaleDateString("en-IN")}`);

  y -= 16;

  draw("Billing Address", 14, true);
  draw(order.shipping_address.name ?? "");
  draw(order.shipping_address.line1 ?? "");
  draw(
    `${order.shipping_address.city ?? ""}, ${
      order.shipping_address.state ?? ""
    } ${order.shipping_address.postal_code ?? ""}`
  );
  draw(`Phone: ${order.shipping_address.phone ?? ""}`);

  y -= 16;

  draw("Items", 14, true);

  items.forEach((item) => {
    draw(
      `${item.name} (${item.size}) — Rs. ${toRupees(item.price).toFixed(2)}`
    );
  });

  y -= 16;

  draw(`Total: Rs. ${toRupees(order.total_amount).toFixed(2)}`, 14, true);

  return pdfDoc.save();
}

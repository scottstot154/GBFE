import { Resend } from "resend";
import { formatPrice } from "../formatPrice";

const resend = new Resend(process.env.RESEND_API_KEY);

type Address = {
  name: string;
  line1: string;
  city: string;
  state: string;
  postal_code: string;
};

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  totalAmount,
  address,
  items = [],
}: {
  to: string;
  orderId: string;
  totalAmount: number;
  address: Address;
  items: Array<{
    id: string;
    name: string;
    size: string;
    price: number;
  }>;
}) {
  if (!process.env.EMAIL_FROM) {
    console.warn("EMAIL_FROM not configured");
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Order confirmed • ${orderId.slice(0, 8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank you for your order</h2>

        <p><strong>Order ID:</strong> ${orderId}</p>

        <h3>Order Details</h3>
        <ul>
          ${
            items?.length
              ? items
                  .map(
                    (item) => `
            <li>
              ${item.name} (Size: ${item.size}) - ${formatPrice(item.price)}
            </li>
          `,
                  )
                  .join("")
              : "<li>No items found.</li>"
          }
        </ul>

        <p><strong>Total:</strong> ${formatPrice(totalAmount)}</p>

        <h3>Delivery Address</h3>
        <p>
          ${address.name}<br/>
          ${address.line1}<br/>
          ${address.city}, ${address.state} ${address.postal_code}
        </p>

        <p style="margin-top: 24px;">
          We’ll notify you when your order is shipped.
        </p>
      </div>
    `,
  });
}

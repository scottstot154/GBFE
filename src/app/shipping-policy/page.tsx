import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "Shipping timelines, charges, and delivery information for Gauri Boutique orders.",
  alternates: {
    canonical: "/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-foreground/70">
          We ship across India and work to deliver your order quickly and
          safely.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Processing Time</h2>
        <p>
          Orders are typically processed within 1–3 business days after payment
          confirmation. During peak periods, processing may take slightly
          longer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Delivery Timeline</h2>
        <p>
          Standard delivery usually takes 3–7 business days depending on your
          location. Remote areas may take longer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Shipping Charges</h2>
        <p>Shipping charges, if any, are displayed at checkout.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Order Tracking</h2>
        <p>Once shipped, you will receive tracking details by email.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Delivery Issues</h2>
        <p>
          If a delivery attempt fails due to an incorrect address or
          unavailability, the courier may re-attempt or return the shipment to
          us. Please contact us promptly for assistance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact</h2>
        <p>For shipping questions, contact us at admin@gauriboutique.in.</p>
      </section>
    </main>
  );
}

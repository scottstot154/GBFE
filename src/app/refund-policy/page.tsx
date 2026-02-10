import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Understand cancellations, refunds, and support policies at Gauri Boutique.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-foreground/70">
          We want you to be happy with your purchase. Please review our policy
          below.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Order Cancellations</h2>
        <p>
          Orders can be cancelled and refunded only if they have not been
          shipped yet. Once an order is shipped, it cannot be cancelled.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Returns & Refunds</h2>
        <p>
          As a small business, we are working to build a smooth returns process.
          Shipped orders are not eligible for cancellation at this time. If you
          have an issue with your order, please contact us and we will do our
          best to help.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Non-Returnable Items</h2>
        <p>
          Custom or made-to-order items are not eligible for return unless
          received in damaged condition.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact</h2>
        <p>If you need help, contact us at admin@gauriboutique.in.</p>
      </section>
    </main>
  );
}

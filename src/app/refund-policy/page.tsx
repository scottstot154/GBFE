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
          Orders can be cancelled within 24 hours of placement, provided the
          order has not been shipped.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Returns & Refunds</h2>
        <p>
          Returns are accepted within 7 days of delivery if the product is
          unused and in original condition. Refunds are processed to the
          original payment method within 7–10 business days after inspection.
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

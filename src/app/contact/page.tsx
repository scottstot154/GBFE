export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">Contact Us</h1>
        <p className="text-foreground/70">
          Have a question about an order, sizing and custom orders? We’re here
          to help.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Customer Support</h2>
        <p>Email: admin@gauriboutique.in</p>
        <p>Phone/WhatsApp: +91 91414 23149</p>
        <p>Hours: Mon–Sat, 10am–6pm IST</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Business Address</h2>
        <p>Gauri Boutique</p>
        <p>1465, Raghavendra Sawmill Rd</p>
        <p>Gayathri Badavane, Channarayapatna, Karnataka 573116</p>
        <p>India</p>
      </section>
    </main>
  );
}

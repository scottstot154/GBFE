import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal",
  description:
    "How to raise a grievance with Gauri Boutique and expected resolution timelines.",
  alternates: {
    canonical: "/grievance-redressal",
  },
};

export default function GrievanceRedressalPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">
          Grievance Redressal
        </h1>
        <p className="text-foreground/70">
          We’re here to resolve any concerns regarding orders, deliveries, or
          service.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">How to Raise a Grievance</h2>
        <p>
          Email us with your order ID and a brief description of the issue. We
          acknowledge complaints within 48 hours and aim to resolve them within
          15 business days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Grievance Officer</h2>
        <p>Gauri Boutique Support Team</p>
        <p>Email: admin@gauriboutique.in</p>
        <p>Phone/WhatsApp: +91 91414 23149</p>
        <p>
          1465, Raghavendra Sawmill Rd, Gayathri Badavane, Channarayapatna,
          Karnataka 573116, India
        </p>
      </section>
    </main>
  );
}

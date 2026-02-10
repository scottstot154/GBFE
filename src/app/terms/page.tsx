import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions for shopping with Gauri Boutique.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-foreground/70">
          By using this website, you agree to the following terms.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Use of Website</h2>
        <p>
          You agree to provide accurate information during checkout and to use
          the website in compliance with applicable laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Orders and Pricing</h2>
        <p>
          All orders are subject to availability and confirmation. Prices are
          listed in INR and may change without prior notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Liability</h2>
        <p>
          We are not liable for any indirect or incidental damages arising from
          the use of our products or website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact</h2>
        <p>If you have questions, contact us at admin@gauriboutique.in.</p>
      </section>
    </main>
  );
}

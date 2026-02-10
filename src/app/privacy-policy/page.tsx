import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Gauri Boutique collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">Privacy Policy</h1>
        <p className="text-foreground/70">
          We respect your privacy and are committed to protecting your personal
          information.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Information We Collect</h2>
        <p>
          We collect information you provide at checkout (name, email, phone,
          shipping address) and data required to process payments and deliver
          orders.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">How We Use Information</h2>
        <ul className="list-disc pl-5 space-y-2 text-foreground/70">
          <li>Process and fulfill your orders.</li>
          <li>Provide support and order updates.</li>
          <li>Improve our products and services.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Data Protection</h2>
        <p>
          We do not sell your personal data. We use secure systems and limit
          access to authorized personnel only.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact</h2>
        <p>If you have questions, contact us at admin@gauriboutique.in.</p>
      </section>
    </main>
  );
}

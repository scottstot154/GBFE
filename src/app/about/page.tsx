export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">About Us</h1>
        <p className="text-foreground/70">
          Boutique is a small studio focused on handcrafted, beautiful ethically
          sourced pieces inspired by Indian craftsmanship.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Our Story</h2>
        <p>
          We design limited-run collections with a focus on quality materials,
          responsible sourcing, and timeless silhouettes. Every piece is made
          with care by skilled artisans.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2 text-foreground/70">
          <li>Small-batch production and minimal waste.</li>
          <li>Transparent sourcing and fair working conditions.</li>
          <li>Designs that celebrate comfort, elegance, and longevity.</li>
        </ul>
      </section>
    </main>
  );
}

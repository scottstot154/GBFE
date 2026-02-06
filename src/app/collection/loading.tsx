export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-10 animate-pulse">
      <header className="space-y-3">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-4 w-96 bg-muted rounded" />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card overflow-hidden">
            <div className="aspect-[3/4] bg-muted" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-4 w-20 bg-muted rounded" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

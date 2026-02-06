export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-[1.4fr_0.6fr] animate-pulse">
      <section className="space-y-6">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded" />

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-xl bg-card">
              <div className="w-24 h-32 bg-muted rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/2 bg-muted rounded" />
                <div className="h-3 w-1/4 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="h-fit border rounded-xl bg-card p-6 space-y-4">
        <div className="h-5 w-32 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />
      </aside>
    </main>
  );
}

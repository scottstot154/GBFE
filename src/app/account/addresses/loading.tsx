export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="h-4 w-24 bg-muted rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-3 w-40 bg-muted rounded" />
            <div className="h-3 w-56 bg-muted rounded" />
            <div className="h-3 w-32 bg-muted rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 animate-pulse">
      <div className="h-4 w-24 bg-muted rounded" />

      <div className="h-6 w-56 bg-muted rounded" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 bg-card space-y-2">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-3 w-72 bg-muted rounded" />
            <div className="h-3 w-56 bg-muted rounded" />
          </div>
        ))}
      </div>

      <div className="h-10 w-40 bg-muted rounded" />
    </main>
  );
}

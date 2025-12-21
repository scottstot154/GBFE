export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse space-y-8">
      <div className="h-64 bg-muted rounded-lg" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-80 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 animate-pulse">
      <div className="aspect-[3/4] bg-muted rounded-lg" />
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-10 w-40 bg-muted rounded" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="max-w-md mx-auto px-4 py-20 space-y-6 animate-pulse">
      <div className="h-7 w-32 bg-muted rounded" />
      <div className="space-y-4">
        <div className="h-11 w-full bg-muted rounded" />
        <div className="h-11 w-full bg-muted rounded" />
        <div className="h-11 w-full bg-muted rounded" />
      </div>
      <div className="h-4 w-40 bg-muted rounded" />
    </main>
  );
}

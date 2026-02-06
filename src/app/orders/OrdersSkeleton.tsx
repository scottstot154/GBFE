export default function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border bg-card p-6 space-y-4 animate-pulse"
        >
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-4 w-40 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>
            <div className="h-4 w-16 bg-muted rounded" />
          </div>

          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-16 w-12 rounded bg-muted" />
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

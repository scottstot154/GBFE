export default function OrderItemsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 border rounded-xl bg-card animate-pulse"
        >
          <div className="w-20 h-28 bg-muted rounded" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 bg-muted rounded" />
            <div className="h-3 w-1/4 bg-muted rounded" />
            <div className="h-4 w-1/3 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

import OrderItemsSkeleton from "./OrderItemsSkeleton";

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16 space-y-10">
      <div className="space-y-2 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="h-4 w-56 bg-muted rounded" />
        <div className="h-4 w-24 bg-muted rounded" />
      </div>

      <section className="space-y-4">
        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
        <OrderItemsSkeleton />
      </section>

      <section className="space-y-2 animate-pulse">
        <div className="h-5 w-40 bg-muted rounded" />
        <div className="h-20 w-full bg-muted rounded" />
      </section>

      <div className="flex justify-between pt-6 border-t animate-pulse">
        <div className="h-5 w-20 bg-muted rounded" />
        <div className="h-5 w-24 bg-muted rounded" />
      </div>
    </main>
  );
}

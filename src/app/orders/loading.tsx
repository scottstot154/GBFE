import OrdersSkeleton from "./OrdersSkeleton";

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16 space-y-6">
      <div className="h-6 w-32 bg-muted rounded animate-pulse" />
      <OrdersSkeleton />
    </main>
  );
}

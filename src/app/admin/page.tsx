import { requireAdmin } from "@/lib/admin";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();

  const [{ count: collectionsCount }, { count: ordersCount }] = await Promise.all(
    [
      supabase.from("collections").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
    ]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-foreground/60">Collections</p>
          <p className="text-2xl font-semibold mt-2">{collectionsCount ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-foreground/60">Orders</p>
          <p className="text-2xl font-semibold mt-2">{ordersCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}

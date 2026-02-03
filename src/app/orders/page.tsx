import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import OrderCard from "./OrderCard";
import OrdersSkeleton from "./OrdersSkeleton";
import { Order } from "@/types";

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/orders");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_amount,
      status,
      delivery_status,
      created_at
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Order[]>();

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-red-600">
        Failed to load orders
      </div>
    );
  }

  if (!orders) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-16">
        <OrdersSkeleton />
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-medium">No orders yet</h1>
        <p className="text-foreground/60">
          Once you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-2xl font-medium tracking-tight">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </main>
  );
}

import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { formatPrice } from "@/lib/formatPrice";
import BackButton from "@/components/navigation/BackButton";
import InvoiceButton from "./InvoiceButton";
import type { Order, OrderItem } from "@/types";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  console.log("Fetching order details for ID:", id);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/orders/${id}`);
  }

  // 1️⃣ Order
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at, shipping_address")
    .eq("id", id)
    .eq("user_id", user.id)
    .single<Order>();

  if (!order || error) notFound();

  // 2️⃣ Items
  const { data: items } = await supabase
    .from("order_items")
    .select("name, size, price, image")
    .eq("order_id", order.id)
    .returns<OrderItem[]>();

  if (!items) notFound();

  if (!items || items.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 space-y-10">
      <BackButton fallback="/orders" />

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-medium">Order #{order.id.slice(0, 8)}</h1>
        <p className="text-sm text-foreground/60">
          Placed on {new Date(order.created_at).toLocaleDateString("en-IN")}
        </p>
        <span className="text-sm font-medium capitalize">
          Status: {order.status}
        </span>
      </header>

      {/* ITEMS */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Items</h2>

        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-4 border rounded-xl bg-card">
            <div className="relative w-20 h-28 rounded overflow-hidden">
              <Image
                src={item.image ?? "/dress-placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-foreground/60">Size: {item.size}</p>
              <p className="font-medium">{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ADDRESS */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Delivery Address</h2>

        <div className="border rounded-xl bg-card p-4 text-sm space-y-1">
          <p className="font-medium">{order.shipping_address.name}</p>
          <p>{order.shipping_address.line1}</p>
          <p>
            {order.shipping_address.city}, {order.shipping_address.state}{" "}
            {order.shipping_address.postal_code}
          </p>
          <p>Phone: {order.shipping_address.phone}</p>
        </div>
      </section>

      {/* ACTIONS */}
      <section className="pt-6">
        <InvoiceButton order={order} items={items} />
      </section>

      {/* TOTAL */}
      <footer className="flex justify-between border-t pt-6">
        <span className="text-lg font-medium">Total</span>
        <span className="text-lg font-semibold">
          {formatPrice(order.total_amount)}
        </span>
      </footer>
    </main>
  );
}

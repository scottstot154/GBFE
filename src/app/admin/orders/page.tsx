import { requireAdmin } from "@/lib/admin";
import { formatPrice } from "@/lib/formatPrice";
import { updateDeliveryStatus } from "./actions";

const deliveryOptions = [
  "pending",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "returned",
];

export default async function AdminOrdersPage() {
  const { supabase } = await requireAdmin();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, total_amount, status, delivery_status, created_at, user_id")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Orders</h1>

      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order.id} className="rounded-xl border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-foreground/60">Order</p>
                <p className="font-medium">#{String(order.id).slice(0, 8)}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Total</p>
                <p className="font-medium">
                  {formatPrice(BigInt(order.total_amount))}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Payment</p>
                <p className="font-medium capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Delivery</p>
                <p className="font-medium capitalize">
                  {order.delivery_status?.replaceAll("_", " ")}
                </p>
              </div>
            </div>

            <form
              action={updateDeliveryStatus}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <input type="hidden" name="order_id" value={order.id} />
              <select
                name="delivery_status"
                defaultValue={order.delivery_status}
                className="input w-64"
              >
                {deliveryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 rounded-lg bg-foreground text-background text-sm">
                Update Status
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

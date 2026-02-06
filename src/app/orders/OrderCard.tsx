import Link from "next/link";
import Image from "next/image";
import { Order } from "@/types";
import { formatPrice } from "@/lib/formatPrice";
import OrderStatusBadge from "./OrderStatusBadge";

type OrderItemPreview = {
  name: string;
  image: string | null;
};

export default async function OrderCard({ order }: { order: Order }) {
  // 🔐 Fetch preview items SAFELY
  // (max 4 images for preview)
  const supabase = await import("@/lib/supabaseServer").then((m) =>
    m.createSupabaseServerClient()
  );

  const { data: items } = await supabase
    .from("order_items")
    .select("name, image")
    .eq("order_id", order.id)
    .limit(4)
    .returns<OrderItemPreview[]>();

  const previewItems = items ?? [];

  return (
    <Link
      href={`/orders/${order.id}`}
      className="
        block
        rounded-xl
        border
        bg-card
        p-5
        transition
        hover:shadow-md
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-foreground/60">
            Order #{order.id.slice(0, 8)}
          </p>
          <p className="text-xs text-foreground/50">
            {new Date(order.created_at).toLocaleDateString("en-IN")}
          </p>
        </div>

        <OrderStatusBadge status={order.delivery_status} />
      </div>

      {/* ITEMS PREVIEW */}
      {previewItems.length > 0 && (
        <div className="flex gap-3 mt-4">
          {previewItems.map((item, i) => (
            <div
              key={`${order.id}-${i}`}
              className="relative h-16 w-12 rounded overflow-hidden bg-muted"
            >
              <Image
                src={item.image || "/dress-placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-foreground/60">
          {previewItems.length} item
          {previewItems.length !== 1 ? "s" : ""}
        </span>

        <span className="font-medium">{formatPrice(order.total_amount)}</span>
      </div>
    </Link>
  );
}

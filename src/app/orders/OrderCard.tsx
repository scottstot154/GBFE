import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import { Order, OrderItem } from "@/types";

export default function OrderCard({
  order,
  items,
}: {
  order: Order;
  items: OrderItem[];
}) {
  return (
    <Link
      href={`/orders/${order.id}`}
      className="
        block rounded-xl border bg-card p-6
        hover:shadow-md transition
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
          <p className="text-xs text-foreground/60">
            {new Date(order.created_at).toLocaleDateString("en-IN")}
          </p>
        </div>

        <span
          className="
            text-xs font-medium px-2 py-1 rounded-full
            bg-green-100 text-green-700
          "
        >
          {order.status}
        </span>
      </div>

      {/* Items preview */}
      <div className="flex gap-3 mt-4">
        {items.slice(0, 4).map((item, i) => (
          <div
            key={i}
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

        {items.length > 4 && (
          <div className="text-xs flex items-center text-foreground/60">
            +{items.length - 4} more
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t">
        <span className="text-sm text-foreground/70">Total</span>
        <span className="text-sm font-medium">
          {formatPrice(order.total_amount)}
        </span>
      </div>
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import { Order, OrderItem } from "@/types";

export default function OrderCard({ order }: { order: Order }) {
  console.log(order);
  return (
    <Link href={`/orders/${order.id}`}>
      <div className="border rounded-xl bg-card p-4 space-y-4 hover:border-primary transition cursor-pointer">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/60">
              Order #{order.id.slice(0, 8)}
            </p>
            <p className="text-sm text-foreground/60">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          <span className="text-sm font-medium capitalize">{order.status}</span>
        </div>

        {/* Preview items */}
        <div className="flex gap-3">
          {order.order_items.slice(0, 3).map((item: OrderItem, idx: number) => (
            <div
              key={idx}
              className="relative w-12 h-16 rounded overflow-hidden"
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

        {/* Total */}
        <div className="flex justify-between border-t pt-3">
          <span className="text-sm">Total</span>
          <span className="font-medium">{formatPrice(order.total_amount)}</span>
        </div>
      </div>
    </Link>
  );
}

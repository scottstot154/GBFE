import { ORDER_STATUS_META } from "@/lib/orderStatus";
import { DeliveryStatus } from "@/types";
import clsx from "clsx";

export default function OrderStatusBadge({
  status,
}: {
  status: DeliveryStatus;
}) {
  const meta = ORDER_STATUS_META[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        meta.color
      )}
    >
      {meta.label}
    </span>
  );
}

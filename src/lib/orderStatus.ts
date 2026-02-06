import { DeliveryStatus } from "@/types";

export const ORDER_STATUS_META: Record<
  DeliveryStatus,
  {
    label: string;
    color: string;
    step: number;
  }
> = {
  pending: {
    label: "Pending",
    color: "bg-muted text-foreground",
    step: 0,
  },
  processing: {
    label: "Processing",
    color: "bg-yellow-100 text-yellow-800",
    step: 1,
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-100 text-blue-800",
    step: 2,
  },
  out_for_delivery: {
    label: "Out for delivery",
    color: "bg-indigo-100 text-indigo-800",
    step: 3,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    step: 4,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    step: -1,
  },
  returned: {
    label: "Returned",
    color: "bg-orange-100 text-orange-800",
    step: -1,
  },
};

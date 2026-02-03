import { ORDER_STATUS_META } from "@/lib/orderStatus";
import { DeliveryStatus } from "@/types";
import clsx from "clsx";

const STEPS: DeliveryStatus[] = [
  "pending",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
];

export default function OrderTimeline({ status }: { status: DeliveryStatus }) {
  const currentStep = ORDER_STATUS_META[status].step;

  // cancelled / returned → no timeline
  if (currentStep === -1) return null;

  return (
    <div className="flex items-center gap-3 mt-6">
      {STEPS.map((step, idx) => {
        const isDone = idx <= currentStep;

        return (
          <div key={step} className="flex items-center gap-3 flex-1">
            <div
              className={clsx(
                "h-3 w-3 rounded-full",
                isDone ? "bg-primary" : "bg-muted"
              )}
            />
            {idx < STEPS.length - 1 && (
              <div
                className={clsx(
                  "h-[2px] flex-1",
                  isDone ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import GButton from "@/components/GButton";
import Snackbar from "@/components/Snackbar";

const cancellableStatuses = new Set(["pending", "processing"]);

export default function CancelOrderButton({
  orderId,
  deliveryStatus,
}: {
  orderId: string;
  deliveryStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  if (!cancellableStatuses.has(deliveryStatus)) return null;

  async function handleCancel() {
    setLoading(true);
    try {
      const { error } = await supabase.rpc("cancel_order", {
        p_order_id: orderId,
      });
      if (error) throw error;

      setSnackbar("Order cancelled. Refund in 2–3 business days.");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to cancel order.";
      setSnackbar(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <GButton
        variant="outline"
        onClick={handleCancel}
        disabled={loading}
        className="rounded-full"
      >
        {loading ? "Cancelling…" : "Cancel order"}
      </GButton>
      <p className="text-xs text-foreground/60">
        Refunds are processed within 2–3 business days.
      </p>
      {snackbar && <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />}
    </div>
  );
}

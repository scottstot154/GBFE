"use client";

import { finalizeCheckout } from "../actions";
import { useRouter, useSearchParams } from "next/navigation";
import GButton from "@/components/GButton";
import { toast } from "react-hot-toast";
import { cartApi } from "@/store/api/cartApi";
import { useAppDispatch } from "@/store/hooks";

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const checkoutId = params.get("checkout");

  const dispatch = useAppDispatch();

  async function handlePaymentSuccess() {
    if (!checkoutId) return;

    try {
      const orderId = await finalizeCheckout(checkoutId);

      // ✅ Cart state refresh
      dispatch(cartApi.util.invalidateTags(["Cart"]));

      // ✅ Redirect user
      router.push(`/orders/${orderId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <h1 className="text-2xl font-medium">Payment</h1>

      <p className="text-foreground/60">This is a mock payment screen.</p>

      <GButton size="lg" onClick={handlePaymentSuccess}>
        Mock payment success
      </GButton>
    </div>
  );
}

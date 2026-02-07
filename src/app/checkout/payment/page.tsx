"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GButton from "@/components/GButton";
import { toast } from "react-hot-toast";
import { cartApi } from "@/store/api/cartApi";
import { useAppDispatch } from "@/store/hooks";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

type RazorpayOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
};

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const checkoutId = params.get("checkout");

  const dispatch = useAppDispatch();

  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkoutEnabled = useMemo(() => Boolean(checkoutId), [checkoutId]);

  useEffect(() => {
    if (window.Razorpay) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setScriptReady(false);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  async function createRazorpayOrder() {
    const response = await fetch("/api/payments/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkoutId }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to create payment order");
    }

    return (await response.json()) as RazorpayOrderResponse;
  }

  async function verifyPayment(payload: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) {
    const response = await fetch("/api/payments/razorpay/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkoutId, ...payload }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Payment verification failed");
    }

    return response.json() as Promise<{ success: boolean; orderId: string }>;
  }

  async function handlePayNow() {
    if (!checkoutId) return;
    if (!scriptReady || !window.Razorpay) {
      toast.error("Payment SDK not loaded. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const order = await createRazorpayOrder();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Boutique",
        description: "Order payment",
        order_id: order.orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const result = await verifyPayment(response);
            if (result.success) {
              dispatch(cartApi.util.invalidateTags(["Cart"]));
              router.push(`/orders/${result.orderId}`);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Payment failed.");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        prefill: {},
        theme: {
          color: "#C37A5C",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function () {
        setLoading(false);
        toast.error("Payment failed. Please try again.");
      });
      razorpay.open();
    } catch (err: unknown) {
      setLoading(false);
      toast.error(err instanceof Error ? err.message : "Payment failed.");
    }
  }

  if (!checkoutEnabled) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h1 className="text-2xl font-medium">Payment</h1>
        <p className="text-foreground/60">Invalid checkout session.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <h1 className="text-2xl font-medium">Payment</h1>
      <p className="text-foreground/60">
        Pay securely using UPI or Netbanking.
      </p>

      <GButton size="lg" onClick={handlePayNow} disabled={loading}>
        {loading ? "Opening payment…" : "Pay Now"}
      </GButton>
    </div>
  );
}

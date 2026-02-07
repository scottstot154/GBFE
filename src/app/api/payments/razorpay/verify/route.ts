import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { finalizeCheckout } from "@/app/checkout/actions";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string | null;
  status: string;
};

export async function POST(req: Request) {
  try {
    const { checkoutId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!checkoutId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment fields" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keyId = requireEnv("RAZORPAY_KEY_ID");
    const keySecret = requireEnv("RAZORPAY_KEY_SECRET");

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const orderResponse = await fetch(
      `https://api.razorpay.com/v1/orders/${razorpay_order_id}`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
        },
      }
    );

    if (!orderResponse.ok) {
      const text = await orderResponse.text();
      return NextResponse.json(
        { error: "Failed to fetch Razorpay order", details: text },
        { status: 502 }
      );
    }

    const order = (await orderResponse.json()) as RazorpayOrder;
    const expectedReceipt = `checkout_${checkoutId}`;
    if (order.receipt !== expectedReceipt) {
      return NextResponse.json(
        { error: "Checkout mismatch" },
        { status: 400 }
      );
    }

    const orderId = await finalizeCheckout(checkoutId);

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

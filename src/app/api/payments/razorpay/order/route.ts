import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string | null;
  status: string;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function normalizeAmount(value: unknown) {
  if (typeof value === "number") return Math.round(value);
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") return parseInt(value, 10);
  return 0;
}

export async function POST(req: Request) {
  try {
    const { checkoutId } = await req.json();
    if (!checkoutId) {
      return NextResponse.json(
        { error: "checkoutId is required" },
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

    const { data: checkout, error } = await supabase
      .from("checkouts")
      .select("id, total_amount, user_id")
      .eq("id", checkoutId)
      .eq("user_id", user.id)
      .single();

    if (error || !checkout) {
      return NextResponse.json({ error: "Checkout not found" }, { status: 404 });
    }

    const amount = normalizeAmount(checkout.total_amount);
    if (!amount || amount < 10) {
      return NextResponse.json(
        { error: "Invalid checkout amount" },
        { status: 400 }
      );
    }

    const keyId = requireEnv("RAZORPAY_KEY_ID");
    const keySecret = requireEnv("RAZORPAY_KEY_SECRET");

    const receipt = `checkout_${checkoutId}`;

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt,
        notes: {
          checkout_id: checkoutId,
          user_id: user.id,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "Failed to create Razorpay order", details: text },
        { status: 502 }
      );
    }

    const order = (await response.json()) as RazorpayOrder;

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      receipt: order.receipt,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

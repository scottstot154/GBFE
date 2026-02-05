// src/app/checkout/actions.ts
"use server";

import { sendOrderConfirmationEmail } from "@/lib/email/sendOrderConfirmation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function createCheckout(address_id: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: checkoutId, error } = await supabase.rpc("create_checkout", {
    p_address_id: address_id,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!checkoutId) {
    throw new Error("Checkout creation failed");
  }

  // ✅ checkoutId is already a UUID string
  return checkoutId;
}

export async function finalizeCheckout(checkoutId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: orderId, error } = await supabase.rpc("finalize_checkout", {
    p_checkout_id: checkoutId,
  });

  if (error) throw new Error(error.message);

  const { data: order } = await supabase
    .from("orders")
    .select("id, total_amount, shipping_address")
    .eq("id", orderId)
    .single();

  const { data: items } = await supabase
    .from("checkouts")
    .select("items")
    .eq("id", checkoutId);

  // Fetch user email
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userEmail = user?.email;
  if (!userEmail) {
    console.warn("User email not found, skipping order confirmation email");
    return;
  }
  try {
    await sendOrderConfirmationEmail({
      to: userEmail,
      orderId: orderId,
      totalAmount: order?.total_amount,
      address: order?.shipping_address,
      items:
        items && items.length > 0 && Array.isArray(items[0].items)
          ? items[0].items
          : [],
    });
  } catch (err) {
    console.error("Order email failed", err);
    // ❗ Do NOT fail checkout because email failed
  }

  return orderId; // order_id
}

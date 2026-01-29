// src/app/checkout/actions.ts
"use server";

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

  const { data, error } = await supabase.rpc("finalize_checkout", {
    p_checkout_id: checkoutId,
  });

  if (error) throw new Error(error.message);

  return data; // order_id
}

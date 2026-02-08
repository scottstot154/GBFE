"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

export async function updateDeliveryStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const orderId = String(formData.get("order_id") ?? "");
  const deliveryStatus = String(formData.get("delivery_status") ?? "");

  if (!orderId || !deliveryStatus) {
    throw new Error("order_id and delivery_status are required");
  }

  const { error } = await supabase
    .from("orders")
    .update({ delivery_status: deliveryStatus })
    .eq("id", orderId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/orders");
  revalidatePath(`/orders/${orderId}`);
}

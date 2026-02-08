"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

export async function addSizeItem(formData: FormData) {
  const { supabase } = await requireAdmin();

  const collectionId = String(formData.get("collection_id") ?? "");
  const sizeLabel = String(formData.get("size") ?? "").trim();
  const status = String(formData.get("status") ?? "available").trim();

  if (!collectionId || !sizeLabel) {
    throw new Error("collection_id and size are required");
  }

  const { error } = await supabase.from("items").insert({
    collection_id: collectionId,
    size: sizeLabel,
    status,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/items");
  revalidatePath(`/collection/${collectionId}`);
}

export async function removeSizeItem(formData: FormData) {
  const { supabase } = await requireAdmin();

  const itemId = String(formData.get("item_id") ?? "").trim();

  if (!itemId) {
    throw new Error("item_id is required");
  }

  const { data: existing, error: fetchError } = await supabase
    .from("items")
    .select("collection_id")
    .eq("item_id", itemId)
    .single();

  if (fetchError || !existing) throw new Error("Item not found");

  const { error } = await supabase.from("items").delete().eq("item_id", itemId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/items");
  revalidatePath(`/collection/${existing.collection_id}`);
}

export async function updateSizeItemStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const itemId = String(formData.get("item_id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!itemId || !status) {
    throw new Error("item_id and status are required");
  }

  const { data: existing, error: fetchError } = await supabase
    .from("items")
    .select("collection_id")
    .eq("item_id", itemId)
    .single();

  if (fetchError || !existing) throw new Error("Item not found");

  const { error } = await supabase
    .from("items")
    .update({ status })
    .eq("item_id", itemId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/items");
  revalidatePath(`/collection/${existing.collection_id}`);
}

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

  const { data: collection, error } = await supabase
    .from("collections")
    .select("sizes")
    .eq("collection_id", collectionId)
    .single();

  if (error || !collection) throw new Error("Collection not found");

  const sizes = (collection.sizes ?? {}) as Record<
    string,
    Array<{ status: string; item_id: string }>
  >;

  const itemId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const next = { ...sizes };
  const items = Array.isArray(next[sizeLabel]) ? next[sizeLabel] : [];
  items.push({ status, item_id: itemId });
  next[sizeLabel] = items;

  const { error: updateError } = await supabase
    .from("collections")
    .update({ sizes: next })
    .eq("collection_id", collectionId);

  if (updateError) throw new Error(updateError.message);

  revalidatePath("/admin/items");
  revalidatePath(`/collection/${collectionId}`);
}

export async function removeSizeItem(formData: FormData) {
  const { supabase } = await requireAdmin();

  const collectionId = String(formData.get("collection_id") ?? "");
  const sizeLabel = String(formData.get("size") ?? "").trim();
  const itemId = String(formData.get("item_id") ?? "").trim();

  if (!collectionId || !sizeLabel || !itemId) {
    throw new Error("collection_id, size, and item_id are required");
  }

  const { data: collection, error } = await supabase
    .from("collections")
    .select("sizes")
    .eq("collection_id", collectionId)
    .single();

  if (error || !collection) throw new Error("Collection not found");

  const sizes = (collection.sizes ?? {}) as Record<
    string,
    Array<{ status: string; item_id: string }>
  >;

  const next = { ...sizes };
  const items = Array.isArray(next[sizeLabel]) ? next[sizeLabel] : [];
  next[sizeLabel] = items.filter((i) => i.item_id !== itemId);

  const { error: updateError } = await supabase
    .from("collections")
    .update({ sizes: next })
    .eq("collection_id", collectionId);

  if (updateError) throw new Error(updateError.message);

  revalidatePath("/admin/items");
  revalidatePath(`/collection/${collectionId}`);
}

export async function updateSizeItemStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const collectionId = String(formData.get("collection_id") ?? "");
  const sizeLabel = String(formData.get("size") ?? "").trim();
  const itemId = String(formData.get("item_id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!collectionId || !sizeLabel || !itemId || !status) {
    throw new Error("collection_id, size, item_id, and status are required");
  }

  const { data: collection, error } = await supabase
    .from("collections")
    .select("sizes")
    .eq("collection_id", collectionId)
    .single();

  if (error || !collection) throw new Error("Collection not found");

  const sizes = (collection.sizes ?? {}) as Record<
    string,
    Array<{ status: string; item_id: string }>
  >;

  const next = { ...sizes };
  const items = Array.isArray(next[sizeLabel]) ? next[sizeLabel] : [];
  next[sizeLabel] = items.map((i) =>
    i.item_id === itemId ? { ...i, status } : i
  );

  const { error: updateError } = await supabase
    .from("collections")
    .update({ sizes: next })
    .eq("collection_id", collectionId);

  if (updateError) throw new Error(updateError.message);

  revalidatePath("/admin/items");
  revalidatePath(`/collection/${collectionId}`);
}

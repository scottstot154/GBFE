"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

export async function createCollection(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const cost = Number(formData.get("cost") ?? 0);
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const images = String(formData.get("images") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const sizesRaw = String(formData.get("sizes") ?? "").trim();

  let sizes: unknown = null;
  if (sizesRaw) {
    try {
      sizes = JSON.parse(sizesRaw);
    } catch {
      throw new Error("Sizes must be valid JSON");
    }
  }

  if (!name || !cost) {
    throw new Error("Name and cost are required");
  }

  const { error } = await supabase.from("collections").insert({
    name,
    cost,
    description,
    image,
    images: images.length ? images : null,
    tags: tags.length ? tags : null,
    sizes,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/collections");
  revalidatePath("/collection");
}

export async function updateCollection(formData: FormData) {
  const { supabase } = await requireAdmin();

  const collection_id = String(formData.get("collection_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const cost = Number(formData.get("cost") ?? 0);
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const images = String(formData.get("images") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const sizesRaw = String(formData.get("sizes") ?? "").trim();

  let sizes: unknown = null;
  if (sizesRaw) {
    try {
      sizes = JSON.parse(sizesRaw);
    } catch {
      throw new Error("Sizes must be valid JSON");
    }
  }

  if (!collection_id) throw new Error("collection_id is required");

  const { error } = await supabase
    .from("collections")
    .update({
      name,
      cost,
      description,
      image,
      images: images.length ? images : null,
      tags: tags.length ? tags : null,
      sizes,
    })
    .eq("collection_id", collection_id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/collections");
  revalidatePath(`/collection/${collection_id}`);
}

export async function deleteCollection(formData: FormData) {
  const { supabase } = await requireAdmin();

  const collection_id = String(formData.get("collection_id") ?? "");
  if (!collection_id) throw new Error("collection_id is required");

  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("collection_id", collection_id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/collections");
  revalidatePath("/collection");
}

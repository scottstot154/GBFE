import Image from "next/image";
import { requireAdmin } from "@/lib/admin";
import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "./actions";

export default async function AdminCollectionsPage() {
  const { supabase } = await requireAdmin();

  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Collections</h1>

      {/* CREATE */}
      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-medium">Add Collection</h2>
        <form action={createCollection} className="grid gap-4 md:grid-cols-2">
          <input name="name" placeholder="Name" className="input" required />
          <input
            name="cost"
            type="number"
            placeholder="Cost (INR)"
            className="input"
            required
          />
          <input name="image" placeholder="Main image URL" className="input" />
          <input
            name="images"
            placeholder="Images (comma-separated URLs)"
            className="input"
          />
          <input
            name="tags"
            placeholder="Tags (comma-separated)"
            className="input"
          />
          <textarea
            name="description"
            placeholder="Description"
            className="input min-h-[100px] md:col-span-2"
          />
          <textarea
            name="sizes"
            placeholder='Sizes JSON (optional). Example: {"S":[{"status":"available","item_id":"..."}]}'
            className="input min-h-[120px] md:col-span-2"
          />
          <div className="md:col-span-2">
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
              Create
            </button>
          </div>
        </form>
      </section>

      {/* LIST */}
      <section className="space-y-4">
        {collections?.map((c) => (
          <div key={c.collection_id} className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-12 overflow-hidden rounded-md bg-muted">
                <Image
                  src={c.image ?? "/dress-placeholder.png"}
                  alt={c.name ?? "Collection"}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-foreground/60">Collection</p>
                <p className="font-medium">{c.name}</p>
              </div>
            </div>
            <form action={updateCollection} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="collection_id" value={c.collection_id} />
              <input name="name" defaultValue={c.name ?? ""} className="input" />
              <input
                name="cost"
                type="number"
                defaultValue={c.cost ?? 0}
                className="input"
              />
              <input
                name="image"
                defaultValue={c.image ?? ""}
                placeholder="Main image URL"
                className="input"
              />
              <input
                name="images"
                defaultValue={(c.images ?? []).join(", ")}
                placeholder="Images (comma-separated URLs)"
                className="input"
              />
              <input
                name="tags"
                defaultValue={(c.tags ?? []).join(", ")}
                placeholder="Tags (comma-separated)"
                className="input"
              />
              <textarea
                name="description"
                defaultValue={c.description ?? ""}
                className="input min-h-[100px] md:col-span-2"
              />
              <textarea
                name="sizes"
                defaultValue={c.sizes ? JSON.stringify(c.sizes) : ""}
                className="input min-h-[120px] md:col-span-2"
              />

              <div className="md:col-span-2">
                <button className="px-4 py-2 rounded-lg bg-foreground text-background text-sm">
                  Update
                </button>
              </div>
            </form>

            <form action={deleteCollection}>
              <input
                type="hidden"
                name="collection_id"
                value={c.collection_id}
              />
              <button className="px-4 py-2 rounded-lg border text-sm text-red-600">
                Delete
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}

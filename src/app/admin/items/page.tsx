import Image from "next/image";
import { requireAdmin } from "@/lib/admin";
import { addSizeItem, removeSizeItem, updateSizeItemStatus } from "./actions";

const statusOptions = ["available", "sold_out"];

export default async function AdminItemsPage() {
  const { supabase } = await requireAdmin();

  const { data: collections } = await supabase
    .from("collections")
    .select("collection_id, name, image")
    .order("created_at", { ascending: false });

  const { data: items } = await supabase
    .from("items")
    .select("item_id, collection_id, size, status")
    .order("created_at", { ascending: false });

  const itemsByCollection = new Map<
    string,
    Record<string, Array<{ item_id: string; status: string }>>
  >();

  (items ?? []).forEach((item) => {
    if (!item.collection_id || !item.size) return;
    if (!itemsByCollection.has(item.collection_id)) {
      itemsByCollection.set(item.collection_id, {});
    }
    const sizes = itemsByCollection.get(item.collection_id)!;
    if (!sizes[item.size]) sizes[item.size] = [];
    sizes[item.size].push({ item_id: item.item_id, status: item.status });
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Items</h1>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-lg font-medium">Add Size Item</h2>
        <form action={addSizeItem} className="grid gap-4 md:grid-cols-4">
          <select
            name="collection_id"
            className="input md:col-span-2 text-foreground bg-background"
            required
          >
            <option value="">Select collection</option>
            {collections?.map((c) => (
              <option key={c.collection_id} value={c.collection_id}>
                {c.name}
              </option>
            ))}
          </select>
          <input name="size" placeholder="Size (e.g. S, M)" className="input" required />
          <select name="status" className="input text-foreground bg-background">
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="md:col-span-4">
            <button className="px-4 py-2 rounded-lg bg-foreground text-background text-sm">
              Add
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        {collections?.map((c) => {
          const sizes =
            itemsByCollection.get(c.collection_id) ?? ({} as Record<
              string,
              Array<{ status: string; item_id: string }>
            >);

          return (
            <div key={c.collection_id} className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
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
                    <h3 className="text-lg font-medium">{c.name}</h3>
                    <span className="text-xs text-foreground/60">
                      {c.collection_id}
                    </span>
                  </div>
                </div>
              </div>

              {Object.keys(sizes).length === 0 && (
                <p className="text-sm text-foreground/60">No sizes yet.</p>
              )}

              <div className="space-y-3">
                {Object.entries(sizes).map(([sizeLabel, items]) => (
                  <div key={sizeLabel} className="space-y-2">
                    <p className="text-sm font-medium">Size {sizeLabel}</p>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.item_id}
                          className="flex flex-wrap items-center gap-3 rounded-lg border px-3 py-2"
                        >
                          <span className="text-xs text-foreground/60">
                            {item.item_id}
                          </span>

                          <form action={updateSizeItemStatus} className="flex items-center gap-2">
                            <input type="hidden" name="item_id" value={item.item_id} />
                            <select
                              name="status"
                              defaultValue={item.status}
                              className="input h-8 text-xs text-foreground bg-background"
                            >
                              {statusOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <button className="px-3 py-1 rounded-lg border text-xs">
                              Update
                            </button>
                          </form>

                          <form action={removeSizeItem}>
                            <input type="hidden" name="item_id" value={item.item_id} />
                            <button className="px-3 py-1 rounded-lg border text-xs text-red-600">
                              Remove
                            </button>
                          </form>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

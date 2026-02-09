import { createSupabaseServerClient } from "@/lib/supabaseServer";
import CollectionGrid from "./CollectionGrid";

export const metadata = {
  title: "Collections",
  description: "Explore all our handcrafted collections at Gauri Boutique.",
  alternates: {
    canonical: "/collection",
  },
};

export default async function CollectionsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-foreground/60">
        Failed to load collections.
      </div>
    );
  }

  if (!collections || collections.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-foreground/60">
        No collections available right now.
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="heading-page">All Collections</h1>
        <p className="text-body max-w-2xl">
          Discover our full range of handcrafted, thoughtfully designed pieces.
        </p>
      </header>

      {/* Grid */}
      <CollectionGrid collections={collections} />
    </main>
  );
}

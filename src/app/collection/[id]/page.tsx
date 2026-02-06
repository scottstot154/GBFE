import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Gallery from "./Gallery";
import InfoPanel from "./InfoPanel";
import { supabase } from "@/lib/supabaseClient";
import MoreLikeThisCarousel from "../MoreLikeThisCarousel";

export default async function DressPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const supabaseServer = await createSupabaseServerClient();

  const { data: dress } = await supabaseServer
    .from("collections")
    .select("*")
    .eq("collection_id", id)
    .maybeSingle();

  if (!dress) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-foreground/60">
        Dress not found.
      </div>
    );
  }
  const { data } = await supabase.auth.getSession();
  console.log(data.session); // NOT null

  const images: string[] = dress.images?.length
    ? dress.images
    : dress.image
    ? [dress.image]
    : ["/dress-placeholder.png"];

  const { data: moreLikeThis } = await supabaseServer
    .from("collections")
    .select("*")
    .neq("collection_id", id)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 pb-28 md:pb-16">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          {/* IMAGE */}
          <Gallery images={images} name={dress.name} />

          {/* INFO */}
          <InfoPanel dress={dress} />
        </div>
      </main>

      {moreLikeThis && moreLikeThis.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-20 md:pb-28 space-y-6">
          <h2 className="text-2xl font-medium">More like this</h2>
          <MoreLikeThisCarousel collections={moreLikeThis} />
        </section>
      )}
    </>
  );
}

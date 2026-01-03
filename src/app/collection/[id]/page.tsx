import { supabaseServer } from "@/lib/supabaseServer";
import Gallery from "./Gallery";
import InfoPanel from "./InfoPanel";

export default async function DressPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

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

  const images: string[] = dress.images?.length
    ? dress.images
    : dress.image
    ? [dress.image]
    : ["/dress-placeholder.png"];

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
    </>
  );
}

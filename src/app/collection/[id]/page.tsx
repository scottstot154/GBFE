import { supabaseServer } from "@/lib/supabaseServer";
import Gallery from "./Gallery";
import GButton from "@/components/GButton";
import { redirect } from "next/navigation";

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
    .single();

  if (!dress) {
    return <div className="p-6">Dress not found.</div>;
  }

  const images: string[] = dress.images?.length
    ? dress.images
    : dress.image
    ? [dress.image]
    : ["/dress-placeholder.png"];

  async function buyAction() {
    "use server";
    redirect(`/login?redirect=/dress/${id}`);
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE GALLERY */}
          <Gallery images={images} name={dress.name} />

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">
              {dress.name}
            </h1>

            <p className="text-foreground/70">
              {dress.description || "Beautiful handcrafted dress."}
            </p>

            <div className="text-2xl font-bold text-foreground">
              ₹{dress.cost.toFixed(0)}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block pt-4">
              <form action={buyAction}>
                <GButton size="lg">Buy Now</GButton>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-[color:var(--border)] px-4 py-3 flex items-center justify-between z-40">
        <span className="font-semibold text-foreground">
          ₹{dress.cost.toFixed(0)}
        </span>
        <form action={buyAction}>
          <GButton size="md">Buy Now</GButton>
        </form>
      </div>
    </>
  );
}

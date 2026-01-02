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

  async function buyAction() {
    "use server";
    redirect(`/login?redirect=/dress/${id}`);
  }

  return (
    <>
      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 pb-28 md:pb-16">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          {/* IMAGE */}
          <Gallery images={images} name={dress.name} />

          {/* INFO */}
          <div className="flex flex-col gap-10">
            {/* TITLE + PRICE */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
                {dress.name}
              </h1>

              <div className="text-xl font-medium">
                ₹{dress.cost.toFixed(0)}
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="max-w-prose text-sm md:text-base leading-relaxed text-foreground/70">
              {dress.description || "Beautiful handcrafted dress."}
            </p>

            {/* CTA */}
            <div className="pt-4">
              <form action={buyAction}>
                <GButton size="lg" className="rounded-full px-12 font-medium">
                  Buy
                </GButton>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-background/90 backdrop-blur-sm border-t px-4 py-3 flex items-center justify-between z-40">
        <span className="text-base font-medium">₹{dress.cost.toFixed(0)}</span>
        <form action={buyAction}>
          <GButton size="md" className="rounded-full px-8">
            Buy
          </GButton>
        </form>
      </div>
    </>
  );
}

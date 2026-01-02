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
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">
          {/* IMAGE GALLERY */}
          <Gallery images={images} name={dress.name} />

          {/* INFO */}
          <div className="flex flex-col">
            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {dress.name}
            </h1>

            {/* PRICE */}
            <div className="mt-3 text-2xl font-semibold text-foreground">
              ₹{dress.cost.toFixed(0)}
              <p className="mt-1 text-xs text-foreground/50">
                Inclusive of all taxes
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm md:text-base text-foreground/70 leading-relaxed">
              {dress.description || "Beautiful handcrafted dress."}
            </p>

            {/* DETAILS (SUBTLE VALUE ADD) */}
            <ul className="mt-6 space-y-2 text-sm text-foreground/60">
              <li>• Handcrafted design</li>
              <li>• Ethically sourced materials</li>
              <li>• Limited production run</li>
            </ul>

            {/* CTA DIVIDER */}
            <div className="mt-8 pt-6 border-t border-[color:var(--border)] hidden md:block">
              <form action={buyAction}>
                <GButton size="lg" className="rounded-xl px-10">
                  Buy Now
                </GButton>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card/95 backdrop-blur border-t border-[color:var(--border)] px-4 py-3 flex items-center justify-between z-40">
        <span className="text-base font-semibold text-foreground">
          ₹{dress.cost.toFixed(0)}
        </span>
        <form action={buyAction}>
          <GButton size="md" className="rounded-lg">
            Buy Now
          </GButton>
        </form>
      </div>
    </>
  );
}

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Metadata } from "next";
import Gallery from "./Gallery";
import InfoPanel from "./InfoPanel";
import { supabase } from "@/lib/supabaseClient";
import MoreLikeThisCarousel from "../MoreLikeThisCarousel";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const supabaseServer = await createSupabaseServerClient();

  const { data: dress } = await supabaseServer
    .from("collections")
    .select("collection_id, name, description, image, images")
    .eq("collection_id", id)
    .maybeSingle();

  if (!dress) {
    return {
      title: "Collection not found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    dress.description?.slice(0, 160) ??
    `Shop ${dress.name} at Gauri Boutique. Handcrafted designs inspired by Indian craftsmanship.`;

  const images: string[] = dress.images?.length
    ? dress.images
    : dress.image
      ? [dress.image]
      : [];

  return {
    title: dress.name,
    description,
    alternates: {
      canonical: `/collection/${dress.collection_id}`,
    },
    openGraph: {
      type: "website",
      title: dress.name,
      description,
      url: `/collection/${dress.collection_id}`,
      images: images.length ? images.map((url) => ({ url })) : undefined,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: dress.name,
      description,
      images: images.length ? images : undefined,
    },
  };
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: dress.name,
            description: dress.description ?? "",
            image: images,
            brand: {
              "@type": "Brand",
              name: "Gauri Boutique",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: dress.cost,
              availability: "https://schema.org/InStock",
              url: `https://gauriboutique.in/collection/${dress.collection_id}`,
            },
          }),
        }}
      />
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 pb-28 md:pb-16">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          {/* IMAGE */}
          <div className="min-w-0">
            <Gallery images={images} name={dress.name} />
          </div>

          {/* INFO */}
          <div className="min-w-0">
            <InfoPanel dress={dress} />
          </div>
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

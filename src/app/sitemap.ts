import type { MetadataRoute } from "next";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const SITE_URL = "https://gauriboutique.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/collection`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/shipping-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/grievance-redressal`, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const supabase = await createSupabaseServerClient();
    const { data: collections } = await supabase
      .from("collections")
      .select("collection_id, created_at");

    const collectionRoutes: MetadataRoute.Sitemap =
      (collections ?? []).map((c) => ({
        url: `${SITE_URL}/collection/${c.collection_id}`,
        lastModified: c.created_at ? new Date(c.created_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })) ?? [];

    return [...staticRoutes, ...collectionRoutes];
  } catch {
    return staticRoutes;
  }
}

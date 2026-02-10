import { createSupabaseServerClient } from "@/lib/supabaseServer";
import HomeClient from "./home/HomeClient";
import { HOME_BANNER_DEFAULT, HOME_ABOUT_DEFAULT } from "@/config/homeDefaults";
import { getCmsPageServer } from "@/lib/cmsServer";

export const metadata = {
  title: "Gauri Boutique - Home",
  description: "Handcrafted, ethically sourced dresses",
};

export default async function HomePage() {
  const supabaseServer = await createSupabaseServerClient();

  // 🔹 Fetch collections (core commerce data)
  const { data: collections, error } = await supabaseServer
    .from("collections")
    .select("*")
    .contains("tags", ["featured"])
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-foreground/60">
        Failed to load collections.
      </div>
    );
  }

  // 🔹 Fetch CMS content (non-critical)
  const banner = await getCmsPageServer("home-banner", HOME_BANNER_DEFAULT);

  const about = await getCmsPageServer("home-about", HOME_ABOUT_DEFAULT);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-14">
      <HomeClient
        collections={collections ?? []}
        banner={banner}
        about={about}
      />
    </main>
  );
}

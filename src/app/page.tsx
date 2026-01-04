import { createSupabaseServerClient } from "@/lib/supabaseServer";
import HomeClient from "./home/HomeClient";

export const metadata = {
  title: "Boutique - Home",
  description: "Handcrafted, ethically sourced dresses",
};

export default async function HomePage() {
  const supabaseServer = await createSupabaseServerClient();
  const { data: collections, error } = await supabaseServer
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6">Failed to load collections.</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-14">
      <HomeClient collections={collections ?? []} />
    </main>
  );
}

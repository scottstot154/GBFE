import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DressCard from "@/components/DressCard";
import type { Dress } from "@/components/DressCard";
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";

export default function Home() {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase.from("collections").select("*");

      if (error) {
        console.error("fetch dresses error:", error);
      } else if (mounted && data) {
        setDresses(data as Dress[]);
      }
      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Boutique - Home</title>
      </Head>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Banner
          title="Summer Collection — Light & Breezy"
          subtitle="Handpicked pieces for the sunny season. Limited stocks available."
          imageUrl="/images/banner-summer.jpg"
        />

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Collection</h2>
            <p className="text-sm text-gray-500">
              Handmade · Ethically sourced
            </p>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dresses.map((d) => (
                <DressCard key={d.collection_id} dress={d} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

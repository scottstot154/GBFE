import Head from "next/head";
import DressCard from "@/components/DressCard";
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import { useCollections } from "@/hooks/useCollections";

export default function Home() {
  const { collections, isLoading: isCollectionsLoading } = useCollections();

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
          {isCollectionsLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collections.map((d) => (
                <DressCard key={d.collection_id} dress={d} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

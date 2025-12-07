import Head from "next/head";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import DressCard, { Dress } from "../components/DressCard";

const dresses: Dress[] = [
  {
    id: "1",
    name: "Summer Chikankari Dress",
    price: 2499,
    image: "/images/dress1.jpg",
  },
  {
    id: "2",
    name: "Embroidered Anarkali",
    price: 3999,
    image: "/images/dress2.jpg",
  },
  {
    id: "3",
    name: "Silk Party Dress",
    price: 5599,
    image: "/images/dress3.jpg",
  },
  {
    id: "4",
    name: "Casual Cotton Kurti",
    price: 1299,
    image: "/images/dress4.jpg",
  },
];

export default function Home() {
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

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dresses.map((d) => (
              <DressCard key={d.id} dress={d} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

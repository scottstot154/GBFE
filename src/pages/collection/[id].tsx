// pages/dress/[id].tsx
import { useRouter } from "next/router";
import { useGetCollectionQuery } from "@/store/api";
import NavBar from "@/components/NavBar";
import GButton from "@/components/GButton";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function CollectionDetails() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: dress,
    isLoading,
    isError,
  } = useGetCollectionQuery(id as string, {
    skip: !id,
  });

  // const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;

    if (!token) {
      router.push(`/login?redirect=/dress/${id}`);
      return;
    }

    // try {
    //   const res = await createOrder({
    //     dressId: id as string,
    //     quantity: 1,
    //     token,
    //   }).unwrap();

    //   router.push(`/orders/${res.data.id}`);
    // } catch (err) {
    //   console.error(err);
    //   alert("Order failed");
    // } finally {
    //   setLoading(false);
    // }
  }

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !dress) return <div className="p-6">Dress not found.</div>;

  return (
    <>
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative w-full h-96 bg-[color:var(--card)] rounded-lg shadow-sm overflow-hidden">
            <Image
              src={dress.image || "/dress-placeholder.png"}
              alt={dress.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">
              {dress.name}
            </h1>

            <p className="text-foreground/70 leading-relaxed">
              {dress.description || "Beautiful handcrafted dress."}
            </p>

            <div className="text-2xl font-bold text-foreground">
              ₹{dress.cost.toFixed(0)}
            </div>

            <div className="pt-4">
              <GButton
                variant="primary"
                size="lg"
                disabled={loading}
                onClick={handleBuy}
              >
                {loading ? "Processing..." : "Buy Now"}
              </GButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

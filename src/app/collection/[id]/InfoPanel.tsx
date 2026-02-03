"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GButton from "@/components/GButton";
import SizeSelector, { SelectedSizeType } from "./SizeSelector";
import { Dress } from "@/types";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { supabase } from "@/lib/supabaseClient";
import Snackbar from "@/components/Snackbar";
import { formatPrice } from "@/lib/formatPrice";
import SizeGuideModal from "@/components/SizeGuideModal";
import { SIZE_GUIDE } from "@/config/sizeGuide";

function isCollectionSoldOut(sizes: Dress["sizes"]) {
  const safeSizes = sizes ?? {};
  return !Object.values(safeSizes).some((items) =>
    items.some((item) => item.status === "available")
  );
}

export default function InfoPanel({ dress }: { dress: Dress }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<SelectedSizeType | null>(
    null
  );
  const [showGuide, setShowGuide] = useState(false);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleAddToCart() {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/dress/${dress.collection_id}`);
      return;
    }

    if (!selectedSize) return;

    try {
      await addToCart({
        item_id: selectedSize.item_id,
      }).unwrap();
      console.log(selectedSize);

      router.push("/cart");
    } catch (err) {
      if (err?.data?.code === "23505") {
        setSnackbar("Item already in cart");
        return;
      }

      setSnackbar("Something went wrong. Please try again.");
    }
  }

  const soldOut = isCollectionSoldOut(dress.sizes);
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-medium">{dress.name}</h1>
        <p className="text-lg text-foreground/70">{formatPrice(dress.cost)}</p>
      </div>

      {/* Description */}
      {dress.description && (
        <p className="text-base leading-relaxed text-foreground/70">
          {dress.description}
        </p>
      )}

      {/* Size */}
      {dress.sizes && (
        <SizeSelector
          sizes={dress.sizes}
          value={selectedSize}
          onChange={setSelectedSize}
        />
      )}

      <button
        type="button"
        onClick={() => setShowGuide(true)}
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Need help choosing a size?
      </button>

      <SizeGuideModal
        open={showGuide}
        onClose={() => setShowGuide(false)}
        sizes={SIZE_GUIDE}
      />

      {/* CTA */}
      <GButton
        size="lg"
        disabled={!selectedSize || soldOut || isLoading}
        className="w-full rounded-full"
        onClick={handleAddToCart}
      >
        Add to Cart
      </GButton>

      {!isLoggedIn && (
        <p className="text-sm text-foreground/60">
          Please log in to add items to your cart.
        </p>
      )}

      {snackbar && (
        <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />
      )}
    </div>
  );
}

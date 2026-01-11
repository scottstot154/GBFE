import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import AddressCard from "./AddressCard";
import BackButton from "@/components/navigation/BackButton";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default async function AddressesPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/account/addresses");
  }

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false });

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      {/* NAV */}
      <div className="space-y-2">
        <BackButton fallback="/" />
        <Breadcrumbs
          items={[{ label: "Account", href: "/" }, { label: "Addresses" }]}
        />
      </div>

      <h1 className="text-2xl font-medium">My Addresses</h1>

      {addresses?.length === 0 ? (
        <p className="text-foreground/60">No addresses added yet.</p>
      ) : (
        <div className="grid gap-4">
          {addresses?.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}
    </main>
  );
}

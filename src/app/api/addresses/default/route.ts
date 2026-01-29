import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { id } = await req.json();

  const { data: user } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({}, { status: 401 });
  // Clear existing default
  await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", user.user.id);

  // Set new default
  await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", id)
    .eq("user_id", user.user.id);

  return NextResponse.json({ success: true });
}

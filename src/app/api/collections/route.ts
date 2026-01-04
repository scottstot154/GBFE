import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
const supabaseServer = await createSupabaseServerClient();
export async function GET() {
  const { data, error } = await supabaseServer
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

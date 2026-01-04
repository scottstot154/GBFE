import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * POST /api/cart/items
 * Add item to cart
 */
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { item_id } = await req.json();

  if (!item_id) {
    return NextResponse.json({ error: "item_id required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      user_id: user.id,
      item_id,
      quantity: 1,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code, // 👈 IMPORTANT
      },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}

/**
 * DELETE /api/cart/items
 * Remove item from cart
 */
export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cart_item_id } = await req.json();

  if (!cart_item_id) {
    return NextResponse.json(
      { error: "cart_item_id required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cart_item_id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

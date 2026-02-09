import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/supabase/verify-admin";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const { isAdmin } = await verifyAdmin(req);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { data: purchases, error } = await supabase
      .from("purchases")
      .select(
        "id, user_id, plan, amount, currency, stripe_session_id, stripe_email, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(purchases || []);
  } catch (error) {
    console.error("Admin purchases error:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

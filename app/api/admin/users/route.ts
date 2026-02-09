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

    const { data: users, error } = await supabase
      .from("profiles")
      .select(
        "id, email, plan, is_admin, applications_remaining, applications_used, improve_experience_used, free_trial_used, purchased_at, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Admin users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

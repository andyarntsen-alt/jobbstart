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

    // Get total users count
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("plan", { count: "exact" });

    if (profilesError) {
      console.error("[ADMIN] Profiles query failed:", profilesError);
      throw profilesError;
    }

    const totalUsers = profiles?.length ?? 0;

    // Calculate plan breakdown
    const planBreakdown: Record<string, number> = {
      free: 0,
      enkel: 0,
      standard: 0,
      max: 0,
    };

    if (profiles) {
      profiles.forEach((profile: any) => {
        const plan = profile.plan || "free";
        if (plan in planBreakdown) {
          planBreakdown[plan]++;
        }
      });
    }

    // Get total purchases count and revenue
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("amount");

    if (purchasesError) {
      console.error("[ADMIN] Purchases query failed:", purchasesError);
      throw purchasesError;
    }

    const totalPurchases = purchases?.length ?? 0;
    const totalRevenue = purchases?.reduce((sum, p: any) => sum + (p.amount || 0), 0) ?? 0;

    // Get recent 10 purchases
    const { data: recentPurchases, error: recentError } = await supabase
      .from("purchases")
      .select("id, user_id, plan, amount, currency, stripe_session_id, stripe_email, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    if (recentError) {
      console.error("[ADMIN] Recent purchases query failed:", recentError);
      throw recentError;
    }

    return NextResponse.json({
      totalUsers,
      planBreakdown,
      totalPurchases,
      totalRevenue,
      recentPurchases: recentPurchases ?? [],
    });
  } catch (error) {
    console.error("[ADMIN] Stats error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch admin stats: ${message}` },
      { status: 500 }
    );
  }
}

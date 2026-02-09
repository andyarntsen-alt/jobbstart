import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/supabase/verify-admin";
import { getSupabaseServer } from "@/lib/supabase/server";

const VALID_PLANS = ["free", "enkel", "standard", "max"] as const;
type ValidPlan = (typeof VALID_PLANS)[number];

function isValidPlan(plan: string): plan is ValidPlan {
  return VALID_PLANS.includes(plan as ValidPlan);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: userId } = await params;

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get user purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (purchasesError) {
      throw purchasesError;
    }

    // Get user applications
    const { data: applications, error: applicationsError } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (applicationsError) {
      throw applicationsError;
    }

    return NextResponse.json({
      profile,
      purchases: purchases || [],
      applications: applications || [],
    });
  } catch (error) {
    console.error("Admin user detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: userId } = await params;
    const body = await req.json();

    // Validate and build update object
    const updateData: any = {};

    if (body.plan !== undefined) {
      if (!isValidPlan(body.plan)) {
        return NextResponse.json(
          { error: 'Invalid plan. Must be one of: "free", "enkel", "standard", "max"' },
          { status: 400 }
        );
      }
      updateData.plan = body.plan;
    }

    if (body.applications_remaining !== undefined) {
      if (typeof body.applications_remaining !== "number") {
        return NextResponse.json(
          { error: "applications_remaining must be a number" },
          { status: 400 }
        );
      }
      updateData.applications_remaining = body.applications_remaining;
    }

    if (body.applications_used !== undefined) {
      if (typeof body.applications_used !== "number") {
        return NextResponse.json(
          { error: "applications_used must be a number" },
          { status: 400 }
        );
      }
      updateData.applications_used = body.applications_used;
    }

    if (body.improve_experience_used !== undefined) {
      if (typeof body.improve_experience_used !== "number") {
        return NextResponse.json(
          { error: "improve_experience_used must be a number" },
          { status: 400 }
        );
      }
      updateData.improve_experience_used = body.improve_experience_used;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Admin user update error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

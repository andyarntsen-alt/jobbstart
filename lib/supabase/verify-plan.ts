import { getSupabaseServer } from "./server";
import type { PlanId } from "@/lib/plans";

/**
 * Server-side plan verification.
 * Extracts the Bearer token from the Authorization header,
 * verifies it against Supabase, and looks up the user's plan
 * from the profiles table. Returns "free" for anonymous users.
 */
export async function verifyPlan(
  authHeader: string | null
): Promise<{ planId: PlanId; userId: string | null }> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { planId: "free", userId: null };
  }

  const token = authHeader.slice(7);
  const supabase = getSupabaseServer();
  if (!supabase) {
    return { planId: "free", userId: null };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return { planId: "free", userId: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, is_admin")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { planId: "free", userId: user.id };
  }

  if (profile.is_admin) {
    return { planId: "max", userId: user.id };
  }

  const validPlans: PlanId[] = ["free", "enkel", "standard", "max"];
  const plan = validPlans.includes(profile.plan) ? profile.plan : "free";

  return { planId: plan, userId: user.id };
}

import { getSupabaseServer } from "./server";
import { PLANS } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

interface CreditResult {
  success: boolean;
  remaining: number;
}

/**
 * Server-side: check and consume 1 application credit.
 * Reads profile, verifies credits > 0, decrements atomically.
 */
export async function consumeApplicationCreditServer(
  userId: string
): Promise<CreditResult> {
  const supabase = getSupabaseServer();
  if (!supabase) return { success: false, remaining: 0 };

  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("applications_remaining, applications_used")
    .eq("id", userId)
    .single();

  if (fetchError || !profile) {
    return { success: false, remaining: 0 };
  }

  if (profile.applications_remaining <= 0) {
    return { success: false, remaining: 0 };
  }

  const newRemaining = profile.applications_remaining - 1;
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      applications_remaining: newRemaining,
      applications_used: profile.applications_used + 1,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("[CREDIT] Application credit update failed:", updateError);
    return { success: false, remaining: profile.applications_remaining };
  }

  return { success: true, remaining: newRemaining };
}

/**
 * Server-side: check and consume 1 improve-experience credit.
 * Only applies to plans with a finite limit (e.g. standard: 10).
 * Plans with unlimited (-1) should skip this check.
 */
export async function consumeImproveCreditServer(
  userId: string,
  planId: PlanId
): Promise<CreditResult> {
  const planDef = PLANS[planId];
  if (!planDef) return { success: false, remaining: 0 };

  // Unlimited improve access
  if (planDef.aiImproveExperience === -1) {
    return { success: true, remaining: -1 };
  }

  // No improve access
  if (planDef.aiImproveExperience === 0) {
    return { success: false, remaining: 0 };
  }

  const supabase = getSupabaseServer();
  if (!supabase) return { success: false, remaining: 0 };

  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("improve_experience_used")
    .eq("id", userId)
    .single();

  if (fetchError || !profile) {
    return { success: false, remaining: 0 };
  }

  const limit = planDef.aiImproveExperience;
  const used = profile.improve_experience_used;

  if (used >= limit) {
    return { success: false, remaining: 0 };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      improve_experience_used: used + 1,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("[CREDIT] Improve credit update failed:", updateError);
    return { success: false, remaining: limit - used };
  }

  return { success: true, remaining: limit - used - 1 };
}

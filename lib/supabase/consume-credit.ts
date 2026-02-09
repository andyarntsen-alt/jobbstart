import { getSupabaseServer } from "./server";
import { PLANS } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

interface CreditResult {
  success: boolean;
  remaining: number;
}

/**
 * Server-side: consume 1 application credit atomically.
 * Uses a Postgres function that checks AND decrements in a single operation,
 * preventing race conditions from double-clicks or concurrent requests.
 */
export async function consumeApplicationCreditServer(
  userId: string
): Promise<CreditResult> {
  const supabase = getSupabaseServer();
  if (!supabase) return { success: false, remaining: 0 };

  const { data, error } = await supabase.rpc("consume_application_credit", {
    p_user_id: userId,
  });

  if (error) {
    console.error("[CREDIT] Application credit RPC failed:", error);
    return { success: false, remaining: 0 };
  }

  const row = data?.[0];
  if (!row) return { success: false, remaining: 0 };

  return { success: row.success, remaining: row.remaining };
}

/**
 * Server-side: consume 1 improve-experience credit atomically.
 * Plans with unlimited (-1) skip the check entirely.
 * Plans with 0 are blocked. Others use a Postgres function for atomic decrement.
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

  const { data, error } = await supabase.rpc("consume_improve_credit", {
    p_user_id: userId,
    p_limit: planDef.aiImproveExperience,
  });

  if (error) {
    console.error("[CREDIT] Improve credit RPC failed:", error);
    return { success: false, remaining: 0 };
  }

  const row = data?.[0];
  if (!row) return { success: false, remaining: 0 };

  return { success: row.success, remaining: row.remaining };
}

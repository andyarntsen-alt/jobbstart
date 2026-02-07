import { getSupabaseClient } from "./client";
import type { Profile } from "@/types/supabase";
import type { UserAccess, PlanId } from "@/lib/plans";

const PLAN_RANK: Record<PlanId, number> = {
  free: 0,
  enkel: 1,
  standard: 2,
  max: 3,
};

export function profileToAccess(profile: Profile): UserAccess {
  // Admins get max plan with unlimited credits
  if (profile.is_admin) {
    return {
      plan: "max",
      applicationsRemaining: 9999,
      applicationsUsed: 0,
      freeTrialUsed: false,
      improveExperienceUsed: 0,
    };
  }

  return {
    plan: profile.plan,
    applicationsRemaining: profile.applications_remaining,
    applicationsUsed: profile.applications_used,
    freeTrialUsed: profile.free_trial_used,
    improveExperienceUsed: profile.improve_experience_used,
    purchasedAt: profile.purchased_at ?? undefined,
    sessionId: profile.stripe_session_id ?? undefined,
  };
}

function accessToProfileUpdate(access: UserAccess) {
  return {
    plan: access.plan,
    applications_remaining: access.applicationsRemaining,
    applications_used: access.applicationsUsed,
    free_trial_used: access.freeTrialUsed,
    improve_experience_used: access.improveExperienceUsed,
    purchased_at: access.purchasedAt ?? null,
    stripe_session_id: access.sessionId ?? null,
  };
}

export function mergeAccess(local: UserAccess, remote: UserAccess): UserAccess {
  const localRank = PLAN_RANK[local.plan];
  const remoteRank = PLAN_RANK[remote.plan];

  if (localRank > remoteRank) return local;
  if (remoteRank > localRank) return remote;

  // Same plan: take the one with more remaining credits
  if (local.applicationsRemaining >= remote.applicationsRemaining) {
    return local;
  }
  return remote;
}

export async function fetchProfile(userId: string): Promise<UserAccess | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return profileToAccess(data as Profile);
}

export async function persistProfile(
  userId: string,
  access: UserAccess
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  await supabase
    .from("profiles")
    .update(accessToProfileUpdate(access))
    .eq("id", userId);
}

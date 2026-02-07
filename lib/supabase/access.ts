import { getSupabaseClient } from "./client";
import type { Profile } from "@/types/supabase";
import type { UserAccess } from "@/lib/plans";

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

export function mergeAccess(_local: UserAccess, remote: UserAccess): UserAccess {
  // Always trust server values to prevent localStorage manipulation.
  // Server-side credit enforcement ensures credits are accurate in Supabase.
  // Local-only upgrades (before webhook fires) are handled by verify-session.
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

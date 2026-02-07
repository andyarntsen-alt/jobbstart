import { DEFAULT_ACCESS, PLANS, TOPUP_CREDITS } from "@/lib/plans";
import type { PlanId, UserAccess } from "@/lib/plans";

const STORAGE_KEY = "jobbstart-access";

export function getAccess(): UserAccess {
  if (typeof window === "undefined") return DEFAULT_ACCESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as UserAccess;
      // Ensure all fields exist (handles old stored data)
      return { ...DEFAULT_ACCESS, ...parsed };
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_ACCESS;
}

export function setAccess(access: UserAccess): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(access));
  } catch {
    // Ignore quota errors
  }
}

export function consumeApplicationCredit(): UserAccess {
  const access = getAccess();
  const updated: UserAccess = {
    ...access,
    applicationsRemaining: Math.max(0, access.applicationsRemaining - 1),
    applicationsUsed: access.applicationsUsed + 1,
    freeTrialUsed: access.plan === "free" ? true : access.freeTrialUsed,
  };
  setAccess(updated);
  return updated;
}

export function upgradePlan(planId: PlanId, sessionId: string): UserAccess {
  const access = getAccess();
  const plan = PLANS[planId];
  const updated: UserAccess = {
    ...access,
    plan: planId,
    applicationsRemaining: plan.applicationCredits,
    applicationsUsed: 0,
    improveExperienceUsed: 0,
    freeTrialUsed: access.freeTrialUsed,
    purchasedAt: new Date().toISOString(),
    sessionId,
  };
  setAccess(updated);
  return updated;
}

export function consumeImproveExperienceCredit(): UserAccess {
  const access = getAccess();
  const updated: UserAccess = {
    ...access,
    improveExperienceUsed: access.improveExperienceUsed + 1,
  };
  setAccess(updated);
  return updated;
}

export function addApplicationCredits(count: number = TOPUP_CREDITS): UserAccess {
  const access = getAccess();
  const updated: UserAccess = {
    ...access,
    applicationsRemaining: access.applicationsRemaining + count,
  };
  setAccess(updated);
  return updated;
}

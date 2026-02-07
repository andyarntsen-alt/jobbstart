"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  PLANS,
  canGenerateApplication,
  canExportPdfWord,
  canUseBackgroundImprove,
  canUseCvAiSummary,
  canUseCvAiImprove,
  canDownloadCvPdf,
  hasFullCvPreview,
  getImproveExperienceRemaining,
  DEFAULT_ACCESS,
} from "@/lib/plans";
import type { PlanId, PlanDefinition, UserAccess } from "@/lib/plans";
import {
  getAccess,
  setAccess as setStoredAccess,
  consumeApplicationCredit,
  consumeImproveExperienceCredit,
  upgradePlan as storedUpgradePlan,
  addApplicationCredits as storedAddCredits,
} from "@/lib/access-storage";
import { useAuth } from "@/components/AuthProvider";
import {
  fetchProfile,
  persistProfile,
  mergeAccess,
} from "@/lib/supabase/access";

export function useAccess() {
  const [access, setAccess] = useState<UserAccess>(DEFAULT_ACCESS);
  const { user } = useAuth();
  const mergedRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    setAccess(getAccess());
  }, []);

  // Merge with Supabase when user logs in
  useEffect(() => {
    if (!user || mergedRef.current) return;
    mergedRef.current = true;

    (async () => {
      const remote = await fetchProfile(user.id);
      if (!remote) return;

      const local = getAccess();
      const merged = mergeAccess(local, remote);

      setStoredAccess(merged);
      setAccess(merged);
      await persistProfile(user.id, merged);
    })();
  }, [user]);

  // Persist to both localStorage and Supabase
  const persist = useCallback(
    (updated: UserAccess) => {
      setAccess(updated);
      if (user) {
        persistProfile(user.id, updated);
      }
    },
    [user]
  );

  const plan: PlanDefinition = PLANS[access.plan];

  const refreshAccess = useCallback(() => {
    setAccess(getAccess());
  }, []);

  const consumeCredit = useCallback(() => {
    const updated = consumeApplicationCredit();
    persist(updated);
  }, [persist]);

  const upgrade = useCallback(
    (planId: PlanId, sessionId: string) => {
      const updated = storedUpgradePlan(planId, sessionId);
      persist(updated);
    },
    [persist]
  );

  const addCredits = useCallback(
    (count?: number) => {
      const updated = storedAddCredits(count);
      persist(updated);
    },
    [persist]
  );

  const consumeImproveCredit = useCallback(() => {
    const updated = consumeImproveExperienceCredit();
    persist(updated);
  }, [persist]);

  return {
    access,
    plan,
    isPaid: access.plan !== "free",
    canGenerate: canGenerateApplication(access),
    canExportPdf: canExportPdfWord(access),
    canImproveBackground: canUseBackgroundImprove(access),
    canUseCvSummary: canUseCvAiSummary(access),
    canUseCvImprove: canUseCvAiImprove(access),
    improveExperienceRemaining: getImproveExperienceRemaining(access),
    canDownloadCv: canDownloadCvPdf(access),
    hasFullPreview: hasFullCvPreview(access),
    consumeCredit,
    consumeImproveCredit,
    upgradePlan: upgrade,
    addCredits,
    refreshAccess,
  };
}

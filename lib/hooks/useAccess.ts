"use client";

import { useState, useEffect, useCallback } from "react";
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
  consumeApplicationCredit,
  consumeImproveExperienceCredit,
  upgradePlan as storedUpgradePlan,
  addApplicationCredits as storedAddCredits,
} from "@/lib/access-storage";

export function useAccess() {
  const [access, setAccess] = useState<UserAccess>(DEFAULT_ACCESS);

  useEffect(() => {
    setAccess(getAccess());
  }, []);

  const plan: PlanDefinition = PLANS[access.plan];

  const refreshAccess = useCallback(() => {
    setAccess(getAccess());
  }, []);

  const consumeCredit = useCallback(() => {
    const updated = consumeApplicationCredit();
    setAccess(updated);
  }, []);

  const upgrade = useCallback((planId: PlanId, sessionId: string) => {
    const updated = storedUpgradePlan(planId, sessionId);
    setAccess(updated);
  }, []);

  const addCredits = useCallback((count?: number) => {
    const updated = storedAddCredits(count);
    setAccess(updated);
  }, []);

  const consumeImproveCredit = useCallback(() => {
    const updated = consumeImproveExperienceCredit();
    setAccess(updated);
  }, []);

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

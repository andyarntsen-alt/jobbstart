import type { CVTemplate } from "@/types/cv";

export type PlanId = "free" | "enkel" | "standard" | "max";

export interface PlanDefinition {
  id: PlanId;
  name: string;
  price: number;
  priceInOre: number;
  applicationCredits: number;
  cvAccess: boolean;
  cvTemplates: "free" | "all";
  aiSummary: boolean;
  aiImproveExperience: number; // 0 = no, -1 = unlimited, N = limited uses
  aiImproveBackground: boolean;
  pdfWordExport: boolean;
  description: string;
}

export interface UserAccess {
  plan: PlanId;
  applicationsRemaining: number;
  applicationsUsed: number;
  freeTrialUsed: boolean;
  improveExperienceUsed: number;
  purchasedAt?: string;
  sessionId?: string;
}

export const DEFAULT_ACCESS: UserAccess = {
  plan: "free",
  applicationsRemaining: 1,
  applicationsUsed: 0,
  freeTrialUsed: false,
  improveExperienceUsed: 0,
};

export const FREE_CV_TEMPLATES: CVTemplate[] = ["nordisk", "kompakt"];

export const PLANS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    name: "GRATIS",
    price: 0,
    priceInOre: 0,
    applicationCredits: 1,
    cvAccess: false,
    cvTemplates: "free",
    aiSummary: false,
    aiImproveExperience: 0,
    aiImproveBackground: false,
    pdfWordExport: false,
    description: "Prøv gratis med begrenset tilgang",
  },
  enkel: {
    id: "enkel",
    name: "ENKEL",
    price: 49,
    priceInOre: 4900,
    applicationCredits: 1,
    cvAccess: false,
    cvTemplates: "free",
    aiSummary: false,
    aiImproveExperience: 0,
    aiImproveBackground: false,
    pdfWordExport: true,
    description: "1 profesjonell søknad med PDF + Word",
  },
  standard: {
    id: "standard",
    name: "STANDARD",
    price: 149,
    priceInOre: 14900,
    applicationCredits: 5,
    cvAccess: true,
    cvTemplates: "all",
    aiSummary: true,
    aiImproveExperience: 10,
    aiImproveBackground: true,
    pdfWordExport: true,
    description: "5 søknader + CV-bygger med KI-sammendrag",
  },
  max: {
    id: "max",
    name: "MAX",
    price: 249,
    priceInOre: 24900,
    applicationCredits: 20,
    cvAccess: true,
    cvTemplates: "all",
    aiSummary: true,
    aiImproveExperience: -1,
    aiImproveBackground: true,
    pdfWordExport: true,
    description: "20 søknader + full CV med KI-forbedring",
  },
};

export const TOPUP_PRICE = 4900;
export const TOPUP_CREDITS = 5;

// --- Access check functions ---

export function canGenerateApplication(access: UserAccess): boolean {
  if (access.plan === "free") {
    return !access.freeTrialUsed && access.applicationsRemaining > 0;
  }
  return access.applicationsRemaining > 0;
}

export function canExportPdfWord(access: UserAccess): boolean {
  return PLANS[access.plan].pdfWordExport;
}

export function canUseBackgroundImprove(access: UserAccess): boolean {
  return PLANS[access.plan].aiImproveBackground;
}

export function canUseCvAiSummary(access: UserAccess): boolean {
  return PLANS[access.plan].aiSummary;
}

export function canUseCvAiImprove(access: UserAccess): boolean {
  const limit = PLANS[access.plan].aiImproveExperience;
  if (limit === 0) return false;
  if (limit === -1) return true;
  return access.improveExperienceUsed < limit;
}

export function getImproveExperienceRemaining(access: UserAccess): number {
  const limit = PLANS[access.plan].aiImproveExperience;
  if (limit === 0) return 0;
  if (limit === -1) return -1; // unlimited
  return Math.max(0, limit - access.improveExperienceUsed);
}

export function canDownloadCvPdf(access: UserAccess): boolean {
  return PLANS[access.plan].cvAccess;
}

export function isCvTemplateFree(template: CVTemplate): boolean {
  return FREE_CV_TEMPLATES.includes(template);
}

export function hasFullCvPreview(access: UserAccess): boolean {
  return PLANS[access.plan].cvAccess;
}

export function getMinimumPlanForFeature(
  feature: "pdfWord" | "backgroundImprove" | "cvSummary" | "cvImprove" | "cvPdf" | "cvTemplates"
): PlanId {
  switch (feature) {
    case "pdfWord":
      return "enkel";
    case "backgroundImprove":
    case "cvSummary":
    case "cvPdf":
    case "cvTemplates":
      return "standard";
    case "cvImprove":
      return "standard";
  }
}

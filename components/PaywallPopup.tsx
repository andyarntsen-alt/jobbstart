"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, ChevronRight } from "lucide-react";
import { PLANS, getMinimumPlanForFeature } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

const UPGRADE_ORDER: PlanId[] = ["enkel", "standard", "max"];

const PLAN_HIGHLIGHTS: Record<string, string[]> = {
  enkel: ["1 søknad", "PDF & Word eksport"],
  standard: ["5 søknader", "CV-bygger", "KI-forbedring (10×)"],
  max: ["20 søknader", "Ubegrenset KI-forbedring", "Alt i STANDARD +"],
};

interface PaywallPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
  featureKey: "pdfWord" | "backgroundImprove" | "cvSummary" | "cvImprove" | "cvPdf" | "cvTemplates";
  onCheckout: (plan: PlanId) => void;
}

export default function PaywallPopup({
  open,
  onOpenChange,
  feature,
  featureKey,
  onCheckout,
}: PaywallPopupProps) {
  const minimumPlan = getMinimumPlanForFeature(featureKey);
  const minIndex = UPGRADE_ORDER.indexOf(minimumPlan);
  const availablePlans = UPGRADE_ORDER.slice(minIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border">
        <DialogHeader>
          <div className="flex h-10 w-10 items-center justify-center border border-border mb-2">
            <Lock className="h-4 w-4" />
          </div>
          <DialogTitle className="text-base">{feature}</DialogTitle>
          <DialogDescription className="text-sm">
            Denne funksjonen krever {PLANS[minimumPlan].name}-planen eller høyere.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 pt-2">
          {availablePlans.map((planId) => {
            const plan = PLANS[planId];
            return (
              <button
                key={planId}
                type="button"
                className="flex w-full items-center justify-between p-3 border border-border hover:bg-foreground/[0.03] transition-colors text-left"
                onClick={() => {
                  onCheckout(planId);
                  onOpenChange(false);
                }}
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    {plan.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {PLAN_HIGHLIGHTS[planId]?.join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <p className="text-lg font-bold">{plan.price} kr</p>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors pt-1"
          >
            Ikke nå
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

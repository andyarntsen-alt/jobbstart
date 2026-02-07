"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { PLANS, getMinimumPlanForFeature } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

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
  const plan = PLANS[minimumPlan];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border">
        <DialogHeader>
          <div className="flex h-10 w-10 items-center justify-center border border-border mb-2">
            <Lock className="h-4 w-4" />
          </div>
          <DialogTitle className="text-base">{feature}</DialogTitle>
          <DialogDescription className="text-sm">
            Denne funksjonen krever {plan.name}-planen eller høyere.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3 border border-border">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider">
                {plan.name}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <p className="text-lg font-bold">{plan.price} kr</p>
          </div>
          <Button
            className="w-full bg-foreground text-background hover:bg-foreground/80"
            onClick={() => {
              onCheckout(minimumPlan);
              onOpenChange(false);
            }}
          >
            Kjøp {plan.name} — {plan.price} kr
          </Button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Ikke nå
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

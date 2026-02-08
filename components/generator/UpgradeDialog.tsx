"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Plus } from "lucide-react";
import { PLANS, TOPUP_PRICE, TOPUP_CREDITS } from "@/lib/plans";
import type { PlanId, UserAccess } from "@/lib/plans";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  access: UserAccess;
  onCheckout: (plan: PlanId | "pafyll") => void;
}

const PLAN_FEATURES: Record<string, string[]> = {
  enkel: ["1 søknad", "PDF & Word eksport", "Alle 3 brevmaler"],
  standard: ["5 søknader", "CV-bygger inkludert", "KI-forbedring (10×)"],
  max: ["Alt i STANDARD +", "20 søknader", "Ubegrenset KI-forbedring"],
};

export default function UpgradeDialog({
  open,
  onOpenChange,
  access,
  onCheckout,
}: UpgradeDialogProps) {
  const showTopup = access.plan !== "free" && access.applicationsRemaining === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40 mb-2 block">
            / {showTopup ? "PÅFYLL" : "OPPGRADER"}
          </span>
          <DialogTitle className="text-xl font-black uppercase tracking-tight">
            {showTopup
              ? "Kjøp flere søknader"
              : access.freeTrialUsed
                ? "Du har brukt gratisprøven"
                : "Lås opp full tilgang"}
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground/50">
            {showTopup
              ? `Du har brukt alle søknadene dine. Kjøp ${TOPUP_CREDITS} ekstra.`
              : "Velg en pakke for å generere søknader med PDF og Word-eksport."}
          </DialogDescription>
        </DialogHeader>

        {showTopup ? (
          <div className="px-6 pb-6 space-y-4">
            <div className="flex items-center justify-between p-4 border border-border">
              <div>
                <p className="text-xs font-black uppercase tracking-wider">
                  +{TOPUP_CREDITS} søknader
                </p>
                <p className="text-[11px] text-foreground/50">
                  Legg til flere søknader på din {PLANS[access.plan].name}-plan
                </p>
              </div>
              <p className="text-lg font-black">{TOPUP_PRICE / 100} kr</p>
            </div>
            <Button
              className="w-full bg-foreground text-background hover:bg-foreground/80 gap-2"
              onClick={() => {
                onCheckout("pafyll");
                onOpenChange(false);
              }}
            >
              <Plus className="h-4 w-4" />
              Kjøp påfyll, {TOPUP_PRICE / 100} kr
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[1px] bg-foreground/10">
            {(["enkel", "standard", "max"] as PlanId[]).map((planId) => {
              const plan = PLANS[planId];
              return (
                <button
                  key={planId}
                  type="button"
                  className={`bg-background p-4 flex flex-col text-left hover:bg-foreground/[0.02] transition-colors ${
                    planId === "standard" ? "bg-foreground/[0.02]" : ""
                  }`}
                  onClick={() => {
                    onCheckout(planId);
                    onOpenChange(false);
                  }}
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40 mb-1">
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-0.5 mb-3">
                    <span className="text-2xl font-black tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/30">
                      kr
                    </span>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    {PLAN_FEATURES[planId]?.map((feature) => (
                      <div key={feature} className="flex items-start gap-1.5">
                        <Check className="mt-0.5 h-3 w-3 text-foreground/20 shrink-0" />
                        <span className="text-[10px] text-foreground/50 uppercase tracking-wider leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 border border-foreground/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:bg-foreground hover:text-background transition-all">
                    Velg
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

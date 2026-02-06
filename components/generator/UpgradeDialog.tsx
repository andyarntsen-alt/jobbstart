"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    name: "ENKEL",
    price: "49",
    features: ["1 søknad", "PDF & Word eksport", "Alle 3 brevmaler"],
  },
  {
    name: "STANDARD",
    price: "149",
    popular: true,
    features: ["5 søknader", "CV-bygger inkludert", "KI-generert sammendrag"],
  },
  {
    name: "MAX",
    price: "249",
    features: ["20 søknader", "Full CV med KI", "FINN.no auto-import"],
  },
];

export default function UpgradeDialog({
  open,
  onOpenChange,
}: UpgradeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <span className="industrial-label mb-2 block">/ OPPGRADER</span>
          <DialogTitle className="text-xl font-black uppercase tracking-tight">
            Lås opp PDF & Word
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground/50">
            Velg en pakke for å laste ned søknaden som PDF eller Word.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-[1px] bg-foreground/10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-background p-4 flex flex-col ${
                plan.popular ? "bg-foreground/[0.02]" : ""
              }`}
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
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-1.5">
                    <Check className="mt-0.5 h-3 w-3 text-foreground/20 shrink-0" />
                    <span className="text-[10px] text-foreground/50 uppercase tracking-wider leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 pt-4">
          <Link
            href="/#priser"
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center gap-2 w-full border border-foreground/10 px-6 py-3 text-[11px] font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Se alle pakker
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

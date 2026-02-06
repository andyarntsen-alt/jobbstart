"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const plans = [
  {
    name: "ENKEL",
    price: "49",
    description: "For den raske jobbsøkeren som trenger én god søknad.",
    features: [
      "1 søknad",
      "PSTAR-metoden",
      "PDF & Word eksport",
      "Alle 3 brevmaler",
    ],
    popular: false,
    icon: Activity,
  },
  {
    name: "STANDARD",
    price: "149",
    description: "Søknad + CV i én pakke. Alt du trenger for en effektiv jobbsøk.",
    features: [
      "5 søknader",
      "CV-bygger inkludert",
      "KI-generert CV-sammendrag",
      "Alle brevmaler + 5 CV-maler",
      "Ferdig på under 2 min",
      "Prioritert behandling",
    ],
    popular: true,
    icon: Zap,
  },
  {
    name: "UBEGRENSET",
    price: "249",
    description: "Full tilgang til søknad og CV for aktive jobbsøkere.",
    features: [
      "20 søknader",
      "CV-bygger med KI-forbedring",
      "FINN.no auto-import",
      "Alle maler + prioritert støtte",
      "KI forbedrer erfaringspunkter",
      "Eksklusive brevmaler",
    ],
    popular: false,
    icon: Activity,
  },
];

export default function Pricing() {
  return (
    <section id="priser" className="bg-background px-5 md:px-8 lg:px-10 py-16 md:py-20 border-t border-foreground/5 relative">
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="mb-10 md:mb-14 text-center">
          <span className="industrial-label mb-3 block">/ PRISER</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-4"
          >
            VELG DIN <span className="opacity-20">PAKKE.</span>
          </motion.h2>
          <p className="mx-auto max-w-xl text-base md:text-lg text-foreground/40 font-bold">
            Velg pakken som passer din jobbsøk. Ingen skjulte kostnader.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1 bg-foreground/5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative flex flex-col bg-background p-6 md:p-8 transition-all hover:bg-white ${plan.popular ? "z-10 shadow-2xl shadow-black/5" : ""
                }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center border border-foreground/10 group-hover:border-foreground transition-all bg-white">
                  <plan.icon className="h-4 w-4 text-foreground opacity-30 group-hover:opacity-100 transition-all" />
                </div>
                {plan.popular && (
                  <Badge className="rounded-none bg-foreground text-background font-black uppercase text-[9px] tracking-widest px-3 py-1">
                    MEST POPULÆR
                  </Badge>
                )}
              </div>

              <div className="mb-5">
                <h3 className="industrial-label mb-1">/ {plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">{plan.price}</span>
                  <span className="font-mono text-xs text-foreground/40 font-bold uppercase tracking-widest">kr / engangskjøp</span>
                </div>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed max-w-[240px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-3.5 w-3.5 text-foreground opacity-20 group-hover:opacity-100 transition-opacity" />
                    <span className="font-mono text-xs text-foreground/50 group-hover:text-foreground transition-colors uppercase tracking-wider">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className={`w-full rounded-none h-12 font-black uppercase text-[11px] tracking-[0.2em] transition-all ${plan.popular
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-white border border-foreground/10 text-foreground hover:bg-foreground hover:text-background"
                  }`}
              >
                <Link href="/generator" className="flex items-center gap-2">
                  Kom i gang
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

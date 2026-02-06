"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Clock, FileText, Layout } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex-col justify-center overflow-hidden bg-grid-white px-5 md:px-8 lg:px-10 py-16 md:py-20 lg:py-24">
      {/* Background Subtle Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-full max-w-[800px] aspect-square pointer-events-none">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-20 items-end">
          {/* Left Column: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="industrial-label">/ JOBBSTART</span>
              <div className="h-[1px] w-20 bg-foreground/10" />
            </div>
            <h1 className="text-huge mb-0">
              SØKNAD & CV <br />
              <span className="opacity-20 text-foreground">MED KI.</span> <br />
              <span className="italic">PÅ MINUTTER.</span>
            </h1>
          </motion.div>

          {/* Right Column: Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8 lg:gap-10 border-l-0 lg:border-l border-foreground/10 pl-0 lg:pl-12 pb-4"
          >
            <div className="flex flex-col gap-4 max-w-[450px]">
              <p className="text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
                Lim inn en stillingsannonse og få en skreddersydd søknad — eller bygg en profesjonell CV med KI-drevne forslag. Alt tilpasset norsk arbeidsliv.
              </p>
              <p className="text-sm text-foreground uppercase tracking-wider leading-relaxed font-bold">
                Søknad og CV ferdig på under 2 minutter. Ingen erfaring med jobbsøking nødvendig.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/generator"
                className="group flex items-center gap-3 bg-foreground text-background px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                Lag søknad
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/cv"
                className="group flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:border-foreground transition-colors"
              >
                Bygg CV
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-10 border-t border-foreground/5">
              {[
                { label: "LEVERING", value: "Under 2 min", icon: Clock },
                { label: "EKSPORT", value: "PDF & Word", icon: FileText },
                { label: "CV-MALER", value: "5 stk", icon: Layout },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="h-3 w-3 opacity-20" />
                    <span className="industrial-label">{stat.label}</span>
                  </div>
                  <div className="text-lg font-bold">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

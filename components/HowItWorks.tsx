"use client";

import { motion } from "framer-motion";
import { ClipboardPaste, Sparkles, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "LIM INN ANNONSEN",
    description: "Kopier fra FINN.no eller lim inn manuelt. Vi henter ut alt som trengs automatisk.",
    icon: ClipboardPaste,
  },
  {
    number: "02",
    title: "KI SKRIVER FOR DEG",
    description: "Tilpasset søknad basert på din bakgrunn og stillingen. PSTAR-metoden sikrer profesjonell struktur.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "LAST NED & SEND",
    description: "Ferdig PDF eller Word på under 2 minutter. Klar til å sendes direkte til arbeidsgiver.",
    icon: Download,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background px-5 md:px-8 lg:px-10 py-16 md:py-24 lg:py-32 border-t border-foreground/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 md:mb-20">
          <span className="industrial-label mb-4 block">/ SLIK FUNGERER DET</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            TRE STEG. <span className="opacity-20">FERDIG.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative border border-foreground/5 p-6 md:p-8 lg:p-10 hover:bg-white transition-colors"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground/5 group-hover:text-foreground/10 transition-colors">
                  {step.number}
                </span>
                <div className="h-12 w-12 flex items-center justify-center border border-foreground/10 group-hover:border-foreground transition-colors">
                  <step.icon className="h-5 w-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <h3 className="industrial-label mb-3">/ {step.title}</h3>
              <p className="text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

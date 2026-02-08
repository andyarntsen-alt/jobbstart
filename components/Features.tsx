"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, FileText, User } from "lucide-react";
import Link from "next/link";

const products = [
  {
    label: "SØKNADSGENERATOR",
    icon: FileText,
    href: "/generator",
    cta: "Lag søknad",
    features: [
      "FINN.no-integrasjon: lim inn URL, hent automatisk",
      "3 brevmaler: Konservativ, Moderne, Kreativ",
      "3 eksportlayouter for ulik stil",
      "Redigerbar i nettleseren før eksport",
      "PDF & Word eksport",
      "PSTAR-metoden for sterk struktur",
    ],
  },
  {
    label: "CV-BYGGER",
    icon: User,
    href: "/cv",
    cta: "Bygg CV",
    features: [
      "6-stegs veiviser med auto-lagring",
      "KI genererer profesjonelt sammendrag",
      "KI forbedrer erfaringsbeskrivelser til kulepunkter",
      "10 PDF-maler med unike layouter og farger",
      "Profilbilde-opplasting i CV-en",
      "Tilpasset norsk arbeidsmarked",
      "Forhåndsvisning i sanntid",
    ],
  },
];

export default function Features() {
  return (
    <section className="bg-background px-5 md:px-8 lg:px-10 py-16 md:py-24 lg:py-32 border-t border-foreground/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 md:mb-20">
          <span className="industrial-label mb-4 block">/ FUNKSJONER</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tighter"
          >
            ALT DU TRENGER. <span className="opacity-20">INGENTING DU IKKE TRENGER.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {products.map((product, i) => (
            <motion.div
              key={product.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group border border-foreground/5 p-6 md:p-8 lg:p-12 hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-12 flex items-center justify-center border border-foreground/10 group-hover:border-foreground transition-colors">
                  <product.icon className="h-5 w-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="industrial-label">/ {product.label}</h3>
              </div>

              <div className="space-y-4 mb-10">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-foreground opacity-20 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span className="text-sm text-foreground/60 group-hover:text-foreground/90 uppercase tracking-wider leading-relaxed transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={product.href}
                className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                {product.cta}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Hvordan fungerer JobbStart sin søknadsgenerator?",
    answer:
      "Lim inn en stillingsannonse fra FINN.no eller manuelt, velg brevmal (Konservativ, Moderne eller Kreativ), og la KI-en generere en skreddersydd søknad basert på din bakgrunn. Ferdig på under 2 minutter.",
  },
  {
    question: "Hva koster det å bruke JobbStart?",
    answer:
      "JobbStart tilbyr tre pakker: Enkel (49 kr for 1 søknad), Standard (149 kr for 5 søknader + CV-bygger), og Max (249 kr for 20 søknader + full CV med KI-forbedring).",
  },
  {
    question: "Kan jeg lage CV med JobbStart?",
    answer:
      "Ja! CV-byggeren har en 6-stegs veiviser med auto-lagring, KI-generert sammendrag, KI-forbedrede erfaringsbeskrivelser, og 10 profesjonelle PDF-maler tilpasset norsk arbeidsmarked.",
  },
  {
    question: "Støtter JobbStart FINN.no?",
    answer:
      "Ja, du kan lime inn en FINN.no-annonse-URL direkte, og JobbStart henter automatisk ut stillingsannonseteksten slik at du slipper å kopiere den manuelt.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-background px-5 md:px-8 lg:px-10 py-16 md:py-20 border-t border-foreground/5">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-10 md:mb-14 text-center">
          <span className="industrial-label mb-3 block">
            / VANLIGE SPØRSMÅL
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-4"
          >
            SPØRSMÅL OG <span className="opacity-20">SVAR.</span>
          </motion.h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-foreground/10"
            >
              <AccordionTrigger className="py-5 text-left text-xs font-bold uppercase tracking-widest text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm text-foreground/60 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

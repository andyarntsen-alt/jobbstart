"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardPaste,
  Sparkles,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  Target,
  FileCheck,
  Globe,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "LIM INN ANNONSEN",
    description:
      "Kopier URL-en fra FINN.no eller lim inn stillingsannonsen manuelt. KI-en henter ut all relevant informasjon automatisk.",
    icon: ClipboardPaste,
  },
  {
    number: "02",
    title: "VELG BREVMAL",
    description:
      "Velg mellom Konservativ, Moderne eller Kreativ stil. Hver mal er optimalisert for ulike bransjer og stillingstyper i det norske arbeidsmarkedet.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "LAST NED OG SEND",
    description:
      "Rediger teksten om ønskelig, velg eksportlayout, og last ned som PDF eller Word. Søknaden er klar til å sendes på under 2 minutter.",
    icon: Download,
  },
];

const benefits = [
  {
    title: "FERDIG PÅ 2 MINUTTER",
    description:
      "Spar timer med manuell skriving. KI-en genererer en komplett, skreddersydd jobbsøknad basert på stillingsannonsen og din bakgrunn.",
    icon: Clock,
  },
  {
    title: "PSTAR-METODEN",
    description:
      "Søknaden struktureres etter PSTAR-metoden (Problem, Situasjon, Tiltak, Aksjon, Resultat), standarden for profesjonelle søknadsbrev i Norge.",
    icon: Target,
  },
  {
    title: "TILPASSET NORSK ARBEIDSLIV",
    description:
      "Brevmalene er designet for norske arbeidsgivere. Formelt språk, riktig tonefall og struktur som rekrutterere i Norge forventer.",
    icon: FileCheck,
  },
  {
    title: "FINN.NO-INTEGRASJON",
    description:
      "Lim inn en FINN.no-URL direkte, og systemet henter automatisk ut stillingsannonsen. Slipper manuell kopiering av annonsetekst.",
    icon: Globe,
  },
];

const faqs = [
  {
    question: "Hvordan fungerer søknadsgeneratoren?",
    answer:
      "Du limer inn en stillingsannonse (fra FINN.no eller manuelt), legger til din bakgrunn og kontaktinformasjon, og velger brevmal. KI-en analyserer annonsen og genererer en skreddersydd søknad basert på PSTAR-metoden. Hele prosessen tar under 2 minutter.",
  },
  {
    question: "Hva er PSTAR-metoden?",
    answer:
      "PSTAR står for Problem, Situasjon, Tiltak, Aksjon og Resultat. Det er en anerkjent metode for å strukturere søknadsbrev som viser arbeidsgiveren konkrete eksempler på din kompetanse og dine resultater. Metoden er spesielt verdsatt av norske rekrutterere.",
  },
  {
    question: "Kan jeg redigere søknaden etterpå?",
    answer:
      "Ja, den genererte søknaden vises i en redigerbar editor. Du kan finjustere teksten, legge til detaljer eller endre formuleringer før du laster ned. Vi anbefaler alltid å lese gjennom og tilpasse søknaden til din personlige stil.",
  },
  {
    question: "Hvilke brevmaler kan jeg velge mellom?",
    answer:
      "Det finnes tre brevmaler: Konservativ (best for offentlig sektor, storselskaper og jus), Moderne (ideell for tech, startup og kreative bransjer), og Kreativ (for design, media og kommunikasjon). Hver mal tilpasser tonefall og struktur.",
  },
  {
    question: "Støtter dere FINN.no?",
    answer:
      "Ja! Du kan lime inn en FINN.no-annonse-URL direkte i generatoren. Systemet henter automatisk ut stillingsannonseteksten slik at du slipper å kopiere den manuelt. Du kan også lime inn annonsetekst fra andre kilder.",
  },
  {
    question: "Hvilket format kan jeg laste ned søknaden i?",
    answer:
      "Søknaden kan lastes ned som PDF eller Word-dokument (.docx). Du kan også velge mellom ulike eksportlayouter som endrer det visuelle utseendet på dokumentet. PDF er anbefalt for de fleste søknader.",
  },
];

export default function GeneratorSeoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="border-t border-foreground/5">
      {/* Slik fungerer det */}
      <section className="bg-background px-5 md:px-8 lg:px-10py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="industrial-label mb-4 block">
              / SLIK FUNGERER DET
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              TRE STEG TIL FERDIG SØKNAD.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border border-foreground/5 p-10"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-6xl font-black tracking-tighter text-foreground/5">
                    {step.number}
                  </span>
                  <div className="h-12 w-12 flex items-center justify-center border border-foreground/10">
                    <step.icon className="h-5 w-5 opacity-30" />
                  </div>
                </div>
                <h3 className="industrial-label mb-3">/ {step.title}</h3>
                <p className="text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fordeler */}
      <section className="bg-secondary px-5 md:px-8 lg:px-10py-24 border-y border-foreground/5">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="industrial-label mb-4 block">
              / HVORFOR BRUKE KI TIL JOBBSØKNADEN
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              SMARTERE SØKNAD.{" "}
              <span className="opacity-20">BEDRE RESULTAT.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border border-foreground/5 p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 flex items-center justify-center border border-foreground/10">
                    <benefit.icon className="h-4 w-4 opacity-30" />
                  </div>
                  <h3 className="industrial-label">/ {benefit.title}</h3>
                </div>
                <p className="text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background px-5 md:px-8 lg:px-10py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="industrial-label mb-4 block">
              / VANLIGE SPØRSMÅL
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              SPØRSMÅL OG SVAR.
            </h2>
          </div>

          <div className="max-w-[800px]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-foreground/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-foreground/40 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="pb-6 text-sm text-foreground/60 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-selling */}
      <section className="bg-secondary px-5 md:px-8 lg:px-10py-16 border-t border-foreground/5">
        <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="industrial-label mb-2 block">
              / TRENGER DU EN CV OGSÅ?
            </span>
            <p className="text-sm text-foreground/60 uppercase tracking-wider">
              Bygg en profesjonell CV med KI-drevne forslag og 10 norske maler.
            </p>
          </div>
          <Link
            href="/cv"
            className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Bygg CV
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

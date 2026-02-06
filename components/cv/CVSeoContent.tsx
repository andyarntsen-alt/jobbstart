"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Sparkles,
  Download,
  ChevronDown,
  ChevronRight,
  Clock,
  Palette,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "FYLL INN INFORMASJON",
    description:
      "En 6-stegs veiviser guider deg gjennom personalia, sammendrag, erfaring, utdanning, ferdigheter og språk. Alt lagres automatisk underveis.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "KI FORBEDRER TEKSTEN",
    description:
      "Bruk KI til å generere et profesjonelt sammendrag og forbedre erfaringsbeskrivelsene dine til konkrete, resultatfokuserte kulepunkter.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "VELG MAL OG LAST NED",
    description:
      "Forhåndsvis CV-en i sanntid med 10 profesjonelle maler tilpasset norsk arbeidsmarked. Last ned som PDF klar til å sendes.",
    icon: Download,
  },
];

const benefits = [
  {
    title: "SPAR TID",
    description:
      "Slutt på å formatere i Word. CV-byggeren håndterer layout, mellomrom og typografi automatisk. Du fokuserer på innholdet.",
    icon: Clock,
  },
  {
    title: "10 PROFESJONELLE MALER",
    description:
      "Fra minimalistisk Nordisk til fargerik Bergen — 10 unike CV-maler med ulike layouter, farger og stiler. Alle tilpasset norsk standard.",
    icon: Palette,
  },
  {
    title: "KI-DREVNE FORSLAG",
    description:
      "KI-en genererer profesjonelt sammendrag basert på din erfaring og forbedrer stillingsbeskrivelser til konkrete, målbare resultater som rekrutterere verdsetter.",
    icon: BrainCircuit,
  },
  {
    title: "TILPASSET NORSK STANDARD",
    description:
      "Malene følger norsk CV-standard med riktig rekkefølge, formatering og innhold. Designet for norske arbeidsgivere og rekrutterere.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "Hvordan fungerer CV-byggeren?",
    answer:
      "CV-byggeren guider deg gjennom 6 steg: personalia, profesjonelt sammendrag, arbeidserfaring, utdanning, ferdigheter og språk. Du fyller inn informasjonen din steg for steg, og kan bruke KI til å forbedre teksten underveis. Til slutt velger du en av 10 maler og laster ned som PDF.",
  },
  {
    question: "Hvilke CV-maler finnes?",
    answer:
      "Det finnes 10 maler med unike layouter, farger og stiler — blant annet Nordisk, Oslo, Eksekutiv, Kreativ, Kompakt, Tidslinje, Fjord, Stavanger, Diplomatisk og Bergen. Alle er designet for norsk arbeidsmarked.",
  },
  {
    question: "Kan KI-en skrive sammendrag for meg?",
    answer:
      "Ja! I steg 2 kan du trykke på en knapp for å la KI-en generere et profesjonelt sammendrag basert på erfaringen og ferdighetene du har fylt inn. Du kan deretter redigere og tilpasse teksten.",
  },
  {
    question: "Lagres CV-en min?",
    answer:
      "CV-en lagres automatisk i nettleseren din (localStorage) mens du jobber, slik at du kan lukke siden og komme tilbake senere uten å miste data. Dataene lagres kun lokalt på din enhet.",
  },
  {
    question: "Hvordan forbedrer KI erfaringsbeskrivelsene mine?",
    answer:
      "KI-en omformulerer dine erfaringsbeskrivelser til konkrete, resultatfokuserte kulepunkter. For eksempel kan 'jobbet med salg' bli til 'Ansvarlig for B2B-salg med en portefølje på 50+ kunder. Økte omsetning med 15% gjennom strategisk kundeutvikling.'",
  },
  {
    question: "Hvor lang bør en CV være?",
    answer:
      "I Norge anbefales det at en CV er 1-2 sider. Nyutdannede bør sikte på 1 side, mens erfarne kandidater med 10+ års erfaring kan bruke 2 sider. CV-byggeren vår hjelper deg med å holde innholdet konsist og relevant.",
  },
];

export default function CVSeoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="border-t border-foreground/5">
      {/* Slik bygger du CV-en */}
      <section className="bg-background px-5 md:px-8 lg:px-10py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="industrial-label mb-4 block">
              / SLIK BYGGER DU CV-EN
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              TRE STEG TIL PROFESJONELL CV.
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
              / HVORFOR LAGE CV MED KI
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              PROFESJONELL CV.{" "}
              <span className="opacity-20">UTEN INNSATSEN.</span>
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
              / SKAL DU SØKE PÅ EN JOBB?
            </span>
            <p className="text-sm text-foreground/60 uppercase tracking-wider">
              Generer en skreddersydd jobbsøknad med KI på under 2 minutter.
            </p>
          </div>
          <Link
            href="/generator"
            className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Lag søknad
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

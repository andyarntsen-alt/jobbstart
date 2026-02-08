import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Sparkles,
  Target,
  Building2,
  Lightbulb,
  PenTool,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import {
  getBreadcrumbSchema,
  getHowToWriteApplicationSchema,
} from "@/lib/structured-data";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jobbsøknad Mal 2026 | Gratis maler og eksempler",
  description:
    "Last ned gratis jobbsøknad-maler tilpasset norsk arbeidsliv. 3 brevmaler med PSTAR-metoden, konkrete eksempler og tips. Generer søknad med KI på under 2 minutter.",
  keywords: [
    "jobbsøknad mal",
    "søknadsbrev mal",
    "jobbsøknad eksempel",
    "søknad mal",
    "mal jobbsøknad",
    "jobbsøknad mal gratis",
    "jobbsøknad mal 2026",
    "norsk jobbsøknad mal",
    "søknad eksempel",
    "jobbsøknad tips",
  ],
  alternates: { canonical: `${siteConfig.url}/jobbsoknad-mal` },
  openGraph: {
    title: "Jobbsøknad Mal 2026 | Gratis maler og eksempler",
    description:
      "Last ned gratis jobbsøknad-maler tilpasset norsk arbeidsliv. 3 brevmaler med PSTAR-metoden.",
    url: `${siteConfig.url}/jobbsoknad-mal`,
  },
};

const brevmaler = [
  {
    name: "Konservativ",
    description:
      "Formell og tradisjonell tone. Best for offentlig sektor, storselskaper, finans og jus. Følger norske konvensjoner for formelle brev.",
    best: "Offentlig sektor, finans, jus",
    icon: Building2,
  },
  {
    name: "Moderne",
    description:
      "Profesjonell men approachable tone. Ideell for tech, startup, konsulentbransjen og moderne selskaper. Viser initiativ og personlighet.",
    best: "Tech, startup, konsulent",
    icon: Lightbulb,
  },
  {
    name: "Kreativ",
    description:
      "Personlig og engasjerende tone med plass til kreativitet. For design, media, kommunikasjon og kreative bransjer der personlighet teller.",
    best: "Design, media, kommunikasjon",
    icon: PenTool,
  },
];

const faqs = [
  {
    question: "Hva er forskjellen mellom jobbsøknad og søknadsbrev?",
    answer:
      "I Norge brukes begrepene ofte om hverandre. En jobbsøknad er det personlige brevet du sender sammen med CV-en når du søker på en stilling. Søknadsbrev og motivasjonsbrev er andre navn for det samme dokumentet.",
  },
  {
    question: "Hvor lang bør en jobbsøknad være?",
    answer:
      "En god jobbsøknad er 300-400 ord, altså omtrent én A4-side. Vær konkret og unngå å gjenta CV-en. Fokuser på hvorfor du er riktig person for akkurat denne stillingen.",
  },
  {
    question: "Hva er PSTAR-metoden?",
    answer:
      "PSTAR står for Problem, Situasjon, Tiltak, Aksjon og Resultat. Det er en anerkjent metode for å strukturere søknader som viser arbeidsgiveren konkrete eksempler på din kompetanse med målbare resultater.",
  },
  {
    question: "Bør jeg tilpasse søknaden til hver stilling?",
    answer:
      "Absolutt. Generiske søknader havner i nei-bunken. Tilpass innledningen, fremhev relevant erfaring, og bruk nøkkelord fra stillingsannonsen. KI-generatoren vår gjør dette automatisk.",
  },
  {
    question: "Kan KI-en skrive hele søknaden for meg?",
    answer:
      "KI-en genererer et komplett førsteutkast basert på stillingsannonsen og din bakgrunn. Vi anbefaler alltid å lese gjennom og tilpasse teksten til din personlige stil før du sender.",
  },
  {
    question: "Hvilket format bør jeg sende søknaden i?",
    answer:
      "PDF er anbefalt for de fleste søknader. Det bevarer formateringen på tvers av enheter. Noen arbeidsgivere ber om Word-format, og da støtter vi også .docx-eksport.",
  },
];

function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function JobbsoknadMalPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Hjem", url: "/" },
          { name: "Jobbsøknad-maler", url: "/jobbsoknad-mal" },
        ])}
      />
      <JsonLd data={getFAQSchema()} />
      <JsonLd data={getHowToWriteApplicationSchema()} />
      <main>
        <Header />

        {/* Hero */}
        <section className="bg-background px-5 md:px-8 lg:px-10 pt-32 pb-20">
          <div className="mx-auto max-w-[1400px]">
            <Breadcrumb
              items={[
                { name: "Hjem", href: "/" },
                { name: "Søknadsmaler", href: "/jobbsoknad-mal" },
              ]}
            />
            <span className="industrial-label mb-6 block">
              / JOBBSØKNAD-MALER 2026
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
              JOBBSØKNAD MAL
              <br />
              <span className="opacity-20">
                GRATIS MALER OG EKSEMPLER.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
              Velg blant 3 brevmaler tilpasset ulike bransjer. Basert på
              PSTAR-metoden, standarden for profesjonelle søknadsbrev i
              Norge. Generer din søknad med KI på under 2 minutter.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/generator"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Lag søknad med KI
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/blogg/hvordan-skrive-jobbsoknad"
                className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Les komplett guide
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3 brevmaler */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16">
              <span className="industrial-label mb-4 block">
                / TRE BREVMALER
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                VELG TONEN SOM PASSER.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {brevmaler.map((mal) => (
                <div
                  key={mal.name}
                  className="border border-foreground/5 p-10"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-12 w-12 flex items-center justify-center border border-foreground/10">
                      <mal.icon className="h-5 w-5 opacity-30" />
                    </div>
                  </div>
                  <h3 className="industrial-label mb-3">/ {mal.name}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                    {mal.description}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">
                    Best for: {mal.best}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PSTAR-metoden */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / PSTAR-METODEN
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              STRUKTUREN BAK EN GOD SØKNAD.
            </h2>

            <div className="space-y-8 text-sm text-foreground/70 leading-relaxed">
              <p>
                PSTAR-metoden er gullstandarden for jobbsøknader i Norge. I
                stedet for å skrive vage formuleringer, viser du
                arbeidsgiveren konkrete eksempler på din kompetanse med
                målbare resultater. Alle våre brevmaler bruker denne
                strukturen.
              </p>

              <div className="space-y-6">
                {[
                  {
                    letter: "P",
                    word: "Problem",
                    desc: "Beskriv en utfordring du møtte i en tidligere stilling. Vær spesifikk om hva problemet var.",
                  },
                  {
                    letter: "S",
                    word: "Situasjon",
                    desc: "Forklar konteksten: hvilken bedrift, team eller prosjekt var involvert? Hva sto på spill?",
                  },
                  {
                    letter: "T",
                    word: "Tiltak",
                    desc: "Hva bestemte du deg for å gjøre? Vis at du tok initiativ og hadde en plan.",
                  },
                  {
                    letter: "A",
                    word: "Aksjon",
                    desc: "Hva gjorde du konkret? Beskriv handlingene dine i detalj.",
                  },
                  {
                    letter: "R",
                    word: "Resultat",
                    desc: "Hva ble utfallet? Bruk tall og prosenter der du kan: «Reduserte ventetiden med 40%».",
                  },
                ].map((item) => (
                  <div key={item.letter} className="flex gap-6">
                    <span className="text-3xl font-black text-foreground/10 shrink-0 w-8">
                      {item.letter}
                    </span>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-1">
                        {item.word}
                      </h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-foreground/10 p-8 mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4">
                  / Eksempel med PSTAR
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed italic">
                  &laquo;Da avdelingen slet med forsinkede leveranser
                  (Problem), analyserte jeg prosessene i et team på 12
                  personer (Situasjon). Jeg tok initiativ til å innføre agile
                  arbeidsprosesser med Scrum (Tiltak), ledet
                  implementeringen og holdt daglige standups (Aksjon). Etter
                  6 måneder var leveringstiden redusert med 35 % og
                  kundetilfredsheten økt fra 72 % til 91 % (Resultat).&raquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slik skriver du */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / STEG FOR STEG
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              SLIK SKRIVER DU EN GOD SØKNAD.
            </h2>

            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Innledning: fang oppmerksomheten",
                  text: "Start med å referere til stillingen og vis umiddelbar relevans. Unngå klisjéer som «Jeg viser til utlyst stilling». Fortell i stedet kort hva du bringer til bordet. Første setning avgjør om resten blir lest.",
                },
                {
                  num: "02",
                  title: "Hoveddel: vis kompetansen din med PSTAR",
                  text: "Bruk 1-2 PSTAR-eksempler som viser at du matcher kravene i annonsen. Velg eksempler som er relevante for stillingen. Bruk konkrete tall og resultater der du kan.",
                },
                {
                  num: "03",
                  title: "Motivasjon: hvorfor akkurat denne bedriften?",
                  text: "Vis at du har gjort research. Nevn noe spesifikt ved bedriften som motiverer deg, for eksempel et prosjekt, verdi eller mål. Arbeidsgivere vil vite at du ikke har sendt samme søknad til 50 andre.",
                },
                {
                  num: "04",
                  title: "Avslutning: vær proaktiv",
                  text: "Avslutt med en selvsikker men ydmyk tone. Si at du ser frem til en samtale og gjør det enkelt for arbeidsgiveren å ta kontakt. Unngå «Håper på svar». Vær heller direkte.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-6">
                  <span className="text-4xl font-black tracking-tighter text-foreground/10 shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vanlige feil */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / UNNGÅ DISSE FEILENE
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              5 VANLIGE FEIL I JOBBSØKNADER.
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "For generisk",
                  text: "Ikke bruk samme søknad til alle stillinger. Arbeidsgivere ser det umiddelbart. Tilpass innledning, eksempler og motivasjon til hver enkelt stilling.",
                },
                {
                  title: "For lang",
                  text: "Hold deg til én side (300-400 ord). Rekrutterere bruker 6-8 sekunder på første gjennomlesning. Gjør hvert ord telt.",
                },
                {
                  title: "Gjentar CV-en",
                  text: "Søknaden skal utfylle CV-en, ikke kopiere den. Bruk søknaden til å fortelle historien bak tallene i CV-en.",
                },
                {
                  title: "Ingen konkrete eksempler",
                  text: "«Jeg er en lagspiller med gode kommunikasjonsevner» overbeviser ingen. Bruk PSTAR-eksempler med målbare resultater.",
                },
                {
                  title: "Skrivefeil",
                  text: "Skrivefeil signaliserer slurv og mangel på oppmerksomhet. Alltid korrekturles, og be gjerne noen andre lese gjennom.",
                },
              ].map((feil) => (
                <div
                  key={feil.title}
                  className="border-l-2 border-foreground/10 pl-6"
                >
                  <h3 className="text-xs font-black uppercase tracking-widest mb-2">
                    {feil.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {feil.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
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
                <details
                  key={i}
                  className="border-b border-foreground/10 group"
                >
                  <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-foreground/40 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="pb-6 text-sm text-foreground/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[1400px] text-center">
            <span className="industrial-label mb-4 block">
              / KOM I GANG
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              KLAR TIL Å SKRIVE SØKNAD?
            </h2>
            <p className="text-sm text-foreground/60 uppercase tracking-wider mb-10 max-w-xl mx-auto">
              Lim inn stillingsannonsen og la KI-en generere en skreddersydd
              søknad med PSTAR-metoden. Ferdig på under 2 minutter.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Start søknadsgeneratoren
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Cross-sell */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-16 border-t border-foreground/5">
          <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="industrial-label mb-2 block">
                / TRENGER DU EN CV OGSÅ?
              </span>
              <p className="text-sm text-foreground/60 uppercase tracking-wider">
                Bygg en profesjonell CV med 10 maler tilpasset norsk
                arbeidsmarked.
              </p>
            </div>
            <Link
              href="/cv-mal"
              className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
            >
              Se CV-maler
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

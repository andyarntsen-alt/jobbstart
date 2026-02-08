import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Palette,
  Briefcase,
  GraduationCap,
  Star,
  User,
  Languages,
  FileText,
  Award,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CV Mal 2026 | 10 gratis maler for norsk arbeidsmarked",
  description:
    "Last ned profesjonelle CV-maler tilpasset norsk arbeidsliv. 10 gratis maler: Nordisk, Oslo, Eksekutiv, Kreativ og mer. Bygg CV-en online med KI-drevne forslag på under 5 minutter.",
  keywords: [
    "cv mal",
    "cv mal norsk",
    "cv mal gratis",
    "cv maler",
    "cv eksempel",
    "lage cv",
    "gratis cv mal",
    "cv mal 2026",
    "norsk cv mal",
    "profesjonell cv mal",
  ],
  alternates: { canonical: `${siteConfig.url}/cv-mal` },
  openGraph: {
    title: "CV Mal 2026 | 10 gratis maler for norsk arbeidsmarked",
    description:
      "Last ned profesjonelle CV-maler tilpasset norsk arbeidsliv. 10 gratis maler med KI-drevne forslag.",
    url: `${siteConfig.url}/cv-mal`,
  },
};

const templates = [
  {
    name: "Nordisk",
    description:
      "Ren og minimalistisk. Perfekt for de som vil la innholdet snakke for seg. Best for offentlig sektor, finans og rådgivning.",
    style: "Minimalistisk",
  },
  {
    name: "Oslo",
    description:
      "Moderne og profesjonell med tydelig hierarki. Passer for de fleste bransjer og stillinger i Norge.",
    style: "Moderne",
  },
  {
    name: "Eksekutiv",
    description:
      "Elegant og sofistikert design for lederposisjoner. Utstråler erfaring og autoritet.",
    style: "Sofistikert",
  },
  {
    name: "Kreativ",
    description:
      "Fargerik og visuell for kreative bransjer. Skiller seg ut fra mengden med unik layout.",
    style: "Visuell",
  },
  {
    name: "Kompakt",
    description:
      "Maksimal informasjon på minimal plass. Ideell for erfarne kandidater med mye relevant erfaring.",
    style: "Effektiv",
  },
  {
    name: "Tidslinje",
    description:
      "Visuell tidslinje som viser karriereutviklingen din. Gir arbeidsgiveren et raskt overblikk over din vei.",
    style: "Kronologisk",
  },
  {
    name: "Fjord",
    description:
      "Norsk-inspirert design med rolige farger og god lesbarhet. Passer godt for alle bransjer.",
    style: "Nordisk",
  },
  {
    name: "Stavanger",
    description:
      "Industrielt og ryddig design inspirert av vestlandet. Godt egnet for ingeniører og tekniske roller.",
    style: "Industriell",
  },
  {
    name: "Diplomatisk",
    description:
      "Formelt og tradisjonelt design. Best for offentlige stillinger, jus og akademia.",
    style: "Formell",
  },
  {
    name: "Bergen",
    description:
      "Kreativ og fargerik med personlighet. For design, media, markedsføring og kommunikasjon.",
    style: "Kreativ",
  },
];

const cvSections = [
  {
    icon: User,
    title: "Personlig informasjon",
    description:
      "Fullt navn, e-post, telefonnummer og eventuelt LinkedIn-profil. Adresse er ikke nødvendig i norske CV-er.",
  },
  {
    icon: Star,
    title: "Profesjonelt sammendrag",
    description:
      "2-3 setninger som oppsummerer din erfaring og hva du tilbyr. Det viktigste avsnittet. Bestemmer om arbeidsgiveren leser videre.",
  },
  {
    icon: Briefcase,
    title: "Arbeidserfaring",
    description:
      "Stillinger i omvendt kronologisk rekkefølge med stillingstittel, bedrift, periode og 3-5 kulepunkter med konkrete resultater.",
  },
  {
    icon: GraduationCap,
    title: "Utdanning",
    description:
      "Grad, institusjon og år. Nyutdannede bør ha dette høyere opp. Inkluder relevante fag og spesialisering.",
  },
  {
    icon: Languages,
    title: "Ferdigheter og språk",
    description:
      "Tekniske ferdigheter, programvare og verktøy. Språk med nivå: morsmål, flytende eller grunnleggende.",
  },
  {
    icon: Award,
    title: "Sertifiseringer",
    description:
      "Relevante kurs og sertifiseringer som styrker profilen din for stillingen du søker på.",
  },
];

const faqs = [
  {
    question: "Hvilken CV-mal er best for meg?",
    answer:
      "Det avhenger av bransjen. For offentlig sektor og finans: Nordisk eller Diplomatisk. For tech og startup: Oslo eller Stavanger. For kreative bransjer: Kreativ eller Bergen. For lederroller: Eksekutiv.",
  },
  {
    question: "Er CV-malene gratis?",
    answer:
      "Du kan bygge CV-en og forhåndsvise alle 10 maler gratis. For å laste ned som PDF trenger du en av våre pakker fra kr 149.",
  },
  {
    question: "Hvor lang bør en norsk CV være?",
    answer:
      "I Norge anbefales 1-2 sider. Nyutdannede bør holde seg til 1 side, mens erfarne kandidater med 10+ års erfaring kan bruke 2 sider.",
  },
  {
    question: "Bør jeg ha bilde i CV-en?",
    answer:
      "I Norge er profilbilde valgfritt, men stadig vanligere. Alle våre 10 maler støtter profilbilde. Bruk et profesjonelt portrettbilde med nøytral bakgrunn.",
  },
  {
    question: "Kan KI-en hjelpe meg med CV-innholdet?",
    answer:
      "Ja! KI-en kan generere et profesjonelt sammendrag basert på din erfaring, og forbedre erfaringsbeskrivelsene dine til konkrete, resultatfokuserte kulepunkter som rekrutterere verdsetter.",
  },
  {
    question: "Fungerer CV-malene med ATS-systemer?",
    answer:
      "Ja, alle våre maler er designet for å være lesbare av ATS (Applicant Tracking Systems) som brukes av norske arbeidsgivere. Strukturen følger norsk standard.",
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

export default function CVMalPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Hjem", url: "/" },
          { name: "CV-maler", url: "/cv-mal" },
        ])}
      />
      <JsonLd data={getFAQSchema()} />
      <main>
        <Header />

        {/* Hero */}
        <section className="bg-background px-5 md:px-8 lg:px-10 pt-32 pb-20">
          <div className="mx-auto max-w-[1400px]">
            <Breadcrumb
              items={[
                { name: "Hjem", href: "/" },
                { name: "CV-maler", href: "/cv-mal" },
              ]}
            />
            <span className="industrial-label mb-6 block">
              / CV-MALER 2026
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
              CV MAL: GRATIS MALER
              <br />
              <span className="opacity-20">FOR NORSK ARBEIDSLIV.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
              Velg blant 10 profesjonelle CV-maler designet for norsk
              arbeidsmarked. Bygg CV-en online med KI-drevne forslag,
              automatisk sammendrag og eksport til PDF. Ferdig på under 5
              minutter.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/cv"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Bygg din CV nå
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/blogg/cv-mal-norsk-guide"
                className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Les CV-guiden
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 10 CV-maler grid */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16">
              <span className="industrial-label mb-4 block">
                / ALLE 10 MALER
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                VELG DIN STIL.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {templates.map((template, i) => (
                <div
                  key={template.name}
                  className="border border-foreground/5 p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-black tracking-tighter text-foreground/5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 border border-foreground/10 px-2 py-1">
                      {template.style}
                    </span>
                  </div>
                  <h3 className="industrial-label mb-3">/ {template.name}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/cv"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Prøv alle maler gratis
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Slik velger du riktig mal */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / SLIK VELGER DU
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              RIKTIG MAL FOR DIN BRANSJE.
            </h2>

            <div className="space-y-8 text-sm text-foreground/70 leading-relaxed">
              <p>
                Valget av CV-mal handler om mer enn bare utseende. Riktig mal
                signaliserer at du forstår bransjens forventninger og styrker
                helhetsinntrykket av søknaden din. Her er en guide basert på
                bransje og stillingsnivå.
              </p>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-3">
                  Offentlig sektor, finans og jus
                </h3>
                <p>
                  Velg <strong>Nordisk</strong>, <strong>Diplomatisk</strong>{" "}
                  eller <strong>Kompakt</strong>. Disse bransjene verdsetter
                  ryddighet og profesjonalitet fremfor kreativitet. Hold deg til
                  nøytrale farger og enkel layout. Fokuser på konkrete
                  resultater og formell struktur.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-3">
                  Tech, IT og startup
                </h3>
                <p>
                  <strong>Oslo</strong> og <strong>Stavanger</strong> er ideelle.
                  Moderne design med tydelig hierarki viser at du er oppdatert.
                  Fremhev tekniske ferdigheter, prosjekter og verktøy.
                  Open-source bidrag og sertifiseringer veier tungt.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-3">
                  Design, media og kommunikasjon
                </h3>
                <p>
                  <strong>Kreativ</strong> og <strong>Bergen</strong> lar deg
                  vise personlighet. I kreative bransjer er CV-en i seg selv en
                  del av porteføljen. Bruk farger og visuell struktur bevisst,
                  men overdriv ikke.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-3">
                  Lederposisjoner og senior-roller
                </h3>
                <p>
                  <strong>Eksekutiv</strong> utstråler erfaring og autoritet.
                  For seniorroller bør CV-en fokusere på strategiske
                  prestasjoner, teamledelse og målbare resultater. Hold deg til
                  2 sider og prioriter de siste 10-15 årene.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-3">
                  Generelle stillinger
                </h3>
                <p>
                  Er du usikker, velg <strong>Fjord</strong> eller{" "}
                  <strong>Oslo</strong>. Disse er allsidige maler som fungerer
                  godt i de fleste bransjer og gir et ryddig, profesjonelt
                  inntrykk uten å være for konservative eller kreative.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hva bør en norsk CV inneholde */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16">
              <span className="industrial-label mb-4 block">
                / INNHOLD I CV-EN
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                HVA BØR EN NORSK CV INNEHOLDE?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {cvSections.map((section) => (
                <div
                  key={section.title}
                  className="border border-foreground/5 p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 flex items-center justify-center border border-foreground/10">
                      <section.icon className="h-4 w-4 opacity-30" />
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips-seksjon */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / TIPS FOR NORSK CV
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              5 TIPS SOM SKILLER DEG UT.
            </h2>

            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "Bruk aktive verb",
                  text: 'Start hvert kulepunkt med et aktivt verb: "Ledet", "Implementerte", "Økte", "Reduserte". Unngå passive formuleringer som "Var ansvarlig for".',
                },
                {
                  num: "02",
                  title: "Kvantifiser resultater",
                  text: 'Bruk tall der du kan: "Økte salget med 25%", "Ledet team på 8 personer", "Reduserte kostnader med 500.000 kr". Konkrete tall gjør inntrykk.',
                },
                {
                  num: "03",
                  title: "Tilpass til stillingen",
                  text: "Juster rekkefølgen og vektleggingen basert på hva annonsen etterspør. CV-en du sender til en tech-stilling bør se annerledes ut enn den til en lederrolle.",
                },
                {
                  num: "04",
                  title: "Hold det konsist",
                  text: "Fjern alt som ikke er relevant. Jobber fra 15+ år siden bør forkortes til én linje. Fokuser på de siste 5-10 årene med relevant erfaring.",
                },
                {
                  num: "05",
                  title: "Korrekturles alltid",
                  text: "Skrivefeil i CV-en signaliserer slurv. Les gjennom minst to ganger, og be gjerne noen andre lese den også.",
                },
              ].map((tip) => (
                <div key={tip.num} className="flex gap-6">
                  <span className="text-4xl font-black tracking-tighter text-foreground/10 shrink-0">
                    {tip.num}
                  </span>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {tip.text}
                    </p>
                  </div>
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
              KLAR TIL Å LAGE CV?
            </h2>
            <p className="text-sm text-foreground/60 uppercase tracking-wider mb-10 max-w-xl mx-auto">
              Velg mal, fyll inn informasjonen din, og la KI-en hjelpe deg med
              resten. Ferdig på under 5 minutter.
            </p>
            <Link
              href="/cv"
              className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Start CV-byggeren
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Cross-sell */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-16 border-t border-foreground/5">
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

        <Footer />
      </main>
    </>
  );
}

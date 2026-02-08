import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Søknadsbrev 2026 | Komplett guide med eksempler",
  description:
    "Lær hvordan du skriver et overbevisende søknadsbrev. Komplett guide med konkrete eksempler, før/etter-sammenligning og PSTAR-metoden. Generer søknadsbrev med KI.",
  keywords: [
    "søknadsbrev",
    "søknadsbrev eksempel",
    "skrive søknadsbrev",
    "søknadsbrev 2026",
    "søknadsbrev mal",
    "søknadsbrev tips",
    "motivasjonsbrev",
    "personlig brev jobb",
    "søknadsbrev norsk",
    "hvordan skrive søknadsbrev",
  ],
  alternates: { canonical: `${siteConfig.url}/soknadsbrev` },
  openGraph: {
    title: "Søknadsbrev 2026 | Komplett guide med eksempler",
    description:
      "Lær hvordan du skriver et overbevisende søknadsbrev. Komplett guide med eksempler og PSTAR-metoden.",
    url: `${siteConfig.url}/soknadsbrev`,
  },
};

const faqs = [
  {
    question: "Hva er forskjellen mellom søknadsbrev og CV?",
    answer:
      "CV-en er en strukturert oversikt over din erfaring, utdanning og ferdigheter. Søknadsbrevet er et personlig brev som forklarer hvorfor du er riktig person for stillingen. De to dokumentene utfyller hverandre. CV-en viser hva du har gjort, søknadsbrevet forklarer hvorfor det er relevant.",
  },
  {
    question: "Må jeg alltid sende søknadsbrev?",
    answer:
      "I Norge forventer de fleste arbeidsgivere et søknadsbrev sammen med CV-en. Selv når det ikke er eksplisitt påkrevd, viser et godt søknadsbrev at du er genuint interessert i stillingen. Det er din sjanse til å skille deg ut fra andre kandidater.",
  },
  {
    question: "Hva er forskjellen mellom søknadsbrev og motivasjonsbrev?",
    answer:
      "I dagligtale brukes begrepene om hverandre i Norge. Teknisk sett fokuserer et motivasjonsbrev mer på din motivasjon og fremtidsmål (vanlig for utdanning/stipend), mens et søknadsbrev fokuserer på kompetanse og erfaring (vanlig for jobbsøknader). For jobbsøknader i Norge er begrepene praktisk talt synonyme.",
  },
  {
    question: "Hvor formelt bør søknadsbrevet være?",
    answer:
      "Det avhenger av bransjen. For offentlig sektor, finans og jus: formelt. For tech, startup og kreative bransjer: profesjonelt men personlig. Vår Konservativ-mal gir formell tone, Moderne gir balansert tone, og Kreativ gir personlig tone.",
  },
  {
    question: "Kan KI skrive søknadsbrevet mitt?",
    answer:
      "KI-en genererer et komplett førsteutkast basert på stillingsannonsen og din bakgrunn, strukturert etter PSTAR-metoden. Vi anbefaler alltid å lese gjennom og tilpasse til din personlige stil. Det gir det beste resultatet.",
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

export default function SoknadsbrevPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Hjem", url: "/" },
          { name: "Søknadsbrev", url: "/soknadsbrev" },
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
                { name: "Søknadsbrev", href: "/soknadsbrev" },
              ]}
            />
            <span className="industrial-label mb-6 block">
              / SØKNADSBREV-GUIDE 2026
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
              SØKNADSBREV
              <br />
              <span className="opacity-20">
                KOMPLETT GUIDE MED EKSEMPLER.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-sm text-foreground/60 uppercase tracking-wider leading-relaxed">
              Alt du trenger å vite om søknadsbrev i Norge. Hva det er,
              hvordan du skriver det, konkrete eksempler og de vanligste
              feilene. Pluss: generer ditt eget søknadsbrev med KI på under 2
              minutter.
            </p>
            <div className="mt-10">
              <Link
                href="/generator"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Generer søknadsbrev med KI
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Hva er et søknadsbrev */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / HVA ER ET SØKNADSBREV
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              SØKNADSBREV FORKLART.
            </h2>

            <div className="space-y-6 text-sm text-foreground/70 leading-relaxed">
              <p>
                Et søknadsbrev (også kalt jobbsøknad, søkerbrev eller
                motivasjonsbrev) er et personlig brev du sender sammen med
                CV-en din når du søker på en stilling. Det er din mulighet til
                å fortelle arbeidsgiveren hvem du er utover det som står i
                CV-en.
              </p>
              <p>
                Mens CV-en gir en strukturert oversikt over erfaring og
                utdanning, bruker du søknadsbrevet til å vise motivasjon,
                personlighet og konkrete eksempler på hvorfor du er riktig for
                stillingen. Et godt søknadsbrev kan være forskjellen mellom å
                bli kalt inn til intervju og å havne i nei-bunken.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-8">
                <div className="border border-foreground/5 p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-3">
                    Søknadsbrev
                  </h3>
                  <p className="text-sm text-foreground/50">
                    Personlig brev til jobbsøknad. Fokuserer på kompetanse,
                    erfaring og motivasjon for stillingen.
                  </p>
                </div>
                <div className="border border-foreground/5 p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-3">
                    Motivasjonsbrev
                  </h3>
                  <p className="text-sm text-foreground/50">
                    Ofte brukt synonymt med søknadsbrev i Norge. Vanligere
                    for utdanning og stipendsøknader.
                  </p>
                </div>
                <div className="border border-foreground/5 p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-3">
                    CV
                  </h3>
                  <p className="text-sm text-foreground/50">
                    Strukturert oversikt over erfaring, utdanning og
                    ferdigheter. Sendes alltid sammen med søknadsbrevet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steg-for-steg */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / SKRIV SØKNADSBREV
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              STEG FOR STEG.
            </h2>

            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Overskrift og mottaker",
                  text: "Start med ditt navn, kontaktinformasjon og dato. Adresser brevet til riktig person. Finn navnet i stillingsannonsen. «Til rette vedkommende» er siste utvei.",
                },
                {
                  num: "02",
                  title: "Innledning som fanger",
                  text: "Åpne med en setning som viser at du har lest annonsen nøye. Nevn stillingen, og gi en kort smakebit på hvorfor du er riktig kandidat. Drop «Jeg viser til utlyst stilling».",
                },
                {
                  num: "03",
                  title: "Hoveddel med PSTAR-eksempler",
                  text: "Dette er kjernen i søknadsbrevet. Bruk 1-2 konkrete eksempler med PSTAR-metoden (Problem, Situasjon, Tiltak, Aksjon, Resultat) som viser at du matcher kravene i annonsen.",
                },
                {
                  num: "04",
                  title: "Motivasjon for bedriften",
                  text: "Vis at du har gjort research. Nevn noe spesifikt ved bedriften (et prosjekt, en verdi eller et mål) som motiverer deg. Arbeidsgivere vil vite at de er mer enn bare «en jobb».",
                },
                {
                  num: "05",
                  title: "Avslutning med handlingsoppfordring",
                  text: "Avslutt med å si at du ser frem til en samtale. Vær selvsikker men ydmyk. Gjør det enkelt for arbeidsgiveren å ta kontakt. Inkluder telefonnummer og e-post.",
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

        {/* Før/etter */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-24 border-y border-foreground/5">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / FØR OG ETTER
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              SE FORSKJELLEN.
            </h2>

            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-4 w-4 text-red-500/60" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-red-500/60">
                    Svakt søknadsbrev
                  </h3>
                </div>
                <div className="border border-red-500/10 p-6 text-sm text-foreground/50 leading-relaxed italic">
                  &laquo;Jeg viser til utlyst stilling som prosjektleder hos
                  Equinor. Jeg har erfaring med prosjektledelse og er en
                  lagspiller med gode kommunikasjonsevner. Jeg er motivert og
                  har lyst til å jobbe hos dere. Vedlagt finner du min
                  CV.&raquo;
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-foreground/20" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-600/60" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-600/60">
                    Sterkt søknadsbrev
                  </h3>
                </div>
                <div className="border border-green-600/10 p-6 text-sm text-foreground/60 leading-relaxed italic">
                  &laquo;Med 5 års erfaring fra prosjektledelse i
                  energisektoren og en dokumentert evne til å levere
                  prosjekter under budsjett, søker jeg stillingen som
                  prosjektleder hos Equinor.
                  <br />
                  <br />
                  Hos Aker Solutions ledet jeg et digitaliseringsprosjekt for
                  et team på 12 personer. Da leveransene var 3 uker forsinket,
                  innførte jeg Scrum-metodikk og daglige standups. Etter 6
                  måneder var leveringstiden redusert med 35 % og
                  kundetilfredsheten økt fra 72 % til 91 %.
                  <br />
                  <br />
                  Equinors satsing på digitalisering og bærekraft i Energy
                  Transition-avdelingen inspirerer meg, og jeg er overbevist
                  om at min erfaring med agil prosjektledelse i energisektoren
                  vil gi umiddelbar verdi til teamet.&raquo;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vanlige feil */}
        <section className="bg-background px-5 md:px-8 lg:px-10 py-24">
          <div className="mx-auto max-w-[900px]">
            <span className="industrial-label mb-4 block">
              / UNNGÅ DISSE
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              VANLIGE FEIL I SØKNADSBREV.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {[
                {
                  title: "Klisjéer",
                  text: "«Jeg er en lagspiller», «Jeg brenner for...», «Jeg viser til utlyst stilling». Disse setningene sier ingenting. Vis heller kompetansen din med konkrete eksempler.",
                },
                {
                  title: "For mye om deg selv",
                  text: "Søknadsbrevet handler om hva du kan gjøre for bedriften, ikke omvendt. Vri perspektivet: «Med min erfaring kan jeg bidra til...» i stedet for «Jeg vil gjerne...»",
                },
                {
                  title: "Manglende tilpasning",
                  text: "Arbeidsgivere ser umiddelbart om du har sendt en generisk søknad. Bruk nøkkelord fra annonsen og nevn bedriften ved navn i innledningen.",
                },
                {
                  title: "For lang tekst",
                  text: "Maks én A4-side (300-400 ord). Rekrutterere har lite tid. Hvert avsnitt skal ha en tydelig funksjon, ingen fyllord eller gjentakelser.",
                },
              ].map((feil) => (
                <div
                  key={feil.title}
                  className="border border-foreground/5 p-8"
                >
                  <h3 className="text-xs font-black uppercase tracking-widest mb-3">
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
              KLAR TIL Å SKRIVE?
            </h2>
            <p className="text-sm text-foreground/60 uppercase tracking-wider mb-10 max-w-xl mx-auto">
              Lim inn stillingsannonsen og la KI-en generere et søknadsbrev
              med PSTAR-metoden. Ferdig på under 2 minutter.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Lag søknadsbrev med KI
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Cross-sell */}
        <section className="bg-secondary px-5 md:px-8 lg:px-10 py-16 border-t border-foreground/5">
          <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="industrial-label mb-2 block">
                / SE OGSÅ
              </span>
              <p className="text-sm text-foreground/60 uppercase tracking-wider">
                Se jobbsøknad-maler og CV-maler tilpasset norsk arbeidsmarked.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/jobbsoknad-mal"
                className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Søknadsmaler
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/cv-mal"
                className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                CV-maler
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

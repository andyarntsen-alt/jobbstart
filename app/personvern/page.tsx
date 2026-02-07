import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Les om hvordan CVpilot behandler dine personopplysninger, bruk av KI, og dine rettigheter under GDPR.",
  alternates: {
    canonical: "/personvern",
  },
};

const sections = [
  {
    label: "/ BEHANDLINGSANSVARLIG",
    title: "Hvem er ansvarlig?",
    content:
      "CVpilot er ansvarlig for behandlingen av personopplysninger som beskrevet i denne personvernerklæringen. Kontakt oss på kontakt@cvpilot.no ved spørsmål.",
  },
  {
    label: "/ DATAINNSAMLING",
    title: "Hvilke data samler vi inn?",
    content:
      "CVpilot lagrer CV-data og søknadstekst lokalt i din nettleser (localStorage). Vi samler ikke inn eller lagrer personopplysninger på våre servere. Informasjon du skriver inn (stillingsannonse, bakgrunn, CV-detaljer) sendes til vår KI-tjeneste for å generere tekst, men lagres ikke etter at svaret er levert.",
  },
  {
    label: "/ BRUK AV KI",
    title: "Kunstig intelligens",
    content:
      "Vi bruker Groq (LLM-tjeneste) for å generere søknadstekst, CV-sammendrag og forbedre erfaringsbeskrivelser. Teksten du skriver inn sendes til Groq for prosessering. Groq behandler data i henhold til deres personvernerklæring og lagrer ikke innholdet etter prosessering. Vi anbefaler at du ikke inkluderer sensitive personopplysninger (personnummer, helseopplysninger o.l.) i teksten.",
  },
  {
    label: "/ INFORMASJONSKAPSLER",
    title: "Cookies og analyse",
    content:
      "CVpilot bruker Vercel Analytics for anonym bruksstatistikk. Dette inkluderer ikke personlig identifiserbar informasjon. Vi bruker localStorage for å lagre CV-data og brukerpreferanser lokalt i din nettleser. Ingen tredjeparts sporings-cookies benyttes.",
  },
  {
    label: "/ TREDJEPARTER",
    title: "Tredjepartstjenester",
    content:
      "Vi benytter følgende tredjepartstjenester: Groq (KI-tekstgenerering), Vercel (hosting og analyse), og Upstash (hastighetsbegrensning). Hver tjeneste behandler data i henhold til sine egne personvernerklæringer. Ingen av disse tjenestene mottar mer data enn det som er nødvendig for å levere tjenesten.",
  },
  {
    label: "/ DINE RETTIGHETER",
    title: "Rettigheter under GDPR",
    content:
      "Du har rett til innsyn, retting, sletting og dataportabilitet. Siden vi ikke lagrer personopplysninger på våre servere, kan du slette alle lokalt lagrede data ved å tømme nettleserens localStorage. For spørsmål om dine rettigheter, kontakt oss på kontakt@cvpilot.no.",
  },
  {
    label: "/ ENDRINGER",
    title: "Endringer i erklæringen",
    content:
      "Vi kan oppdatere denne personvernerklæringen ved behov. Vesentlige endringer vil bli kommunisert på nettsiden. Sist oppdatert: Februar 2026.",
  },
];

export default function PersonvernPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight">
              CVPILOT
            </span>
          </Link>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Tilbake
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-5 md:px-10 py-12 md:py-20">
        <div className="mb-12">
          <span className="industrial-label mb-3 block">/ JURIDISK</span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            PERSONVERN<span className="opacity-20">ERKLÆRING.</span>
          </h1>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.label}>
              <span className="industrial-label mb-2 block">
                {section.label}
              </span>
              <h2 className="text-lg font-bold mb-3">{section.title}</h2>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          <div>
            <span className="industrial-label mb-2 block">/ KONTAKT</span>
            <h2 className="text-lg font-bold mb-3">Kontaktinformasjon</h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Har du spørsmål om personvern? Kontakt oss på{" "}
              <a
                href="mailto:kontakt@cvpilot.no"
                className="text-foreground underline decoration-foreground/20 hover:decoration-foreground transition-colors"
              >
                kontakt@cvpilot.no
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

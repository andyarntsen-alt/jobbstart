import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vilkår for bruk",
  description:
    "Les vilkårene for bruk av CVpilot sine tjenester, inkludert søknadsgenerator og CV-bygger.",
  alternates: {
    canonical: "/vilkar",
  },
};

const sections = [
  {
    label: "/ AKSEPT",
    title: "Aksept av vilkår",
    content:
      "Ved å bruke CVpilot aksepterer du disse vilkårene. Hvis du ikke godtar vilkårene, ber vi deg om å ikke bruke tjenesten. Vi forbeholder oss retten til å endre vilkårene, og fortsatt bruk etter endringer utgjør aksept av de oppdaterte vilkårene.",
  },
  {
    label: "/ TJENESTEN",
    title: "Tjenestebeskrivelse",
    content:
      "CVpilot tilbyr KI-drevne verktøy for å generere jobbsøknader og bygge CV-er tilpasset norsk arbeidsliv. Tjenesten inkluderer søknadsgenerering basert på stillingsannonser, CV-bygger med maler, KI-genererte sammendrag og erfaringsforbedringer, samt eksport til PDF og Word.",
  },
  {
    label: "/ BRUKERENS ANSVAR",
    title: "Ditt ansvar",
    content:
      "Du er selv ansvarlig for å gjennomgå og redigere alt KI-generert innhold før bruk. CVpilot garanterer ikke at generert tekst er feilfri, faktisk korrekt eller egnet for en spesifikk stilling. Du bør alltid tilpasse søknader og CV til din faktiske bakgrunn og den aktuelle stillingen. Ikke inkluder sensitive personopplysninger som personnummer eller helseinformasjon.",
  },
  {
    label: "/ BEGRENSNINGER",
    title: "Begrensninger ved KI",
    content:
      "KI-generert innhold kan inneholde unøyaktigheter eller formuleringer som ikke passer din situasjon. CVpilot er et hjelpeverktøy — ikke en erstatning for egen vurdering. Vi garanterer ikke at bruk av tjenesten fører til jobbintervju eller ansettelse.",
  },
  {
    label: "/ BETALING",
    title: "Betaling og refusjon",
    content:
      "CVpilot tilbyr ulike betalingsplaner. Priser vises inkludert mva. Digitale tjenester som er levert (genererte søknader, nedlastede PDF-er) kan ikke refunderes etter bruk, i henhold til angrerettloven § 22 for digitalt innhold. Ved tekniske feil som forhindrer levering av tjenesten, tilbyr vi full refusjon.",
  },
  {
    label: "/ RETTIGHETER",
    title: "Immaterielle rettigheter",
    content:
      "Innhold generert av CVpilot basert på din input tilhører deg. Du kan fritt bruke, redigere og distribuere søknader og CV-er du lager med tjenesten. CVpilot beholder ingen rettigheter til ditt genererte innhold. Selve plattformen, designet, koden og merkevaren tilhører CVpilot.",
  },
  {
    label: "/ ANSVARSBEGRENSNING",
    title: "Ansvarsbegrensning",
    content:
      "CVpilot er ikke ansvarlig for tap eller skade som følge av bruk av tjenesten, inkludert men ikke begrenset til: tapte jobbmuligheter, feil i generert innhold, eller nedetid i tjenesten. Vårt maksimale ansvar er begrenset til beløpet du har betalt for tjenesten.",
  },
  {
    label: "/ ENDRINGER",
    title: "Endringer i vilkårene",
    content:
      "Vi kan oppdatere disse vilkårene ved behov. Vesentlige endringer vil bli varslet på nettsiden. Fortsatt bruk av tjenesten etter endringer utgjør aksept av de nye vilkårene. Sist oppdatert: Februar 2026.",
  },
];

export default function VilkarPage() {
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
            VILKÅR FOR{" "}
            <span className="opacity-20">BRUK.</span>
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
              Har du spørsmål om vilkårene? Kontakt oss på{" "}
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

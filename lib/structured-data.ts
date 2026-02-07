import { siteConfig } from "@/lib/seo";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: "NO",
    },
  };
}

export function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Enkel",
        price: "49",
        priceCurrency: "NOK",
        description:
          "1 søknad med PSTAR-metoden, PDF & Word eksport, 3 brevmaler",
      },
      {
        "@type": "Offer",
        name: "Standard",
        price: "149",
        priceCurrency: "NOK",
        description:
          "5 søknader + full CV-bygger, KI-sammendrag, 10 CV-maler, FINN.no-integrasjon",
      },
      {
        "@type": "Offer",
        name: "Max",
        price: "249",
        priceCurrency: "NOK",
        description:
          "20 søknader, ubegrenset KI-forbedring, full CV-tilgang, alle maler",
      },
    ],
    inLanguage: "nb",
    featureList: [
      "KI-generert jobbsøknad",
      "CV-bygger med 10 maler",
      "FINN.no-integrasjon",
      "PDF og Word eksport",
      "PSTAR-metoden",
    ],
  };
}

export function getHowToWriteApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hvordan lage jobbsøknad med KI",
    description:
      "Lag en profesjonell, skreddersydd jobbsøknad på under 2 minutter med CVpilot.",
    totalTime: "PT2M",
    tool: {
      "@type": "SoftwareApplication",
      name: "CVpilot",
      url: siteConfig.url,
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Lim inn stillingsannonsen",
        text: "Kopier URL-en fra FINN.no eller lim inn stillingsannonsen manuelt. Legg til din bakgrunn og kontaktinformasjon.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "KI skriver søknaden",
        text: "Velg brevmal (Konservativ, Moderne eller Kreativ) og la KI-en generere en skreddersydd søknad basert på PSTAR-metoden.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Last ned og send",
        text: "Rediger teksten i editoren, velg eksportlayout, og last ned som PDF eller Word-dokument.",
        position: 3,
      },
    ],
  };
}

export function getHowToBuildCVSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hvordan lage CV med KI",
    description:
      "Bygg en profesjonell CV med KI-drevne forslag og 10 maler tilpasset norsk arbeidsmarked.",
    totalTime: "PT5M",
    tool: {
      "@type": "SoftwareApplication",
      name: "CVpilot",
      url: siteConfig.url,
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Fyll inn din informasjon",
        text: "Følg 6-stegs veiviseren: personalia, sammendrag, arbeidserfaring, utdanning, ferdigheter og språk.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "La KI forbedre innholdet",
        text: "Bruk KI til å generere profesjonelt sammendrag og forbedre erfaringsbeskrivelsene dine med konkrete resultater.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Velg mal og last ned",
        text: "Velg blant 10 profesjonelle maler (Nordisk, Oslo, Eksekutiv, Kreativ m.fl.) og last ned som PDF.",
        position: 3,
      },
    ],
  };
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hvordan fungerer CVpilot sin søknadsgenerator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lim inn en stillingsannonse fra FINN.no eller manuelt, velg brevmal (Konservativ, Moderne eller Kreativ), og la KI-en generere en skreddersydd søknad basert på din bakgrunn. Ferdig på under 2 minutter.",
        },
      },
      {
        "@type": "Question",
        name: "Hva koster det å bruke CVpilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CVpilot tilbyr tre pakker: Enkel (49 kr for 1 søknad), Standard (149 kr for 5 søknader + CV-bygger), og Max (249 kr for 20 søknader + full CV med KI-forbedring).",
        },
      },
      {
        "@type": "Question",
        name: "Kan jeg lage CV med CVpilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja! CV-byggeren har en 6-stegs veiviser med auto-lagring, KI-generert sammendrag, KI-forbedrede erfaringsbeskrivelser, og 10 profesjonelle PDF-maler tilpasset norsk arbeidsmarked.",
        },
      },
      {
        "@type": "Question",
        name: "Støtter CVpilot FINN.no?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, du kan lime inn en FINN.no-annonse-URL direkte, og CVpilot henter automatisk ut stillingsannonseteksten slik at du slipper å kopiere den manuelt.",
        },
      },
    ],
  };
}

export function getGeneratorFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hvordan fungerer søknadsgeneratoren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Du limer inn en stillingsannonse (fra FINN.no eller manuelt), legger til din bakgrunn og kontaktinformasjon, og velger brevmal. KI-en analyserer annonsen og genererer en skreddersydd søknad basert på PSTAR-metoden. Hele prosessen tar under 2 minutter.",
        },
      },
      {
        "@type": "Question",
        name: "Hva er PSTAR-metoden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PSTAR står for Problem, Situasjon, Tiltak, Aksjon og Resultat. Det er en anerkjent metode for å strukturere søknadsbrev som viser arbeidsgiveren konkrete eksempler på din kompetanse og dine resultater.",
        },
      },
      {
        "@type": "Question",
        name: "Kan jeg redigere søknaden etterpå?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, den genererte søknaden vises i en redigerbar editor. Du kan finjustere teksten, legge til detaljer eller endre formuleringer før du laster ned.",
        },
      },
      {
        "@type": "Question",
        name: "Hvilke brevmaler kan jeg velge mellom?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Det finnes tre brevmaler: Konservativ (best for offentlig sektor, storselskaper og jus), Moderne (ideell for tech, startup og kreative bransjer), og Kreativ (for design, media og kommunikasjon).",
        },
      },
      {
        "@type": "Question",
        name: "Støtter dere FINN.no?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja! Du kan lime inn en FINN.no-annonse-URL direkte i generatoren. Systemet henter automatisk ut stillingsannonseteksten slik at du slipper å kopiere den manuelt.",
        },
      },
      {
        "@type": "Question",
        name: "Hvilket format kan jeg laste ned søknaden i?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Søknaden kan lastes ned som PDF eller Word-dokument (.docx). Du kan også velge mellom ulike eksportlayouter som endrer det visuelle utseendet på dokumentet.",
        },
      },
    ],
  };
}

export function getCVFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hvordan fungerer CV-byggeren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CV-byggeren guider deg gjennom 6 steg: personalia, profesjonelt sammendrag, arbeidserfaring, utdanning, ferdigheter og språk. Du fyller inn informasjonen din steg for steg, og kan bruke KI til å forbedre teksten underveis. Til slutt velger du en av 10 maler og laster ned som PDF.",
        },
      },
      {
        "@type": "Question",
        name: "Hvilke CV-maler finnes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Det finnes 10 maler med unike layouter, farger og stiler — blant annet Nordisk, Oslo, Eksekutiv, Kreativ, Kompakt, Tidslinje, Fjord, Stavanger, Diplomatisk og Bergen. Alle er designet for norsk arbeidsmarked.",
        },
      },
      {
        "@type": "Question",
        name: "Kan KI-en skrive sammendrag for meg?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja! I steg 2 kan du trykke på en knapp for å la KI-en generere et profesjonelt sammendrag basert på erfaringen og ferdighetene du har fylt inn. Du kan deretter redigere og tilpasse teksten.",
        },
      },
      {
        "@type": "Question",
        name: "Lagres CV-en min?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CV-en lagres automatisk i nettleseren din (localStorage) mens du jobber, slik at du kan lukke siden og komme tilbake senere uten å miste data. Dataene lagres kun lokalt på din enhet.",
        },
      },
      {
        "@type": "Question",
        name: "Hvordan forbedrer KI erfaringsbeskrivelsene mine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KI-en omformulerer dine erfaringsbeskrivelser til konkrete, resultatfokuserte kulepunkter som fremhever dine prestasjoner og resultater.",
        },
      },
      {
        "@type": "Question",
        name: "Hvor lang bør en CV være?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I Norge anbefales det at en CV er 1-2 sider. Nyutdannede bør sikte på 1 side, mens erfarne kandidater med 10+ års erfaring kan bruke 2 sider.",
        },
      },
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export const siteConfig = {
  name: "CVpilot",
  url: "https://www.cvpilot.no",
  locale: "nb_NO",
  language: "nb",

  title: {
    default: "CVpilot – KI-drevet søknad og CV-generator for norsk arbeidsliv",
    template: "%s | CVpilot",
  },
  description:
    "Lag profesjonelle jobbsøknader og CV-er på under 2 minutter med KI. Tilpasset norsk arbeidsliv med FINN.no-integrasjon, PSTAR-metoden og 10 CV-maler. Fra kr 49.",

  twitterHandle: "@cvpilot",

  email: "kontakt@cvpilot.no",
  address: {
    city: "Oslo",
    country: "Norge",
  },

  creator: "CVpilot",
  publisher: "CVpilot",
} as const;

export const pageSeo = {
  home: {
    title:
      "CVpilot – KI-drevet søknad og CV-generator for norsk arbeidsliv",
    description:
      "Lag profesjonelle jobbsøknader og CV-er på under 2 minutter med KI. Tilpasset norsk arbeidsliv med FINN.no-integrasjon, PSTAR-metoden og 10 CV-maler. Fra kr 49.",
  },
  generator: {
    title: "Lag jobbsøknad med KI",
    description:
      "Generer en skreddersydd jobbsøknad på under 2 minutter. Lim inn stillingsannonsen fra FINN.no, velg brevmal, og last ned som PDF eller Word. PSTAR-metoden sikrer profesjonell kvalitet.",
  },
  cv: {
    title: "Bygg profesjonell CV med KI",
    description:
      "Lag en profesjonell CV med KI-drevne forslag. 6-stegs veiviser, automatisk sammendrag, 10 profesjonelle maler tilpasset norsk arbeidsmarked. Last ned som PDF.",
  },
  cvMal: {
    title: "CV Mal 2026 — 10 gratis maler for norsk arbeidsmarked",
    description:
      "Last ned profesjonelle CV-maler tilpasset norsk arbeidsliv. 10 gratis maler: Nordisk, Oslo, Eksekutiv, Kreativ og mer. Bygg CV-en online med KI-drevne forslag.",
  },
  jobbsoknadMal: {
    title: "Jobbsøknad Mal 2026 — Gratis maler og eksempler",
    description:
      "Last ned gratis jobbsøknad-maler tilpasset norsk arbeidsliv. 3 brevmaler med PSTAR-metoden, konkrete eksempler og tips.",
  },
  soknadsbrev: {
    title: "Søknadsbrev 2026 — Komplett guide med eksempler",
    description:
      "Lær hvordan du skriver et overbevisende søknadsbrev. Komplett guide med eksempler, før/etter-sammenligning og PSTAR-metoden.",
  },
} as const;

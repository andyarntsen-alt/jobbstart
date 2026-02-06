export const siteConfig = {
  name: "JobbStart",
  url: "https://jobbstart.no",
  locale: "nb_NO",
  language: "no",

  title: {
    default: "JobbStart – KI-drevet søknad og CV-generator for norsk arbeidsliv",
    template: "%s | JobbStart",
  },
  description:
    "Lag profesjonelle jobbsøknader og CV-er på under 2 minutter med KI. Tilpasset norsk arbeidsliv med FINN.no-integrasjon, PSTAR-metoden og 10 CV-maler. Fra kr 49.",

  twitterHandle: "@jobbstart",

  email: "kontakt@jobbstart.no",
  address: {
    city: "Oslo",
    country: "Norge",
  },

  creator: "JobbStart",
  publisher: "JobbStart",
} as const;

export const pageSeo = {
  home: {
    title:
      "JobbStart – KI-drevet søknad og CV-generator for norsk arbeidsliv",
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
} as const;

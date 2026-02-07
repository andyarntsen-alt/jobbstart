import { siteConfig } from "./seo";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hvordan-skrive-jobbsoknad",
    title: "Hvordan skrive jobbsøknad i 2025 — komplett guide",
    description:
      "Lær hvordan du skriver en jobbsøknad som skiller seg ut. Steg-for-steg guide med eksempler, PSTAR-metoden og tips tilpasset norsk arbeidsliv.",
    publishedAt: "2025-01-15",
    updatedAt: "2025-06-01",
    keywords: [
      "jobbsøknad",
      "hvordan skrive jobbsøknad",
      "søknadsbrev",
      "jobbsøknad eksempel",
      "jobbsøknad mal",
    ],
    content: `En god jobbsøknad kan være forskjellen mellom å få intervjuet og å havne i nei-bunken. I denne guiden viser vi deg nøyaktig hvordan du skriver en jobbsøknad som imponerer arbeidsgivere i Norge.

## Hva er en jobbsøknad?

En jobbsøknad (også kalt søknadsbrev) er et personlig brev du sender sammen med CV-en din når du søker på en stilling. Formålet er å vise arbeidsgiveren hvorfor akkurat du er rett person for jobben.

## Strukturen i en god jobbsøknad

### 1. Innledning — fang oppmerksomheten

Start med å referere til stillingen du søker på og hvor du fant annonsen. Unngå klisjéer som «Jeg viser til utlyst stilling». I stedet, vis umiddelbar relevans:

**Dårlig:** «Jeg viser til utlyst stilling som prosjektleder hos Equinor.»

**Bra:** «Med 5 års erfaring fra prosjektledelse i energisektoren og en dokumentert track record med å levere prosjekter under budsjett, søker jeg på stillingen som prosjektleder hos Equinor.»

### 2. Hoveddel — bruk PSTAR-metoden

PSTAR-metoden er gullstandarden for jobbsøknader i Norge:

- **P**roblem — Beskriv en utfordring du møtte
- **S**ituasjon — Forklar konteksten
- **T**iltak — Hva bestemte du deg for å gjøre?
- **A**ksjon — Hva gjorde du konkret?
- **R**esultat — Hva ble resultatet? (helst med tall)

**Eksempel:** «Da avdelingen slet med forsinkede leveranser (Problem), tok jeg initiativ til å innføre agile arbeidsprosesser (Tiltak). Jeg ledet implementeringen av Scrum for et team på 12 personer (Aksjon), noe som reduserte leveringstiden med 35 % innen 6 måneder (Resultat).»

### 3. Avslutning — vis motivasjon

Avslutt med hvorfor du ønsker å jobbe akkurat der, og hva du kan bidra med. Vis at du har gjort research på bedriften.

## 5 vanlige feil i jobbsøknader

1. **For generisk** — Ikke bruk samme søknad til alle stillinger. Tilpass den til hver enkelt annonse.
2. **For lang** — Hold deg til én side (300-400 ord er ideelt).
3. **Gjentar CV-en** — Søknaden skal utfylle CV-en, ikke kopiere den.
4. **Ingen konkrete eksempler** — Bruk tall og resultater.
5. **Skrivefeil** — Alltid korrekturles. Be noen andre lese gjennom.

## Hvordan KI kan hjelpe deg

Med moderne KI-verktøy kan du generere et førsteutkast på under 2 minutter. Du limer inn stillingsannonsen, legger til din bakgrunn, og KI-en lager en skreddersydd søknad basert på PSTAR-metoden. Deretter finjusterer du teksten selv.

## Oppsummering

- Tilpass søknaden til hver stilling
- Bruk PSTAR-metoden for konkrete eksempler
- Hold det kort (én side)
- Vis motivasjon for bedriften
- Korrekturles alltid`,
  },
  {
    slug: "cv-mal-norsk-guide",
    title: "CV-mal for norsk arbeidsmarked — 10 profesjonelle maler",
    description:
      "Finn den perfekte CV-malen for norsk arbeidsliv. Gratis tips om format, innhold og design. Se 10 maler og lær hva norske arbeidsgivere forventer.",
    publishedAt: "2025-02-01",
    updatedAt: "2025-06-01",
    keywords: [
      "cv mal",
      "cv mal norsk",
      "cv eksempel",
      "cv mal gratis",
      "lage cv",
      "profesjonell cv",
    ],
    content: `Din CV er det første arbeidsgiveren ser. En godt strukturert CV med riktig mal kan øke sjansene dine for å bli kalt inn til intervju betydelig.

## Hva norske arbeidsgivere forventer

I Norge er det visse konvensjoner for CV-er som skiller seg fra andre land:

- **Lengde:** 1-2 sider (maks 2 for erfarne)
- **Foto:** Valgfritt, men stadig vanligere
- **Personlig informasjon:** Fullt navn, e-post, telefon. Fødselsdato er valgfritt.
- **Språk:** Norsk for norske stillinger, med mindre annet er spesifisert

## De 6 delene i en norsk CV

### 1. Personlig informasjon
Navn, e-post, telefonnummer og eventuelt LinkedIn-profil. Adresse er ikke nødvendig.

### 2. Profesjonelt sammendrag
2-3 setninger som oppsummerer din erfaring og hva du tilbyr. Dette er det viktigste avsnittet — det bestemmer om arbeidsgiveren leser videre.

**Eksempel:** «Erfaren digital markedsfører med 7 års erfaring fra B2B-sektoren. Spesialisert på SEO, betalt annonsering og konverteringsoptimalisering. Har økt organisk trafikk med 200 % for tre norske tech-selskaper.»

### 3. Arbeidserfaring
List opp stillingene i omvendt kronologisk rekkefølge (nyeste først). For hver stilling:
- Stillingstittel
- Bedrift
- Periode (måned + år)
- 3-5 kulepunkter med konkrete resultater

**Tips:** Start hvert kulepunkt med et aktivt verb: «Ledet», «Implementerte», «Økte», «Reduserte».

### 4. Utdanning
Grad, institusjon og år. Nyutdannede bør ha dette høyere opp.

### 5. Kompetanser
Del inn i kategorier:
- Tekniske ferdigheter (programvare, verktøy, programmeringsspråk)
- Språk (med nivå: morsmål, flytende, grunnleggende)

### 6. Sertifiseringer og kurs
Relevante sertifiseringer som styrker profilen din.

## Hvilken CV-mal bør du velge?

Valget av mal avhenger av bransjen og stillingen:

- **Nordisk / Kompakt** — Enkel og profesjonell. Best for offentlig sektor, finans og store selskaper.
- **Oslo / Stavanger** — Moderne og ryddig. Passer for de fleste stillinger.
- **Eksekutiv / Diplomatisk** — Elegant og sofistikert. For lederposisjoner og senior-roller.
- **Kreativ / Bergen** — Fargerik og visuell. For design, media og kreative bransjer.
- **Tidslinje / Fjord** — Unik tidslinje-layout som viser karriereutvikling.

## Vanlige feil i norske CV-er

1. **Generiske beskrivelser** — «Ansvarlig for kundeservice» sier ingenting. Bruk tall: «Håndterte 50+ kundehenvendelser daglig med 95 % tilfredshet.»
2. **For mye informasjon** — Ikke ta med jobber fra 15+ år siden med mindre de er svært relevante.
3. **Ingen tilpasning** — Tilpass CV-en til stillingen du søker på. Fremhev relevant erfaring.
4. **Dårlig formatering** — Bruk konsistent layout, lesbar skriftstørrelse og nok luft.

## Oppsummering

- Hold CV-en til 1-2 sider
- Start med et sterkt sammendrag
- Bruk konkrete tall og resultater
- Velg mal basert på bransje
- Tilpass til hver stilling`,
  },
  {
    slug: "jobbintervju-tips",
    title: "Jobbintervju-tips — slik forbereder du deg i 2025",
    description:
      "Komplett guide til jobbintervjuet. Lær om vanlige spørsmål, STAR-metoden, hva du bør ha på deg, og hvordan du følger opp etterpå.",
    publishedAt: "2025-03-01",
    keywords: [
      "jobbintervju",
      "jobbintervju tips",
      "intervju spørsmål",
      "forberede jobbintervju",
      "star-metoden",
    ],
    content: `Gratulerer — du har fått innkalling til intervju! Nå gjelder det å forberede seg godt. Her er en komplett guide til hvordan du mestrer jobbintervjuet.

## Før intervjuet

### Research bedriften
- Les om bedriftens verdier, mål og siste nyheter
- Sjekk LinkedIn-profilene til de som skal intervjue deg
- Forstå bransjen og konkurrentene

### Forbered svar med STAR-metoden
STAR-metoden hjelper deg strukturere svar på atferdsspørsmål:
- **S**ituasjon — Beskriv konteksten
- **T**ask (oppgave) — Hva var din rolle?
- **A**ction (handling) — Hva gjorde du?
- **R**esultat — Hva ble utfallet?

### Vanlige intervjuspørsmål i Norge

1. **«Fortell om deg selv»** — Hold det til 2 minutter. Fokuser på relevant erfaring.
2. **«Hvorfor vil du jobbe her?»** — Vis at du har gjort research på bedriften.
3. **«Hva er dine styrker?»** — Gi konkrete eksempler.
4. **«Hva er din største svakhet?»** — Vær ærlig, men vis at du jobber med det.
5. **«Hvor ser du deg selv om 5 år?»** — Vis ambisjon, men vær realistisk.
6. **«Fortell om en utfordring du har løst»** — Bruk STAR-metoden.
7. **«Har du spørsmål til oss?»** — Alltid ha minst 2-3 spørsmål klare.

## Under intervjuet

### Kroppsspråk
- Gi et fast håndtrykk
- Hold øyekontakt
- Sitt oppreist, men avslappet
- Nikk og vis at du lytter aktivt

### Dos and Don'ts
**Do:**
- Vær konkret — bruk eksempler og tall
- Still gjennomtenkte spørsmål
- Vis entusiasme for stillingen
- Vær ærlig om det du ikke kan

**Don't:**
- Snakk negativt om tidligere arbeidsgivere
- Avbryt intervjueren
- Overdrive eller lyv
- Kom uforberedt

## Etter intervjuet

### Send takkebrev
Send en kort e-post innen 24 timer. Takk for tiden, gjenta din interesse, og referer til noe spesifikt fra samtalen.

**Eksempel:**
«Takk for en god samtale i dag. Jeg ble spesielt inspirert av teamets arbeid med bærekraftsinitiativene, og ser frem til muligheten for å bidra med min erfaring fra miljørapportering.»

## Oppsummering

- Research bedriften grundig
- Forbered STAR-eksempler
- Øv på vanlige spørsmål
- Vær konkret og ærlig
- Send takkebrev etterpå`,
  },
  {
    slug: "finn-no-jobbsoknad-tips",
    title: "Søke jobb på FINN.no — slik lykkes du",
    description:
      "Lær hvordan du søker jobb effektivt på FINN.no. Tips for å skille seg ut, bruke riktige filtre, og skrive søknader som matcher annonsene.",
    publishedAt: "2025-04-01",
    keywords: [
      "finn.no jobb",
      "søke jobb finn",
      "finn jobb",
      "jobbsøking",
      "finn.no søknad",
    ],
    content: `FINN.no er Norges største jobbportal med tusenvis av nye stillinger hver uke. Her er hvordan du bruker FINN.no mest effektivt i jobbsøkingen din.

## Slik bruker du FINN.no effektivt

### Sett opp jobbvarsel
Opprett et jobbvarsel for å få e-post når nye stillinger som matcher dine kriterier legges ut. Jo raskere du søker, jo bedre — mange arbeidsgivere vurderer søknader fortløpende.

### Bruk filtrene smart
- **Sted:** Velg fylke eller kommune
- **Bransje:** Avgrens til din bransje
- **Stillingstype:** Fast, vikar, deltid, etc.
- **Publiseringsdato:** Fokuser på de nyeste annonsene

### Les annonsen nøye
De fleste FINN.no-annonser følger en fast struktur:
1. Om bedriften
2. Arbeidsoppgaver
3. Kvalifikasjoner (krav vs. ønskelig)
4. Vi tilbyr
5. Søknadsfrist og kontaktperson

**Tips:** Skiller mellom «krav» og «ønskelig». Du trenger ikke oppfylle alt under «ønskelig» for å søke.

## Tilpass søknaden til FINN-annonsen

### Bruk nøkkelord fra annonsen
Arbeidsgivere og rekrutteringssystemer (ATS) leter etter spesifikke nøkkelord. Hvis annonsen sier «prosjektledelse» og «budsjettstyring», sørg for at disse ordene finnes i søknaden din.

### Match kvalifikasjonene
Gå gjennom listen over krav og kvalifikasjoner. For hvert punkt, gi et konkret eksempel på hvordan du oppfyller det.

### Tilpass CV-en
Juster rekkefølgen og vektleggingen i CV-en basert på hva annonsen etterspør.

## Vanlige feil på FINN.no

1. **Søker på alt** — Kvalitet slår kvantitet. 10 målrettede søknader er bedre enn 50 generiske.
2. **Ignorerer fristen** — Søk tidlig. Mange arbeidsgivere starter gjennomgang før fristen.
3. **Kopierer annonseteksten** — Ikke bare gjenta hva som står i annonsen. Vis hvordan du matcher kravene med dine egne ord.
4. **Glemmer kontaktpersonen** — Ring eller send en kort e-post til kontaktpersonen. Det viser initiativ.

## Bruk KI til å analysere annonser

Moderne KI-verktøy kan hjelpe deg med å:
- Trekke ut nøkkelord automatisk fra FINN-annonser
- Matche annonsen med din bakgrunn
- Generere et tilpasset førsteutkast av søknaden

Du limer inn FINN-annonsen, legger til din bakgrunn, og får en skreddersydd søknad på under 2 minutter.

## Oppsummering

- Opprett jobbvarsel for rask respons
- Les annonser grundig og noter nøkkelord
- Tilpass søknad og CV til hver stilling
- Søk tidlig — ikke vent til fristen
- Kontakt kontaktpersonen i annonsen`,
  },
  {
    slug: "nyutdannet-forste-jobb",
    title: "Nyutdannet? Slik får du din første jobb i Norge",
    description:
      "Guide for nyutdannede som skal søke sin første jobb. Lær hvordan du kompenserer for manglende erfaring med CV, søknad og nettverk.",
    publishedAt: "2025-05-01",
    keywords: [
      "nyutdannet jobb",
      "første jobb",
      "jobbsøking nyutdannet",
      "cv uten erfaring",
      "jobbsøknad nyutdannet",
    ],
    content: `Å søke sin første jobb etter studiene kan føles overveldende. Mange stillinger krever «2-3 års erfaring», og det føles som en catch-22. Her er hvordan du kommer i gang.

## Din erfaring er mer enn du tror

Som nyutdannet har du mer relevant erfaring enn du kanskje innser:

- **Deltidsjobber** — Viser arbeidsvilje og samarbeidsevne
- **Frivillig arbeid** — Viser engasjement og initiativ
- **Studentprosjekter** — Viser fagkunnskap og teamarbeid
- **Verv i studentforeninger** — Viser lederskap og organisering
- **Sommerjobber** — Viser bransjekjennskap
- **Masteroppgave/bacheloroppgave** — Viser analytiske evner

## CV for nyutdannede

### Legg utdanning øverst
Som nyutdannet bør utdanning komme før arbeidserfaring. Inkluder:
- Grad og institusjon
- Relevante fag og spesialisering
- Oppgaver du er stolt av
- Karaktergjennomsnitt (hvis over B/4.0)

### Fremhev overførbare ferdigheter
- Samarbeid fra gruppeprosjekter
- Presentasjonserfaring
- Analytiske evner fra oppgaveskriving
- Tekniske ferdigheter fra studiet

### Hold det til 1 side
Nyutdannede bør holde CV-en til 1 side. Fjern alt som ikke er relevant for stillingen du søker.

## Jobbsøknad uten erfaring

### Fokuser på motivasjon og potensial
Uten lang erfaring må du selge din motivasjon, lærevillighet og potensial:
- Hvorfor er du interessert i akkurat denne bedriften?
- Hva har du lært i studiene som er relevant?
- Hvilke personlige egenskaper gjør deg til en god kandidat?

### Bruk studentprosjekter som PSTAR-eksempler
Selv om du ikke har yrkeserfaring, kan du bruke eksempler fra studiet:

«Under min masteroppgave (Situasjon) møtte jeg en utfordring med å analysere store datasett (Problem). Jeg tok initiativ til å lære Python (Tiltak) og utviklet et analysescript som automatiserte prosessen (Aksjon). Resultatet var at analysetiden ble redusert fra 3 uker til 2 dager (Resultat).»

## Nettverk og alternativ jobbsøking

### LinkedIn er viktig
- Lag en komplett LinkedIn-profil
- Koble til studiekamerater, forelesere og bransjekontakter
- Del relevant innhold og vis faglig interesse

### Karrieresenteret ved universitetet
De fleste universiteter og høgskoler har karrieresentre som tilbyr:
- CV-gjennomgang
- Intervjutrening
- Bedriftspresentasjoner
- Jobbdatabaser

### Trainee-programmer
Mange store norske bedrifter har trainee-programmer rettet mot nyutdannede:
- DNB
- Equinor
- Telenor
- Aker Solutions
- NHO

## Oppsummering

- Undervurder ikke din eksisterende erfaring
- Legg utdanning øverst i CV-en
- Fokuser på motivasjon og potensial i søknaden
- Bruk studentprosjekter som PSTAR-eksempler
- Aktiver nettverket og bruk karrieresenteret`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blogg/${post.slug}`,
    inLanguage: "nb",
    keywords: post.keywords.join(", "),
  };
}

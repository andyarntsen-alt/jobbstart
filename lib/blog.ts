import { siteConfig } from "./seo";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
  category?: "cv" | "jobbsoknad" | "intervju" | "karriere";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hvordan-skrive-jobbsoknad",
    category: "jobbsoknad",
    title: "Hvordan skrive jobbsøknad i 2026 — komplett guide",
    description:
      "Lær hvordan du skriver en jobbsøknad som skiller seg ut. Steg-for-steg guide med eksempler, PSTAR-metoden og tips tilpasset norsk arbeidsliv.",
    publishedAt: "2025-01-15",
    updatedAt: "2026-02-07",
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
    category: "cv",
    title: "CV-mal for norsk arbeidsmarked — 10 profesjonelle maler",
    description:
      "Finn den perfekte CV-malen for norsk arbeidsliv. Gratis tips om format, innhold og design. Se 10 maler og lær hva norske arbeidsgivere forventer.",
    publishedAt: "2025-02-01",
    updatedAt: "2026-02-07",
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
    category: "intervju",
    title: "Jobbintervju-tips — slik forbereder du deg i 2026",
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
    category: "jobbsoknad",
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
    category: "karriere",
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
  {
    slug: "cv-eksempel-norsk",
    category: "cv",
    title: "CV-eksempel — 5 ferdige CV-er for ulike bransjer i 2026",
    description:
      "Se 5 komplette CV-eksempler for IT, helse, butikk, offentlig sektor og nyutdannede. Lær hva som fungerer i hver bransje med annoterte eksempler.",
    publishedAt: "2026-01-15",
    keywords: [
      "cv eksempel",
      "cv eksempel norsk",
      "cv eksempel 2026",
      "cv mal eksempel",
      "cv for IT",
    ],
    content: `Se 5 komplette CV-eksempler tilpasset ulike bransjer i Norge. Hvert eksempel viser hva som fungerer — og hva du bør unngå — med konkrete forklaringer.

## Hvorfor er CV-eksempler nyttige?

Et godt CV-eksempel gir deg en konkret mal å jobbe ut ifra. I stedet for å starte med blankt ark, kan du tilpasse et eksempel til din egen bakgrunn. Her viser vi 5 eksempler tilpasset de mest populære bransjene i Norge.

## 1. CV-eksempel: IT og teknologi

**Profil:** Fullstack-utvikler med 4 års erfaring

**Sammendrag:**
«Fullstack-utvikler med 4 års erfaring i React, Node.js og TypeScript. Har ledet utvikling av SaaS-plattformer med over 10.000 brukere. Spesialisert på skalerbar arkitektur, CI/CD og skyløsninger med AWS.»

**Nøkkelpunkter for IT-CV:**
- List teknologier og verktøy konkret (React, TypeScript, AWS, Docker)
- Inkluder GitHub-profil eller portefølje-URL
- Kvantifiser resultater: «Reduserte lastetiden med 60%», «Bygde API som håndterer 5000 forespørsler/sek»
- Sertifiseringer veier tungt: AWS Certified, Google Cloud, Scrum Master
- Hold det til 1-2 sider — rekrutterere i tech skanner raskt

**Anbefalt mal:** Oslo eller Stavanger — moderne design som viser teknisk kompetanse tydelig.

## 2. CV-eksempel: Helsesektoren

**Profil:** Sykepleier med 6 års erfaring

**Sammendrag:**
«Autorisert sykepleier med 6 års erfaring fra kirurgisk avdeling og akuttmottak. Spesialisert på postoperativ oppfølging og pasientkommunikasjon. Erfaren med elektronisk pasientjournal (DIPS) og tverrfaglig samarbeid.»

**Nøkkelpunkter for helse-CV:**
- Autorisasjon og HPR-nummer er kritisk — plasser det øverst
- Spesifiser avdelinger og fagområder
- Nevn systemer du kan: DIPS, MetaVision, Visma
- Kurs og sertifiseringer er viktige: AHLR, traumekurs, veilederkompetanse
- Vakter og turnus kan nevnes hvis relevant

**Anbefalt mal:** Nordisk eller Kompakt — ryddig og profesjonell for helsesektoren.

## 3. CV-eksempel: Butikk og salg

**Profil:** Butikksjef med 3 års erfaring

**Sammendrag:**
«Engasjert butikksjef med 3 års erfaring fra faghandel. Har økt omsetningen med 22% gjennom strategisk vareeksponering og personalutvikling. Erfaren med KPI-styring, varelager og kundeopplevelse.»

**Nøkkelpunkter for butikk-CV:**
- Fremhev salgsresultater med konkrete tall
- Nevn kasse- og lagersystemer (Visma, SAP, Shopify)
- Personalansvar og teamledelse er verdifullt
- Kundetilfredshet og NPS-score imponerer
- Vis fleksibilitet med skiftarbeid og helger

**Anbefalt mal:** Fjord eller Oslo — balansert mellom profesjonell og approachable.

## 4. CV-eksempel: Offentlig sektor

**Profil:** Rådgiver i kommune med 5 års erfaring

**Sammendrag:**
«Erfaren rådgiver med 5 års erfaring fra kommunal forvaltning. Spesialisert på plan- og byggesaker med inngående kjennskap til plan- og bygningsloven. Har ledet digitalisering av søknadsprosessen som reduserte saksbehandlingstiden med 40%.»

**Nøkkelpunkter for offentlig sektor-CV:**
- Referer til relevant lovverk og forskrifter
- Nevn erfaring med offentlige systemer og prosesser
- Vektlegg prosjekter med samfunnsnytte
- Utdanning og formalkompetanse veier tungt
- Inkluder sikkerhetsklarering hvis relevant

**Anbefalt mal:** Nordisk eller Diplomatisk — formell og ryddig, som forventet i offentlig sektor.

## 5. CV-eksempel: Nyutdannet

**Profil:** Nyutdannet siviløkonom

**Sammendrag:**
«Nyutdannet siviløkonom fra NHH med spesialisering i finans og strategi. Relevant erfaring fra sommerjobb i DNB Markets og styreverv i studentforeningen. Analytisk, resultatorientert og klar for nye utfordringer.»

**Nøkkelpunkter for nyutdannet-CV:**
- Legg utdanning øverst (før erfaring)
- Inkluder relevante fag, karaktersnitt og oppgavetema
- Fremhev verv, frivillig arbeid og deltidsjobber
- Vis overførbare ferdigheter fra studiene
- Hold det til 1 side — maks

**Anbefalt mal:** Kompakt eller Nordisk — ren layout som fremhever innhold over erfaring.

## Generelle tips for alle bransjer

1. **Start med et sterkt sammendrag** — 2-3 setninger som fanger essensen av din profil
2. **Bruk aktive verb** — «Ledet», «Utviklet», «Økte», «Implementerte»
3. **Kvantifiser alt du kan** — tall og prosenter gjør inntrykk
4. **Tilpass til stillingen** — fremhev det som er relevant for den aktuelle jobben
5. **Korrekturles** — skrivefeil er unødvendige selvmål

## Oppsummering

- Velg CV-mal basert på bransje og stillingsnivå
- Start med et konkret sammendrag som viser din verdi
- Bruk eksemplene over som utgangspunkt og tilpass til din bakgrunn
- Kvantifiser resultater og bruk aktive verb
- Bygg din egen CV med CVpilot sin KI-drevne CV-bygger`,
  },
  {
    slug: "hvordan-lage-cv",
    category: "cv",
    title: "Hvordan lage CV — steg-for-steg guide 2026",
    description:
      "Komplett guide til å lage en profesjonell CV i 2026. Lær om struktur, innhold, formatering og de vanligste feilene norske jobbsøkere gjør.",
    publishedAt: "2026-01-20",
    keywords: [
      "hvordan lage cv",
      "lage cv",
      "cv tips",
      "lag cv",
      "cv guide",
    ],
    content: `Å lage en god CV er en ferdighet alle trenger i arbeidslivet. Denne guiden tar deg gjennom hele prosessen — fra blank side til ferdig PDF klar til å sendes.

## Hva er en CV?

CV står for «curriculum vitae» og betyr «livsløp» på latin. I Norge er CV-en en strukturert oversikt over din utdanning, arbeidserfaring, ferdigheter og kompetanse. Den sendes sammen med et søknadsbrev når du søker jobb.

## Steg 1: Samle informasjonen din

Før du begynner å skrive, samle alt du trenger:

- **Personlig informasjon:** Fullt navn, e-post, telefonnummer, eventuelt LinkedIn
- **Arbeidserfaring:** Alle relevante stillinger med datoer, titler og resultater
- **Utdanning:** Grader, institusjoner, spesialiseringer og datoer
- **Ferdigheter:** Tekniske verktøy, programvare, språk
- **Sertifiseringer:** Relevante kurs og sertifikater

**Tips:** Lag en «master-CV» med absolutt alt. Deretter tilpasser du en kortere versjon til hver stilling du søker på.

## Steg 2: Skriv et sterkt sammendrag

Sammendraget er det første arbeidsgiveren leser — og det viktigste avsnittet i CV-en. Det bør være 2-3 setninger som oppsummerer:

1. **Hvem du er** — din rolle og erfaringsnivå
2. **Hva du kan** — dine spesialområder
3. **Hva du har oppnådd** — ditt beste resultat

**Bra eksempel:** «Digital markedsfører med 5 års erfaring fra B2B SaaS. Spesialisert på SEO og innholdsmarkedsføring. Har økt organisk trafikk med 180% og generert 500+ kvalifiserte leads per måned.»

**Dårlig eksempel:** «Motivert og hardtarbeidende person som liker å jobbe i team og søker nye utfordringer.»

## Steg 3: Beskriv arbeidserfaringen din

For hver stilling, inkluder:
- **Stillingstittel** (fet skrift)
- **Bedrift** og bransje
- **Periode** (måned/år — måned/år)
- **3-5 kulepunkter** med konkrete resultater

### Formelen for gode kulepunkter

Bruk denne formelen: **Aktivt verb + hva du gjorde + resultat med tall**

- «Ledet et team på 8 utviklere i redesign av kundeportalen, som økte brukertilfredsheten med 35%»
- «Implementerte automatisert testing som reduserte feilraten med 60% og frigjorde 10 timer/uke»
- «Utviklet ny salgsstrategi som genererte 2,5 MNOK i nye kontrakter første kvartal»

### Aktive verb du kan bruke
Ledet, Utviklet, Implementerte, Økte, Reduserte, Etablerte, Optimaliserte, Forhandlet, Koordinerte, Analyserte

## Steg 4: Legg til utdanning

For de fleste er dette kort og enkelt:
- **Grad** (Bachelor, Master, etc.)
- **Institusjon** (UiO, NHH, NTNU, etc.)
- **År** (startår — sluttår)
- **Spesialisering** (hvis relevant)

**For nyutdannede:** Legg utdanning OVER arbeidserfaring. Inkluder relevante fag, prosjekter og karaktersnitt hvis det er sterkt (B/4.0 eller bedre).

## Steg 5: List kompetanser og språk

Del inn i tydelige kategorier:

**Tekniske ferdigheter:**
Programvare, verktøy og systemer du behersker. Vær spesifikk — «Excel (avansert: pivot, VBA)» er bedre enn bare «Office-pakken».

**Språk:**
List språk med nivå: Morsmål, Flytende, Grunnleggende. Norsk og engelsk er standard — inkluder andre språk du kan.

## Steg 6: Velg riktig format og mal

### Kronologisk CV (anbefalt)
Lister erfaring i omvendt kronologisk rekkefølge (nyeste først). Dette er standarden i Norge og foretrukket av de fleste arbeidsgivere.

### Funksjonell CV
Organisert etter kompetanseområder i stedet for tid. Kan være nyttig ved karriereskifte, men er mindre vanlig i Norge.

### Kombinert CV
Blander kronologisk og funksjonell. Starter med nøkkelkompetanser, deretter kronologisk erfaring.

## 7 vanlige feil du må unngå

1. **Skrivefeil og grammatikkfeil** — alltid korrekturles minst to ganger
2. **Irrelevant informasjon** — fjern jobber og ferdigheter som ikke er relevante
3. **For lang CV** — maks 2 sider for erfarne, 1 side for nyutdannede
4. **Generiske beskrivelser** — «ansvarlig for prosjekter» sier ingenting
5. **Dårlig formatering** — inkonsistent skrift, farger og avstand
6. **Manglende kontaktinformasjon** — sjekk at e-post og telefonnummer er korrekt
7. **Utdatert innhold** — oppdater CV-en for hver søknad

## Oppsummering

- Start med å samle all informasjon i en master-CV
- Skriv et sterkt sammendrag som fanger oppmerksomhet
- Bruk aktive verb og konkrete tall i erfaringsbeskrivelsene
- Velg mal basert på bransje og stillingsnivå
- Tilpass CV-en til hver stilling du søker på
- Korrekturles alltid — og be gjerne noen andre lese gjennom`,
  },
  {
    slug: "jobbsoknad-eksempel",
    category: "jobbsoknad",
    title: "Jobbsøknad-eksempel — 3 ferdige søknader for ulike bransjer",
    description:
      "Se 3 komplette jobbsøknad-eksempler for tech, helse og butikk. Lær hva som fungerer med annoterte eksempler og PSTAR-metoden.",
    publishedAt: "2026-01-25",
    keywords: [
      "jobbsøknad eksempel",
      "søknadsbrev eksempel",
      "søknad eksempel",
      "jobbsøknad eksempel 2026",
    ],
    content: `Se 3 komplette jobbsøknad-eksempler med forklaringer av hva som fungerer og hvorfor. Bruk dem som inspirasjon til din egen søknad.

## Hvorfor trenger du jobbsøknad-eksempler?

Et godt eksempel viser deg ikke bare hva du bør skrive, men også strukturen og tonen som fungerer i ulike bransjer. Alle eksemplene under bruker PSTAR-metoden og er tilpasset norsk arbeidsliv.

## Eksempel 1: Tech / IT — Utvikler-stilling

**Søknad til stilling som Frontend-utvikler hos Schibsted:**

«Med 3 års erfaring som frontend-utvikler og spisskompetanse i React og TypeScript, søker jeg stillingen som Senior Frontend-utvikler i Schibsteds produktteam.

Hos Finn.no ledet jeg redesignet av søkeresultat-siden som brukes av 3 millioner nordmenn månedlig. Da Core Web Vitals-scorene var under Googles terskelverdi (Problem), analyserte jeg ytelsesflaskehalser i en app med 200+ komponenter (Situasjon). Jeg implementerte code-splitting, lazy loading og migrerte fra CSS-in-JS til Tailwind CSS (Tiltak/Aksjon). Resultatet var 45% raskere LCP, 60% reduksjon i JavaScript-bundle og grønne Core Web Vitals for alle sider (Resultat).

Schibsteds visjon om å bygge verdens beste markedsplasser inspirerer meg. Jeg er spesielt interessert i deres arbeid med personalisering og maskinlæring i brukeropplevelsen. Med min erfaring fra storskala frontendutvikling i norske mediehus, er jeg overbevist om at jeg kan bidra til å løfte produktopplevelsen videre.

Jeg ser frem til en samtale om hvordan min kompetanse kan styrke teamet.»

**Hva fungerer her:**
- Åpner med konkret kompetanse og erfaring
- PSTAR-eksempel med imponerende, kvantifiserbare resultater
- Viser kjennskap til bedriften og spesifikke prosjekter
- Profesjonell men personlig tone

## Eksempel 2: Helse — Sykepleier

**Søknad til stilling som sykepleier ved OUS, Rikshospitalet:**

«Som autorisert sykepleier med 4 års erfaring fra kirurgisk avdeling og et brennende engasjement for pasientomsorg, søker jeg stillingen som sykepleier ved Avdeling for organtransplantasjon på Rikshospitalet.

Ved Drammen sykehus opplevde avdelingen en markant økning i reinnleggelser etter kirurgiske inngrep (Problem). Som en del av et tverrfaglig team på 15 sykepleiere (Situasjon), tok jeg initiativ til å utvikle en ny utskrivningssjekkliste og pasientopplæring med fokus på egenomsorg (Tiltak). Jeg ledet implementeringen, holdt opplæring for kollegaer og fulgte opp pasienter telefonisk de første 48 timene (Aksjon). Reinnleggelsesraten sank fra 12% til 7% over 6 måneder (Resultat).

Rikshospitalets fremragende fagmiljø innen transplantasjonsmedisin har inspirert meg siden sykepleierstudiet. Jeg ønsker å videreutvikle min kompetanse i dette spesialiserte feltet, og tror min erfaring med postoperativ oppfølging og kvalitetsforbedringsprosjekter vil være verdifull for avdelingen.

Jeg stiller gjerne til samtale og kan tiltre fra 1. mars.»

**Hva fungerer her:**
- Nevner autorisasjon umiddelbart (viktig i helse)
- Konkret PSTAR-eksempel med pasientrelaterte resultater
- Viser faglig motivasjon for den spesifikke avdelingen
- Formell men varm tone

## Eksempel 3: Butikk / Retail — Butikksjef

**Søknad til stilling som butikksjef hos XXL Sport:**

«Med 3 års erfaring som assisterende butikksjef i sportsbransjen og en dokumentert evne til å øke salg og kundetilfredshet, søker jeg stillingen som butikksjef ved XXL Sandvika.

I min nåværende stilling hos Sport Outlet Asker identifiserte jeg at konverteringsraten på kvelder og helger var 30% lavere enn formiddager (Problem). Med et team på 12 ansatte i en butikk med 15 MNOK i årlig omsetning (Situasjon), utarbeidet jeg en ny bemanningsplan og innførte produktfokusert opplæring for kveldsskiftet (Tiltak). Jeg ledet ukentlige salgsmøter og implementerte et incentivprogram for tilleggssalg (Aksjon). Konverteringsraten på kvelder økte med 40%, og total omsetning vokste med 18% sammenlignet med året før (Resultat).

XXLs posisjon som Nordens ledende sportskjede og deres satsing på kundeopplevelse motiverer meg. Jeg er spesielt interessert i deres omnikanal-strategi og ser frem til å bidra med min erfaring fra fysisk butikkdrift kombinert med digital forståelse.

Jeg er tilgjengelig for samtale og kan starte med to ukers varsel.»

**Hva fungerer her:**
- Konkrete salgstall som viser forretningsforståelse
- PSTAR-eksempel relevant for butikksjef-rollen
- Nevner spesifikke initiativer som viser lederegenskaper
- Viser kjennskap til XXLs strategi

## Sjekkliste for din egen søknad

1. **Har du åpnet med relevant kompetanse?** (ikke klisjéer)
2. **Har du minst ett PSTAR-eksempel?** (med tall)
3. **Har du vist motivasjon for bedriften?** (spesifikt, ikke generisk)
4. **Er søknaden under 400 ord?** (én A4-side)
5. **Har du korrekturlest?** (skrivefeil = nei-bunken)
6. **Er tonen tilpasset bransjen?** (formell vs. uformell)

## Oppsummering

- Studer eksemplene og tilpass strukturen til din egen bakgrunn
- Bruk PSTAR-metoden for å vise konkret kompetanse med målbare resultater
- Tilpass tone og innhold til bransjen og stillingen
- Hold deg til én A4-side
- Korrekturles alltid`,
  },
  {
    slug: "personlig-brev-jobb",
    category: "jobbsoknad",
    title: "Personlig brev til jobbsøknad — hva skriver du?",
    description:
      "Lær forskjellen mellom personlig brev, søknadsbrev og motivasjonsbrev. Komplett guide med tips og eksempler for norsk arbeidsliv.",
    publishedAt: "2026-02-01",
    keywords: [
      "personlig brev",
      "motivasjonsbrev",
      "personlig brev jobb",
      "søknadsbrev vs motivasjonsbrev",
    ],
    content: `Mange stillingsannonser ber om et «personlig brev» eller «motivasjonsbrev». Men hva er egentlig forskjellen på disse begrepene, og hva bør du skrive? Her er en komplett guide.

## Hva er et personlig brev?

I Norge brukes «personlig brev», «søknadsbrev», «søkerbrev» og «motivasjonsbrev» ofte om hverandre. Alle refererer til det samme dokumentet: et personlig brev du sender sammen med CV-en når du søker på en jobb.

Formålet er å:
- Vise hvem du er utover det som står i CV-en
- Forklare hvorfor du er riktig for stillingen
- Demonstrere motivasjon for bedriften
- Gi konkrete eksempler på din kompetanse

## Forskjellen mellom begrepene

### Søknadsbrev / Jobbsøknad
Det vanligste begrepet i Norge. Fokuserer på din kompetanse, erfaring og relevans for stillingen. Brukes for de fleste jobbsøknader.

### Motivasjonsbrev
Fokuserer mer på din motivasjon, verdier og fremtidsmål. Mer vanlig i akademiske søknader, stipendsøknader og internasjonale stillinger.

### Personlig brev
En mer uformell betegnelse for det samme. Når en norsk arbeidsgiver ber om et «personlig brev», mener de vanligvis et søknadsbrev.

**Konklusjon:** For jobbsøknader i Norge er alle tre begrepene praktisk talt synonyme. Skriv et brev som kombinerer kompetanse, erfaring og motivasjon.

## Strukturen i et godt personlig brev

### 1. Overskrift (valgfritt)
Noen foretrekker å starte med en overskrift som «Søknad — [stillingstittel]». Andre hopper rett til brødteksten. Begge er akseptabelt.

### 2. Innledning (2-3 setninger)
Åpne med en setning som fanger oppmerksomheten. Nevn stillingen du søker og vis umiddelbar relevans.

### 3. Hoveddel (2-3 avsnitt)
Bruk PSTAR-metoden for å gi konkrete eksempler. Vis at du matcher kravene i annonsen med din erfaring.

### 4. Motivasjon (1 avsnitt)
Forklar hvorfor du vil jobbe hos akkurat denne bedriften. Nevn noe spesifikt — et prosjekt, en verdi eller et mål.

### 5. Avslutning (1-2 setninger)
Si at du ser frem til en samtale. Vær direkte og selvsikker.

## 5 tips for et overbevisende personlig brev

### 1. Gjør research på bedriften
Besøk nettsiden, les nyheter og sjekk LinkedIn. Nevn noe spesifikt i brevet som viser at du har gjort hjemmeleksen.

### 2. Tilpass til stillingen
Bruk nøkkelord fra annonsen. Hvis de søker «prosjektleder med erfaring fra agile metoder», sørg for at disse ordene finnes i brevet ditt.

### 3. Vis, ikke fortell
«Jeg er en god leder» overbeviser ingen. «Jeg ledet et team på 8 utviklere som leverte prosjektet 2 uker før deadline» overbeviser.

### 4. Hold det kort
300-400 ord er ideelt. Rekrutterere bruker 6-8 sekunder på første gjennomlesning. Hvert ord skal ha en funksjon.

### 5. Vær deg selv
Autentisitet skinner gjennom. Bruk din egen stemme, ikke klisjéer. Skriv som du snakker (men litt mer formelt).

## Forskjellen på formelt og uformelt brev

### Formelt (offentlig sektor, finans, jus)
- «Undertegnede søker herved på stillingen som...»
- Saklig og profesjonell tone
- Unngå personlige anekdoter
- Fokus på formalkompetanse og erfaring

### Uformelt (startup, tech, kreative bransjer)
- «Med 3 års erfaring i React og en lidenskap for brukeropplevelse...»
- Personlig og engasjerende tone
- Rom for å vise personlighet
- Fokus på prosjekter og konkrete resultater

### Balansert (de fleste stillinger)
- Profesjonell men approachable
- Konkret uten å være stiv
- Vis motivasjon uten å overdrive
- PSTAR-eksempler med personlig touch

## Vanlige feil å unngå

1. **Starter med «Jeg viser til utlyst stilling»** — Kjedelig og generisk. Åpne med noe som fanger.
2. **Gjentar CV-en** — Brevet skal utfylle CV-en, ikke kopiere den. Fortell historien bak tallene.
3. **For mye «jeg»** — Fokuser på hva du kan gjøre for bedriften, ikke hva bedriften kan gjøre for deg.
4. **Generisk brev** — Det er åpenbart for leseren om du har sendt samme brev til 50 bedrifter.
5. **Skrivefeil** — Den enkleste måten å havne i nei-bunken. Korrekturles alltid.

## Oppsummering

- Personlig brev, søknadsbrev og motivasjonsbrev er det samme i norsk jobbsøking
- Strukturer brevet med innledning, PSTAR-eksempler, motivasjon og avslutning
- Tilpass tone og innhold til bransjen
- Gjør research på bedriften og bruk nøkkelord fra annonsen
- Hold det kort (300-400 ord) og korrekturles`,
  },
  {
    slug: "cv-uten-erfaring",
    category: "cv",
    title: "CV uten erfaring — slik lager du en overbevisende CV",
    description:
      "Har du lite eller ingen arbeidserfaring? Lær hvordan du lager en CV som imponerer med utdanning, ferdigheter og overførbar kompetanse.",
    publishedAt: "2026-02-05",
    keywords: [
      "cv uten erfaring",
      "cv nyutdannet",
      "cv student",
      "første cv",
      "cv uten arbeidserfaring",
    ],
    content: `Å lage CV uten arbeidserfaring kan virke umulig. Men alle starter et sted, og det finnes gode strategier for å imponere arbeidsgivere selv uten tradisjonell yrkeserfaring.

## Du har mer erfaring enn du tror

Mange tenker at «erfaring» bare betyr betalte jobber. Men arbeidsgivere verdsetter mange typer kompetanse:

- **Utdanning** — Fagkunnskap, spesialisering, prosjekter
- **Deltidsjobber** — Viser arbeidsvilje og pålitelighet
- **Frivillig arbeid** — Viser engasjement og initiativ
- **Studentverv** — Viser lederskap og samarbeid
- **Hobbyer med resultater** — Blogg, koding, idrettstrening
- **Studieprosjekter** — Viser analytiske evner og teamarbeid

## Slik strukturerer du CV uten erfaring

### 1. Personlig informasjon
Samme som alle andre CV-er: navn, e-post, telefon, eventuelt LinkedIn.

### 2. Sammendrag — selg potensialet ditt
Dette er spesielt viktig når du mangler erfaring. Fokuser på:
- Din utdanning og spesialisering
- Dine sterkeste ferdigheter
- Hva du brenner for
- Hva du kan bidra med

**Eksempel:** «Nyutdannet sivilingeniør fra NTNU med spesialisering i fornybar energi. Sterk analytisk bakgrunn fra masteroppgave om vindkraftoptimalisering. Erfaring med Python, MATLAB og prosjektledelse fra studentprosjekter. Motivert for å bidra til energiomstillingen i Norge.»

### 3. Utdanning — dette er din hovedseksjon
Plasser utdanning ØVERST i CV-en (over erfaring). Inkluder:
- Grad og institusjon
- Relevante fag og spesialisering
- Masteroppgave/bacheloroppgave (tittel og kort beskrivelse)
- Karaktersnitt (hvis B/4.0 eller bedre)
- Utveksling (hvis relevant)

### 4. Relevant erfaring — definer «erfaring» bredt
Under overskriften «Relevant erfaring» (ikke «Arbeidserfaring»), inkluder:

**Studentverv:**
- Leder, Linjeforeningen NTNU (2024-2025)
- Organiserte 8 arrangementer for 200+ studenter
- Ledet budsjett på 150.000 kr

**Frivillig arbeid:**
- Mattehjelpelærer, Røde Kors (2024)
- Holdt ukentlig leksehjelp for 15 ungdomsskoleelever

**Studentprosjekter:**
- Gruppeprosjekt: Utviklet prototype for smart strømstyring (React, Python)
- Individuell oppgave: Analyserte 10 års vinddata med maskinlæring

### 5. Ferdigheter — vis bredden din
Vær konkret og spesifikk:
- **Teknisk:** Python, Excel (avansert), MATLAB, AutoCAD
- **Språk:** Norsk (morsmål), Engelsk (flytende), Tysk (grunnleggende)
- **Annet:** Presentasjoner, rapportskriving, prosjektledelse

## Trikset: Bruk overførbare ferdigheter

Overførbare ferdigheter er kompetanse du har tilegnet deg i én kontekst, men som er verdifull i en annen:

| Fra studiene | Relevant for jobb |
|---|---|
| Gruppeprosjekter | Teamarbeid og samarbeid |
| Presentasjoner | Kommunikasjon og formidling |
| Oppgaveskriving | Analyse og rapportering |
| Eksamensperioder | Tidsstyring under press |
| Studentverv | Lederskap og organisering |

## Konkret eksempel: Før og etter

**Før (svakt):**
«Jeg er nyutdannet og har ikke så mye erfaring, men jeg er motivert og hardtarbeidende. Jeg lærer raskt og jobber godt i team.»

**Etter (sterkt):**
«Nyutdannet dataingeniør fra UiO med spisskompetanse i fullstack-utvikling. Utviklet en fungerende webapplikasjon for pasientregistrering som bachelorprosjekt (React, Node.js, PostgreSQL). Leder i Cybernetisk Selskab med ansvar for tekniske arrangementer for 300+ studenter.»

## Hvilken CV-mal passer for deg?

Uten mye erfaring bør du velge maler som fremhever innhold og ferdigheter:

- **Kompakt** — Maksimal informasjon på minimal plass
- **Nordisk** — Ren og profesjonell, lar innholdet snakke
- **Oslo** — Moderne design med tydelig hierarki

Unngå kreative maler med mye visuelt — de fungerer best når du har erfaring å fylle dem med.

## 5 tips spesielt for deg uten erfaring

1. **Ikke unnskyld deg** — Skriv aldri «mangler erfaring» i CV-en. Fokuser på hva du KAN.
2. **Tilpass til hver stilling** — Fremhev de ferdighetene og erfaringene som er mest relevante.
3. **Bruk aktive verb** — «Ledet», «Utviklet», «Organiserte» — selv for studentprosjekter.
4. **Inkluder resultater** — «Organiserte arrangement for 200 studenter» er bedre enn «Medlem av linjeforeningen».
5. **Hold det til 1 side** — Du har ikke nok å fylle 2 sider med, og det er helt greit.

## Oppsummering

- Definer «erfaring» bredt — inkluder alt relevant
- Plasser utdanning øverst
- Skriv et sterkt sammendrag som selger potensialet ditt
- Bruk overførbare ferdigheter fra studiene
- Velg en ren, profesjonell CV-mal
- Hold det til 1 side og fokuser på kvalitet over kvantitet`,
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
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article p:first-of-type"],
    },
  };
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === currentSlug);
  if (!current) return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 2 : 0;
      const bScore = b.category === current.category ? 2 : 0;
      const aKeywords = a.keywords.filter((k) => current.keywords.includes(k)).length;
      const bKeywords = b.keywords.filter((k) => current.keywords.includes(k)).length;
      return (bScore + bKeywords) - (aScore + aKeywords);
    })
    .slice(0, limit);
}

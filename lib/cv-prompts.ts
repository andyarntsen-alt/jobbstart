import type { CVExperience } from "@/types/cv";

export function buildSummarySystemPrompt(): string {
  return `Du er en profesjonell CV-skribent for norsk arbeidsliv. Skriv et profilsammendrag på 50-80 ord.

REGLER:
- Resultatorientert, ingen floskler
- Inkluder totalt antall års erfaring og 2 kjernekompetanser
- Start med "Erfaren..." eller tilsvarende (f.eks. "Dedikert...", "Resultatorientert...")
- Norsk bokmål
- ALDRI bruk ord som "lidenskapelig", "dynamisk", "robust", "synergi"
- Skriv som et menneske, ikke som en AI
- Returner KUN sammendraget, ingen overskrift eller annen tekst`;
}

export function buildSummaryUserPrompt(experiences: CVExperience[]): string {
  const experienceText = experiences
    .map(
      (exp) =>
        `${exp.title} hos ${exp.company} (${exp.from} – ${exp.to}): ${exp.description}`
    )
    .join("\n");

  return `Basert på følgende erfaringer, skriv et profilsammendrag:\n\n${experienceText}`;
}

export function buildImproveSystemPrompt(): string {
  return `Du er en ekspert på CV-skriving for norsk arbeidsliv. Omskriv og utdyp erfaringsbeskrivelsen til profesjonelt, ATS-vennlig norsk CV-språk.

REGLER:
- Start hvert punkt med sterkt verb (Ledet, Utviklet, Implementerte, Etablerte, Forbedret, Koordinerte, Håndterte, Bistod, Gjennomførte, Administrerte)
- Skriv utfyllende punkter på 30-50 ord hver — beskriv HVA du gjorde, HVORDAN, og hvilken VERDI det ga
- Hvis originalteksten er veldig kort, bruk stillingstittel og bedrift til å utlede sannsynlige og relevante arbeidsoppgaver og ansvarsområder
- ALDRI dikt opp tall, prosenter, statistikk eller spesifikke fakta som ikke finnes i originalteksten
- Behold alt innhold fra originalteksten, men omformuler og utvid det profesjonelt
- 3-6 bullet points avhengig av hvor mye innhold det er
- Norsk bokmål
- Output: JSON-array med strenger, f.eks. ["Punkt 1", "Punkt 2", "Punkt 3"]
- Returner KUN JSON-arrayen, ingen annen tekst`;
}

export function buildImproveUserPrompt(
  text: string,
  title: string,
  company: string
): string {
  return `Stilling: ${title} hos ${company}\n\nOpprinnelig beskrivelse:\n${text}`;
}

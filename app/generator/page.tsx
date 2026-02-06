"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import JobInput from "@/components/generator/JobInput";
import TemplateSelector from "@/components/generator/TemplateSelector";
import GeneratedLetter from "@/components/generator/GeneratedLetter";
import DownloadButtons from "@/components/generator/DownloadButtons";
import LayoutSelector from "@/components/generator/LayoutSelector";
import GeneratorSeoContent from "@/components/generator/GeneratorSeoContent";
import type { TemplateStyle, ContactInfo, ExportLayout } from "@/types/application";

export default function GeneratorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [userBackground, setUserBackground] = useState("");
  const [template, setTemplate] = useState<TemplateStyle>("moderne");
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
  });
  const [generatedText, setGeneratedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPaid] = useState(true); // TODO: Set back to false when Stripe is connected
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [layout, setLayout] = useState<ExportLayout>("profesjonell");
  const [jobTitle, setJobTitle] = useState("");
  const [isImprovingBackground, setIsImprovingBackground] = useState(false);
  const [improveError, setImproveError] = useState("");

  async function handleImproveBackground() {
    setImproveError("");
    setIsImprovingBackground(true);

    try {
      const res = await fetch("/api/improve-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: userBackground,
          jobDescription: jobDescription || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setImproveError(data.error || "Kunne ikke forbedre teksten.");
        return;
      }

      setUserBackground(data.improved);
    } catch {
      setImproveError("Kunne ikke koble til serveren. Prøv igjen.");
    } finally {
      setIsImprovingBackground(false);
    }
  }

  async function handleFetchFromUrl(url: string) {
    setUrlError("");
    setIsFetchingUrl(true);

    try {
      const res = await fetch("/api/scrape-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUrlError(data.error || "Kunne ikke hente annonsen.");
        return;
      }

      setJobDescription(data.text);
      if (data.title) setJobTitle(data.title);
    } catch {
      setUrlError("Kunne ikke koble til serveren. Prøv igjen.");
    } finally {
      setIsFetchingUrl(false);
    }
  }

  async function handleGenerate() {
    if (!jobDescription.trim()) {
      setError("Lim inn en stillingsannonse først.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          userBackground,
          template,
          contactInfo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Noe gikk galt. Prøv igjen.");
        return;
      }

      setGeneratedText(data.text);
      setWordCount(data.wordCount);
    } catch {
      setError("Kunne ikke koble til serveren. Sjekk internettforbindelsen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-10">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight">
              JOBBSTART
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

      <main className="mx-auto max-w-[1400px] px-10 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Generer søknad</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Lim inn stillingsannonsen, velg stil, og la AI gjøre resten.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <JobInput
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              userBackground={userBackground}
              onUserBackgroundChange={setUserBackground}
              contactInfo={contactInfo}
              onContactInfoChange={setContactInfo}
              onFetchFromUrl={handleFetchFromUrl}
              isFetchingUrl={isFetchingUrl}
              urlError={urlError}
              onImproveBackground={handleImproveBackground}
              isImprovingBackground={isImprovingBackground}
              improveError={improveError}
            />

            <TemplateSelector value={template} onChange={setTemplate} />

            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            <Button
              size="lg"
              className="w-full text-base bg-foreground text-background hover:bg-foreground/80"
              onClick={handleGenerate}
              disabled={isLoading || !jobDescription.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Genererer søknad...
                </>
              ) : (
                "Generer søknad"
              )}
            </Button>
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            {generatedText ? (
              <div className="space-y-6">
                <GeneratedLetter
                  text={generatedText}
                  onChange={setGeneratedText}
                  wordCount={wordCount}
                  isPaid={isPaid}
                />
                <LayoutSelector value={layout} onChange={setLayout} />
                <DownloadButtons
                  text={generatedText}
                  isPaid={isPaid}
                  contactInfo={contactInfo}
                  layout={layout}
                  jobTitle={jobTitle || undefined}
                  onUpgradeClick={() => {
                    alert(
                      "Stripe-betaling kommer snart! Oppgrader til Enkel (49 kr) eller Pro (199 kr/mnd) for PDF/Word-nedlasting."
                    );
                  }}
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
                <div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Din søknad vises her
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fyll inn stillingsannonsen til venstre og trykk
                    &quot;Generer søknad&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <GeneratorSeoContent />
    </div>
  );
}

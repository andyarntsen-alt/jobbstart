"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import JobInput from "@/components/generator/JobInput";
import TemplateSelector from "@/components/generator/TemplateSelector";
import GeneratedLetter from "@/components/generator/GeneratedLetter";
import DownloadButtons from "@/components/generator/DownloadButtons";
import LayoutSelector from "@/components/generator/LayoutSelector";
import GeneratorSeoContent from "@/components/generator/GeneratorSeoContent";
import UpgradeDialog from "@/components/generator/UpgradeDialog";
import CrossSellBanner from "@/components/CrossSellBanner";
import PaywallPopup from "@/components/PaywallPopup";
import { useAccess } from "@/lib/hooks/useAccess";
import { useAuth } from "@/components/AuthProvider";
import { saveApplication } from "@/lib/supabase/storage";
import type { TemplateStyle, ContactInfo, ExportLayout } from "@/types/application";
import type { PlanId } from "@/lib/plans";

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
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [layout, setLayout] = useState<ExportLayout>("profesjonell");
  const [jobTitle, setJobTitle] = useState("");
  const [isImprovingBackground, setIsImprovingBackground] = useState(false);
  const [improveError, setImproveError] = useState("");
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  // Paywall popup state
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState("");
  const [paywallFeatureKey, setPaywallFeatureKey] = useState<
    "pdfWord" | "backgroundImprove" | "cvSummary" | "cvImprove" | "cvPdf" | "cvTemplates"
  >("backgroundImprove");

  const {
    access,
    isPaid,
    canGenerate,
    canExportPdf,
    canImproveBackground,
    consumeCredit,
    upgradePlan,
    addCredits,
  } = useAccess();

  const { user, session } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle Stripe redirect
  useEffect(() => {
    const paid = searchParams.get("paid");
    const sessionId = searchParams.get("session_id");
    if (!paid || !sessionId) return;

    async function verifyPayment() {
      try {
        const res = await fetch("/api/verify-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data.valid) {
          if (paid === "pafyll") {
            addCredits();
          } else {
            upgradePlan(data.plan as PlanId, sessionId!);
          }
        }
      } catch {
        // Ignore verification errors
      }
      // Clean URL
      router.replace("/generator", { scroll: false });
    }

    verifyPayment();
  }, [searchParams, router, upgradePlan, addCredits]);

  async function handleCheckout(plan: PlanId | "pafyll") {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, returnUrl: "/generator", userId: user?.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      window.location.href = "/#priser";
    }
  }

  async function handleImproveBackground() {
    if (!canImproveBackground) {
      setPaywallFeature("Forbedre bakgrunn med KI");
      setPaywallFeatureKey("backgroundImprove");
      setPaywallOpen(true);
      return;
    }

    setImproveError("");
    setIsImprovingBackground(true);

    try {
      const res = await fetch("/api/improve-background", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
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

    if (!canGenerate) {
      setUpgradeOpen(true);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
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
      consumeCredit();

      if (user) {
        saveApplication(user.id, {
          generatedText: data.text,
          jobDescription,
          userBackground,
          jobTitle: jobTitle || undefined,
          template,
          layout,
          contactInfo,
          wordCount: data.wordCount,
        });
      }
    } catch {
      setError("Kunne ikke koble til serveren. Sjekk internettforbindelsen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
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

      <main className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10 py-12">
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
              canImproveBackground={canImproveBackground}
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
              ) : !canGenerate ? (
                `Generer søknad (${access.applicationsRemaining} igjen)`
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
                  onUpgrade={() => setUpgradeOpen(true)}
                />
                <LayoutSelector value={layout} onChange={setLayout} />
                <DownloadButtons
                  text={generatedText}
                  canExport={canExportPdf}
                  isPaid={isPaid}
                  contactInfo={contactInfo}
                  layout={layout}
                  jobTitle={jobTitle || undefined}
                  onUpgradeClick={() => setUpgradeOpen(true)}
                />
                <CrossSellBanner
                  label="/ TRENGER DU OGSÅ EN CV?"
                  description="Bygg en profesjonell CV med KI-drevne forslag og 10 norske maler."
                  ctaText="Bygg CV"
                  href="/cv"
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

      <UpgradeDialog
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        access={access}
        onCheckout={handleCheckout}
      />

      <PaywallPopup
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        feature={paywallFeature}
        featureKey={paywallFeatureKey}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

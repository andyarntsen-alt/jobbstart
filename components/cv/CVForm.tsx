"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Sparkles,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import ExperienceInput from "./ExperienceInput";
import EducationInput from "./EducationInput";
import SkillsInput from "./SkillsInput";
import CVTemplateSelector from "./CVTemplateSelector";
import CVPreview from "./CVPreview";
import { generateCVPdf } from "@/lib/cv-pdf-generator";
import type {
  CVData,
  CVPersonal,
  CVExperience,
  CVEducation,
  CVSkills,
  CVTemplate,
} from "@/types/cv";

const STEPS = [
  "Personlig",
  "Erfaring",
  "Utdanning",
  "Kompetanser",
  "Sammendrag",
  "Mal & Last ned",
];

const STORAGE_KEY = "soknadspilot-cv-data";

function createId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function emptyExperience(): CVExperience {
  return {
    id: createId(),
    title: "",
    company: "",
    from: "",
    to: "",
    description: "",
    bullets: [],
  };
}

function emptyEducation(): CVEducation {
  return { id: createId(), degree: "", school: "", year: "" };
}

const defaultData: CVData = {
  personal: { name: "", email: "", phone: "", address: "", linkedin: "" },
  summary: "",
  experience: [emptyExperience()],
  education: [emptyEducation()],
  skills: { technical: [], languages: [], certifications: [] },
  template: "nordisk",
};

export default function CVForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CVData>(defaultData);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on data change
  const saveToStorage = useCallback((d: CVData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    } catch {
      // Ignore quota errors
    }
  }, []);

  function updateData(partial: Partial<CVData>) {
    setData((prev) => {
      const next = { ...prev, ...partial };
      saveToStorage(next);
      return next;
    });
  }

  function updatePersonal(field: keyof CVPersonal, value: string) {
    updateData({
      personal: { ...data.personal, [field]: value },
    });
  }

  function updateExperience(index: number, updated: CVExperience) {
    const next = [...data.experience];
    next[index] = updated;
    updateData({ experience: next });
  }

  function removeExperience(index: number) {
    const next = data.experience.filter((_, i) => i !== index);
    updateData({ experience: next.length > 0 ? next : [emptyExperience()] });
  }

  function updateEducation(index: number, updated: CVEducation) {
    const next = [...data.education];
    next[index] = updated;
    updateData({ education: next });
  }

  function removeEducation(index: number) {
    const next = data.education.filter((_, i) => i !== index);
    updateData({ education: next.length > 0 ? next : [emptyEducation()] });
  }

  async function handleGenerateSummary() {
    const filledExperiences = data.experience.filter(
      (exp) => exp.title.trim() || exp.description.trim()
    );
    if (filledExperiences.length === 0) {
      setSummaryError("Fyll ut minst én erfaring først (steg 3).");
      return;
    }

    setIsGeneratingSummary(true);
    setSummaryError("");
    try {
      const res = await fetch("/api/cv/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experiences: filledExperiences }),
      });
      const result = await res.json();
      if (res.ok && result.summary) {
        updateData({ summary: result.summary });
      } else {
        setSummaryError(result.error || "Kunne ikke generere sammendrag. Prøv igjen.");
      }
    } catch {
      setSummaryError("Nettverksfeil. Sjekk tilkoblingen og prøv igjen.");
    } finally {
      setIsGeneratingSummary(false);
    }
  }

  function handleDownloadPdf() {
    generateCVPdf(data);
  }

  const canGoNext =
    step < STEPS.length - 1 &&
    (step !== 0 || data.personal.name.trim() !== "");

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div>
        {/* Mobile: current step indicator */}
        <div className="flex items-center justify-between mb-2 sm:hidden">
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            {STEPS[step]}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {step + 1} / {STEPS.length}
          </span>
        </div>
        {/* Desktop: all step labels */}
        <div className="hidden sm:flex justify-between mb-2">
          {STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(i)}
              className={`text-[10px] uppercase tracking-wider transition-colors ${
                i === step
                  ? "text-foreground font-semibold"
                  : i < step
                  ? "text-foreground/50"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div>
        {/* Step 1: Personal info */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Personlig informasjon</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Fullt navn *</Label>
                <Input
                  value={data.personal.name}
                  onChange={(e) => updatePersonal("name", e.target.value)}
                  placeholder="Ola Nordmann"
                />
              </div>
              <div>
                <Label className="text-xs">E-post</Label>
                <Input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  placeholder="ola@example.com"
                />
              </div>
              <div>
                <Label className="text-xs">Telefon</Label>
                <Input
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                  placeholder="+47 900 00 000"
                />
              </div>
              <div>
                <Label className="text-xs">Adresse</Label>
                <Input
                  value={data.personal.address}
                  onChange={(e) => updatePersonal("address", e.target.value)}
                  placeholder="Oslo, Norge"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">LinkedIn (valgfritt)</Label>
              <Input
                value={data.personal.linkedin}
                onChange={(e) => updatePersonal("linkedin", e.target.value)}
                placeholder="linkedin.com/in/olanordmann"
              />
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Arbeidserfaring</h2>
            {data.experience.map((exp, i) => (
              <ExperienceInput
                key={exp.id}
                experience={exp}
                onChange={(updated) => updateExperience(i, updated)}
                onRemove={() => removeExperience(i)}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                updateData({
                  experience: [...data.experience, emptyExperience()],
                })
              }
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Legg til erfaring
            </Button>
          </div>
        )}

        {/* Step 3: Education */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Utdanning</h2>
            {data.education.map((edu, i) => (
              <EducationInput
                key={edu.id}
                education={edu}
                onChange={(updated) => updateEducation(i, updated)}
                onRemove={() => removeEducation(i)}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                updateData({
                  education: [...data.education, emptyEducation()],
                })
              }
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Legg til utdanning
            </Button>
          </div>
        )}

        {/* Step 4: Skills */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Kompetanser</h2>
            <SkillsInput
              skills={data.skills}
              onChange={(updated) => updateData({ skills: updated })}
            />
          </div>
        )}

        {/* Step 5: Summary */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Profilsammendrag</h2>
            <p className="text-sm text-muted-foreground">
              Kort beskrivelse av deg selv og din kjernekompetanse (50-80 ord).
            </p>
            <Textarea
              value={data.summary}
              onChange={(e) => updateData({ summary: e.target.value })}
              placeholder="Erfaren prosjektleder med 8 års erfaring innen..."
              className="min-h-[120px]"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              className="gap-2"
            >
              {isGeneratingSummary ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generer med KI
            </Button>
            {summaryError && (
              <p className="text-[11px] text-red-600">{summaryError}</p>
            )}
          </div>
        )}

        {/* Step 6: Template + Preview + Download */}
        {step === 5 && (
          <div className="space-y-6">
            <CVTemplateSelector
              value={data.template}
              onChange={(t: CVTemplate) => updateData({ template: t })}
            />
            <CVPreview data={data} />
            <Button
              size="lg"
              className="w-full gap-2 bg-foreground text-background hover:bg-foreground/80"
              onClick={handleDownloadPdf}
            >
              <Download className="h-4 w-4" />
              Last ned PDF
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Forrige
        </Button>
        {step < STEPS.length - 1 && (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canGoNext}
            className="gap-2 bg-foreground text-background hover:bg-foreground/80"
          >
            Neste
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

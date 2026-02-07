"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Trash2, Check, Lock } from "lucide-react";
import type { CVExperience } from "@/types/cv";

interface ExperienceInputProps {
  experience: CVExperience;
  onChange: (updated: CVExperience) => void;
  onRemove: () => void;
  canImprove: boolean;
  onPaywall: () => void;
  onImproveUsed: () => void;
  improveRemaining: number; // -1 = unlimited, 0+ = count
  planId: string;
}

export default function ExperienceInput({
  experience,
  onChange,
  onRemove,
  canImprove,
  onPaywall,
  onImproveUsed,
  improveRemaining,
  planId,
}: ExperienceInputProps) {
  const [isImproving, setIsImproving] = useState(false);
  const [improveError, setImproveError] = useState("");

  function update(field: keyof CVExperience, value: string | string[]) {
    onChange({ ...experience, [field]: value });
  }

  async function handleImprove() {
    if (!canImprove) {
      onPaywall();
      return;
    }
    if (!experience.description.trim()) return;
    setIsImproving(true);
    setImproveError("");

    try {
      const res = await fetch("/api/cv/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-plan-id": planId },
        body: JSON.stringify({
          text: experience.description,
          title: experience.title,
          company: experience.company,
        }),
      });

      const data = await res.json();
      if (res.ok && data.bullets) {
        onChange({ ...experience, bullets: data.bullets });
        onImproveUsed();
      } else {
        setImproveError(data.error || "Kunne ikke forbedre teksten. Prøv igjen.");
      }
    } catch {
      setImproveError("Nettverksfeil. Sjekk tilkoblingen og prøv igjen.");
    } finally {
      setIsImproving(false);
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Erfaring
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-xs">Stillingstittel</Label>
          <Input
            value={experience.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="F.eks. Prosjektleder"
          />
        </div>
        <div>
          <Label className="text-xs">Bedrift</Label>
          <Input
            value={experience.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="F.eks. Equinor"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-xs">Fra</Label>
          <Input
            value={experience.from}
            onChange={(e) => update("from", e.target.value)}
            placeholder="F.eks. Jan 2020"
          />
        </div>
        <div>
          <Label className="text-xs">Til</Label>
          <Input
            value={experience.to}
            onChange={(e) => update("to", e.target.value)}
            placeholder="Nåværende"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs">Beskrivelse</Label>
        <Textarea
          value={experience.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Beskriv hva du gjorde i denne stillingen..."
          className="min-h-[80px]"
        />
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleImprove}
        disabled={isImproving || !experience.description.trim()}
        className="gap-2"
      >
        {isImproving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : !canImprove ? (
          <Lock className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
        Forbedre med KI
        {canImprove && improveRemaining >= 0 && (
          <span className="text-muted-foreground">({improveRemaining} igjen)</span>
        )}
      </Button>

      {improveError && (
        <p className="text-[11px] text-red-600">{improveError}</p>
      )}

      {experience.bullets.length > 0 && (
        <div className="space-y-2">
          <ul className="space-y-1 border-l-2 border-foreground/10 pl-3">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="text-sm text-foreground/80">
                {bullet}
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const text = experience.bullets.map((b) => `• ${b}`).join("\n");
              onChange({ ...experience, description: text, bullets: [] });
            }}
            className="gap-1.5 h-7 text-[11px] font-semibold uppercase tracking-wider"
          >
            <Check className="h-3 w-3" />
            Bruk
          </Button>
        </div>
      )}
    </div>
  );
}

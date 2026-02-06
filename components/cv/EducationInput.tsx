"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import type { CVEducation } from "@/types/cv";

interface EducationInputProps {
  education: CVEducation;
  onChange: (updated: CVEducation) => void;
  onRemove: () => void;
}

export default function EducationInput({
  education,
  onChange,
  onRemove,
}: EducationInputProps) {
  function update(field: keyof CVEducation, value: string) {
    onChange({ ...education, [field]: value });
  }

  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Utdanning
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
          <Label className="text-xs">Grad / Utdanning</Label>
          <Input
            value={education.degree}
            onChange={(e) => update("degree", e.target.value)}
            placeholder="F.eks. Master i informatikk"
          />
        </div>
        <div>
          <Label className="text-xs">Skole / Institusjon</Label>
          <Input
            value={education.school}
            onChange={(e) => update("school", e.target.value)}
            placeholder="F.eks. NTNU"
          />
        </div>
      </div>

      <div className="w-1/2">
        <Label className="text-xs">År</Label>
        <Input
          value={education.year}
          onChange={(e) => update("year", e.target.value)}
          placeholder="F.eks. 2018"
        />
      </div>
    </div>
  );
}

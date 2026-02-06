"use client";

import type { CVTemplate } from "@/types/cv";
import {
  Minus,
  Columns2,
  Crown,
  Palette,
  AlignJustify,
} from "lucide-react";

const templates: {
  value: CVTemplate;
  label: string;
  description: string;
  icon: typeof Minus;
}[] = [
  {
    value: "nordisk",
    label: "Nordisk",
    description: "Skandinavisk luft, hairline-regler",
    icon: Minus,
  },
  {
    value: "oslo",
    label: "Oslo",
    description: "Marine sidebar, to-kolonne",
    icon: Columns2,
  },
  {
    value: "eksekutiv",
    label: "Eksekutiv",
    description: "Times + Helvetica, tidløs",
    icon: Crown,
  },
  {
    value: "kreativ",
    label: "Kreativ",
    description: "Blå aksent, skill-bars",
    icon: Palette,
  },
  {
    value: "kompakt",
    label: "Kompakt",
    description: "To-kolonne, grå striper",
    icon: AlignJustify,
  },
];

interface CVTemplateSelectorProps {
  value: CVTemplate;
  onChange: (value: CVTemplate) => void;
}

export default function CVTemplateSelector({
  value,
  onChange,
}: CVTemplateSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-base font-semibold">Velg CV-mal</p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {templates.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-center transition-all ${
              value === t.value
                ? "border-foreground/30 bg-foreground/5"
                : "border-border hover:border-foreground/20"
            }`}
          >
            <t.icon
              className={`h-5 w-5 ${
                value === t.value
                  ? "text-foreground/60"
                  : "text-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium">{t.label}</span>
            <span className="text-[11px] text-muted-foreground">
              {t.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

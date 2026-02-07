"use client";

import type { CVTemplate } from "@/types/cv";
import {
  Minus,
  Columns2,
  Crown,
  Palette,
  AlignJustify,
  GitBranch,
  Mountain,
  RectangleHorizontal,
  FileText,
  Rows3,
  Lock,
} from "lucide-react";
import { FREE_CV_TEMPLATES } from "@/lib/plans";

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
  {
    value: "tidslinje",
    label: "Tidslinje",
    description: "Tidslinje med sirkelnoder",
    icon: GitBranch,
  },
  {
    value: "fjord",
    label: "Fjord",
    description: "Varm sidebar, magasin-stil",
    icon: Mountain,
  },
  {
    value: "stavanger",
    label: "Stavanger",
    description: "Stort banner, korall-aksent",
    icon: RectangleHorizontal,
  },
  {
    value: "diplomatisk",
    label: "Diplomatisk",
    description: "Formell, skrivemaskin-stil",
    icon: FileText,
  },
  {
    value: "bergen",
    label: "Bergen",
    description: "Gradient-header, tabell",
    icon: Rows3,
  },
];

interface CVTemplateSelectorProps {
  value: CVTemplate;
  onChange: (value: CVTemplate) => void;
  canUseAll: boolean;
  onPaywall: () => void;
}

export default function CVTemplateSelector({
  value,
  onChange,
  canUseAll,
  onPaywall,
}: CVTemplateSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-base font-semibold">Velg CV-mal</p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {templates.map((t) => {
          const isFree = (FREE_CV_TEMPLATES as string[]).includes(t.value);
          const isLocked = !canUseAll && !isFree;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => {
                if (isLocked) {
                  onPaywall();
                  return;
                }
                onChange(t.value);
              }}
              className={`relative flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-center transition-all ${
                isLocked
                  ? "border-border opacity-50 cursor-not-allowed"
                  : value === t.value
                  ? "border-foreground/30 bg-foreground/5"
                  : "border-border hover:border-foreground/20"
              }`}
            >
              {isLocked && (
                <Lock className="absolute top-2 right-2 h-3 w-3 text-muted-foreground" />
              )}
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
          );
        })}
      </div>
    </div>
  );
}

"use client";

import type { TemplateStyle } from "@/types/application";
import { Landmark, Briefcase, Palette } from "lucide-react";

const templates: {
  value: TemplateStyle;
  label: string;
  description: string;
  icon: typeof Landmark;
}[] = [
  {
    value: "konservativ",
    label: "Konservativ",
    description: "Offentlig sektor, storselskaper, jus",
    icon: Landmark,
  },
  {
    value: "moderne",
    label: "Moderne",
    description: "SMB, tech, konsulentbransjen",
    icon: Briefcase,
  },
  {
    value: "kreativ",
    label: "Kreativ",
    description: "Media, design, markedsføring",
    icon: Palette,
  },
];

interface TemplateSelectorProps {
  value: TemplateStyle;
  onChange: (value: TemplateStyle) => void;
}

export default function TemplateSelector({
  value,
  onChange,
}: TemplateSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-base font-semibold">Velg stil</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {templates.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
              value === t.value
                ? "border-foreground/30 bg-foreground/5"
                : "border-border hover:border-foreground/20"
            }`}
          >
            <t.icon
              className={`h-6 w-6 ${
                value === t.value ? "text-foreground/60" : "text-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium">{t.label}</span>
            <span className="text-xs text-muted-foreground">
              {t.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

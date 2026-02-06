"use client";

import type { ExportLayout } from "@/types/application";
import { Minus, LayoutTemplate, Crown } from "lucide-react";

const layouts: {
  value: ExportLayout;
  label: string;
  description: string;
  icon: typeof Minus;
}[] = [
  {
    value: "ren",
    label: "Ren",
    description: "Kun typografi, null dekor",
    icon: Minus,
  },
  {
    value: "profesjonell",
    label: "Profesjonell",
    description: "Marine aksent, moderne",
    icon: LayoutTemplate,
  },
  {
    value: "eksekutiv",
    label: "Eksekutiv",
    description: "Times kursiv, formelt brevhode",
    icon: Crown,
  },
];

interface LayoutSelectorProps {
  value: ExportLayout;
  onChange: (value: ExportLayout) => void;
}

export default function LayoutSelector({
  value,
  onChange,
}: LayoutSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-base font-semibold">Velg layout for nedlasting</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {layouts.map((l) => (
          <button
            key={l.value}
            type="button"
            onClick={() => onChange(l.value)}
            className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-center transition-all ${
              value === l.value
                ? "border-foreground/30 bg-foreground/5"
                : "border-border hover:border-foreground/20"
            }`}
          >
            <l.icon
              className={`h-5 w-5 ${
                value === l.value ? "text-foreground/60" : "text-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium">{l.label}</span>
            <span className="text-[11px] text-muted-foreground">
              {l.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

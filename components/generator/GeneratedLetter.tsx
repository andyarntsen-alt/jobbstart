"use client";

import { Textarea } from "@/components/ui/textarea";
import PaywallOverlay from "@/components/PaywallOverlay";

interface GeneratedLetterProps {
  text: string;
  onChange: (text: string) => void;
  wordCount: number;
  isPaid: boolean;
  onUpgrade: () => void;
}

export default function GeneratedLetter({
  text,
  onChange,
  wordCount,
  isPaid,
  onUpgrade,
}: GeneratedLetterProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-base font-semibold">Din søknad</p>
        <span
          className={`text-sm ${
            wordCount >= 250 && wordCount <= 450
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {wordCount} ord
        </span>
      </div>
      {isPaid ? (
        <Textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[400px] resize-y font-serif text-[15px] leading-relaxed"
        />
      ) : (
        <PaywallOverlay
          visiblePercent={0.6}
          ctaText="Lås opp hele søknaden — fra 49 kr"
          onUpgrade={onUpgrade}
          watermarkText="JOBBSTART.NO"
        >
          <div className="border border-border p-4 min-h-[400px] font-serif text-[15px] leading-relaxed whitespace-pre-wrap select-none">
            {text}
          </div>
        </PaywallOverlay>
      )}
    </div>
  );
}

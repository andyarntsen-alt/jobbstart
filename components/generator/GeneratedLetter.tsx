"use client";

import { Textarea } from "@/components/ui/textarea";

interface GeneratedLetterProps {
  text: string;
  onChange: (text: string) => void;
  wordCount: number;
  isPaid: boolean;
}

const WATERMARK = "\n\n---\nGenerert med JobbStart.no – oppgrader for vannmerkefri versjon";

export default function GeneratedLetter({
  text,
  onChange,
  wordCount,
  isPaid,
}: GeneratedLetterProps) {
  const displayText = isPaid ? text : text + WATERMARK;

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
      <Textarea
        value={displayText}
        onChange={(e) => {
          const newText = isPaid
            ? e.target.value
            : e.target.value.replace(WATERMARK, "");
          onChange(newText);
        }}
        className="min-h-[400px] resize-y font-serif text-[15px] leading-relaxed"
      />
    </div>
  );
}

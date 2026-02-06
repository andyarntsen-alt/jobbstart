"use client";

import { Button } from "@/components/ui/button";
import { Copy, FileText, FileDown, Lock } from "lucide-react";
import { useState } from "react";
import type { ExportLayout } from "@/types/application";

interface DownloadButtonsProps {
  text: string;
  isPaid: boolean;
  contactInfo: { name: string; phone: string; email: string };
  layout: ExportLayout;
  jobTitle?: string;
  onUpgradeClick: () => void;
}

export default function DownloadButtons({
  text,
  isPaid,
  contactInfo,
  layout,
  jobTitle,
  onUpgradeClick,
}: DownloadButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handlePDF() {
    if (!isPaid) {
      onUpgradeClick();
      return;
    }
    const { generatePDF } = await import("@/lib/pdf-generator");
    generatePDF(text, contactInfo, layout, jobTitle);
  }

  async function handleWord() {
    if (!isPaid) {
      onUpgradeClick();
      return;
    }
    const { generateWord } = await import("@/lib/word-generator");
    generateWord(text, contactInfo, layout, jobTitle);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" className="gap-2" onClick={handleCopy}>
        <Copy className="h-4 w-4" />
        {copied ? "Kopiert!" : "Kopier tekst"}
      </Button>
      <Button
        variant={isPaid ? "outline" : "secondary"}
        className="gap-2"
        onClick={handlePDF}
      >
        {isPaid ? (
          <FileText className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        Last ned PDF
      </Button>
      <Button
        variant={isPaid ? "outline" : "secondary"}
        className="gap-2"
        onClick={handleWord}
      >
        {isPaid ? (
          <FileDown className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        Last ned Word
      </Button>
    </div>
  );
}

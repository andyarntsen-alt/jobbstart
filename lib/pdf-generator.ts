import jsPDF from "jspdf";
import type { ExportLayout, ContactInfo } from "@/types/application";
import { norwegianDate } from "@/lib/utils";

function drawBodyText(
  doc: jsPDF,
  text: string,
  startY: number,
  margin: number,
  usableWidth: number,
  lineHeight: number,
  paragraphGap: number
): number {
  let y = startY;
  const pageHeight = doc.internal.pageSize.getHeight();
  const blocks = text.split("\n\n");

  for (let bi = 0; bi < blocks.length; bi++) {
    const block = blocks[bi].trim();
    if (!block) continue;

    const lines = doc.splitTextToSize(block, usableWidth);
    for (const line of lines) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }

    if (bi < blocks.length - 1) {
      y += paragraphGap;
    }
  }

  return y;
}

// ─────────────────────────────────────────────
// LAYOUT 1: "Ren" — Pure typography, zero decoration
// Differentiator: NO lines, NO accents, NO decoration.
// Only Helvetica, whitespace and text hierarchy.
// ─────────────────────────────────────────────
function buildPdfRen(
  doc: jsPDF,
  text: string,
  contactInfo: ContactInfo,
  jobTitle?: string
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 32;
  const usableWidth = pageWidth - margin * 2;
  let y = margin;

  // Date — right aligned, light gray
  doc.setFontSize(9);
  doc.setTextColor(153, 153, 153);
  doc.setFont("helvetica", "normal");
  doc.text(norwegianDate(), pageWidth - margin, y, { align: "right" });
  y += 16;

  // Name — 16pt normal weight, mixed case (NOT uppercase, NO tracking)
  if (contactInfo.name) {
    doc.setFontSize(16);
    doc.setTextColor(29, 29, 27);
    doc.setFont("helvetica", "normal");
    doc.text(contactInfo.name, margin, y);
    y += 6;
  }

  // Contact info — very light gray, dot-separated
  const contactParts = [contactInfo.phone, contactInfo.email].filter(Boolean);
  if (contactParts.length > 0) {
    doc.setFontSize(8);
    doc.setTextColor(176, 176, 176);
    doc.setFont("helvetica", "normal");
    doc.text(contactParts.join("  ·  "), margin, y);
    y += 14;
  }

  // NO separator line — that's the whole point of "Ren"

  // Subject line — "Søknad:" prefix in gray, title in bold
  if (jobTitle) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(153, 153, 153);
    const prefixText = "Søknad: ";
    doc.text(prefixText, margin, y);
    const prefixWidth = doc.getTextWidth(prefixText);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(29, 29, 27);
    doc.text(jobTitle, margin + prefixWidth, y);
    y += 12;
    doc.setFont("helvetica", "normal");
  }

  // Body — 11pt, warm dark, generous line height
  doc.setFontSize(11);
  doc.setTextColor(29, 29, 27);
  doc.setFont("helvetica", "normal");
  y = drawBodyText(doc, text, y, margin, usableWidth, 5.8, 5);

  // Signature — simple, no decoration
  if (y + 30 > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    y = margin;
  }
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(29, 29, 27);
  doc.text("Med vennlig hilsen", margin, y);
  y += 8;
  if (contactInfo.name) {
    doc.text(contactInfo.name, margin, y);
  }
}

// ─────────────────────────────────────────────────
// LAYOUT 2: "Profesjonell" — Dark navy horizontal accents
// Differentiator: Deep navy #1B2838 (NOT green), bold top bar,
// thin underline. Completely different from CV Kreativ's blue.
// ─────────────────────────────────────────────────
function buildPdfProfesjonell(
  doc: jsPDF,
  text: string,
  contactInfo: ContactInfo,
  jobTitle?: string
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const usableWidth = pageWidth - margin * 2;
  let y = margin;

  // Navy accent color: #1B2838
  const navy = { r: 27, g: 40, b: 56 };

  // Thick top accent line (2pt)
  doc.setDrawColor(navy.r, navy.g, navy.b);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Name — 15pt bold, left-aligned
  if (contactInfo.name) {
    doc.setFontSize(15);
    doc.setTextColor(29, 29, 27);
    doc.setFont("helvetica", "bold");
    doc.text(contactInfo.name, margin, y);
    y += 6;
  }

  // Contact info in navy accent color
  const contactParts = [contactInfo.phone, contactInfo.email].filter(Boolean);
  if (contactParts.length > 0) {
    doc.setFontSize(9);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.setFont("helvetica", "normal");
    doc.text(contactParts.join("  ·  "), margin, y);
    y += 8;
  }

  // Thin underline (0.5pt) in navy
  doc.setDrawColor(navy.r, navy.g, navy.b);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  // Date — gray
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.text(norwegianDate(), margin, y);
  y += 8;

  // Subject line in navy bold
  if (jobTitle) {
    doc.setFontSize(11);
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.setFont("helvetica", "bold");
    doc.text("Søknad: " + jobTitle, margin, y);
    y += 10;
  }

  // Body text
  doc.setFontSize(11);
  doc.setTextColor(29, 29, 27);
  doc.setFont("helvetica", "normal");
  y = drawBodyText(doc, text, y, margin, usableWidth, 5.5, 4);

  // Signature
  if (y + 30 > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    y = margin;
  }
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(29, 29, 27);
  doc.text("Med vennlig hilsen", margin, y);
  y += 8;
  if (contactInfo.name) {
    doc.setFont("helvetica", "bold");
    doc.text(contactInfo.name, margin, y);
    y += 8;
  }

  // Short accent line after signature
  doc.setDrawColor(navy.r, navy.g, navy.b);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 25, y);
}

// ──────────────────────────────────────────
// LAYOUT 3: "Eksekutiv" — Right-aligned letterhead, Times italic
// Differentiator: RIGHT-ALIGNED header (vs CV Eksekutiv's centered),
// Times italic name (vs CV's Times normal uppercase),
// Helvetica for body. Formal stationery feel.
// ──────────────────────────────────────────
function buildPdfEksekutiv(
  doc: jsPDF,
  text: string,
  contactInfo: ContactInfo,
  jobTitle?: string
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 25;
  const marginRight = 22;
  const usableWidth = pageWidth - marginLeft - marginRight;
  let y = 28;

  // Name — Times italic, RIGHT-ALIGNED, 13pt
  if (contactInfo.name) {
    doc.setFontSize(13);
    doc.setTextColor(29, 29, 27);
    doc.setFont("times", "italic");
    doc.text(contactInfo.name, pageWidth - marginRight, y, { align: "right" });
    y += 5;
  }

  // Contact info — Helvetica, right-aligned, gray
  const contactParts = [contactInfo.phone, contactInfo.email].filter(Boolean);
  if (contactParts.length > 0) {
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.setFont("helvetica", "normal");
    doc.text(contactParts.join("  |  "), pageWidth - marginRight, y, {
      align: "right",
    });
    y += 6;
  }

  // Thin hairline under header
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 14;

  // Date — left-aligned, Helvetica, gray
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.setFont("helvetica", "normal");
  doc.text(norwegianDate(), marginLeft, y);
  y += 10;

  // Subject line — Helvetica bold
  if (jobTitle) {
    doc.setFontSize(11);
    doc.setTextColor(29, 29, 27);
    doc.setFont("helvetica", "bold");
    doc.text("Søknad: " + jobTitle, marginLeft, y);
    y += 10;
    doc.setFont("helvetica", "normal");
  }

  // Body — Helvetica for readability
  doc.setFontSize(11);
  doc.setTextColor(29, 29, 27);
  doc.setFont("helvetica", "normal");
  y = drawBodyText(doc, text, y, marginLeft, usableWidth, 5.6, 4.5);

  // Signature — "Med vennlig hilsen" in Helvetica, name in Times italic
  if (y + 30 > doc.internal.pageSize.getHeight() - marginLeft) {
    doc.addPage();
    y = marginLeft;
  }
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(29, 29, 27);
  doc.text("Med vennlig hilsen", marginLeft, y);
  y += 8;
  if (contactInfo.name) {
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.text(contactInfo.name, marginLeft, y);
    y += 10;
  }

  // Bottom hairline
  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomY = pageHeight - 18;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(marginLeft, bottomY, pageWidth - marginRight, bottomY);
}

export function generatePDF(
  text: string,
  contactInfo: ContactInfo,
  layout: ExportLayout = "profesjonell",
  jobTitle?: string
) {
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });

  switch (layout) {
    case "ren":
      buildPdfRen(doc, text, contactInfo, jobTitle);
      break;
    case "eksekutiv":
      buildPdfEksekutiv(doc, text, contactInfo, jobTitle);
      break;
    case "profesjonell":
    default:
      buildPdfProfesjonell(doc, text, contactInfo, jobTitle);
      break;
  }

  doc.save("soknad.pdf");
}

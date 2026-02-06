import jsPDF from "jspdf";
import type { CVData } from "@/types/cv";

const A4_W = 210;
const A4_H = 297;

// ── Shared helpers ──────────────────────────────────────────

function checkPage(doc: jsPDF, y: number, margin: number, needed = 12): number {
  if (y + needed > A4_H - margin) {
    doc.addPage();
    return margin;
  }
  return y;
}

function wrap(doc: jsPDF, text: string, maxW: number): string[] {
  return doc.splitTextToSize(text, maxW);
}

// ═══════════════════════════════════════════════════════════
// 1. NORDISK — Scandinavian air, elegant understatement
//    Inspired by: Nordic Minimal + Lagom philosophy
//    Key: Non-bold name, hairline rules, massive whitespace
// ═══════════════════════════════════════════════════════════
function buildNordisk(doc: jsPDF, data: CVData) {
  const margin = 30;
  const w = A4_W - margin * 2;
  let y = margin;

  // Name — elegant, NOT bold, uppercase with tracking
  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.setCharSpace(2);
  doc.text((data.personal.name || "DITT NAVN").toUpperCase(), margin, y + 8);
  doc.setCharSpace(0);
  y += 16;

  // Contact — subtle, slash-separated
  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.address,
    data.personal.linkedin,
  ].filter((v): v is string => Boolean(v));
  if (contactParts.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(153, 153, 153);
    doc.text(contactParts.join("  /  "), margin, y);
    y += 6;
  }

  y += 6;

  // Hairline separator
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(margin, y, A4_W - margin, y);
  y += 12;

  // Summary
  if (data.summary) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(153, 153, 153);
    doc.setCharSpace(3);
    doc.text("PROFIL", margin, y);
    doc.setCharSpace(0);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 51, 51);
    const lines = wrap(doc, data.summary, w);
    for (const line of lines) {
      doc.text(line, margin, y);
      y += 4.5;
    }
    y += 8;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, A4_W - margin, y);
    y += 12;
  }

  // Experience
  if (data.experience.some((e) => e.title || e.company)) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(153, 153, 153);
    doc.setCharSpace(3);
    doc.text("ERFARING", margin, y);
    doc.setCharSpace(0);
    y += 6;

    for (const exp of data.experience) {
      if (!exp.title && !exp.company) continue;
      y = checkPage(doc, y, margin, 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.title || "Stilling", margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(153, 153, 153);
      doc.text(`${exp.from} – ${exp.to}`, margin + w, y, { align: "right" });
      y += 4.5;

      if (exp.company) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(exp.company, margin, y);
        y += 5;
      }

      if (exp.bullets.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 51, 51);
        for (const bullet of exp.bullets) {
          y = checkPage(doc, y, margin, 8);
          const lines = wrap(doc, `·  ${bullet}`, w);
          for (const line of lines) {
            doc.text(line, margin, y);
            y += 4.2;
          }
        }
      } else if (exp.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 51, 51);
        const lines = wrap(doc, exp.description, w);
        for (const line of lines) {
          y = checkPage(doc, y, margin, 6);
          doc.text(line, margin, y);
          y += 4.2;
        }
      }
      y += 6;
    }

    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, A4_W - margin, y);
    y += 12;
  }

  // Education
  if (data.education.some((e) => e.degree || e.school)) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(153, 153, 153);
    doc.setCharSpace(3);
    doc.text("UTDANNING", margin, y);
    doc.setCharSpace(0);
    y += 6;

    for (const edu of data.education) {
      if (!edu.degree && !edu.school) continue;
      y = checkPage(doc, y, margin, 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
      doc.text(edu.degree || "Utdanning", margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(153, 153, 153);
      doc.text(edu.year || "", margin + w, y, { align: "right" });
      y += 4.5;

      if (edu.school) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(edu.school, margin, y);
        y += 6;
      }
    }

    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, A4_W - margin, y);
    y += 12;
  }

  // Skills
  if (
    data.skills.technical.length > 0 ||
    data.skills.languages.length > 0 ||
    data.skills.certifications.length > 0
  ) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(153, 153, 153);
    doc.setCharSpace(3);
    doc.text("KOMPETANSER", margin, y);
    doc.setCharSpace(0);
    y += 6;

    if (data.skills.technical.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text("Teknisk", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 51, 51);
      const lines = wrap(doc, data.skills.technical.join(", "), w);
      for (const line of lines) {
        doc.text(line, margin, y);
        y += 4;
      }
      y += 3;
    }

    if (data.skills.languages.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text("Språk", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 51, 51);
      for (const lang of data.skills.languages) {
        y = checkPage(doc, y, margin, 6);
        doc.text(`${lang.name} — ${lang.level}`, margin, y);
        y += 4;
      }
      y += 3;
    }

    if (data.skills.certifications.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text("Sertifiseringer", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 51, 51);
      for (const cert of data.skills.certifications) {
        y = checkPage(doc, y, margin, 6);
        doc.text(cert, margin, y);
        y += 4;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 2. OSLO — Deep navy sidebar, modern professional
//    Inspired by: Modern sidebar + Visual hierarchy
//    Key: Navy #1A1F36 sidebar, underlined section headings
// ═══════════════════════════════════════════════════════════
function buildOslo(doc: jsPDF, data: CVData) {
  const sideW = 68;
  const mainX = sideW + 10;
  const mainW = A4_W - mainX - 15;
  const sideM = 12;

  // Deep navy sidebar
  doc.setFillColor(26, 31, 54);
  doc.rect(0, 0, sideW, A4_H, "F");

  let sy = 28;

  // Name in sidebar
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  const nameLines = wrap(doc, data.personal.name || "Ditt Navn", sideW - sideM * 2);
  for (const line of nameLines) {
    doc.text(line, sideM, sy);
    sy += 6;
  }
  sy += 8;

  // Contact in sidebar
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(160, 168, 184);
  const contactFields = [
    data.personal.email,
    data.personal.phone,
    data.personal.address,
    data.personal.linkedin,
  ].filter((v): v is string => Boolean(v));
  for (const field of contactFields) {
    const lines = wrap(doc, field, sideW - sideM * 2);
    for (const line of lines) {
      doc.text(line, sideM, sy);
      sy += 3.5;
    }
    sy += 2.5;
  }
  sy += 6;

  // Skills in sidebar
  if (
    data.skills.technical.length > 0 ||
    data.skills.languages.length > 0 ||
    data.skills.certifications.length > 0
  ) {
    doc.setDrawColor(60, 65, 90);
    doc.setLineWidth(0.3);
    doc.line(sideM, sy, sideW - sideM, sy);
    sy += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.setCharSpace(1.5);
    doc.text("KOMPETANSER", sideM, sy);
    doc.setCharSpace(0);
    sy += 6;

    if (data.skills.technical.length > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(160, 168, 184);
      for (const skill of data.skills.technical) {
        const lines = wrap(doc, skill, sideW - sideM * 2);
        for (const line of lines) {
          doc.text(line, sideM + 2, sy);
          sy += 3.8;
        }
      }
      sy += 4;
    }

    if (data.skills.languages.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text("SPRÅK", sideM, sy);
      sy += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(160, 168, 184);
      for (const lang of data.skills.languages) {
        doc.text(`${lang.name} — ${lang.level}`, sideM + 2, sy);
        sy += 3.8;
      }
      sy += 4;
    }

    if (data.skills.certifications.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text("SERTIFISERINGER", sideM, sy);
      sy += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(160, 168, 184);
      for (const cert of data.skills.certifications) {
        const lines = wrap(doc, cert, sideW - sideM * 2);
        for (const line of lines) {
          doc.text(line, sideM + 2, sy);
          sy += 3.5;
        }
        sy += 1;
      }
    }
  }

  // ── Main content area ──
  let y = 28;

  // Summary
  if (data.summary) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(26, 31, 54);
    doc.setCharSpace(1);
    doc.text("PROFIL", mainX, y);
    doc.setCharSpace(0);
    y += 2;
    doc.setDrawColor(26, 31, 54);
    doc.setLineWidth(0.5);
    doc.line(mainX, y, mainX + 20, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    const lines = wrap(doc, data.summary, mainW);
    for (const line of lines) {
      doc.text(line, mainX, y);
      y += 4.2;
    }
    y += 8;
  }

  // Experience
  if (data.experience.some((e) => e.title || e.company)) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(26, 31, 54);
    doc.setCharSpace(1);
    doc.text("ERFARING", mainX, y);
    doc.setCharSpace(0);
    y += 2;
    doc.setDrawColor(26, 31, 54);
    doc.setLineWidth(0.5);
    doc.line(mainX, y, mainX + 25, y);
    y += 5;

    for (const exp of data.experience) {
      if (!exp.title && !exp.company) continue;
      y = checkPage(doc, y, 20, 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.title || "Stilling", mainX, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(`${exp.from} – ${exp.to}`, mainX + mainW, y, { align: "right" });
      y += 4;

      if (exp.company) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(exp.company, mainX, y);
        y += 4.5;
      }

      if (exp.bullets.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 51, 51);
        for (const bullet of exp.bullets) {
          y = checkPage(doc, y, 20, 8);
          const lines = wrap(doc, `·  ${bullet}`, mainW);
          for (const line of lines) {
            doc.text(line, mainX, y);
            y += 3.8;
          }
        }
      } else if (exp.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 51, 51);
        const lines = wrap(doc, exp.description, mainW);
        for (const line of lines) {
          y = checkPage(doc, y, 20, 6);
          doc.text(line, mainX, y);
          y += 3.8;
        }
      }
      y += 5;
    }
    y += 2;
  }

  // Education
  if (data.education.some((e) => e.degree || e.school)) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(26, 31, 54);
    doc.setCharSpace(1);
    doc.text("UTDANNING", mainX, y);
    doc.setCharSpace(0);
    y += 2;
    doc.setDrawColor(26, 31, 54);
    doc.setLineWidth(0.5);
    doc.line(mainX, y, mainX + 28, y);
    y += 5;

    for (const edu of data.education) {
      if (!edu.degree && !edu.school) continue;
      y = checkPage(doc, y, 20, 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(edu.degree || "Utdanning", mainX, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(edu.year || "", mainX + mainW, y, { align: "right" });
      y += 4;

      if (edu.school) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(edu.school, mainX, y);
        y += 5;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 3. EKSEKUTIV — Timeless classic with Times + Helvetica
//    Inspired by: TORI Award standard + Editorial font-pairing
//    Key: Times for headings, single thin rules, centered header
// ═══════════════════════════════════════════════════════════
function buildEksekutiv(doc: jsPDF, data: CVData) {
  const margin = 28;
  const w = A4_W - margin * 2;
  let y = margin;

  // Top single thin rule
  doc.setDrawColor(85, 85, 85);
  doc.setLineWidth(0.8);
  doc.line(margin, y, A4_W - margin, y);
  y += 10;

  // Centered name — Times, not bold
  doc.setFont("times", "normal");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.setCharSpace(2);
  doc.text(
    (data.personal.name || "DITT NAVN").toUpperCase(),
    A4_W / 2, y,
    { align: "center" }
  );
  doc.setCharSpace(0);
  y += 7;

  // Centered contact — Helvetica
  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.address,
  ].filter((v): v is string => Boolean(v));
  if (contactParts.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(120, 120, 120);
    doc.text(contactParts.join("  |  "), A4_W / 2, y, { align: "center" });
    y += 4.5;
  }
  if (data.personal.linkedin) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text(data.personal.linkedin, A4_W / 2, y, { align: "center" });
    y += 4.5;
  }

  // Bottom single thin rule
  y += 1;
  doc.setDrawColor(85, 85, 85);
  doc.setLineWidth(0.8);
  doc.line(margin, y, A4_W - margin, y);
  y += 12;

  // Summary
  if (data.summary) {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setCharSpace(1.5);
    doc.text("PROFIL", margin, y);
    doc.setCharSpace(0);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    const lines = wrap(doc, data.summary, w);
    for (const line of lines) {
      doc.text(line, margin, y);
      y += 4.2;
    }
    y += 8;
  }

  // Experience
  if (data.experience.some((e) => e.title || e.company)) {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setCharSpace(1.5);
    doc.text("ERFARING", margin, y);
    doc.setCharSpace(0);
    y += 5;

    for (const exp of data.experience) {
      if (!exp.title && !exp.company) continue;
      y = checkPage(doc, y, margin, 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.title || "Stilling", margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(`${exp.from} – ${exp.to}`, margin + w, y, { align: "right" });
      y += 4;

      if (exp.company) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text(exp.company, margin, y);
        y += 4.5;
      }

      if (exp.bullets.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 51, 51);
        for (const bullet of exp.bullets) {
          y = checkPage(doc, y, margin, 8);
          const lines = wrap(doc, `·  ${bullet}`, w);
          for (const line of lines) {
            doc.text(line, margin, y);
            y += 3.8;
          }
        }
      } else if (exp.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 51, 51);
        const lines = wrap(doc, exp.description, w);
        for (const line of lines) {
          y = checkPage(doc, y, margin, 6);
          doc.text(line, margin, y);
          y += 3.8;
        }
      }
      y += 5;
    }
    y += 2;
  }

  // Education
  if (data.education.some((e) => e.degree || e.school)) {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setCharSpace(1.5);
    doc.text("UTDANNING", margin, y);
    doc.setCharSpace(0);
    y += 5;

    for (const edu of data.education) {
      if (!edu.degree && !edu.school) continue;
      y = checkPage(doc, y, margin, 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(edu.degree || "Utdanning", margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(edu.year || "", margin + w, y, { align: "right" });
      y += 4;

      if (edu.school) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text(edu.school, margin, y);
        y += 5;
      }
    }
    y += 4;
  }

  // Skills
  if (
    data.skills.technical.length > 0 ||
    data.skills.languages.length > 0 ||
    data.skills.certifications.length > 0
  ) {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setCharSpace(1.5);
    doc.text("KOMPETANSER", margin, y);
    doc.setCharSpace(0);
    y += 5;

    if (data.skills.technical.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text("Teknisk", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 51, 51);
      const lines = wrap(doc, data.skills.technical.join(", "), w);
      for (const line of lines) {
        doc.text(line, margin, y);
        y += 3.8;
      }
      y += 3;
    }

    if (data.skills.languages.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text("Språk", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 51, 51);
      for (const lang of data.skills.languages) {
        y = checkPage(doc, y, margin, 6);
        doc.text(`${lang.name} — ${lang.level}`, margin, y);
        y += 3.8;
      }
      y += 3;
    }

    if (data.skills.certifications.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text("Sertifiseringer", margin, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 51, 51);
      for (const cert of data.skills.certifications) {
        y = checkPage(doc, y, margin, 6);
        doc.text(cert, margin, y);
        y += 3.8;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 4. KREATIV — Bold blue accent with vertical bar
//    Inspired by: Expressive typography + Visual indicators
//    Key: Deep blue #2B5F8A, full-height left accent bar
// ═══════════════════════════════════════════════════════════
function buildKreativ(doc: jsPDF, data: CVData) {
  const accent: [number, number, number] = [43, 95, 138];
  const barW = 3;
  const margin = 20;
  const contentX = margin + barW + 6;
  const w = A4_W - contentX - margin;

  // Full-height vertical accent bar
  doc.setFillColor(...accent);
  doc.rect(margin, 0, barW, A4_H, "F");

  let y = 22;

  // Name — large bold, mixed case
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(0, 0, 0);
  const nameLines = wrap(doc, data.personal.name || "Ditt Navn", w);
  for (const line of nameLines) {
    doc.text(line, contentX, y);
    y += 9;
  }
  y += 2;

  // Contact in accent color
  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.address,
    data.personal.linkedin,
  ].filter((v): v is string => Boolean(v));
  if (contactParts.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...accent);
    doc.text(contactParts.join("  ·  "), contentX, y);
    y += 8;
  }

  // Accent underline
  doc.setDrawColor(...accent);
  doc.setLineWidth(1);
  doc.line(contentX, y, contentX + 30, y);
  y += 10;

  // Helper: section heading with accent underline
  function accentHeading(title: string) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...accent);
    doc.text(title, contentX, y);
    y += 2;
    doc.setDrawColor(...accent);
    doc.setLineWidth(1);
    doc.line(contentX, y, contentX + 30, y);
    y += 5;
  }

  // Summary
  if (data.summary) {
    accentHeading("PROFIL");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 51, 51);
    const lines = wrap(doc, data.summary, w);
    for (const line of lines) {
      doc.text(line, contentX, y);
      y += 4.2;
    }
    y += 8;
  }

  // Experience
  if (data.experience.some((e) => e.title || e.company)) {
    accentHeading("ERFARING");

    for (const exp of data.experience) {
      if (!exp.title && !exp.company) continue;
      y = checkPage(doc, y, margin, 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.title || "Stilling", contentX, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(`${exp.from} – ${exp.to}`, contentX + w, y, { align: "right" });
      y += 4;

      if (exp.company) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...accent);
        doc.text(exp.company, contentX, y);
        y += 4.5;
      }

      if (exp.bullets.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 51, 51);
        for (const bullet of exp.bullets) {
          y = checkPage(doc, y, margin, 8);
          const lines = wrap(doc, `·  ${bullet}`, w);
          for (const line of lines) {
            doc.text(line, contentX, y);
            y += 3.8;
          }
        }
      } else if (exp.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 51, 51);
        const lines = wrap(doc, exp.description, w);
        for (const line of lines) {
          y = checkPage(doc, y, margin, 6);
          doc.text(line, contentX, y);
          y += 3.8;
        }
      }
      y += 5;
    }
    y += 2;
  }

  // Education
  if (data.education.some((e) => e.degree || e.school)) {
    accentHeading("UTDANNING");

    for (const edu of data.education) {
      if (!edu.degree && !edu.school) continue;
      y = checkPage(doc, y, margin, 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
      doc.text(edu.degree || "Utdanning", contentX, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(edu.year || "", contentX + w, y, { align: "right" });
      y += 4;

      if (edu.school) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...accent);
        doc.text(edu.school, contentX, y);
        y += 5;
      }
    }
    y += 6;
  }

  // Skills with visual bars
  const { skills } = data;
  if (skills.technical.length > 0 || skills.languages.length > 0) {
    accentHeading("KOMPETANSER");

    if (skills.technical.length > 0) {
      const bW = 50;
      const bH = 2.5;
      for (const skill of skills.technical) {
        y = checkPage(doc, y, margin, 8);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(51, 51, 51);
        doc.text(skill, contentX, y);
        doc.setFillColor(230, 230, 230);
        doc.rect(contentX + 55, y - 2, bW, bH, "F");
        doc.setFillColor(...accent);
        doc.rect(contentX + 55, y - 2, bW * 0.85, bH, "F");
        y += 6;
      }
      y += 3;
    }

    if (skills.languages.length > 0) {
      y = checkPage(doc, y, margin, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(51, 51, 51);
      doc.text("Språk", contentX, y);
      y += 5;

      const levelMap: Record<string, number> = {
        Morsmål: 5, Flytende: 4, Godt: 3, Grunnleggende: 2,
      };

      for (const lang of skills.languages) {
        y = checkPage(doc, y, margin, 7);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(51, 51, 51);
        doc.text(lang.name, contentX, y);
        const dots = levelMap[lang.level] ?? 3;
        for (let d = 0; d < 5; d++) {
          if (d < dots) {
            doc.setFillColor(...accent);
          } else {
            doc.setFillColor(210, 210, 210);
          }
          doc.circle(contentX + 45 + d * 6, y - 1, 1.8, "F");
        }
        y += 5.5;
      }
    }
  }

  if (skills.certifications.length > 0) {
    y = checkPage(doc, y + 2, margin, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(51, 51, 51);
    doc.text("Sertifiseringer", contentX, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 51, 51);
    for (const cert of skills.certifications) {
      y = checkPage(doc, y, margin, 6);
      doc.text(`·  ${cert}`, contentX, y);
      y += 3.8;
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 5. KOMPAKT — Maximum density, gray section strips
//    Inspired by: Skills-first format + Efficient space
//    Key: Gray background strips on headings, no timeline dots
// ═══════════════════════════════════════════════════════════
function buildKompakt(doc: jsPDF, data: CVData) {
  const margin = 15;
  const colGap = 8;
  const leftW = (A4_W - margin * 2 - colGap) * 0.57;
  const rightX = margin + leftW + colGap;
  const rightW = A4_W - rightX - margin;

  let y = margin;

  // Header: name left, contact right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  doc.text(data.personal.name || "Ditt Navn", margin, y + 4);

  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.address,
  ].filter((v): v is string => Boolean(v));
  if (contactParts.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(contactParts.join("  |  "), A4_W - margin, y + 4, { align: "right" });
  }
  y += 6;

  if (data.personal.linkedin) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(data.personal.linkedin, A4_W - margin, y + 2, { align: "right" });
    y += 4;
  }

  y += 3;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, A4_W - margin, y);
  y += 5;

  // Summary — full width with gray strip
  if (data.summary) {
    doc.setFillColor(235, 235, 235);
    doc.rect(margin, y - 2.5, A4_W - margin * 2, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(0, 0, 0);
    doc.text("PROFIL", margin + 2, y + 0.5);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 51, 51);
    const fullW = A4_W - margin * 2;
    const lines = wrap(doc, data.summary, fullW);
    for (const line of lines) {
      doc.text(line, margin, y);
      y += 3.5;
    }
    y += 4;
  }

  const startY = y;

  // Left column: Experience
  let ly = startY;

  doc.setFillColor(235, 235, 235);
  doc.rect(margin, ly - 2.5, leftW, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(0, 0, 0);
  doc.text("ERFARING", margin + 2, ly + 0.5);
  ly += 5;

  for (const exp of data.experience) {
    if (!exp.title && !exp.company) continue;
    ly = checkPage(doc, ly, margin, 16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.title || "", margin, ly);
    ly += 3.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(`${exp.company || ""}  ·  ${exp.from} – ${exp.to}`, margin, ly);
    ly += 3.5;

    if (exp.bullets.length > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 51, 51);
      for (const bullet of exp.bullets) {
        ly = checkPage(doc, ly, margin, 6);
        const bLines = wrap(doc, `· ${bullet}`, leftW - 2);
        for (const bl of bLines) {
          doc.text(bl, margin, ly);
          ly += 3.2;
        }
      }
    } else if (exp.description) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 51, 51);
      const dLines = wrap(doc, exp.description, leftW - 2);
      for (const dl of dLines) {
        ly = checkPage(doc, ly, margin, 5);
        doc.text(dl, margin, ly);
        ly += 3.2;
      }
    }
    ly += 3;
  }

  // Right column: Education + Skills
  let ry = startY;

  doc.setFillColor(235, 235, 235);
  doc.rect(rightX, ry - 2.5, rightW, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(0, 0, 0);
  doc.text("UTDANNING", rightX + 2, ry + 0.5);
  ry += 5;

  for (const edu of data.education) {
    if (!edu.degree && !edu.school) continue;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text(edu.degree || "", rightX, ry);
    ry += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(`${edu.school || ""}  ·  ${edu.year || ""}`, rightX, ry);
    ry += 5;
  }

  ry += 4;

  // Skills in right column
  if (
    data.skills.technical.length > 0 ||
    data.skills.languages.length > 0 ||
    data.skills.certifications.length > 0
  ) {
    doc.setFillColor(235, 235, 235);
    doc.rect(rightX, ry - 2.5, rightW, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(0, 0, 0);
    doc.text("KOMPETANSER", rightX + 2, ry + 0.5);
    ry += 5;

    if (data.skills.technical.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text("Teknisk", rightX, ry);
      ry += 3.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 51, 51);
      const lines = wrap(doc, data.skills.technical.join(", "), rightW);
      for (const line of lines) {
        doc.text(line, rightX, ry);
        ry += 3.2;
      }
      ry += 3;
    }

    if (data.skills.languages.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text("Språk", rightX, ry);
      ry += 3.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 51, 51);
      for (const lang of data.skills.languages) {
        doc.text(`${lang.name} — ${lang.level}`, rightX, ry);
        ry += 3.2;
      }
      ry += 3;
    }

    if (data.skills.certifications.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text("Sertifiseringer", rightX, ry);
      ry += 3.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(51, 51, 51);
      for (const cert of data.skills.certifications) {
        const lines = wrap(doc, cert, rightW);
        for (const line of lines) {
          doc.text(line, rightX, ry);
          ry += 3.2;
        }
        ry += 1;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// Main export
// ═══════════════════════════════════════════════════════════
export function generateCVPdf(data: CVData) {
  const doc = new jsPDF({ format: "a4", unit: "mm" });

  switch (data.template) {
    case "nordisk":
      buildNordisk(doc, data);
      break;
    case "oslo":
      buildOslo(doc, data);
      break;
    case "eksekutiv":
      buildEksekutiv(doc, data);
      break;
    case "kreativ":
      buildKreativ(doc, data);
      break;
    case "kompakt":
      buildKompakt(doc, data);
      break;
    default:
      buildNordisk(doc, data);
  }

  doc.save("cv.pdf");
}

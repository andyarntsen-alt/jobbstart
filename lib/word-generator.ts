import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  convertMillimetersToTwip,
  LineRuleType,
} from "docx";
import { saveAs } from "file-saver";
import type { ExportLayout, ContactInfo } from "@/types/application";
import { norwegianDate } from "@/lib/utils";

function buildBodyParagraphs(
  text: string,
  fontSize: number,
  lineSpacing: number,
  afterSpacing: number,
  font: string
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const blocks = text.split("\n\n");

  for (const block of blocks) {
    if (!block.trim()) continue;
    const lines = block.split("\n");
    const children: TextRun[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        children.push(new TextRun({ break: 1 } as never));
      }
      children.push(
        new TextRun({
          text: lines[i].trim(),
          size: fontSize,
          font,
        })
      );
    }

    paragraphs.push(
      new Paragraph({
        children,
        spacing: {
          after: afterSpacing,
          line: lineSpacing,
          lineRule: LineRuleType.AUTO,
        },
      })
    );
  }

  return paragraphs;
}

function buildSignature(
  name: string,
  font: string,
  fontSize: number,
  italicName?: boolean
): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: "Med vennlig hilsen",
          size: fontSize,
          font,
        }),
      ],
      spacing: { before: 400, after: 120 },
    }),
    ...(name
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: name,
                size: fontSize,
                font,
                italics: italicName ?? false,
              }),
            ],
          }),
        ]
      : []),
  ];
}

// ─────────────────────────────────────────────
// LAYOUT 1: "Ren" – Minimalistisk skandinavisk
// ─────────────────────────────────────────────
function buildLayoutRen(
  text: string,
  contactInfo: ContactInfo,
  jobTitle?: string
): Paragraph[] {
  const children: Paragraph[] = [];
  const font = "Calibri";

  // Date — right aligned
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: norwegianDate(),
          size: 18,
          color: "999999",
          font,
        }),
      ],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 400 },
    })
  );

  // Name — large, semibold, letter-spaced
  if (contactInfo.name) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.name.toUpperCase(),
            size: 36,
            font,
            characterSpacing: 60,
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }

  // Contact info — small gray with middle dot separator
  const contactParts = [contactInfo.phone, contactInfo.email].filter(Boolean);
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join("  \u00b7  "),
            size: 18,
            color: "B0B0B0",
            font,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // Thin separator line
  children.push(
    new Paragraph({
      children: [],
      spacing: { after: 300 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 4,
          color: "D0D0D0",
          space: 8,
        },
      },
    })
  );

  // Subject line if available
  if (jobTitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Søknad: ${jobTitle}`,
            size: 22,
            font,
            bold: true,
          }),
        ],
        spacing: { after: 280 },
      })
    );
  }

  // Body
  children.push(...buildBodyParagraphs(text, 22, 312, 280, font));

  // Signature
  children.push(...buildSignature(contactInfo.name, font, 22));

  return children;
}

// ─────────────────────────────────────────────────
// LAYOUT 2: "Profesjonell" – Moderne med aksentfarge
// ─────────────────────────────────────────────────
function buildLayoutProfesjonell(
  text: string,
  contactInfo: ContactInfo,
  jobTitle?: string
): Paragraph[] {
  const children: Paragraph[] = [];
  const font = "Calibri";
  const accent = "12271D"; // Deep green

  // Top accent line (thick)
  children.push(
    new Paragraph({
      children: [],
      border: {
        top: {
          style: BorderStyle.SINGLE,
          size: 36,
          color: accent,
          space: 0,
        },
      },
      spacing: { after: 300 },
    })
  );

  // Name — bold
  if (contactInfo.name) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.name,
            size: 32,
            font,
            bold: true,
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }

  // Contact info in accent color
  const contactParts = [contactInfo.phone, contactInfo.email].filter(Boolean);
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join("  \u00b7  "),
            size: 18,
            color: accent,
            font,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // Accent line under header (thin)
  children.push(
    new Paragraph({
      children: [],
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 8,
          color: accent,
          space: 8,
        },
      },
      spacing: { after: 300 },
    })
  );

  // Date
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: norwegianDate(),
          size: 18,
          color: "707767",
          font,
        }),
      ],
      spacing: { after: 200 },
    })
  );

  // Subject line in accent color
  if (jobTitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Søknad: ${jobTitle}`,
            size: 24,
            font,
            bold: true,
            color: accent,
          }),
        ],
        spacing: { after: 240 },
      })
    );
  }

  // Body
  children.push(...buildBodyParagraphs(text, 22, 276, 200, font));

  // Signature
  children.push(...buildSignature(contactInfo.name, font, 22));

  // Short accent line at signature
  children.push(
    new Paragraph({
      children: [],
      border: {
        top: {
          style: BorderStyle.SINGLE,
          size: 8,
          color: accent,
          space: 8,
        },
      },
      spacing: { before: 200 },
    })
  );

  return children;
}

// ──────────────────────────────────────────
// LAYOUT 3: "Eksekutiv" – Klassisk/formell
// ──────────────────────────────────────────
function buildLayoutEksekutiv(
  text: string,
  contactInfo: ContactInfo,
  jobTitle?: string
): Paragraph[] {
  const children: Paragraph[] = [];
  const font = "Calibri";
  const lineColor = "555555";

  // Top double line
  children.push(
    new Paragraph({
      children: [],
      border: {
        top: {
          style: BorderStyle.DOUBLE,
          size: 6,
          color: lineColor,
          space: 4,
        },
      },
      spacing: { after: 200 },
    })
  );

  // Name — centered, uppercase, letter-spaced
  if (contactInfo.name) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.name.toUpperCase(),
            size: 28,
            font,
            characterSpacing: 80,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
      })
    );
  }

  // Contact info — centered
  const contactParts = [contactInfo.phone, contactInfo.email].filter(Boolean);
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join("  |  "),
            size: 18,
            color: "666666",
            font,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
  }

  // Bottom double line of header
  children.push(
    new Paragraph({
      children: [],
      border: {
        bottom: {
          style: BorderStyle.DOUBLE,
          size: 6,
          color: lineColor,
          space: 4,
        },
      },
      spacing: { after: 400 },
    })
  );

  // Date — right aligned
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: norwegianDate(),
          size: 18,
          color: "707767",
          font,
        }),
      ],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 300 },
    })
  );

  // Subject line
  if (jobTitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Søknad: ${jobTitle}`,
            size: 22,
            font,
            bold: true,
          }),
        ],
        spacing: { after: 240 },
      })
    );
  }

  // Body
  children.push(...buildBodyParagraphs(text, 22, 288, 240, font));

  // Signature — italic name
  children.push(...buildSignature(contactInfo.name, font, 22, true));

  // Bottom double line
  children.push(
    new Paragraph({
      children: [],
      border: {
        top: {
          style: BorderStyle.DOUBLE,
          size: 6,
          color: lineColor,
          space: 4,
        },
      },
      spacing: { before: 400 },
    })
  );

  return children;
}

export async function generateWord(
  text: string,
  contactInfo: ContactInfo,
  layout: ExportLayout = "profesjonell",
  jobTitle?: string
) {
  let children: Paragraph[];
  let marginLeft = convertMillimetersToTwip(25);
  let marginRight = convertMillimetersToTwip(25);
  const marginTop = convertMillimetersToTwip(25);
  const marginBottom = convertMillimetersToTwip(25);

  switch (layout) {
    case "ren":
      children = buildLayoutRen(text, contactInfo, jobTitle);
      marginLeft = convertMillimetersToTwip(30);
      marginRight = convertMillimetersToTwip(30);
      break;
    case "eksekutiv":
      children = buildLayoutEksekutiv(text, contactInfo, jobTitle);
      marginRight = convertMillimetersToTwip(20);
      break;
    case "profesjonell":
    default:
      children = buildLayoutProfesjonell(text, contactInfo, jobTitle);
      break;
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "soknad.docx");
}

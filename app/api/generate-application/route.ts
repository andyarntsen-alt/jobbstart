import { NextRequest, NextResponse } from "next/server";
import getGroqClient from "@/lib/groq";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import { rateLimit } from "@/lib/rate-limit";
import type { TemplateStyle } from "@/types/application";

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "ai");
    if (!success) {
      return NextResponse.json(
        { error: "For mange forespørsler i dag. Prøv igjen i morgen." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { jobDescription, userBackground, template, contactInfo } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Stillingsannonse er påkrevd" },
        { status: 400 }
      );
    }

    if (jobDescription.length > 5000) {
      return NextResponse.json(
        { error: "Stillingsannonsen er for lang (maks 5000 tegn)" },
        { status: 400 }
      );
    }

    if (typeof userBackground === "string" && userBackground.length > 3000) {
      return NextResponse.json(
        { error: "Bakgrunnsteksten er for lang (maks 3000 tegn)" },
        { status: 400 }
      );
    }

    const validTemplates: TemplateStyle[] = [
      "konservativ",
      "moderne",
      "kreativ",
    ];
    const selectedTemplate: TemplateStyle = validTemplates.includes(template)
      ? template
      : "moderne";

    const completion = await getGroqClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSystemPrompt(selectedTemplate) },
        {
          role: "user",
          content: buildUserPrompt(
            jobDescription,
            userBackground || "",
            contactInfo?.name || ""
          ),
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    return NextResponse.json({ text, wordCount });
  } catch (error: unknown) {
    console.error("Generate application error:", error);

    if (error instanceof Error && "status" in error) {
      const status = (error as { status: number }).status;
      if (status === 429) {
        return NextResponse.json(
          { error: "AI-tjenesten har nådd sin kvote. Kontakt administrator." },
          { status: 503 }
        );
      }
      if (status === 401) {
        return NextResponse.json(
          { error: "Ugyldig API-nøkkel. Kontakt administrator." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 }
    );
  }
}

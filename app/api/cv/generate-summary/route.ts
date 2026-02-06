import { NextRequest, NextResponse } from "next/server";
import getGroqClient from "@/lib/groq";
import {
  buildSummarySystemPrompt,
  buildSummaryUserPrompt,
} from "@/lib/cv-prompts";
import { rateLimit } from "@/lib/rate-limit";
import type { CVExperience } from "@/types/cv";

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
    const { experiences } = body as { experiences: CVExperience[] };

    if (!experiences || !Array.isArray(experiences) || experiences.length === 0) {
      return NextResponse.json(
        { error: "Minst én erfaring er påkrevd" },
        { status: 400 }
      );
    }

    if (experiences.length > 10) {
      return NextResponse.json(
        { error: "Maks 10 erfaringer" },
        { status: 400 }
      );
    }

    const completion = await getGroqClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSummarySystemPrompt() },
        { role: "user", content: buildSummaryUserPrompt(experiences) },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const summary = completion.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error("CV generate-summary error:", error);

    if (error instanceof Error && "status" in error) {
      const status = (error as { status: number }).status;
      if (status === 429) {
        return NextResponse.json(
          { error: "AI-tjenesten har nådd sin kvote. Prøv igjen senere." },
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

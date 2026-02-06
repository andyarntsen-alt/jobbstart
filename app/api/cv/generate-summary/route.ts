import { NextRequest, NextResponse } from "next/server";
import getGroqClient from "@/lib/groq";
import {
  buildSummarySystemPrompt,
  buildSummaryUserPrompt,
} from "@/lib/cv-prompts";
import type { CVExperience } from "@/types/cv";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_DAY = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 24 * 60 * 60 * 1000,
    });
    return true;
  }

  if (entry.count >= MAX_PER_DAY) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { experiences } = body as { experiences: CVExperience[] };

    if (!experiences || !Array.isArray(experiences) || experiences.length === 0) {
      return NextResponse.json(
        { error: "Minst én erfaring er påkrevd" },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "For mange forespørsler i dag. Prøv igjen i morgen." },
        { status: 429 }
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

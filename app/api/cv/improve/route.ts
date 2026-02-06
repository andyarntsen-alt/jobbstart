import { NextRequest, NextResponse } from "next/server";
import getGroqClient from "@/lib/groq";
import {
  buildImproveSystemPrompt,
  buildImproveUserPrompt,
} from "@/lib/cv-prompts";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_DAY = 20;

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
    const { text, title, company } = body as {
      text: string;
      title: string;
      company: string;
    };

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Beskrivelse er påkrevd" },
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
        { role: "system", content: buildImproveSystemPrompt() },
        {
          role: "user",
          content: buildImproveUserPrompt(text, title || "", company || ""),
        },
      ],
      temperature: 0.4,
      max_tokens: 800,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "[]";

    let bullets: string[];
    try {
      bullets = JSON.parse(raw);
      if (!Array.isArray(bullets)) bullets = [raw];
    } catch {
      bullets = raw
        .split("\n")
        .map((line) => line.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean);
    }

    return NextResponse.json({ bullets });
  } catch (error: unknown) {
    console.error("CV improve error:", error);

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

import { NextRequest, NextResponse } from "next/server";
import getGroqClient from "@/lib/groq";
import {
  buildImproveSystemPrompt,
  buildImproveUserPrompt,
} from "@/lib/cv-prompts";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "ai");
    if (!success) {
      return NextResponse.json(
        { error: "For mange forespørsler i dag. Prøv igjen i morgen." },
        { status: 429 }
      );
    }

    // Plan check: minimum "standard"
    const planId = req.headers.get("x-plan-id") || "free";
    if (planId === "free" || planId === "enkel") {
      return NextResponse.json(
        { error: "Denne funksjonen krever STANDARD- eller MAX-planen." },
        { status: 403 }
      );
    }

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

    if (text.length > 2000) {
      return NextResponse.json(
        { error: "Beskrivelsen er for lang (maks 2000 tegn)" },
        { status: 400 }
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

import { NextRequest, NextResponse } from "next/server";
import getGroqClient from "@/lib/groq";
import {
  buildBackgroundImproveSystemPrompt,
  buildBackgroundImproveUserPrompt,
} from "@/lib/prompts";
import { rateLimit } from "@/lib/rate-limit";
import { verifyPlan } from "@/lib/supabase/verify-plan";

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "ai");
    if (!success) {
      return NextResponse.json(
        { error: "For mange forespørsler i dag. Prøv igjen i morgen." },
        { status: 429 }
      );
    }

    // Server-side plan verification
    const { planId } = await verifyPlan(req.headers.get("authorization"));
    if (planId === "free" || planId === "enkel") {
      return NextResponse.json(
        { error: "Denne funksjonen krever STANDARD-planen eller høyere." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { text, jobDescription } = body;

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return NextResponse.json(
        { error: "Skriv minst 10 tegn før du bruker KI-forbedring." },
        { status: 400 }
      );
    }

    if (text.length > 3000) {
      return NextResponse.json(
        { error: "Teksten er for lang (maks 3000 tegn)" },
        { status: 400 }
      );
    }

    const completion = await getGroqClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildBackgroundImproveSystemPrompt() },
        {
          role: "user",
          content: buildBackgroundImproveUserPrompt(
            text,
            typeof jobDescription === "string" ? jobDescription : undefined
          ),
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    const improved = completion.choices[0]?.message?.content?.trim() ?? "";

    if (!improved) {
      return NextResponse.json(
        { error: "Kunne ikke forbedre teksten. Prøv igjen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ improved });
  } catch (error: unknown) {
    console.error("Improve background error:", error);

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

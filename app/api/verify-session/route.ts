import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "verify");
    if (!success) {
      return NextResponse.json(
        { valid: false, error: "For mange forespørsler" },
        { status: 429 }
      );
    }

    const { sessionId } = await req.json();

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({
        valid: true,
        plan: session.metadata?.plan || "enkel",
      });
    }

    return NextResponse.json({ valid: false }, { status: 400 });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}

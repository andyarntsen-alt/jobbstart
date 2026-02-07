import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";
import { PLANS, TOPUP_PRICE } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

const VALID_PLANS = ["enkel", "standard", "max", "pafyll"] as const;
type CheckoutPlan = (typeof VALID_PLANS)[number];

function isValidPlan(plan: string): plan is CheckoutPlan {
  return VALID_PLANS.includes(plan as CheckoutPlan);
}

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "checkout");
    if (!success) {
      return NextResponse.json(
        { error: "For mange forespørsler. Prøv igjen senere." },
        { status: 429 }
      );
    }

    const { plan, returnUrl } = await req.json();
    const origin = req.headers.get("origin") || "http://localhost:3000";

    if (!plan || !isValidPlan(plan)) {
      return NextResponse.json({ error: "Ugyldig plan" }, { status: 400 });
    }

    const rawPath = returnUrl || "/generator";
    const cleanPath = rawPath.replace(/^\/+/, "");
    const cancelPath = cleanPath;
    const successPath = cleanPath;

    let productName: string;
    let productDescription: string;
    let unitAmount: number;

    if (plan === "pafyll") {
      productName = "JobbStart – Påfyll";
      productDescription = "+5 ekstra søknader";
      unitAmount = TOPUP_PRICE;
    } else {
      const planDef = PLANS[plan as PlanId];
      productName = `JobbStart – ${planDef.name}`;
      productDescription = planDef.description;
      unitAmount = planDef.priceInOre;
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: { plan },
      success_url: `${origin}/${successPath}?paid=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${cancelPath}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling" },
      { status: 500 }
    );
  }
}

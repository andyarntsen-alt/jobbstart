import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const origin = req.headers.get("origin") || "http://localhost:3000";

    if (plan === "enkel") {
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "nok",
              product_data: {
                name: "JobbStart – Enkel",
                description: "1 profesjonell søknad med PDF + Word nedlasting",
              },
              unit_amount: 4900, // 49 NOK in øre
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/generator?paid=enkel&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/generator`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (plan === "pro") {
      const session = await getStripe().checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "nok",
              product_data: {
                name: "JobbStart – Pro",
                description:
                  "Ubegrenset søknader, alle maler, PDF + Word nedlasting",
              },
              unit_amount: 19900, // 199 NOK in øre
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/generator?paid=pro&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/generator`,
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: "Ugyldig plan" }, { status: 400 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling" },
      { status: 500 }
    );
  }
}

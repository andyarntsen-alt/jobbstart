import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PLANS } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const plan = session.metadata?.plan;
        const userId = session.metadata?.userId;
        const email = session.customer_details?.email;
        const amount = session.amount_total ?? 0;

        console.error(`[PAYMENT] plan=${plan} email=${email} userId=${userId} session=${session.id}`);

        const supabase = getSupabaseServer();
        if (supabase && plan) {
          // Insert purchase record
          await supabase.from("purchases").insert({
            user_id: userId || null,
            plan,
            amount,
            currency: "nok",
            stripe_session_id: session.id,
            stripe_email: email || null,
          });

          // Update user profile if userId is present
          if (userId && plan !== "pafyll") {
            const planDef = PLANS[plan as PlanId];
            if (planDef) {
              await supabase
                .from("profiles")
                .update({
                  plan,
                  applications_remaining: planDef.applicationCredits,
                  applications_used: 0,
                  improve_experience_used: 0,
                  purchased_at: new Date().toISOString(),
                  stripe_session_id: session.id,
                })
                .eq("id", userId);
            }
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}

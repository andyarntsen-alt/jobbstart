import { NextRequest, NextResponse } from "next/server";
import getStripe from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PLANS, TOPUP_CREDITS } from "@/lib/plans";
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

        console.log(`[PAYMENT] plan=${plan} email=${email} userId=${userId} session=${session.id}`);

        const supabase = getSupabaseServer();
        if (supabase && plan) {
          // Insert purchase record
          const { error: purchaseError } = await supabase.from("purchases").insert({
            user_id: userId || null,
            plan,
            amount,
            currency: "nok",
            stripe_session_id: session.id,
            stripe_email: email || null,
          });

          if (purchaseError) {
            console.error("[PAYMENT] Purchase insert failed:", purchaseError);
          }

          // Update/create user profile
          if (userId && plan !== "pafyll") {
            const planDef = PLANS[plan as PlanId];
            if (planDef) {
              const { error: profileError } = await supabase
                .from("profiles")
                .upsert(
                  {
                    id: userId,
                    plan,
                    applications_remaining: planDef.applicationCredits,
                    applications_used: 0,
                    improve_experience_used: 0,
                    purchased_at: new Date().toISOString(),
                    stripe_session_id: session.id,
                  },
                  { onConflict: "id" }
                );

              if (profileError) {
                console.error("[PAYMENT] Profile upsert failed:", profileError);
              }
            }
          }

          // Handle top-up: add credits to existing profile
          if (userId && plan === "pafyll") {
            const { data: profile } = await supabase
              .from("profiles")
              .select("applications_remaining")
              .eq("id", userId)
              .single();

            if (profile) {
              const { error: topupError } = await supabase
                .from("profiles")
                .update({
                  applications_remaining: profile.applications_remaining + TOPUP_CREDITS,
                })
                .eq("id", userId);

              if (topupError) {
                console.error("[PAYMENT] Top-up update failed:", topupError);
              }
            } else {
              console.error("[PAYMENT] Top-up: profile not found for userId:", userId);
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

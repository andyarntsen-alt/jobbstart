"use client";

import { useState } from "react";
import { PLANS } from "@/lib/plans";
import type { PlanId } from "@/lib/plans";
import { getAccess, setAccess } from "@/lib/access-storage";

const PLAN_IDS: PlanId[] = ["free", "enkel", "standard", "max"];

export default function DevAccessPanel() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<PlanId>(() => getAccess().plan);

  if (process.env.NODE_ENV !== "development") return null;

  function switchPlan(planId: PlanId) {
    const plan = PLANS[planId];
    const access = getAccess();
    setAccess({
      ...access,
      plan: planId,
      applicationsRemaining: plan.applicationCredits,
      applicationsUsed: 0,
      improveExperienceUsed: 0,
      freeTrialUsed: false,
    });
    setCurrent(planId);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2">
      <button
        onClick={() => window.location.reload()}
        className="bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-2xl hover:bg-yellow-400"
      >
        Reload side
      </button>
      {open ? (
        <div className="bg-black text-white p-3 rounded-lg shadow-2xl text-xs space-y-2 min-w-[160px]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Dev: Plan</span>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">✕</button>
          </div>
          {PLAN_IDS.map((id) => (
            <button
              key={id}
              onClick={() => switchPlan(id)}
              className={`block w-full text-left px-2 py-1.5 rounded transition-colors ${
                current === id
                  ? "bg-white text-black font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              {PLANS[id].name}, {PLANS[id].price} kr
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg shadow-2xl hover:bg-black/80 transition-colors"
        >
          DEV: {current}
        </button>
      )}
    </div>
  );
}

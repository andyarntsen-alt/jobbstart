"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "jobbstart-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
    } catch {
      // Ignore quota errors
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] border-t border-foreground/10 bg-background px-5 md:px-8 lg:px-10 py-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <p className="text-xs text-foreground/60">
          Vi bruker informasjonskapsler og lokal lagring for å forbedre
          opplevelsen din.{" "}
          <Link
            href="/personvern"
            className="text-foreground underline decoration-foreground/20 hover:decoration-foreground transition-colors"
          >
            Les mer
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 border border-foreground/10 bg-foreground px-5 py-2 text-[11px] font-black uppercase tracking-widest text-background hover:bg-foreground/80 transition-colors"
        >
          Godta
        </button>
      </div>
    </div>
  );
}

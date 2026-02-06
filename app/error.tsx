"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-10">
      <div className="max-w-[600px]">
        <span className="industrial-label mb-4 block">/ FEIL</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          NOE GIKK{" "}
          <span className="opacity-20">GALT.</span>
        </h1>
        <p className="text-sm text-foreground/60 uppercase tracking-wider leading-relaxed mb-12">
          En uventet feil har oppstått. Prøv igjen eller gå tilbake til forsiden.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Prøv igjen
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}

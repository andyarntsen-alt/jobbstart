import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-10">
      <div className="max-w-[600px]">
        <span className="industrial-label mb-4 block">/ 404</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          SIDE IKKE{" "}
          <span className="opacity-20">FUNNET.</span>
        </h1>
        <p className="text-sm text-foreground/60 uppercase tracking-wider leading-relaxed mb-12">
          Siden du leter etter finnes ikke eller har blitt flyttet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Til forsiden
          </Link>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Lag søknad
          </Link>
          <Link
            href="/cv"
            className="inline-flex items-center justify-center border border-foreground/20 px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            Bygg CV
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function Marquee() {
  const items = [
    "FERDIG PÅ 2 MINUTTER",
    "PSTAR-METODEN",
    "TILPASSET NORSK ARBEIDSLIV",
    "PDF & WORD EKSPORT",
    "FRA KR 49,-",
    "KI-DREVET",
    "10 CV-MALER",
    "FINN.NO-INTEGRASJON",
  ];

  return (
    <div
      role="marquee"
      aria-label="Nøkkelegenskaper: Ferdig på 2 minutter, PSTAR-metoden, Tilpasset norsk arbeidsliv, PDF og Word eksport, Fra kr 49, KI-drevet, 10 CV-maler, FINN.no-integrasjon"
      className="-mt-6 md:-mt-10 bg-secondary py-4 md:py-5 overflow-hidden whitespace-nowrap border-y border-foreground/5 relative z-20"
    >
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] px-8 md:px-14 lg:px-20 text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

import Link from "next/link";
import { Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary px-5 md:px-8 lg:px-10 py-6 md:py-12 border-t border-foreground/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 border-l border-foreground" />
        <div className="absolute top-1/4 left-10 w-40 h-[1px] bg-foreground" />
      </div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="mb-6 md:mb-10 grid gap-6 md:gap-10 grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-4 md:mb-8 block">
              <span className="text-xl font-black uppercase tracking-[-0.05em] text-foreground">
                Jobb<span className="opacity-40">Start</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/40 font-bold max-w-sm leading-tight mb-4 md:mb-6">
              KI-drevet verktøy som hjelper deg skrive bedre jobbsøknader, raskere.
            </p>
            <div className="flex gap-6">
              {[
                { label: "FACEBOOK", href: "https://facebook.com/jobbstart" },
                { label: "LINKEDIN", href: "https://linkedin.com/company/jobbstart" },
                { label: "INSTAGRAM", href: "https://instagram.com/jobbstart" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="industrial-label hover:opacity-100 hover:text-primary transition-all underline decoration-foreground/10"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="industrial-label mb-3 md:mb-8 block">/ MENY</span>
            <ul className="space-y-2 md:space-y-4">
              {[
                { label: "Priser", href: "#priser" },
                { label: "Søknadsgenerator", href: "/generator" },
                { label: "CV-bygger", href: "/cv" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm font-bold text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="industrial-label mb-3 md:mb-8 block">/ JURIDISK</span>
            <ul className="space-y-2 md:space-y-4">
              {[
                { label: "Personvern", href: "/personvern" },
                { label: "Vilkår", href: "/vilkar" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm font-bold text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="industrial-label mb-3 md:mb-8 block">/ KONTAKT</span>
            <div className="space-y-3 md:space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 opacity-30" />
                <span className="text-sm font-black text-foreground">kontakt@jobbstart.no</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 opacity-30" />
                <span className="text-sm font-bold text-foreground/60">Oslo, Norge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-foreground/5">
          <span className="industrial-label !opacity-20">&copy; {new Date().getFullYear()} JobbStart</span>
        </div>
      </div>
    </footer>
  );
}

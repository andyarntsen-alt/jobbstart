import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CrossSellBannerProps {
  label: string;
  description: string;
  ctaText: string;
  href: string;
}

export default function CrossSellBanner({
  label,
  description,
  ctaText,
  href,
}: CrossSellBannerProps) {
  return (
    <div className="border border-foreground/10 p-5 flex items-center justify-between gap-4">
      <div>
        <span className="industrial-label mb-1 block">{label}</span>
        <p className="text-xs text-foreground/50 leading-relaxed">
          {description}
        </p>
      </div>
      <Link
        href={href}
        className="shrink-0 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity"
      >
        {ctaText}
        <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Brødsmulesti" className="mb-4">
      <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-foreground/40">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {i === items.length - 1 ? (
              <span className="text-foreground/70">{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

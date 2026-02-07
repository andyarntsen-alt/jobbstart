import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/seo";
import { getBreadcrumbSchema, getBlogItemListSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Blogg — Tips for jobbsøkere i Norge",
  description:
    "Les ekspertråd om jobbsøknader, CV-skriving, intervjutips og karriere i Norge. Oppdaterte guider for norsk arbeidsmarked.",
  keywords: [
    "jobbsøknad tips",
    "cv tips",
    "jobbintervju",
    "karrieretips norge",
    "jobbsøking",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blogg`,
  },
};

export default function BlogPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Hjem", url: "/" },
    { name: "Blogg", url: "/blogg" },
  ]);

  const itemList = getBlogItemListSchema(blogPosts);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, itemList]) }}
      />

      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight">
              CVPILOT
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-5 md:px-8 lg:px-10 py-12 md:py-20">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            / BLOGG
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            Tips for jobbsøkere
          </h1>
          <p className="mt-3 text-muted-foreground">
            Ekspertguider om jobbsøknader, CV-skriving og karriere i Norge.
          </p>
        </div>

        <div className="space-y-1">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="block border border-border p-5 md:p-6 hover:bg-white transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-base font-bold leading-snug group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

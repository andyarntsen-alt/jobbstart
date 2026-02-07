import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  blogPosts,
  getBlogPost,
  getBlogArticleSchema,
  getRelatedPosts,
} from "@/lib/blog";
import { siteConfig } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteConfig.url}/blogg/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      locale: "nb_NO",
      url: `${siteConfig.url}/blogg/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const articleSchema = getBlogArticleSchema(post);
  const breadcrumb = getBreadcrumbSchema([
    { name: "Hjem", url: "/" },
    { name: "Blogg", url: "/blogg" },
    { name: post.title, url: `/blogg/${post.slug}` },
  ]);

  // Simple markdown-to-html for ## headings, **bold**, and paragraphs
  const html = post.content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      if (trimmed.startsWith("### ")) {
        return `<h3 class="text-lg font-bold mt-8 mb-2">${trimmed.slice(4)}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2 class="text-xl font-bold mt-10 mb-3">${trimmed.slice(3)}</h2>`;
      }

      // Handle list blocks
      const lines = trimmed.split("\n");
      if (lines.every((l) => l.startsWith("- "))) {
        const items = lines
          .map((l) => `<li>${formatInline(l.slice(2))}</li>`)
          .join("");
        return `<ul class="list-disc pl-6 space-y-1 text-sm leading-relaxed text-foreground/80">${items}</ul>`;
      }

      // Handle numbered lists
      if (lines.every((l) => /^\d+\.\s/.test(l))) {
        const items = lines
          .map((l) => `<li>${formatInline(l.replace(/^\d+\.\s/, ""))}</li>`)
          .join("");
        return `<ol class="list-decimal pl-6 space-y-1 text-sm leading-relaxed text-foreground/80">${items}</ol>`;
      }

      // Regular paragraph
      return `<p class="text-sm leading-relaxed text-foreground/80">${formatInline(trimmed)}</p>`;
    })
    .join("\n");

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumb]),
        }}
      />

      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight">
              CVPILOT
            </span>
          </Link>
          <Link
            href="/blogg"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Alle artikler
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[700px] px-5 md:px-8 lg:px-10 py-12 md:py-20">
        <Breadcrumb
          items={[
            { name: "Hjem", href: "/" },
            { name: "Blogg", href: "/blogg" },
            { name: post.title, href: `/blogg/${post.slug}` },
          ]}
        />
        <article>
          <div className="mb-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              / BLOGG
            </span>
            <h1 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Publisert{" "}
              {new Date(post.publishedAt).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {post.updatedAt && (
                <>
                  {" "}
                  · Oppdatert{" "}
                  {new Date(post.updatedAt).toLocaleDateString("nb-NO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </>
              )}
            </p>
          </div>

          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-sm font-bold mb-2">
            Klar til å lage din søknad?
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Bruk KI til å generere en profesjonell jobbsøknad på under 2 minutter.
          </p>
          <div className="flex gap-3">
            <Link
              href="/generator"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Lag jobbsøknad
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium border border-border hover:bg-white transition-colors"
            >
              Bygg CV
            </Link>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-6">
              / Relaterte artikler
            </h2>
            <div className="space-y-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blogg/${rp.slug}`}
                  className="flex items-center justify-between group py-3 border-b border-border/50 last:border-0"
                >
                  <div>
                    <span className="text-sm font-semibold group-hover:text-foreground/70 transition-colors">
                      {rp.title}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {rp.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-foreground/20 group-hover:text-foreground/50 transition-colors ml-4" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/«(.+?)»/g, "&laquo;$1&raquo;");
}

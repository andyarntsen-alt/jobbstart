import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "@/lib/blog";

export const alt = "CVpilot Blogg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "CVpilot Blogg";
  const category = post?.category?.toUpperCase() ?? "BLOGG";

  const displayTitle =
    title.length > 60 ? title.slice(0, 57) + "..." : title;

  const label = `/ CVPILOT — ${category}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f2f2f2",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.2em",
            color: "#000000",
            opacity: 0.4,
            marginBottom: 32,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#000000",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 48,
            maxWidth: "900px",
          }}
        >
          {displayTitle.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.15em",
            color: "#000000",
            opacity: 0.4,
          }}
        >
          WWW.CVPILOT.NO/BLOGG
        </div>
      </div>
    ),
    { ...size }
  );
}

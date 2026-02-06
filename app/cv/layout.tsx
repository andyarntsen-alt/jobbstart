import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getCVFAQSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: pageSeo.cv.title,
  description: pageSeo.cv.description,
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    title: pageSeo.cv.title,
    description: pageSeo.cv.description,
  },
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Hjem", url: "/" },
          { name: "CV-bygger", url: "/cv" },
        ])}
      />
      <JsonLd data={getCVFAQSchema()} />
      {children}
    </>
  );
}

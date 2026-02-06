import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getGeneratorFAQSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: pageSeo.generator.title,
  description: pageSeo.generator.description,
  alternates: {
    canonical: "/generator",
  },
  openGraph: {
    title: pageSeo.generator.title,
    description: pageSeo.generator.description,
  },
};

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Hjem", url: "/" },
          { name: "Søknadsgenerator", url: "/generator" },
        ])}
      />
      <JsonLd data={getGeneratorFAQSchema()} />
      {children}
    </>
  );
}

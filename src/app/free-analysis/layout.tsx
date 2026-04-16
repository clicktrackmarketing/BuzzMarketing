import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Free Digital Analysis | See How You Show Up Online",
  description:
    "Get a complimentary digital analysis worth $500. We review your website, Google presence, social media, competitors, and visibility score. The Buzz Marketing Co, San Diego.",
  alternates: {
    canonical: "/free-analysis",
  },
  openGraph: {
    title: "Free Digital Analysis — See How Your Business Shows Up Online",
    description:
      "Complimentary $500 analysis: website review, Google presence, social audit, competitor comparison, visibility score & action plan.",
    url: "https://thebuzzmarketingco.com/free-analysis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Digital Analysis — See How Your Business Shows Up Online",
    description:
      "Complimentary $500 analysis: website review, Google presence, social audit, competitor comparison, visibility score & action plan.",
  },
};

export default function FreeAnalysisLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Free Analysis", path: "/free-analysis" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Free Digital Marketing Analysis",
          provider: { "@id": "https://thebuzzmarketingco.com/#organization" },
          areaServed: { "@type": "City", name: "San Diego" },
          description:
            "Complimentary digital analysis covering website review, Google presence, social media audit, competitor comparison, visibility score, and a clear action plan.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Complimentary for a limited time (usually $500)",
          },
        }}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Digital Analysis | See How You Show Up Online",
  description:
    "Get a complimentary digital analysis worth $500. We review your website, Google presence, social media, competitors, and visibility score. The Buzz Marketing Co, San Diego.",
  alternates: {
    canonical: "/free-analysis",
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
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Free Digital Marketing Analysis",
          provider: {
            "@type": "LocalBusiness",
            name: "The Buzz Marketing Co",
            telephone: "+17203639754",
            url: "https://thebuzzmarketingco.com",
          },
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

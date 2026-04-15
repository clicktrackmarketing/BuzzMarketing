import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Marketing Services | Social Media, SEO & Branding",
  description:
    "Strategy, social media management ($750–$5k/mo), content shoots, website conversion, Google presence, and branding for San Diego's high-trust brands.",
  alternates: {
    canonical: "/services",
  },
};

const SERVICES_SCHEMA = [
  {
    "@type": "Service",
    serviceType: "Social Media Management",
    provider: {
      "@type": "LocalBusiness",
      name: "The Buzz Marketing Co",
    },
    areaServed: { "@type": "City", name: "San Diego" },
    description:
      "Monthly social media management packages from Starter Buzz ($750/mo) to Custom Campaigns ($5,000+/mo) including content planning, caption writing, and page management.",
  },
  {
    "@type": "Service",
    serviceType: "Strategy + Creative Direction",
    provider: {
      "@type": "LocalBusiness",
      name: "The Buzz Marketing Co",
    },
    areaServed: { "@type": "City", name: "San Diego" },
    description:
      "Brand clarity, messaging, content direction, and actionable marketing plans for high-trust brands.",
  },
  {
    "@type": "Service",
    serviceType: "Signature Content Shoot",
    provider: {
      "@type": "LocalBusiness",
      name: "The Buzz Marketing Co",
    },
    areaServed: { "@type": "City", name: "San Diego" },
    description:
      "Two-day high-end photo and video content production ($5,000) with travel included. Assets designed to last months.",
  },
  {
    "@type": "Service",
    serviceType: "Website + Conversion Optimization",
    provider: {
      "@type": "LocalBusiness",
      name: "The Buzz Marketing Co",
    },
    areaServed: { "@type": "City", name: "San Diego" },
    description:
      "Messaging, layout, trust signals, and UX optimization so website visitors take action.",
  },
  {
    "@type": "Service",
    serviceType: "Google + Local Presence",
    provider: {
      "@type": "LocalBusiness",
      name: "The Buzz Marketing Co",
    },
    areaServed: { "@type": "City", name: "San Diego" },
    description:
      "Google Business Profile optimization, reviews strategy, local citations, and credibility signals for local search visibility.",
  },
  {
    "@type": "Service",
    serviceType: "Branding + Positioning",
    provider: {
      "@type": "LocalBusiness",
      name: "The Buzz Marketing Co",
    },
    areaServed: { "@type": "City", name: "San Diego" },
    description:
      "Voice, visual direction, content strategy, and platform positioning with clarity.",
  },
];

const SERVICES_FAQS = [
  {
    question: "What platforms do you manage?",
    answer:
      "We manage Instagram, Facebook, LinkedIn, TikTok, Google Business Profile, YouTube, X/Twitter, and Pinterest - tailored to where your audience actually spends time.",
  },
  {
    question: "How much does social media management cost?",
    answer:
      "We offer Starter Buzz at $750/month, Growth Buzz at $2,000/month, Full Buzz at $3,000/month, and custom campaigns starting at $5,000/month, depending on scope and platforms.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most clients see a meaningful engagement lift within the first 30 days, with clearer growth trajectory emerging over a 90-day window as we optimize.",
  },
  {
    question: "Do you work with businesses outside San Diego?",
    answer:
      "Yes. While we specialize in San Diego brands and local nuance, we partner with businesses nationwide when the fit is right.",
  },
  {
    question: "What makes you different from other agencies?",
    answer:
      "We're boutique and founder-led: selective about clients, obsessed with craft, and allergic to cookie-cutter playbooks - every roadmap is built for your brand.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "No lock-in traps. After an initial 90-day foundation period, most engagements continue month-to-month.",
  },
  {
    question: "Do you offer a signature content shoot?",
    answer:
      "Yes. Our Signature Content Shoot is $5,000 for two full days of high-end photo and video, with travel included, designed to give you assets that last for months.",
  },
  {
    question: "Can I start with one service?",
    answer:
      "Absolutely. Many clients begin with strategy or social, then expand as we prove ROI and your needs grow.",
  },
];

export default function ServicesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": SERVICES_SCHEMA,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SERVICES_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      {children}
    </>
  );
}

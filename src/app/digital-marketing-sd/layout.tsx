import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Best Social Media Marketing Company in San Diego",
  description:
    "Trusted by 150+ San Diego businesses. The Buzz Marketing Co delivers strategy, social media, content, and ads that drive real results. 5.0 Google rating.",
  alternates: {
    canonical: "/digital-marketing-sd",
  },
};

const SD_FAQS = [
  {
    question: "What social media platforms work best for San Diego businesses?",
    answer:
      "Instagram and Facebook still dominate for most local brands, while TikTok is growing fast for discovery-driven businesses. We match platforms to your audience - not trends.",
  },
  {
    question: "How much does social media management cost in San Diego?",
    answer:
      "Social packages start at $750/month (Starter Buzz) and scale through Growth ($2,000), Full ($3,000), and custom campaigns from $5,000/month depending on scope. We'll scope it clearly after a discovery call.",
  },
  {
    question: "Do you only work with San Diego businesses?",
    answer:
      "We specialize in San Diego nuance, but we partner nationwide when the fit is right.",
  },
  {
    question: "How do you help with local SEO?",
    answer:
      "Google Business Profile optimization, accurate citations, localized content, and a review strategy designed to improve visibility in the map pack.",
  },
  {
    question: "Can you help with event marketing?",
    answer:
      "Yes - we've produced 50+ events and can help with promotion, creative, partnerships, and onsite content capture.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "Healthcare, legal, fitness, real estate, food & beverage, and beauty - with playbooks tailored to compliance, proof, and trust.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Most brands onboard within one week once strategy and assets are aligned.",
  },
  {
    question: "Do you offer one-time projects?",
    answer:
      "Yes for select deliverables, though ongoing optimization typically compounds results faster.",
  },
  {
    question: "What results can I expect?",
    answer:
      "Many clients see around 3x engagement lifts and roughly 40% more leads within 90 days - varies by offer, market, and starting baseline.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free discovery call. We'll audit your presence, clarify goals, and map a practical next step.",
  },
];

export default function DigitalMarketingSdLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SD_FAQS.map((faq) => ({
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

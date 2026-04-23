import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "The Buzz Effect · San Diego Branding & Marketing Mastermind",
  description:
    "An intimate evening of branding, content, and marketing strategy at the Top Floor of the University Club, San Diego. Wednesday May 13, 2026. Dinner + mastermind session, 28 seats, $250 per guest. Presented by The Buzz Marketing Co.",
  alternates: {
    canonical: "/buzz-mastermind-group",
  },
  openGraph: {
    title:
      "The Buzz Effect · San Diego Branding & Marketing Mastermind | The Buzz Marketing Co",
    description:
      "An intimate branding & marketing mastermind for San Diego owners and teams. May 13 at the University Club. Dinner + session, 28 seats, $250 per guest.",
    url: "https://thebuzzmarketingco.com/buzz-mastermind-group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Buzz Effect · San Diego Branding & Marketing Mastermind | The Buzz Marketing Co",
    description:
      "An intimate branding & marketing mastermind for San Diego owners and teams. May 13 at the University Club. Dinner + session, 28 seats, $250 per guest.",
  },
};

const MASTERMIND_FAQS = [
  {
    question: "Who is the Buzz Mastermind designed for?",
    answer:
      "Ambitious business owners, marketing managers, office managers, and entire marketing teams in San Diego who want proven branding, content, and marketing systems. Ideal for companies ready to elevate their brand and surround themselves with others building at a higher level.",
  },
  {
    question: "Can I bring my whole team?",
    answer:
      "Yes - team attendance is strongly encouraged. Bringing your office manager, marketing coordinator, social media manager, and admin team ensures everyone leaves aligned and ready to execute. Each seat is $250 and includes dinner plus the full mastermind experience.",
  },
  {
    question: "What will we cover?",
    answer:
      "The foundations of powerful branding, content that actually converts, social media strategies that build authority, positioning and storytelling, SEO and website fundamentals, and how to use tools like Canva and CapCut to create content efficiently. No fluff, no theory - just strategies you can implement the same week.",
  },
  {
    question: "Where is it held?",
    answer:
      "The mastermind takes place at the Top Floor of the University Club in San Diego - a stunning venue with sunset skyline views. Exact address and arrival instructions are shared with confirmed guests.",
  },
  {
    question: "How much does it cost and what's included?",
    answer:
      "Each seat is $250. That includes elevated dining, drinks, and a high-impact mastermind session led by industry leaders - plus the intimate group of 28 professionals and meaningful networking that extends beyond the room.",
  },
  {
    question: "Why only 28 seats?",
    answer:
      "Because of the intimate nature of this experience, seating is extremely limited. A smaller room means every attendee gets real conversation, personal feedback, and a chance to build meaningful connections - not another networking event where you leave with a stack of business cards.",
  },
];

export default function MastermindLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          {
            name: "The Buzz Effect - Branding & Marketing Mastermind",
            path: "/buzz-mastermind-group",
          },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "The Buzz Effect - San Diego Branding & Marketing Mastermind",
          description:
            "A curated evening mastermind for ambitious San Diego owners, operators, and creators. Covers branding, content, social media, positioning, storytelling, SEO, and content tools. Includes dinner and drinks at the Top Floor of the University Club.",
          startDate: "2026-05-13T17:30:00-07:00",
          endDate: "2026-05-13T21:30:00-07:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          organizer: {
            "@type": "Organization",
            name: "The Buzz Marketing Co",
            url: "https://thebuzzmarketingco.com",
          },
          location: {
            "@type": "Place",
            name: "Top Floor, University Club of San Diego",
            address: {
              "@type": "PostalAddress",
              addressLocality: "San Diego",
              addressRegion: "CA",
              addressCountry: "US",
            },
          },
          offers: {
            "@type": "Offer",
            name: "Per Guest - Dinner + Mastermind Session",
            price: "250",
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: "https://thebuzzmarketingco.com/buzz-mastermind-group",
          },
          maximumAttendeeCapacity: 28,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: MASTERMIND_FAQS.map((faq) => ({
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

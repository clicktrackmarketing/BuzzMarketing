import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Shoot Like a Pro · Photography Workshop · Oct 16-18, 2026",
  description:
    "Two-day hands-on photography workshop for dental practice owners and teams. Master intraoral, branding, and before/after photography. Oct 16-18, 2026 in Roseville, CA. Hosted by The Buzz Marketing Co. $1,795 per seat. Only 15 spots.",
  alternates: {
    canonical: "/social-media-mastermind",
  },
  openGraph: {
    title:
      "Shoot Like a Pro · Photography Workshop · Oct 16-18 | The Buzz Marketing Co",
    description:
      "Two-day hands-on photography workshop for practice teams. Intraoral, branding, and before/after photography. Roseville, CA. $1,795 / 15 seats.",
    url: "https://thebuzzmarketingco.com/social-media-mastermind",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shoot Like a Pro · Photography Workshop · Oct 16-18 | The Buzz Marketing Co",
    description:
      "Two-day hands-on photography workshop for practice teams. Intraoral, branding, and before/after photography. Roseville, CA. $1,795 / 15 seats.",
  },
};

const MASTERMIND_FAQS = [
  {
    question: "Who is Shoot Like a Pro designed for?",
    answer:
      "Dental practice owners, office managers, marketing coordinators, and team members who want to capture professional-quality clinical and branded content in-house. Ideal for practices that want consistent photography without paying for an outside photographer every time.",
  },
  {
    question: "Can I bring my whole team?",
    answer:
      "Yes - team attendance is strongly encouraged. Bringing your office manager, marketing coordinator, and clinical team ensures everyone leaves aligned and ready to implement immediately. Each seat is $1,795. Contact The Buzz Marketing Co directly for group arrangements.",
  },
  {
    question: "What will we learn?",
    answer:
      "Day 1 covers camera setup, intraoral clinical photography, lighting, positioning, and team workflows. Day 2 covers portrait branding photography, before-and-after techniques, cross-polarization, editing, and content strategy. Every topic comes with a template or framework you can use the same week.",
  },
  {
    question: "Where is it held?",
    answer:
      "The workshop is held at 1418 Blue Oaks Blvd, Roseville, CA 95747. The Buzz Marketing Co is a San Diego-based agency and we host events across California. Venue details and arrival instructions are shared with registered attendees.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Each seat is $1,795. The workshop runs from October 16 at 3:30 PM through October 18 at 12:00 AM PT, with 15 seats available. Registration is first-come, first-served and seats do sell out.",
  },
  {
    question: "Is this right for someone without photography experience?",
    answer:
      "Absolutely. The workshop is built for practice owners and team members who aren't photographers - it gives you the exact gear list, camera settings, workflows, and templates to produce professional-quality photography from day one.",
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
            name: "Shoot Like a Pro Photography Workshop",
            path: "/social-media-mastermind",
          },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Shoot Like a Pro - Photography Workshop",
          description:
            "A hands-on two-day photography workshop for dental practice owners and teams. Master intraoral clinical photography, portrait branding, before-and-after techniques, lighting, editing, and content strategy.",
          startDate: "2026-10-16T15:30:00-07:00",
          endDate: "2026-10-18T00:00:00-07:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          organizer: {
            "@type": "Organization",
            name: "The Buzz Marketing Co",
            url: "https://thebuzzmarketingco.com",
          },
          location: {
            "@type": "Place",
            name: "Shoot Like a Pro Workshop Venue",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1418 Blue Oaks Blvd",
              addressLocality: "Roseville",
              addressRegion: "CA",
              postalCode: "95747",
              addressCountry: "US",
            },
          },
          offers: {
            "@type": "Offer",
            name: "Per Seat",
            price: "1795",
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: "https://thebuzzmarketingco.com/social-media-mastermind",
          },
          maximumAttendeeCapacity: 15,
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Social Media Marketing Mastermind San Diego",
  description:
    "Half-day San Diego marketing mastermind for business owners and their teams. Learn the exact social, Google, and AI search systems you can implement this week. Seats from $250, team bundles from $750.",
  alternates: {
    canonical: "/social-media-mastermind-san-diego",
  },
  openGraph: {
    title: "Social Media Marketing Mastermind San Diego | The Buzz Marketing Co",
    description:
      "Half-day mastermind for San Diego owners and teams. Tactical social, Google, and AI search systems you can run starting Monday. Seats from $250.",
    url: "https://thebuzzmarketingco.com/social-media-mastermind-san-diego",
    type: "website",
  },
};

const MASTERMIND_FAQS = [
  {
    question: "Who is the mastermind designed for?",
    answer:
      "Business owners, marketing managers, office managers, and entire marketing teams in San Diego who want proven systems for social media, Google, and AI search. It is ideal for companies that want their internal team executing at a higher level - with or without a dedicated marketing hire.",
  },
  {
    question: "Can I bring my whole team?",
    answer:
      "Yes - team attendance is strongly encouraged. Bringing your office manager, marketing coordinator, social media manager, and admin team ensures everyone leaves aligned and ready to implement immediately. Team bundle pricing is available starting at $750 for 3 to 5 seats with priority seating included.",
  },
  {
    question: "What will we learn?",
    answer:
      "You will learn the exact systems, tools, and strategies used by The Buzz Marketing Co to grow businesses across social media platforms, Google search, and AI-powered discovery tools like ChatGPT and Perplexity. Every topic comes with a template or framework you can use the same week.",
  },
  {
    question: "Where is it held?",
    answer:
      "The mastermind is held in San Diego, CA. Exact venue details are shared with registered attendees after booking. Sessions are designed specifically for local San Diego business owners and teams who want to grow in this market.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Individual seats are $250. Team bundles for groups of 3 to 5 people start at $750 and include priority seating. For teams larger than 5, contact The Buzz Marketing Co directly to discuss group options.",
  },
  {
    question: "Is this right for a non-marketing business owner?",
    answer:
      "Absolutely. The mastermind is built for business owners who are not marketers - it gives you the frameworks and vocabulary to lead your marketing efforts confidently, delegate effectively, and hold your team accountable to real results.",
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
            name: "Marketing Mastermind San Diego",
            path: "/social-media-mastermind-san-diego",
          },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "The Buzz Marketing Mastermind - San Diego",
          description:
            "A hands-on marketing mastermind for San Diego business owners and their teams. Learn social media, Google, and AI search strategies you can implement immediately.",
          organizer: {
            "@type": "Organization",
            name: "The Buzz Marketing Co",
            url: "https://thebuzzmarketingco.com",
          },
          location: {
            "@type": "Place",
            name: "San Diego, CA",
            address: {
              "@type": "PostalAddress",
              addressLocality: "San Diego",
              addressRegion: "CA",
            },
          },
          offers: [
            {
              "@type": "Offer",
              name: "Single Seat",
              price: "250",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Team Bundle (3-5 seats)",
              price: "750",
              priceCurrency: "USD",
            },
          ],
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

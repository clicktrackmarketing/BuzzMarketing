import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Shoot Like a Pro · Dental Photography Intensive · Oct 16-17",
  description:
    "Two-day hands-on dental photography intensive with Milos Miladinov. Oct 16-17, 2026 in Roseville, CA. Camera setup, intraoral technique, cross-polarization, editing, and brand content strategy. Hosted by Arora Periodontics and The Buzz Marketing Co. $1,795 general admission.",
  alternates: {
    canonical: "/dental-photography",
  },
  openGraph: {
    title:
      "Shoot Like a Pro · Dental Photography Intensive with Milos Miladinov | Oct 16-17",
    description:
      "Two-day hands-on dental photography intensive with Milos Miladinov. Roseville, CA. Hosted by Arora Periodontics and The Buzz Marketing Co. $1,795 general admission.",
    url: "https://thebuzzmarketingco.com/dental-photography",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shoot Like a Pro · Dental Photography Intensive with Milos Miladinov | Oct 16-17",
    description:
      "Two-day hands-on dental photography intensive with Milos Miladinov. Roseville, CA. Hosted by Arora Periodontics and The Buzz Marketing Co. $1,795 general admission.",
  },
};

const DENTAL_PHOTO_FAQS = [
  {
    question: "Who is this course for?",
    answer:
      "Dentists, practice owners, team leads, and anyone responsible for clinical or marketing documentation at a dental practice. Whether you own your photography or hand it off to a team member, everyone leaves with the same repeatable system.",
  },
  {
    question: "Do I need professional camera experience?",
    answer:
      "No. Milos teaches every technique from the ground up - camera setup, settings, positioning, and workflows. If you can follow a checklist, you can produce professional-grade clinical and branding photography by day two.",
  },
  {
    question: "What gear should I bring?",
    answer:
      "A DSLR or mirrorless camera, a macro lens if you have one, and any current lighting you use. After registration, you'll get a detailed prep checklist with recommendations - and the option to submit your setup for review so Milos can tailor feedback.",
  },
  {
    question: "Where is it held?",
    answer:
      "Arora Periodontics in Roseville, California. A working clinical environment is the ideal setting for hands-on dental photography training. Exact address and arrival instructions go out with your confirmation email.",
  },
  {
    question: "What is included in the $1,795 investment?",
    answer:
      "Two full days of hands-on training with Milos Miladinov, all course materials, a repeatable photography workflow you can implement the next morning, and marketing strategy from The Buzz Marketing Co. team. Small-group format guarantees personal attention.",
  },
  {
    question: "Why is it co-hosted with Buzz Marketing Co?",
    answer:
      "Because clinical photography and marketing are inseparable. Milos teaches the craft. The Buzz team teaches how to turn those images into content that drives case acceptance, patient acquisition, and a premium brand presence.",
  },
  {
    question: "Will seats really sell out?",
    answer:
      "Yes. Every Shoot Like a Pro intensive sells out, and we keep group sizes small by design so every attendee gets direct instruction and feedback. Reserve early.",
  },
];

export default function DentalPhotographyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          {
            name: "Shoot Like a Pro Dental Photography Intensive",
            path: "/dental-photography",
          },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Shoot Like a Pro - Dental Photography Intensive with Milos Miladinov",
          description:
            "A two-day hands-on dental photography intensive led by Milos Miladinov covering camera setup, intraoral clinical photography, portrait and lab photography, cross-polarization, lighting, editing, and brand content strategy. Co-hosted by Arora Periodontics and The Buzz Marketing Co.",
          startDate: "2026-10-16T09:00:00-07:00",
          endDate: "2026-10-17T17:00:00-07:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          organizer: [
            {
              "@type": "Organization",
              name: "The Buzz Marketing Co",
              url: "https://thebuzzmarketingco.com",
            },
            {
              "@type": "Organization",
              name: "Arora Periodontics",
            },
          ],
          performer: {
            "@type": "Person",
            name: "Milos Miladinov",
            jobTitle: "Dental Photography Educator",
            url: "https://dentalpromaster.com",
          },
          location: {
            "@type": "Place",
            name: "Arora Periodontics",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Roseville",
              addressRegion: "CA",
              addressCountry: "US",
            },
          },
          offers: {
            "@type": "Offer",
            name: "General Admission",
            price: "1795",
            priceCurrency: "USD",
            availability: "https://schema.org/LimitedAvailability",
            url: "https://thebuzzmarketingco.com/dental-photography",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: DENTAL_PHOTO_FAQS.map((faq) => ({
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

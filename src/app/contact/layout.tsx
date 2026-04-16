import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Book a Free Discovery Call",
  description:
    "Complete our discovery survey so we can understand your business and come prepared to your strategy call. The Buzz Marketing Co, San Diego. (720) 363-9754.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Book a Free Discovery Call | The Buzz Marketing Co",
    description:
      "Book a discovery call with San Diego's premier social media marketing agency. Come prepared with a clear strategy plan.",
    url: "https://thebuzzmarketingco.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildBreadcrumbs([{ name: "Contact", path: "/contact" }])} />
      {children}
    </>
  );
}

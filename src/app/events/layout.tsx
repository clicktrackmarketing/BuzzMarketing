import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Events | Networking & Marketing Summits",
  description:
    "Join The Buzz Marketing Co for networking mixers, social media summits, and community events across San Diego. Connect with local entrepreneurs and creatives.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events | The Buzz Marketing Co",
    description:
      "Networking mixers, social media summits, and community events hosted by San Diego's premier social media marketing agency.",
    url: "https://thebuzzmarketingco.com/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildBreadcrumbs([{ name: "Events", path: "/events" }])} />
      {children}
    </>
  );
}

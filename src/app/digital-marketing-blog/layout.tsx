import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Marketing Blog | Tips & Strategy",
  description:
    "Marketing insights, San Diego playbooks, social media tips, and growth strategy from The Buzz Marketing Co. Actionable advice for local businesses.",
  alternates: {
    canonical: "/digital-marketing-blog",
  },
  openGraph: {
    title: "Marketing Blog | The Buzz Marketing Co",
    description:
      "Social media, SEO, content, and growth strategy insights from the team behind San Diego's premier social media marketing agency.",
    url: "https://thebuzzmarketingco.com/digital-marketing-blog",
  },
};

export default function DigitalMarketingBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([{ name: "Blog", path: "/digital-marketing-blog" }])}
      />
      {children}
    </>
  );
}

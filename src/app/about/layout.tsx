import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "About The Buzz Marketing Co",
  description:
    "Women-founded, boutique marketing agency in San Diego. Meet founder Brit Dhillon and the team behind 150+ brand transformations and 50+ sold-out events.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About The Buzz Marketing Co",
    description:
      "Women-founded, boutique Social Media Marketing Agency San Diego. Meet founder Brit Dhillon and the team behind 150+ brand transformations.",
    url: "https://thebuzzmarketingco.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildBreadcrumbs([{ name: "About", path: "/about" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://thebuzzmarketingco.com/#brit-dhillon",
          name: "Brit Dhillon",
          jobTitle: "Founder & CEO",
          worksFor: { "@id": "https://thebuzzmarketingco.com/#organization" },
          knowsAbout: [
            "Social Media Marketing",
            "Brand Strategy",
            "Content Direction",
            "Event Marketing",
            "San Diego Small Business Marketing",
          ],
          image: "https://thebuzzmarketingco.com/founder.jpg",
          url: "https://thebuzzmarketingco.com/about",
          description:
            "Brit Dhillon is the founder of The Buzz Marketing Co, a women-founded social media marketing agency in San Diego with 150+ clients served over 8+ years.",
        }}
      />
      {children}
    </>
  );
}

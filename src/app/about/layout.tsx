import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "About The Buzz Marketing Co",
  description:
    "Women-founded, boutique marketing agency in San Diego. Meet founder Brittany Jenkins, president Krizia Beraldo, and the team behind 150+ brand transformations and 50+ sold-out events.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About The Buzz Marketing Co - Meet the Team",
    description:
      "Women-founded, boutique Social Media Marketing Agency in San Diego. Meet the partners behind 150+ brand transformations.",
    url: "https://thebuzzmarketingco.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About The Buzz Marketing Co - Meet the Team",
    description:
      "Women-founded, boutique Social Media Marketing Agency in San Diego. Meet the partners behind 150+ brand transformations.",
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
          "@id": "https://thebuzzmarketingco.com/#brittany-jenkins",
          name: "Brittany Jenkins",
          jobTitle: "Founder",
          worksFor: { "@id": "https://thebuzzmarketingco.com/#organization" },
          knowsAbout: [
            "Search Everywhere Optimization",
            "Digital Marketing",
            "Brand Strategy",
            "Content Direction",
            "Dental Marketing",
            "Medical Marketing",
            "Personal Branding",
            "Event Marketing",
          ],
          image: "https://thebuzzmarketingco.com/britt-jenkins.jpg",
          url: "https://thebuzzmarketingco.com/about#brittany-jenkins",
          description:
            "Brittany Jenkins is the founder of The Buzz Marketing Co, a women-founded San Diego digital marketing agency with 150+ clients served over 20+ years in marketing.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://thebuzzmarketingco.com/#krizia-beraldo",
          name: "Krizia Beraldo",
          jobTitle: "President",
          worksFor: { "@id": "https://thebuzzmarketingco.com/#organization" },
          knowsAbout: [
            "Brand Strategy",
            "Operational Excellence",
            "Product Strategy",
            "Executive Leadership",
            "Human-in-the-Loop Machine Learning",
            "Ethical AI Operations",
            "Marketing Systems",
          ],
          image: "https://thebuzzmarketingco.com/krizia-beraldo.jpg",
          url: "https://thebuzzmarketingco.com/about#krizia-beraldo",
          description:
            "Krizia Beraldo is the President of The Buzz Marketing Co, leading strategy, brand elevation, and operational excellence with over a decade of experience in high-trust, high-value industries.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://thebuzzmarketingco.com/#jessica-johnson",
          name: "Jessica Johnson",
          jobTitle: "Product Performance Manager",
          worksFor: { "@id": "https://thebuzzmarketingco.com/#organization" },
          knowsAbout: [
            "Product Performance",
            "Paid Media",
            "Google Ads",
            "Meta Ads",
            "Dental Marketing",
            "Content Creation",
            "Social Media",
          ],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "California State University San Marcos",
          },
          image: "https://thebuzzmarketingco.com/jessica-johnson.jpg",
          url: "https://thebuzzmarketingco.com/about#jessica-johnson",
          description:
            "Jessica Johnson is a Product Performance Manager at The Buzz Marketing Co with over 7 years of digital marketing experience, specializing in paid media and campaign optimization for high-trust industries.",
        }}
      />
      {children}
    </>
  );
}

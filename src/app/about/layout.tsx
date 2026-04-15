import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Buzz Marketing Co",
  description:
    "Women-founded, boutique marketing agency in San Diego. Meet founder Brit Dhillon and the team behind 150+ brand transformations and 50+ sold-out events.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

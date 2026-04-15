import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Discovery Call",
  description:
    "Complete our discovery survey so we can understand your business and come prepared to your strategy call. The Buzz Marketing Co, San Diego. (720) 363-9754.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

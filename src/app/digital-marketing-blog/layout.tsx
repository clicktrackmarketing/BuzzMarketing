import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Blog | Tips & Strategy",
  description:
    "Marketing insights, San Diego playbooks, social media tips, and growth strategy from The Buzz Marketing Co. Actionable advice for local businesses.",
  alternates: {
    canonical: "/digital-marketing-blog",
  },
};

export default function DigitalMarketingBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

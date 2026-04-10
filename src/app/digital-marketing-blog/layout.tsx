import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Marketing insights, San Diego playbooks, and strategy from The Buzz Marketing Co.",
};

export default function DigitalMarketingBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

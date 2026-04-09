import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function DigitalMarketingBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From strategy to execution: social media, content creation, paid ads, SEO, email marketing, and brand strategy for San Diego brands that want to stand out.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}

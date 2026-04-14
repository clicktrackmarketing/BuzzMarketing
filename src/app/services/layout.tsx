import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Marketing Services",
  description:
    "Strategy, social media (Starter through Custom tiers), signature content shoots, website conversion, Google and local presence, and branding for high-trust brands.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}

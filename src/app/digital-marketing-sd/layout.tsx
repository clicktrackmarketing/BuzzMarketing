import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing in San Diego",
};

export default function DigitalMarketingSdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

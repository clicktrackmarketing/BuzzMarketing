import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet The Buzz Marketing Co — a boutique San Diego agency where strategy meets buzz-worthy content, built on decades of marketing experience and genuine partnerships.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

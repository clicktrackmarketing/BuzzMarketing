import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Buzz Marketing Co",
  description:
    "Where strategy meets buzz-worthy content. Boutique, high-touch marketing: Search Everywhere, platform-native creative, and real relationships - from the founder behind The Buzz Marketing Co.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

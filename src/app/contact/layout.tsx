import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Complete our discovery survey so we can understand your business and come prepared to your strategy call with The Buzz Marketing Co.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

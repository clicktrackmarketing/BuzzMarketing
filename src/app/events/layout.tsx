import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Networking & Marketing Summits",
  description:
    "Join The Buzz Marketing Co for networking mixers, social media summits, and community events across San Diego. Connect with local entrepreneurs and creatives.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

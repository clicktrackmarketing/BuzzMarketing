import type { Metadata } from "next";
import { Outfit, DM_Sans, Syne } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SparkleTrail } from "@/components/SparkleTrail";
import { FloatingPetals } from "@/components/FloatingPetals";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-var",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne-var",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Buzz Marketing Co | San Diego Social Media Marketing Agency",
    template: "%s | The Buzz Marketing Co",
  },
  description:
    "San Diego's premier social media marketing agency. 150+ clients served, 8+ years of experience. Strategy, content, ads, SEO & more.",
  metadataBase: new URL("https://thebuzzmarketingco.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Buzz Marketing Co",
    images: [{ url: "/hero-sd.jpeg", width: 1920, height: 1080, alt: "The Buzz Marketing Co" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "The Buzz Marketing Co",
            description:
              "San Diego's premier social media marketing agency. Building brands, growing audiences, driving revenue.",
            url: "https://thebuzzmarketingco.com",
            telephone: "+17203639754",
            address: {
              "@type": "PostalAddress",
              addressLocality: "San Diego",
              addressRegion: "CA",
              addressCountry: "US",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "19",
            },
            founder: {
              "@type": "Person",
              name: "Brit Dhillon",
            },
            areaServed: {
              "@type": "City",
              name: "San Diego",
            },
          }}
        />
        <Navbar />
        <SparkleTrail />
        <FloatingPetals />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

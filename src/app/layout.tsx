import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, DM_Sans, Syne, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Buzz Marketing Co | San Diego Marketing Agency",
    template: "%s | The Buzz Marketing Co",
  },
  description:
    "San Diego's premier social media marketing agency. 150+ clients served, 8+ years of experience. Strategy, content, ads, SEO & more.",
  metadataBase: new URL("https://thebuzzmarketingco.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thebuzzmarketingco.com",
    siteName: "The Buzz Marketing Co",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Buzz Marketing Co — San Diego's Premier Social Media Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Buzz Marketing Co | San Diego Marketing Agency",
    description:
      "San Diego's premier social media marketing agency. 150+ clients served, 8+ years of experience. Strategy, content, ads, SEO & more.",
    images: ["/og-image.jpg"],
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
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${dmSans.variable} ${syne.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CT9KHYS5SC"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CT9KHYS5SC');
          `}
        </Script>
      </head>
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
            priceRange: "$$",
            image: "https://thebuzzmarketingco.com/og-image.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "San Diego",
              addressRegion: "CA",
              postalCode: "92101",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 32.7157,
              longitude: -117.1611,
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
            areaServed: [
              { "@type": "City", name: "San Diego" },
              { "@type": "City", name: "La Jolla" },
              { "@type": "City", name: "Del Mar" },
              { "@type": "City", name: "Encinitas" },
              { "@type": "City", name: "Carlsbad" },
              { "@type": "City", name: "Coronado" },
              { "@type": "City", name: "Chula Vista" },
            ],
            sameAs: [
              "https://www.instagram.com/thebuzzmarketingco",
              "https://www.facebook.com/660987293768723",
              "https://www.linkedin.com/company/the-buzz-marketing-co/",
              "https://www.youtube.com/@TheBuzzMarketingComany",
            ],
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

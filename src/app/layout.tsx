import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Outfit, DM_Sans, Syne, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SparkleTrail } from "@/components/SparkleTrail";
import { FloatingPetals } from "@/components/FloatingPetals";
import { MobileCTABar } from "@/components/MobileCTABar";
import { RouteChangeTracker } from "@/components/RouteChangeTracker";
import AttributionCapture from "@/components/AttributionCapture";
import { ConsentManager } from "@/components/ConsentManager";
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
    default: "Social Media Marketing Agency San Diego | The Buzz Marketing Co",
    template: "%s | The Buzz Marketing Co",
  },
  description:
    "The Buzz Marketing Co is the social media marketing agency San Diego businesses trust. 150+ clients served, 8+ years of experience. Strategy, content, ads, SEO & more.",
  authors: [{ name: "The Buzz Marketing Co" }],
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
        alt: "The Buzz Marketing Co — Social Media Marketing Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Marketing Agency San Diego | The Buzz Marketing Co",
    description:
      "The Buzz Marketing Co is the social media marketing agency San Diego businesses trust. 150+ clients served, 8+ years of experience. Strategy, content, ads, SEO & more.",
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
        {/*
          Google Consent Mode v2 defaults — MUST load before GA4.
          All consent categories default to "denied" so GA4 only sends
          cookieless pings until the user accepts via <ConsentManager />.
          This is the GDPR/CCPA-compliant pattern recommended by Google.
        */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted'
            });
          `}
        </Script>
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
        {/*
          Microsoft Clarity and PearlDiver visitor identification are
          loaded by <ConsentManager /> only after the user accepts
          non-essential cookies. They are NOT loaded here.
        */}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <AttributionCapture />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "LocalBusiness"],
                "@id": "https://thebuzzmarketingco.com/#organization",
                name: "The Buzz Marketing Co",
                alternateName: "Social Media Marketing Agency San Diego",
                description:
                  "Social Media Marketing Agency San Diego businesses trust. Women-founded boutique agency delivering strategy, content, ads, SEO, and branding for high-trust brands across healthcare, legal, fitness, real estate, beauty, and luxury lifestyle.",
                url: "https://thebuzzmarketingco.com",
                telephone: "+17203639754",
                priceRange: "$$",
                image: "https://thebuzzmarketingco.com/og-image.jpg",
                logo: "https://thebuzzmarketingco.com/logo.png",
                knowsAbout: [
                  "Social Media Marketing",
                  "Social Media Management",
                  "Instagram Marketing",
                  "TikTok Marketing",
                  "Content Strategy",
                  "Brand Strategy",
                  "Creative Direction",
                  "Paid Social Advertising",
                  "Local SEO",
                  "Google Business Profile Optimization",
                  "Conversion Rate Optimization",
                  "Influencer Marketing",
                  "Event Marketing",
                  "Photography and Video Production",
                  "San Diego Digital Marketing",
                ],
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
                founder: { "@id": "https://thebuzzmarketingco.com/#brit-dhillon" },
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
              },
              {
                "@type": "Person",
                "@id": "https://thebuzzmarketingco.com/#brit-dhillon",
                name: "Brit Dhillon",
                jobTitle: "Founder & CEO",
                worksFor: { "@id": "https://thebuzzmarketingco.com/#organization" },
                knowsAbout: [
                  "Social Media Marketing",
                  "Brand Strategy",
                  "Content Direction",
                  "Event Marketing",
                ],
                image: "https://thebuzzmarketingco.com/founder.jpg",
                url: "https://thebuzzmarketingco.com/about",
              },
              {
                "@type": "WebSite",
                "@id": "https://thebuzzmarketingco.com/#website",
                url: "https://thebuzzmarketingco.com",
                name: "The Buzz Marketing Co",
                publisher: { "@id": "https://thebuzzmarketingco.com/#organization" },
                inLanguage: "en-US",
              },
            ],
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-buzz-coral focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-luxury focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          Skip to main content
        </a>
        <Navbar />
        <SparkleTrail />
        <FloatingPetals />
        <Suspense fallback={null}>
          <RouteChangeTracker />
        </Suspense>
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
        <MobileCTABar />
        {/* Spacer so the fixed MobileCTABar doesn't cover footer/content on mobile */}
        <div className="h-14 md:hidden" aria-hidden="true" />
        <ConsentManager />
      </body>
    </html>
  );
}

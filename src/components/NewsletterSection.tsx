"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SectionEyebrow } from "./SectionEyebrow";
import { FadeUp } from "./FadeUp";
import { Button } from "./Button";
import { AmbientOrbs } from "./AmbientOrbs";
import { TextShimmer } from "./TextShimmer";
import { Check } from "lucide-react";
import type { GlobeMarker } from "@/components/ui/3d-globe";

// Dynamic import to avoid SSR issues with three.js
const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((mod) => mod.Globe3D),
  { ssr: false },
);

const MARKERS: GlobeMarker[] = [
  { lat: 32.7157, lng: -117.1611, src: "https://assets.aceternity.com/avatars/1.webp", label: "San Diego" },
  { lat: 34.0522, lng: -118.2437, src: "https://assets.aceternity.com/avatars/2.webp", label: "Los Angeles" },
  { lat: 37.7749, lng: -122.4194, src: "https://assets.aceternity.com/avatars/3.webp", label: "San Francisco" },
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/4.webp", label: "New York" },
  { lat: 29.7604, lng: -95.3698, src: "https://assets.aceternity.com/avatars/5.webp", label: "Houston" },
  { lat: 33.749, lng: -84.388, src: "https://assets.aceternity.com/avatars/6.webp", label: "Atlanta" },
  { lat: 41.8781, lng: -87.6298, src: "https://assets.aceternity.com/avatars/7.webp", label: "Chicago" },
  { lat: 47.6062, lng: -122.3321, src: "https://assets.aceternity.com/avatars/8.webp", label: "Seattle" },
  { lat: 25.7617, lng: -80.1918, src: "https://assets.aceternity.com/avatars/9.webp", label: "Miami" },
  { lat: 39.7392, lng: -104.9903, src: "https://assets.aceternity.com/avatars/10.webp", label: "Denver" },
  { lat: 36.1699, lng: -115.1398, src: "https://assets.aceternity.com/avatars/11.webp", label: "Las Vegas" },
  { lat: 30.2672, lng: -97.7431, src: "https://assets.aceternity.com/avatars/12.webp", label: "Austin" },
  { lat: 42.3601, lng: -71.0589, src: "https://assets.aceternity.com/avatars/13.webp", label: "Boston" },
  { lat: 33.4484, lng: -112.074, src: "https://assets.aceternity.com/avatars/1.webp", label: "Phoenix" },
  { lat: 39.9526, lng: -75.1652, src: "https://assets.aceternity.com/avatars/2.webp", label: "Philadelphia" },
  { lat: 45.5152, lng: -122.6784, src: "https://assets.aceternity.com/avatars/3.webp", label: "Portland" },
  { lat: 35.2271, lng: -80.8431, src: "https://assets.aceternity.com/avatars/4.webp", label: "Charlotte" },
  { lat: 36.1627, lng: -86.7816, src: "https://assets.aceternity.com/avatars/5.webp", label: "Nashville" },
  { lat: 19.4326, lng: -99.1332, src: "https://assets.aceternity.com/avatars/6.webp", label: "Mexico City" },
  { lat: 43.6532, lng: -79.3832, src: "https://assets.aceternity.com/avatars/7.webp", label: "Toronto" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
      <AmbientOrbs
        orbs={[
          { color: "coral", size: 300, top: "20%", left: "20%", delay: 0 },
          { color: "violet", size: 250, bottom: "10%", right: "15%", delay: 2 },
        ]}
      />
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-elevated">
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            {/* Content side */}
            <div className="relative z-10 p-8 md:p-14 lg:p-16">
              <SectionEyebrow light>Stay in the Loop</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-md">
                  Join 1,000+ San Diego{" "}
                  <TextShimmer as="span">Business Owners</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-white/50 text-base max-w-md mb-8 leading-relaxed">
                  Weekly marketing insights, local trends, and exclusive event
                  invites &mdash; no spam, ever.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                {submitted ? (
                  <div className="inline-flex items-center gap-2 text-buzz-coral font-semibold text-lg">
                    <Check className="w-5 h-5" />
                    You&apos;re in! Check your inbox.
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="flex-1 w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-buzz-coral focus:ring-2 focus:ring-buzz-coral/20 transition-all"
                    />
                    <Button type="submit" variant="primary">
                      Join
                    </Button>
                  </form>
                )}
              </FadeUp>
            </div>

            {/* Globe side - anchored left + bottom of column so the full sphere stays in-frame */}
            <div className="relative z-0 hidden lg:flex lg:min-h-[420px] lg:items-end lg:justify-start lg:pl-2 lg:pr-8 lg:pb-6 lg:pt-14">
              <div className="w-full max-w-[500px] -translate-x-2 translate-y-3">
                <div className="aspect-square w-full">
                  <Globe3D
                    className="h-full w-full"
                    markers={MARKERS}
                    config={{
                      atmosphereColor: "#e8795a",
                      atmosphereIntensity: 15,
                      showAtmosphere: true,
                      bumpScale: 3,
                      autoRotateSpeed: 0.12,
                      /** Center of North America toward the camera */
                      faceLatLng: { lat: 42, lng: -98 },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

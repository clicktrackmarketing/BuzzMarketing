"use client";

import { Star, Quote } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { FadeUp } from "./FadeUp";
import { GlowCard } from "./GlowCard";

const TESTIMONIALS = [
  {
    name: "Dr. Amanda Reyes",
    title: "Coastal Smiles Dentistry",
    quote:
      "The Buzz completely transformed our online presence. We went from invisible to fully booked in under 90 days. Their team genuinely cares about your success.",
    rating: 5,
  },
  {
    name: "Michael Torres",
    title: "Torres Law Group",
    quote:
      "Working with Brit and her team has been a game-changer. Our lead generation tripled and the quality of clients we attract has improved dramatically.",
    rating: 5,
  },
  {
    name: "Jessica Lin",
    title: "Glow Med Spa",
    quote:
      "From content to ads to strategy, The Buzz handles everything with such professionalism. Our bookings have increased 40% and our brand has never looked better.",
    rating: 5,
  },
  {
    name: "Ryan Mitchell",
    title: "Pacific Fitness Co.",
    quote:
      "The Buzz doesn't just post content - they build brands. In 90 days we gained over 10,000 followers and saw a real impact on member acquisition.",
    rating: 5,
  },
  {
    name: "Sarah Nakamura",
    title: "Nakamura Real Estate",
    quote:
      "Every campaign is intentional and data-driven. The Buzz helped me stand out in the most competitive real estate market in San Diego.",
    rating: 5,
  },
  {
    name: "David Kowalski",
    title: "Pacific Auto Group",
    quote:
      "Professional, creative, and results-focused. The Buzz Marketing Co is exactly what we needed to modernize our brand and connect with younger buyers.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 bg-buzz-dark relative overflow-hidden">
      <div className="ambient-glow-coral top-1/3 -left-20 opacity-20" />
      <div className="ambient-glow-violet bottom-1/4 -right-10 opacity-15" />
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <SectionEyebrow light center>Client Results</SectionEyebrow>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Don&apos;t Take Our Word for It
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <span className="text-lg font-bold text-[#4285F4]">G</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-buzz-coral text-buzz-coral"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-white/60">
                5.0 &middot; 19 Reviews
              </span>
            </a>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.08} variant={i % 2 === 0 ? "up" : "scale"}>
              <GlowCard variant="dark" className="h-full">
                <div className="p-7 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-buzz-coral/25 mb-4" />
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-buzz-coral text-buzz-coral"
                      />
                    ))}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/[0.06]">
                    <p className="font-semibold text-sm text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-white/40">{t.title}</p>
                  </div>
                </div>
              </GlowCard>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-buzz-coral hover:underline cursor-pointer"
            >
              Read All Reviews on Google &rarr;
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

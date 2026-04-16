"use client";

import { Star, Quote } from "lucide-react";
import { SectionEyebrow } from "./SectionEyebrow";
import { FadeUp } from "./FadeUp";
import { GlowCard } from "./GlowCard";

const TESTIMONIALS = [
  {
    name: "James Hickey",
    title: "SD Networking & Events",
    quote:
      "Since working with Brittany, our social visibility has grown over 300%, and our events have consistently sold out. She understands how to create visibility that actually drives results.",
    rating: 5,
  },
  {
    name: "Samantha Pfeiffer",
    title: "Realtor, Luxury Portfolio International",
    quote:
      "As a Realtor, I really struggle with my social media content and consistency along with website and all things technology. I am so excited that Better Buzz has relieved me of this burden and made my content look a million times better. I am so happy to find professionals I can trust that work with my vision and know how to grow my SEO and business. Highly recommend!",
    rating: 5,
  },
  {
    name: "Juan Chaves",
    title: "Google Review",
    quote:
      "Working with Better Buzz Marketing Co. has been a total game-changer for our business! Brittany\u2019s creativity, professionalism, and deep marketing knowledge have helped us connect with our audience in ways we never imagined. From stunning visuals to effective strategies, they truly deliver. Highly recommend for anyone looking to level up their brand!",
    rating: 5,
  },
  {
    name: "Amber Bunch",
    title: "Google Review",
    quote:
      "Brittany has a gift! She brings energy and dedication! The creativity is next-level, and she genuinely cares about the success of your business. I was so impressed with her dedication to the overall vision and her ideas. You\u2019re hard pressed to find another Brittany in this industry. 10 stars! \u2B50\uFE0F",
    rating: 5,
  },
  {
    name: "Dr. Wayne Myles, DDS",
    title: "Dentist",
    quote:
      "I have worked with Brittany for several years. She is creative, efficient, and organized. She pushes the envelope on growth and development, which for me is paramount. If you have an opportunity to work with her, don\u2019t miss out.",
    rating: 5,
  },
  {
    name: "Leah Bush",
    title: "Google Review",
    quote:
      "Brittany is amazing to work with. She asked a lot of great questions to better understand our needs as a business and worked very hard to help us achieve the return we were looking for. We would recommend her to anyone looking to grow their business. Excellent service and AMAZING results!",
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
              href="https://www.google.com/maps/place/The+Buzz+Marketing+Co./@46.423669,-129.9427085,3z/data=!4m8!3m7!1s0x6df99150e5c38703:0xb25e1d157465215e!8m2!3d46.423669!4d-129.9427086!9m1!1b1!16s%2Fg%2F11ydr_hc9l"
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

        <div className="grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp
              key={t.name}
              delay={i * 0.08}
              variant={i % 2 === 0 ? "up" : "scale"}
              className="h-full min-h-0"
            >
              <GlowCard variant="dark" className="h-full min-h-[280px] md:min-h-[320px]">
                <div className="flex h-full min-h-0 flex-col p-7">
                  <Quote className="w-8 h-8 shrink-0 text-buzz-coral/25 mb-4" />
                  <div className="mb-4 flex shrink-0 gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-buzz-coral text-buzz-coral"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/65">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-auto shrink-0 border-t border-white/[0.06] pt-4">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/65">{t.title}</p>
                  </div>
                </div>
              </GlowCard>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps/place/The+Buzz+Marketing+Co./@46.423669,-129.9427085,3z/data=!4m8!3m7!1s0x6df99150e5c38703:0xb25e1d157465215e!8m2!3d46.423669!4d-129.9427086!9m1!1b1!16s%2Fg%2F11ydr_hc9l"
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

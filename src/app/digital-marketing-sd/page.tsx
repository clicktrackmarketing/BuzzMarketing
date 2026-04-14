"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Check, ChevronDown, Star } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";

const WHY_LOCAL = [
  "Deep San Diego market knowledge and neighborhood nuance",
  "In-person content shoots across the county",
  "Google Business Profile optimization and review strategy",
  "Local citations and directory consistency",
  "Connections to SD events, partners, and communities",
  "Hyper-local ad targeting that wastes less budget",
];

const FAQS = [
  {
    q: "What social media platforms work best for San Diego businesses?",
    a: "Instagram and Facebook still dominate for most local brands, while TikTok is growing fast for discovery-driven businesses. We match platforms to your audience - not trends.",
  },
  {
    q: "How much does social media management cost in San Diego?",
    a: "Social packages start at $750/month (Starter Buzz) and scale through Growth ($2,000), Full ($3,000), and custom campaigns from $5,000/month depending on scope. We'll scope it clearly after a discovery call.",
  },
  {
    q: "Do you only work with San Diego businesses?",
    a: "We specialize in San Diego nuance, but we partner nationwide when the fit is right.",
  },
  {
    q: "How do you help with local SEO?",
    a: "Google Business Profile optimization, accurate citations, localized content, and a review strategy designed to improve visibility in the map pack.",
  },
  {
    q: "Can you help with event marketing?",
    a: "Yes - we've produced 50+ events and can help with promotion, creative, partnerships, and onsite content capture.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Healthcare, legal, fitness, real estate, food & beverage, and beauty - with playbooks tailored to compliance, proof, and trust.",
  },
  {
    q: "How quickly can you start?",
    a: "Most brands onboard within one week once strategy and assets are aligned.",
  },
  {
    q: "Do you offer one-time projects?",
    a: "Yes for select deliverables, though ongoing optimization typically compounds results faster.",
  },
  {
    q: "What results can I expect?",
    a: "Many clients see around 3x engagement lifts and roughly 40% more leads within 90 days - varies by offer, market, and starting baseline.",
  },
  {
    q: "How do I get started?",
    a: "Book a free discovery call. We'll audit your presence, clarify goals, and map a practical next step.",
  },
];

export default function DigitalMarketingSdPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "15%", left: "10%", delay: 0 },
            { color: "violet", size: 400, bottom: "10%", right: "15%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-90" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-28 text-center">
          <FadeUp>
            <div className="flex justify-center">
              <SectionEyebrow light center>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-buzz-coral shrink-0" aria-hidden />
                  San Diego, CA
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Best Social Media Marketing Company in{" "}
              <TextShimmer as="span">San Diego</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Trusted by 150+ local businesses with strategy, content, and ads
              built for America&apos;s Finest City - not generic templates.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button href="/contact" variant="glow" arrow>
                Free Consultation
              </Button>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <Link
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-7 py-3.5 border border-white/20 bg-white/[0.04] glassmorphism text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-buzz-coral text-buzz-coral" />
                  5.0 on Google
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="relative bg-surface-dark-alt border-y border-white/[0.06]">
        <div className="coral-divider" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 text-center">
            <FadeUp>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={150} suffix="+" />
              </div>
              <p className="mt-2 text-sm text-white/40">San Diego Clients</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={8} suffix="+" />
              </div>
              <p className="mt-2 text-sm text-white/40">Years in Business</p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                5.0
              </div>
              <p className="mt-2 text-sm text-white/40">Google Rating</p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={3} suffix="x" />
              </div>
              <p className="mt-2 text-sm text-white/40">Avg. Engagement Lift</p>
            </FadeUp>
          </div>
        </div>
        <div className="coral-divider" />
      </section>

      {/* WHY LOCAL */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Local Advantage</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Why a <TextShimmer as="span">San Diego</TextShimmer> Partner
                Wins
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <FadeUp>
              <ul className="space-y-4">
                {WHY_LOCAL.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white border border-buzz-border p-5 shadow-sm"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buzz-coral/10 text-buzz-coral">
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-foreground/90 text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.08}>
              <GlowCard variant="light" className="h-full">
                <div className="bg-buzz-dark rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden h-full">
                  <div className="dot-grid absolute inset-0 pointer-events-none" />
                  <AmbientOrbs
                    orbs={[
                      { color: "coral", size: 250, top: "10%", left: "10%", delay: 0 },
                    ]}
                  />
                  <div className="relative z-10">
                    <h3 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white mb-4">
                      Free Strategy Call
                    </h3>
                    <p className="text-white/50 mb-8 leading-relaxed">
                      Get a practical audit of your social presence, quick wins,
                      and a roadmap - no fluff, no pressure.
                    </p>
                    <Button href="/contact" variant="glow" arrow>
                      Book Your Call
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </FadeUp>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 350, top: "20%", right: "10%", delay: 0 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow light center>FAQ</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                San Diego <TextShimmer as="span">FAQs</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeUp key={faq.q} delay={i * 0.03}>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden h-full">
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="cursor-pointer w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                    >
                      <span className="font-[family-name:var(--font-outfit-var)] font-semibold text-white pr-2 text-sm md:text-base">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                        className="shrink-0 text-buzz-coral"
                      >
                        <ChevronDown className="w-5 h-5" aria-hidden />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/45 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.2}>
            <p className="text-center mt-10 text-white/30 text-sm">
              Ready to talk?{" "}
              <Link
                href="/contact"
                className="text-buzz-coral font-semibold hover:underline cursor-pointer"
              >
                Book a free discovery call
              </Link>
              .
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

"use client";

import { TrendingUp } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { CoralCTA } from "@/components/CoralCTA";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { HeroBackdrop } from "@/components/HeroBackdrop";

const CASE_STUDIES = [
  {
    industry: "Healthcare",
    client: "Coastal Smiles Dentistry",
    summary:
      "Complete digital transformation including social media management, content creation, and Google Ads.",
    metrics: [
      { value: "3x", label: "Engagement Rate" },
      { value: "40%", label: "New Patient Growth" },
      { value: "250%", label: "Google Views Increase" },
    ],
  },
  {
    industry: "Beauty",
    client: "Glow Med Spa",
    summary:
      "Full-service marketing overhaul from branding to paid ads, resulting in record-breaking bookings.",
    metrics: [
      { value: "40%", label: "Booking Increase" },
      { value: "5x", label: "Follower Growth" },
      { value: "$12k+", label: "Revenue Added / mo" },
    ],
  },
  {
    industry: "Legal",
    client: "Torres Law Group",
    summary:
      "Strategic content marketing and SEO campaign driving qualified leads and brand authority.",
    metrics: [
      { value: "200%", label: "Website Traffic" },
      { value: "35+", label: "Leads / Month" },
      { value: "4.2x", label: "ROAS" },
    ],
  },
  {
    industry: "Fitness",
    client: "Pacific Fitness Co.",
    summary:
      "90-day social media blitz that built a thriving online community and drove member acquisition.",
    metrics: [
      { value: "10k+", label: "Followers in 90 Days" },
      { value: "60%", label: "Member Acquisition" },
      { value: "8x", label: "Engagement Rate" },
    ],
  },
];

export default function TestimonialsResultsRoiPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "20%", left: "15%", delay: 0 },
            { color: "violet", size: 350, bottom: "20%", right: "10%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-90" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-28 text-center">
          <FadeUp>
            <div className="flex justify-center">
              <SectionEyebrow light center>
                <span className="inline-flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-buzz-coral shrink-0" aria-hidden />
                  Proven Results
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Results That <TextShimmer as="span">Speak Louder</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Real case studies, real metrics - so you know what "success" looks
              like before you ever sign.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* RESULTS STATS */}
      <section className="py-16 bg-surface-dark-alt relative overflow-hidden border-y border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { target: 150, suffix: "+", label: "Clients Served" },
              { target: 3, suffix: "x", label: "Avg. Engagement Lift" },
              { target: 40, suffix: "%", label: "Avg. Lead Increase" },
              { target: 5, suffix: ".0", label: "Google Rating" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                  {stat.suffix === ".0" ? (
                    "5.0"
                  ) : (
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  )}
                </div>
                <p className="mt-2 text-sm text-white/40">{stat.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Case Studies</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground">
                Outcomes <TextShimmer as="span">by the Numbers</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs, i) => (
              <FadeUp key={cs.client} delay={i * 0.08}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-5 sm:p-8 md:p-10 flex flex-col h-full">
                    <span className="inline-flex self-start rounded-full bg-buzz-coral/10 px-3 py-1 text-xs font-semibold text-buzz-coral mb-4">
                      {cs.industry}
                    </span>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-xl md:text-2xl font-bold text-foreground mb-4">
                      {cs.client}
                    </h3>
                    <p className="text-buzz-slate text-sm md:text-base leading-relaxed mb-8 flex-1">
                      {cs.summary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-buzz-border">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="text-center sm:text-left">
                          <p className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-gradient-coral leading-none mb-2">
                            {m.value}
                          </p>
                          <p className="text-xs md:text-sm text-buzz-slate font-medium">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <CoralCTA />
    </>
  );
}

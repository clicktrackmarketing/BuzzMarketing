"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  Layers,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Users,
  Phone,
} from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";

const DIFFERENTIATORS = [
  {
    icon: Search,
    title: "We don't do 'SEO.' We do Search Everywhere.",
    body: "Google, Instagram, TikTok, YouTube, ChatGPT — your customers search everywhere. We optimize for all of them.",
  },
  {
    icon: Layers,
    title: "Every platform has its own code.",
    body: "What works on Instagram won't work on LinkedIn. We craft platform-native strategies that speak each audience's language.",
  },
  {
    icon: Sparkles,
    title: "We don't build funnels. We build constellations.",
    body: "Touchpoints across social, email, ads, and events that create a gravitational pull toward your brand.",
  },
  {
    icon: HeartHandshake,
    title: "We optimize for emotion, not just keywords.",
    body: "Data tells us what works. Psychology tells us why. We combine both to create content that truly resonates.",
  },
  {
    icon: ShieldCheck,
    title: "We turn attention into trust.",
    body: "Followers are vanity. Trust is currency. Every piece of content we create is designed to build lasting credibility.",
  },
  {
    icon: Users,
    title: "We're selective by design.",
    body: "We limit our client roster so every brand gets the deep attention it deserves. Quality over quantity, always.",
  },
];

const BRIT_MISSION_QUOTE =
  "\u201cEvery partnership comes with full intention. If I take it on, it\u2019s because I know we can elevate it.\u201d";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.82]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] overflow-hidden flex flex-col items-center justify-center bg-buzz-dark"
      >
        <motion.div
          style={prefersReduced ? {} : { scale: heroScale }}
          className="absolute inset-0"
        >
          <HeroVideoBackground />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-hero-overlay" />
        <motion.div
          style={prefersReduced ? { opacity: 0.65 } : { opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />
        <div className="grain-overlay absolute inset-0 pointer-events-none z-[1]" />

        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "20%", left: "10%", delay: 0 },
            { color: "violet", size: 400, bottom: "20%", right: "15%", delay: 2 },
          ]}
        />

        <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 md:px-8 py-24 text-center flex flex-col items-center">
          <SectionEyebrow light pulse center>
            About The Buzz
          </SectionEyebrow>
          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-[family-name:var(--font-syne-var)] text-[32px] sm:text-[44px] md:text-[56px] font-extrabold text-white leading-[1.08]"
          >
            Where Strategy Meets{" "}
            <TextShimmer as="span">Buzz-Worthy</TextShimmer> Content
          </motion.h1>
        </div>
      </section>

      <div className="coral-divider" />

      {/* FOUNDER STORY */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-start">
            <FadeUp variant="left">
              <div className="rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 relative group">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/founder.jpg"
                    alt="Brit Dhillon, founder of The Buzz Marketing Co"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 28rem"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>

            <div>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-8">
                  One Simple Mission
                </h2>
              </FadeUp>
              <FadeUp delay={0.06}>
                <p className="text-buzz-slate leading-relaxed mb-5 text-base md:text-lg">
                  I started The Buzz Marketing Co with one simple mission: to
                  help small businesses show up like big brands.
                </p>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="text-buzz-slate leading-relaxed mb-5">
                  With over 20 years of marketing experience — from the days of
                  Yellow Pages to today&apos;s algorithm-driven landscape —
                  I&apos;ve seen every evolution of marketing. What hasn&apos;t
                  changed is the core: understanding people and creating genuine
                  connections.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="text-buzz-slate leading-relaxed mb-10">
                  The Buzz is intentionally boutique. We&apos;re selective about
                  who we work with because every partnership deserves full
                  attention and commitment.
                </p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <blockquote className="border-l-4 border-buzz-coral pl-6 py-1 mb-4">
                  <p className="italic text-foreground/90 text-lg leading-relaxed">{BRIT_MISSION_QUOTE}</p>
                </blockquote>
                <p className="text-buzz-slate text-sm mb-10">
                  — Brit Dhillon, Founder
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Button href="/contact" arrow>
                  Let&apos;s Work Together
                </Button>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM PHOTO */}
      <section className="pb-28 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <FadeUp variant="scale">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-card-hover cursor-pointer group">
              <Image
                src="/team-beach.jpg"
                alt="The Buzz Marketing Co team"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-buzz-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "10%", right: "15%", delay: 0 },
            { color: "violet", size: 350, bottom: "15%", left: "5%", delay: 3 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <SectionEyebrow light center>Our Approach</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                What Makes Us <TextShimmer as="span">Different</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIATORS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.06} variant={i % 2 === 0 ? "up" : "scale"}>
                <GlowCard variant="dark" className="h-full">
                  <div className="p-5 sm:p-7">
                    <div className="w-12 h-12 rounded-xl bg-buzz-coral/10 flex items-center justify-center mb-5">
                      <item.icon className="w-6 h-6 text-buzz-coral" />
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit-var)] text-lg font-bold text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section className="py-28 bg-surface-dark-alt relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "30%", left: "20%", delay: 0 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="coral-divider" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-8 text-center pt-10">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight">
              Let&apos;s Build Something{" "}
              <TextShimmer as="span">Unforgettable</TextShimmer>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="glow" arrow>
                Book a Discovery Call
              </Button>
              <Button
                href="tel:+17203639754"
                variant="ghost"
                className="text-white border-white/20 hover:bg-white/[0.06]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call (720) 363-9754
              </Button>
            </div>
          </FadeUp>
        </div>
        <div className="coral-divider mt-10" />
      </section>
    </>
  );
}

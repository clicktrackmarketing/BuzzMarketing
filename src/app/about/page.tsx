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
  ExternalLink,
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
    title: "We don't do \"SEO.\" We do Search Everywhere.",
    body: "People don't search in one place anymore. They decide across Google, Instagram, TikTok, YouTube, Reddit, and even AI tools. We build content that shows up and resonates everywhere decisions are made.",
  },
  {
    icon: Layers,
    title: "Every platform has its own code.",
    body: "What works on Instagram won't work on TikTok. What converts on Google won't build trust on Reddit. We optimize content for how each platform thinks, feels, and decides.",
  },
  {
    icon: Sparkles,
    title: "We don't build funnels. We build constellations.",
    body: "Your audience doesn't move in a straight line. They discover you here, validate you there, feel something somewhere else and then convert. We design content to support the entire decision ecosystem.",
  },
  {
    icon: HeartHandshake,
    title: "We optimize for emotion, not just keywords.",
    body: "People don't want to think. They want to feel. Our content is immediate, visual, and emotionally compelling, because feelings drive action.",
  },
  {
    icon: ShieldCheck,
    title: "We turn attention into trust.",
    body: "From raw authenticity to perceived authority, we help your brand earn belief, credibility, and follow-through, not just views.",
  },
  {
    icon: Users,
    title: "We're selective by design.",
    body: "We partner with brands we believe in, so we can go deeper, think smarter, and deliver real results, not mass-produced content.",
  },
];

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
            Strategic Brand Growth
          </SectionEyebrow>
          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-[40px] md:text-[52px] font-extrabold text-white leading-[1.08]"
          >
            About
            The Buzz Marketing Co
          </motion.h1>
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-5 text-lg md:text-xl text-white/70 font-[family-name:var(--font-outfit-var)] font-medium max-w-2xl"
          >
            Where strategy meets{" "}
            <TextShimmer as="span">buzz-worthy</TextShimmer> content
          </motion.p>
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
                  I started The Buzz Marketing Co with one simple mission:{" "}
                  <strong className="text-foreground font-semibold">
                    To help small businesses show up like big brands.
                  </strong>
                </p>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="text-buzz-slate leading-relaxed mb-5">
                  After 20+ years in marketing (yep - I started in the Yellow
                  Pages), I&apos;ve seen what works, what doesn&apos;t, and what
                  makes a brand truly unforgettable. Now, I take that experience
                  and pour it into businesses I believe in, with bold ideas,
                  smart strategy, and scroll-stopping content.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="text-buzz-slate leading-relaxed mb-3">
                  At The Buzz, this isn&apos;t a volume shop.
                </p>
                <p className="text-buzz-slate leading-relaxed mb-5 text-base md:text-lg">
                  <strong className="text-foreground font-semibold">
                    It&apos;s boutique, high-touch marketing built on real
                    relationships.
                  </strong>
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <p className="text-buzz-slate leading-relaxed mb-10 text-base md:text-lg">
                  Every partnership comes with full intention. If I take it on,
                  it&apos;s because I know we can elevate it.
                </p>
              </FadeUp>
              <FadeUp delay={0.26}>
                <p className="text-buzz-slate text-sm mb-10 font-medium">
                  - Brit Dhillon, Founder
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
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-card-hover cursor-pointer group">
              <Image
                src="/team-beach.jpg"
                alt="San Diego beach with the team and dogs - The Buzz Marketing Co"
                fill
                className="object-cover object-[50%_0%] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-buzz-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="text-center text-buzz-slate text-sm mt-4 max-w-2xl mx-auto">
              San Diego beach with dogs - family, fun, and the same energy we
              bring to your brand.
            </p>
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

      {/* PACKAGES + SOCIAL (single band; phone only in CTA below) */}
      <section className="py-24 md:py-32 bg-warm-gray border-t border-black/[0.06]">
        <div className="max-w-[720px] mx-auto px-6 md:px-8">
          <FadeUp>
            <div className="rounded-[28px] border border-black/[0.08] bg-white/[0.55] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.12)] backdrop-blur-sm px-8 py-10 md:px-12 md:py-12 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-buzz-coral mb-4">
                Your Buzz, Your way
              </p>
              <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-foreground leading-snug mb-5">
                Social that fits your flow - and work worth following
              </h2>
              <p className="text-buzz-slate leading-relaxed text-base md:text-[17px] mb-8">
                Whether you need content creation or full-scale social media
                management, we offer flexible packages. We&apos;ll always keep it
                real, creative, and{" "}
                <em className="text-foreground/90 font-semibold italic">
                  results-driven.
                </em>{" "}
                Catch{" "}
                <span className="text-buzz-coral font-semibold">
                  Insta-Highlights
                </span>{" "}
                for campaigns and behind-the-scenes from brands like yours.
              </p>
              <div className="flex flex-wrap items-stretch justify-center gap-3">
                <Button
                  href="https://www.instagram.com/thebuzzmarketingco"
                  variant="glow"
                  className="gap-2 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  Instagram
                </Button>
                <Button
                  href="https://www.facebook.com/660987293768723"
                  variant="ghost"
                  className="gap-2 border-foreground/15 bg-white/60 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  Facebook
                </Button>
                <Button
                  href="https://www.linkedin.com/company/the-buzz-marketing-co/"
                  variant="ghost"
                  className="gap-2 border-foreground/15 bg-white/60 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  LinkedIn
                </Button>
                <Button
                  href="https://www.youtube.com/@TheBuzzMarketingComany"
                  variant="ghost"
                  className="gap-2 border-foreground/15 bg-white/60 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  YouTube
                </Button>
              </div>
              <p className="mt-8 text-buzz-slate text-sm">
                Ready to talk strategy? Use the{" "}
                <a
                  href="/contact"
                  className="text-buzz-coral font-medium hover:underline"
                >
                  contact form
                </a>{" "}
                or book a call in the next section.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* PRIMARY CTA */}
      <section className="py-24 md:py-28 bg-surface-dark-alt relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "30%", left: "20%", delay: 0 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="coral-divider" />
        <div className="relative z-10 max-w-[640px] mx-auto px-6 md:px-8 text-center pt-8">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              Ready to Get Noticed?
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="text-white/55 text-base md:text-lg mb-10 leading-relaxed">
              Let&apos;s create something beautiful, bold, and buzz-worthy for
              your social media marketing.
            </p>
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

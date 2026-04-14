"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Compass,
  Megaphone,
  Camera,
  LayoutTemplate,
  MapPinned,
  Palette,
  ChevronDown,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { WordReveal } from "@/components/WordReveal";
import { HeroTextEffect } from "@/components/HeroTextEffect";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GoldDivider } from "@/components/GoldDivider";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CoralCTA } from "@/components/CoralCTA";
import { NewsletterSection } from "@/components/NewsletterSection";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";

const SERVICES = [
  {
    icon: Compass,
    image: "/service-brand.jpg",
    title: "Strategy + Creative Direction",
    desc: "Brand clarity, messaging, content direction, and a clear plan so you're not guessing.",
  },
  {
    icon: Megaphone,
    image: "/service-social.jpg",
    title: "Social Media Management",
    desc: "Intentional posting and packages from Starter Buzz ($750/mo) through custom campaigns.",
  },
  {
    icon: Camera,
    image: "/service-content.jpg",
    title: "Signature Content Shoot",
    desc: "Two-day high-end photo and video with travel included - assets that last for months.",
  },
  {
    icon: LayoutTemplate,
    image: "/service-ads.jpg",
    title: "Website + Conversion Optimization",
    desc: "Messaging, layout, trust signals, and UX so visitors take action on your site.",
  },
  {
    icon: MapPinned,
    image: "/service-seo.jpg",
    title: "Google + Local Presence",
    desc: "Visuals, reviews strategy, and credibility so you stand out where decisions are made.",
  },
  {
    icon: Palette,
    image: "/service-email.jpg",
    title: "Branding + Positioning",
    desc: "Voice, visual direction, content strategy, and platform positioning with clarity.",
  },
];

const PORTFOLIO = [
  { label: "Brand Campaign", sub: "Creative Studio", image: "/portfolio-1.jpg" },
  { label: "Content Strategy", sub: "Social Launch", image: "/portfolio-2.jpg" },
  { label: "Visual Identity", sub: "Rebrand Project", image: "/portfolio-3.jpg" },
  { label: "Social Campaign", sub: "Growth Strategy", image: "/portfolio-4.jpg" },
  { label: "Product Launch", sub: "Digital Marketing", image: "/portfolio-5.jpg" },
  { label: "Event Branding", sub: "Experiential", image: "/portfolio-6.jpg" },
];

const STATS = [
  { value: 150, suffix: "+", label: "Clients Served" },
  { value: 8, suffix: "+", label: "Years in San Diego" },
  { value: 50, suffix: "+", label: "Events Hosted" },
  { value: 19, suffix: "", label: "5-Star Reviews" },
];

const EVENTS = [
  {
    date: "APR 18",
    title: "San Diego Social Media Summit",
    location: "Downtown San Diego",
    desc: "Full-day summit with keynote speakers, workshops, and networking for business owners.",
  },
  {
    date: "MAY 9",
    title: "Buzz Networking Mixer",
    location: "Gaslamp Quarter",
    desc: "An intimate evening mixer connecting San Diego entrepreneurs and creatives.",
  },
];

const BLOG_POSTS = [
  {
    category: "Social Media",
    readTime: "5 min read",
    title: "Why San Diego Businesses Need a Social Media Strategy in 2026",
    excerpt:
      "The digital landscape has shifted. Here's why having a strategy matters more than ever for local businesses.",
    date: "Mar 15, 2026",
    image: "/portfolio-1.jpg",
  },
  {
    category: "SEO",
    readTime: "7 min read",
    title: "Local SEO Tips That Actually Work for Small Businesses",
    excerpt:
      "Forget the generic advice. These are the tactics that move the needle for San Diego businesses.",
    date: "Mar 8, 2026",
    image: "/portfolio-2.jpg",
  },
  {
    category: "Content",
    readTime: "4 min read",
    title: "How to Create Scroll-Stopping Content on a Budget",
    excerpt:
      "You don't need a massive budget to create content that converts. Here's how to do it right.",
    date: "Feb 28, 2026",
    image: "/portfolio-3.jpg",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden bg-buzz-dark">
        <motion.div
          style={prefersReduced ? {} : { scale: heroScale }}
          className="absolute inset-0"
        >
          <HeroVideoBackground />
        </motion.div>

        {/* Gradient mesh overlay */}
        <motion.div
          style={prefersReduced ? { opacity: 0.65 } : { opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-hero-overlay"
        />
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />

        {/* Ambient orbs */}
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 600, top: "20%", left: "10%", delay: 0 },
            { color: "violet", size: 500, top: "40%", right: "5%", delay: 3 },
            { color: "rose", size: 350, bottom: "15%", left: "40%", delay: 5 },
          ]}
        />

        <div className="relative z-20 flex h-full min-h-0 flex-col items-center justify-center px-6 pt-28 pb-32 text-center md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 sm:px-5 sm:py-2.5 glass-subtle"
          >
            <span className="h-2 w-2 shrink-0 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-buzz-coral" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 md:text-xs">
              Women Founded
            </span>
            <span className="h-3 w-px bg-white/15 hidden sm:block" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 md:text-xs hidden sm:inline">
              San Diego&apos;s Premier Agency
            </span>
          </motion.div>

          <h1 className="max-w-4xl font-[family-name:var(--font-space-grotesk-var)] text-[28px] font-bold leading-[1.1] text-white sm:text-[38px] md:text-[48px] lg:text-[56px]">
            <WordReveal text="We Make Brands" className="text-white" />
            <br />
            <HeroTextEffect text="Impossible to Ignore" delay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
          >
            San Diego&apos;s boutique social media agency, strategy, content,
            and ads that turn scrollers into customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          >
            <Button href="/contact" variant="glow" arrow>
              Book a Discovery Call
            </Button>
            <Button
              href="/digital-marketing-sd"
              variant="ghost"
              className="text-white border-white/20 hover:bg-white/[0.06]"
              arrow
            >
              See Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="absolute bottom-8 flex flex-col items-center gap-2"
          >
            <span className="text-white/35 text-[10px] tracking-[0.3em] uppercase font-medium">
              Scroll
            </span>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full border border-white/[0.08] animate-[glow-pulse_4s_ease-in-out_infinite]" />
              <ChevronDown className="w-5 h-5 text-white/40 animate-[bounce-scroll_2s_ease-in-out_infinite]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS MARQUEE ─── */}
      <section className="bg-buzz-dark relative border-y border-white/[0.06]">
        <div className="coral-divider" />
        <div className="py-10">
          <InfiniteMarquee speed={40} className="py-2">
            <div className="flex items-center gap-16 px-8">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-4 shrink-0">
                  <span className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white whitespace-nowrap">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-white/30 text-sm whitespace-nowrap">{s.label}</span>
                </div>
              ))}
              <div className="w-px h-8 bg-white/[0.06] shrink-0" />
            </div>
          </InfiniteMarquee>
        </div>
        <div className="coral-divider" />
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-28 md:py-36 bg-warm-gray relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <SectionEyebrow center>What We Do</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Everything Your Brand Needs to{" "}
                <TextShimmer as="span">Stand Out</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.08} variant={i < 3 ? "up" : "scale"}>
                <GlowCard variant="light" className="h-full">
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-buzz-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-[family-name:var(--font-outfit-var)] text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-buzz-coral">
                        {s.title}
                      </h3>
                      <div className="w-9 h-9 rounded-lg bg-buzz-coral/10 flex items-center justify-center shrink-0 group-hover:bg-buzz-coral/15 group-hover:scale-110 transition-all duration-300">
                        <s.icon className="w-4 h-4 text-buzz-coral" />
                      </div>
                    </div>
                    <p className="text-buzz-slate text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 400, top: "10%", left: "5%", delay: 0 },
            { color: "coral", size: 350, bottom: "10%", right: "10%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <SectionEyebrow light>Featured Work</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Brands We&apos;ve Brought to{" "}
                  <TextShimmer as="span">Life</TextShimmer>
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <p className="text-white/40 text-sm max-w-xs mt-4 lg:mt-0 lg:text-right">
                Every project gets the white-glove treatment. Hover to see the
                work come alive.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.map((p, i) => (
              <FadeUp key={p.label} delay={i * 0.08} variant={i % 3 === 1 ? "scale" : "up"}>
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-[1.05] grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-buzz-coral/10 to-buzz-violet/10 opacity-30 sm:opacity-0 sm:group-hover:opacity-60 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-semibold text-sm">
                      {p.label}
                    </p>
                    <p className="text-white/40 text-xs">{p.sub}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className="py-28 md:py-36 bg-warm-gray relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeUp variant="left">
              <div className="relative rounded-2xl overflow-hidden group">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/founder.jpg"
                    alt="Brit Dhillon, founder of The Buzz Marketing Co"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-buzz-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                {/* Gradient border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>

            <div>
              <SectionEyebrow>Meet The Founder</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6">
                  Built on Energy, Community &{" "}
                  <TextShimmer as="span">Results</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-buzz-slate leading-relaxed mb-4 text-base md:text-lg">
                  The Buzz Marketing Co was born from a simple belief: San Diego
                  businesses deserve marketing that actually moves the needle.
                  Over 8 years, we&apos;ve grown from a one-person hustle into
                  the city&apos;s most energetic marketing agency.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-buzz-slate leading-relaxed mb-8">
                  Hosting sold-out events, partnering with brands like Tesla and
                  MLB, and building a community of 150+ thriving businesses
                  &mdash; we don&apos;t do cookie-cutter. Every strategy is
                  custom, every campaign is intentional, and every result is
                  measurable.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex items-center gap-6">
                  <Button href="/about" arrow>Our Story</Button>
                  <div>
                    <p className="font-[family-name:var(--font-syne-var)] text-2xl font-bold">
                      20+
                    </p>
                    <p className="text-buzz-slate text-xs">Years Experience</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── EVENTS ─── */}
      <section className="py-28 md:py-36 bg-surface-dark-alt relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "5%", right: "15%", delay: 0 },
            { color: "violet", size: 300, bottom: "15%", left: "5%", delay: 3 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="coral-divider" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionEyebrow light>Upcoming Events</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white mb-6">
                  The Buzz Brings San Diego{" "}
                  <TextShimmer as="span">Together</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-white/40 leading-relaxed mb-8">
                  From intimate mixers to full-scale summits, our events connect
                  you with the people and strategies that accelerate growth.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <Button
                  href="/events"
                  variant="ghost"
                  className="text-white border-white/20 hover:bg-white/[0.06]"
                  arrow
                >
                  View All Events
                </Button>
              </FadeUp>
            </div>

            <div className="space-y-5">
              {EVENTS.map((e, i) => (
                <FadeUp key={e.title} delay={0.1 + i * 0.1} variant="right">
                  <GlowCard variant="dark">
                    <div className="p-6">
                      <span className="inline-block px-4 py-1.5 bg-gradient-coral text-white text-xs font-bold rounded-lg mb-3">
                        {e.date}
                      </span>
                      <div className="flex items-center gap-2 text-white/30 text-xs mb-2">
                        <MapPin className="w-3 h-3" />
                        {e.location}
                      </div>
                      <h3 className="font-[family-name:var(--font-outfit-var)] text-white font-bold mb-2">
                        {e.title}
                      </h3>
                      <p className="text-white/40 text-sm mb-4">{e.desc}</p>
                      <span className="inline-flex items-center gap-1 text-buzz-coral text-sm font-medium cursor-pointer group">
                        Reserve Your Spot
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </GlowCard>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CoralCTA />

      {/* ─── BLOG ─── */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
            <div>
              <SectionEyebrow>From the Blog</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground">
                  Latest Insights
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <Link
                href="/digital-marketing-blog"
                className="text-sm font-medium text-buzz-coral hover:underline mt-4 sm:mt-0 cursor-pointer inline-flex items-center gap-1 group"
              >
                View All Articles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post, i) => (
              <FadeUp key={post.title} delay={i * 0.08} variant={i === 1 ? "scale" : "up"}>
                <GlowCard variant="light" className="h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-buzz-coral/10 text-buzz-coral text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-buzz-slate text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit-var)] font-bold text-foreground mb-2 line-clamp-2 group-hover:text-buzz-coral transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-buzz-slate text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-buzz-slate text-xs">{post.date}</span>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <NewsletterSection />
    </>
  );
}

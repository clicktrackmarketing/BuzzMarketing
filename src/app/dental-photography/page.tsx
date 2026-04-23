"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronDown,
  Check,
  Users,
  Calendar,
  Camera,
  Aperture,
  Sparkles,
  Lightbulb,
  Palette,
  Wand2,
  Award,
  GraduationCap,
  Globe,
  TrendingUp,
  Stethoscope,
  Building2,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Search,
  Mail,
  Gift,
  FileCheck,
  Video,
  ImageIcon,
} from "lucide-react";

import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { DentalPhotographyRegisterForm } from "@/components/DentalPhotographyRegisterForm";

const BUZZ_PHONE = "(720) 363-9754";
const BUZZ_PHONE_TEL = "7203639754";

const COURSE_MODULES = [
  {
    icon: Aperture,
    title: "Camera Settings & Setup (Simplified)",
    desc: "Stop guessing. Learn the exact settings and rigs that produce consistent results - from any camera body.",
  },
  {
    icon: Camera,
    title: "Intraoral Photography Techniques",
    desc: "Clean, repeatable clinical images every single time. Positioning, mirrors, retractors, and angles explained.",
  },
  {
    icon: Users,
    title: "Portrait & Branding Photography",
    desc: "Capture team portraits and branded imagery that make your practice look world-class online.",
  },
  {
    icon: Wand2,
    title: "Close-Up & Lab Photography",
    desc: "The detail shots that communicate with your lab and sell your cases - shade matching, texture, precision.",
  },
  {
    icon: Sparkles,
    title: "Cross-Polarization Techniques",
    desc: "Eliminate glare and reveal true color and texture. The pro-level technique that separates hobbyists from experts.",
  },
  {
    icon: Lightbulb,
    title: "Lighting & Studio Setup",
    desc: "Practical, affordable lighting setups that make your operatory double as a content studio.",
  },
  {
    icon: Palette,
    title: "Editing Workflows",
    desc: "Clean, natural edits in minutes - not hours. Presets and pipelines you can hand off to your team.",
  },
  {
    icon: ImageIcon,
    title: "Visual Storytelling",
    desc: "How to frame, sequence, and present cases so they actually convert viewers into patients.",
  },
];

const WHY_IT_MATTERS = [
  {
    icon: Search,
    title: "Patients judge before they read",
    desc: "Your photography is the first impression. Blurry or inconsistent clinical images quietly cost you cases every single week.",
  },
  {
    icon: TrendingUp,
    title: "Cases convert on presentation",
    desc: "The same clinical work presented with professional photography closes at a dramatically higher rate. Same skill. Different story.",
  },
  {
    icon: Sparkles,
    title: "AI and search reward visual content",
    desc: "Instagram, TikTok, Google AI Overviews, and visual discovery surfaces all favor strong imagery. Text alone no longer wins.",
  },
];

const DISCOVERY_CHANNELS = [
  { icon: Video, label: "Instagram & TikTok" },
  { icon: Sparkles, label: "AI-driven search" },
  { icon: ImageIcon, label: "Video & visual platforms" },
];

const WHO_IT_IS_FOR = [
  {
    icon: Stethoscope,
    title: "Dentists ready to elevate their brand and case presentation",
    sub: "You know your clinical work is world-class. Your photos should match.",
  },
  {
    icon: TrendingUp,
    title: "Practices investing in growth and marketing",
    sub: "Build the content engine that compounds - starting with images that actually convert.",
  },
  {
    icon: Users,
    title: "Teams responsible for content and documentation",
    sub: "Give your team one clear workflow instead of reinventing every shot.",
  },
  {
    icon: Camera,
    title: "Anyone tired of photos not reflecting the quality of their work",
    sub: "The gap between your clinical skill and your online presentation ends here.",
  },
];

const WHAT_HAPPENS_NEXT = [
  {
    icon: Mail,
    title: "Confirmation Email",
    desc: "Full event details, arrival instructions, and venue address land in your inbox within minutes.",
  },
  {
    icon: FileCheck,
    title: "Prep Checklist",
    desc: "Exactly what to bring, how to prepare, and what to expect - nothing wasted on day one.",
  },
  {
    icon: ImageIcon,
    title: "Setup Review (Optional)",
    desc: "Submit your current camera setup and sample images for a pre-event review so Milos can tailor feedback.",
  },
  {
    icon: Check,
    title: "Ready Day 1",
    desc: "Our team double-checks you're ready to get the maximum return from both days.",
  },
];

const FAQS = [
  {
    q: "Who is this course for?",
    a: "Dentists, practice owners, team leads, and anyone responsible for clinical or marketing documentation at a dental practice. Whether you own your photography or hand it off to a team member, everyone leaves with the same repeatable system.",
  },
  {
    q: "Do I need professional camera experience?",
    a: "No. Milos teaches every technique from the ground up - camera setup, settings, positioning, and workflows. If you can follow a checklist, you can produce professional-grade clinical and branding photography by day two.",
  },
  {
    q: "What gear should I bring?",
    a: "A DSLR or mirrorless camera, a macro lens if you have one, and any current lighting you use. After registration, you'll get a detailed prep checklist with recommendations - and the option to submit your setup for review so Milos can tailor feedback.",
  },
  {
    q: "Where is it held?",
    a: "Arora Periodontics in Roseville, CA. A working clinical environment is the ideal setting for hands-on dental photography training. Exact address and arrival instructions go out with your confirmation email.",
  },
  {
    q: "What's included in the $1,795 investment?",
    a: "Two full days of hands-on training with Milos Miladinov, all course materials, a repeatable photography workflow you can implement the next morning, and marketing strategy from The Buzz Marketing Co. team. Small-group format guarantees personal attention.",
  },
  {
    q: "Why is it co-hosted with Buzz Marketing Co.?",
    a: "Because clinical photography and marketing are inseparable. Milos teaches the craft. The Buzz team teaches how to turn those images into content that drives case acceptance, patient acquisition, and a premium brand presence.",
  },
  {
    q: "Will seats really sell out?",
    a: "Yes. Every Shoot Like a Pro intensive sells out, and we keep group sizes small by design so every attendee gets direct instruction and feedback. Reserve early.",
  },
  {
    q: "Is this a group seat or one-person-only?",
    a: "Each ticket is for one attendee. If you want to bring a team member (highly recommended - alignment between dentist and content lead compounds results), book separate tickets.",
  },
];

export default function DentalPhotographyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (i: number) => setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <>
      {/* HERO */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 520, top: "12%", left: "8%", delay: 0 },
            { color: "violet", size: 420, bottom: "8%", right: "12%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-90" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-28 text-center">
          <FadeUp>
            <div className="flex justify-center">
              <SectionEyebrow light center>
                <span className="inline-flex items-center gap-2">
                  <Camera
                    className="w-4 h-4 text-buzz-coral shrink-0"
                    aria-hidden
                  />
                  Dental Photography Intensive · Oct 16 & 17 · Roseville, CA
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[32px] sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-white leading-[1.05] max-w-5xl mx-auto tracking-tight">
              Shoot Like a <TextShimmer as="span">Pro</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mt-5 text-buzz-coral font-semibold text-sm md:text-base uppercase tracking-[0.16em]">
              with Milos Miladinov
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="mt-6 text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              A two-day hands-on dental photography intensive built for
              dentists, practices, and content teams who want images that match
              the quality of their clinical work. Hosted by Arora Periodontics
              and The Buzz Marketing Co.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button href="#reserve" variant="glow" arrow>
                Reserve Your Seat
              </Button>
              <Link
                href="#what-you-learn"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-7 py-3.5 border border-white/20 bg-white/[0.04] glassmorphism text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                See What You&apos;ll Learn
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-buzz-coral/10 border border-buzz-coral/25 px-4 py-2 text-xs font-semibold text-buzz-coral uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Small-group hands-on training · Limited seats
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
                <AnimatedCounter target={2} suffix=" days" />
              </div>
              <p className="mt-2 text-sm text-white/65">Hands-On Training</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={8} suffix="" />
              </div>
              <p className="mt-2 text-sm text-white/65">Core Modules</p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                $1,795
              </div>
              <p className="mt-2 text-sm text-white/65">General Admission</p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Oct 16-17
              </div>
              <p className="mt-2 text-sm text-white/65">Roseville, CA</p>
            </FadeUp>
          </div>
        </div>
        <div className="coral-divider" />
      </section>

      {/* MEET MILOS */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <FadeUp variant="left" className="lg:col-span-2">
              <div className="relative aspect-[5/6] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-buzz-dark border border-buzz-border shadow-luxury">
                <Image
                  src="/milos.jpg"
                  alt="Milos Miladinov - dental photographer and educator, holding a camera rig"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 28rem"
                  priority
                />
                {/* Bottom gradient + caption overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-buzz-dark via-buzz-dark/75 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="text-[10px] md:text-[11px] font-bold text-buzz-coral uppercase tracking-[0.18em] mb-2">
                    Your Instructor
                  </p>
                  <p className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white leading-tight">
                    Milos Miladinov
                  </p>
                  <p className="text-white/65 text-xs md:text-sm mt-2 leading-relaxed">
                    Dental photography educator · Global faculty · Dental
                    technician
                  </p>
                  <Link
                    href="https://dentalpromaster.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-buzz-coral text-xs font-semibold uppercase tracking-wider hover:underline"
                  >
                    dentalpromaster.com
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>

            <div className="lg:col-span-3">
              <FadeUp>
                <SectionEyebrow>Meet Your Instructor</SectionEyebrow>
              </FadeUp>
              <FadeUp delay={0.06}>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mt-2 mb-6">
                  One of the most respected dental photographers
                  <br className="hidden md:block" />
                  <TextShimmer as="span">in the world.</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.12}>
                <div className="space-y-5 text-buzz-slate text-base md:text-lg leading-relaxed">
                  <p>
                    With decades of experience as a dental technician and global
                    educator, Milos has built a reputation for teaching clear,
                    repeatable systems that produce consistent, high-quality
                    clinical images.
                  </p>
                  <p className="text-foreground font-semibold italic">
                    &quot;Photography isn&apos;t just about aesthetics - it&apos;s
                    about communication, precision, and trust.&quot;
                  </p>
                  <p>
                    He has taught thousands of dentists, labs, and teams how to
                    capture clinically accurate images, present cases at a
                    higher level, and elevate their brand through visual
                    storytelling.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Award, label: "Global Educator" },
                    { icon: GraduationCap, label: "Dental Technician" },
                    { icon: Globe, label: "Trusted Worldwide" },
                  ].map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-xl bg-white border border-buzz-border px-4 py-3 shadow-sm"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-buzz-coral/10 text-buzz-coral">
                        <Icon className="w-4 h-4" strokeWidth={2.3} />
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section
        id="what-you-learn"
        className="py-28 md:py-36 bg-surface-light border-y border-buzz-border"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <SectionEyebrow center>What Is Shoot Like a Pro?</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                One of the most comprehensive
                <br />
                <TextShimmer as="span">dental photography trainings</TextShimmer>{" "}
                available today.
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-5 text-buzz-slate text-base md:text-lg leading-relaxed">
                A combination of hands-on training and structured systems that
                teach you exactly how to take professional-level images -
                without guesswork.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSE_MODULES.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.04}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-6 md:p-7 h-full flex flex-col">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-coral text-white shadow-luxury mb-5">
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </span>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-base md:text-lg font-bold text-foreground mb-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-buzz-slate text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.35}>
            <p className="text-center mt-12 text-foreground/85 text-base md:text-lg max-w-2xl mx-auto font-semibold leading-relaxed">
              Everything is taught step-by-step so you can implement
              immediately.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* WHY THIS MATTERS / BRAND LEVEL-UP */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 450, top: "15%", right: "8%", delay: 0 },
            { color: "violet", size: 320, bottom: "10%", left: "8%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="mb-14 max-w-3xl">
            <SectionEyebrow light>Why Your Brand Levels Up</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                You can be an incredible clinician.
                <br />
                But if your photos don&apos;t reflect it,
                <br />
                <TextShimmer as="span">
                  you&apos;re leaving money and trust on the table.
                </TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed">
                The practices winning right now aren&apos;t just better
                clinically. They&apos;re better visually.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_IT_MATTERS.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white/[0.04] border border-white/[0.08] p-7 md:p-8 hover:border-buzz-coral/40 hover:bg-white/[0.06] transition-all">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-buzz-coral/15 border border-buzz-coral/30 text-buzz-coral mb-5">
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="font-[family-name:var(--font-syne-var)] text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="mt-12 text-center text-buzz-coral font-semibold text-base md:text-lg">
              This course fixes that.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* DAY 1 / DAY 2 */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Hands-On · What You Learn</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                This is not a lecture.
                <br />
                <TextShimmer as="span">This is implementation.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <FadeUp>
              <GlowCard variant="light" className="h-full">
                <div className="p-8 md:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-coral text-white shadow-luxury">
                      <span className="font-[family-name:var(--font-syne-var)] font-extrabold text-lg">
                        01
                      </span>
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.14em]">
                        Day 1
                      </p>
                      <h3 className="font-[family-name:var(--font-syne-var)] text-xl md:text-2xl font-bold text-foreground leading-tight">
                        Foundations + Clinical Capture
                      </h3>
                    </div>
                  </div>
                  <p className="text-buzz-slate text-base leading-relaxed mb-5">
                    Day one is about simplifying everything and getting it right
                    from the start.
                  </p>
                  <ul className="space-y-3 text-buzz-slate text-sm md:text-base leading-relaxed">
                    {[
                      "Proper camera setup for consistent results",
                      "Clean, repeatable intraoral clinical photos",
                      "Lighting and positioning for accuracy",
                      "Portrait photography and efficient workflows",
                      "Everything designed for easy in-practice implementation",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 text-buzz-coral shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-foreground/85 text-sm md:text-base font-semibold leading-relaxed">
                    The goal: shoot it right the first time so you don&apos;t
                    have to rely on editing.
                  </p>
                </div>
              </GlowCard>
            </FadeUp>

            <FadeUp delay={0.08}>
              <GlowCard variant="light" className="h-full">
                <div className="p-8 md:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-coral text-white shadow-luxury">
                      <span className="font-[family-name:var(--font-syne-var)] font-extrabold text-lg">
                        02
                      </span>
                    </span>
                    <div>
                      <p className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.14em]">
                        Day 2
                      </p>
                      <h3 className="font-[family-name:var(--font-syne-var)] text-xl md:text-2xl font-bold text-foreground leading-tight">
                        Branding + Advanced Techniques
                      </h3>
                    </div>
                  </div>
                  <p className="text-buzz-slate text-base leading-relaxed mb-5">
                    Day two is where your photography turns into real
                    marketing.
                  </p>
                  <ul className="space-y-3 text-buzz-slate text-sm md:text-base leading-relaxed">
                    {[
                      "Keynote and social media strategy for dental brands",
                      "Positioning your work to attract the right patients",
                      "Cross-polarization and advanced clinical techniques",
                      "Editing workflows for clean, natural results",
                      "Building trust and case acceptance through visuals",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 text-buzz-coral shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-foreground/85 text-sm md:text-base font-semibold leading-relaxed">
                    Understand what to do with your photos so they build trust,
                    attract the right patients, and help your practice grow.
                  </p>
                </div>
              </GlowCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* REAL IMPACT / SEARCH HAS CHANGED */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 400, top: "10%", left: "10%", delay: 0 },
            { color: "coral", size: 350, bottom: "10%", right: "10%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeUp>
              <SectionEyebrow light>Real Impact · Why This Matters</SectionEyebrow>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-2 mb-6">
                Search has <TextShimmer as="span">changed.</TextShimmer>
              </h2>
              <p className="text-white/55 text-base md:text-lg leading-relaxed mb-6">
                Patients are no longer just Googling. They&apos;re discovering
                through:
              </p>
              <ul className="space-y-3 mb-8">
                {DISCOVERY_CHANNELS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-buzz-coral/15 border border-buzz-coral/30 text-buzz-coral">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-white font-medium">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold text-base md:text-lg leading-relaxed">
                If your content isn&apos;t strong, you&apos;re invisible.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <GlowCard variant="dark">
                <div className="bg-gradient-coral rounded-2xl p-8 md:p-10">
                  <p className="text-[11px] font-bold text-white/80 uppercase tracking-[0.14em] mb-5">
                    This course is the foundation of:
                  </p>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Better marketing",
                        desc: "Content that actually drives case acceptance.",
                      },
                      {
                        title: "Higher case acceptance",
                        desc: "Visuals build trust before patients ever speak to you.",
                      },
                      {
                        title: "A premium brand presence",
                        desc: "The gap between good and exceptional is visual.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 shrink-0 mt-1 text-white"
                          strokeWidth={2.5}
                        />
                        <div>
                          <p className="text-white font-bold text-base md:text-lg">
                            {item.title}
                          </p>
                          <p className="text-white/80 text-sm mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* HOSTED WITH BUZZ MARKETING CO */}
      <section className="py-28 md:py-36 bg-surface-light border-y border-buzz-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeUp variant="left">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-luxury">
                <Image
                  src="/buzz-team-skyline.jpg"
                  alt="The Buzz Marketing Co team - co-hosts of the Shoot Like a Pro dental photography intensive"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 28rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>

            <div>
              <FadeUp>
                <SectionEyebrow>Hosted with The Buzz Marketing Co.</SectionEyebrow>
              </FadeUp>
              <FadeUp delay={0.06}>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mt-2 mb-6">
                  We don&apos;t teach theory.
                  <br />
                  We build{" "}
                  <TextShimmer as="span">brands that perform.</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="text-buzz-slate text-base md:text-lg leading-relaxed mb-5">
                  Milos teaches the craft. The Buzz team - a women-founded
                  San Diego boutique agency trusted by 150+ clients - teaches
                  how to turn those images into content that drives case
                  acceptance, patient acquisition, and a premium brand
                  presence.
                </p>
                <p className="text-buzz-slate text-base md:text-lg leading-relaxed">
                  This is the exact level of content and quality we expect
                  from the practices we work with. If you&apos;ve ever
                  thought,{" "}
                  <em className="text-foreground font-semibold">
                    &quot;My work is better than what I&apos;m showing
                    online...&quot;
                  </em>{" "}
                  — this is your fix.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["150+ clients served", "8+ years", "5.0 Google rating"].map(
                    (stat) => (
                      <span
                        key={stat}
                        className="inline-flex items-center gap-2 rounded-full bg-white border border-buzz-border px-4 py-2 text-xs font-semibold text-foreground shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-buzz-coral" />
                        {stat}
                      </span>
                    ),
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Who This Is For</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Built for the practices
                <br />
                ready to <TextShimmer as="span">level up.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHO_IT_IS_FOR.map(({ icon: Icon, title, sub }, i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <div className="h-full flex items-start gap-4 rounded-2xl bg-white border border-buzz-border p-6 shadow-sm">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-coral text-white shadow-luxury">
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-foreground font-semibold text-base md:text-lg leading-snug mb-1.5">
                      {title}
                    </p>
                    <p className="text-buzz-slate text-sm md:text-base leading-relaxed">
                      {sub}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT DETAILS / RESERVE */}
      <section id="reserve" className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "15%", left: "10%", delay: 0 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow light center>
              Event Details
            </SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Reserve your
                <br />
                <TextShimmer as="span">seat.</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-5 text-white/55 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                This will sell out. It always does.
              </p>
            </FadeUp>
          </div>

          <FadeUp>
            <GlowCard variant="dark">
              <div className="bg-white rounded-2xl p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                <div>
                  <ul className="space-y-6">
                    {[
                      {
                        icon: Calendar,
                        label: "Dates",
                        value: "October 16 & 17, 2026",
                        sub: "Two full days of hands-on training",
                      },
                      {
                        icon: MapPin,
                        label: "Location",
                        value: "Arora Periodontics",
                        sub: "Roseville, CA · Exact address in confirmation",
                      },
                      {
                        icon: Users,
                        label: "Format",
                        value: "Small group · Hands-on",
                        sub: "Seats limited to maintain instruction quality",
                      },
                      {
                        icon: Gift,
                        label: "Investment",
                        value: "$1,795 general admission",
                        sub: "Full 2-day intensive · Includes materials",
                      },
                      {
                        icon: Building2,
                        label: "Co-Hosted By",
                        value: "Arora Periodontics + Buzz Marketing Co.",
                        sub: "Clinical venue meets content strategy",
                      },
                    ].map(({ icon: Icon, label, value, sub }) => (
                      <li key={label} className="flex items-start gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-buzz-coral/10 text-buzz-coral">
                          <Icon className="w-5 h-5" strokeWidth={2.2} />
                        </span>
                        <div>
                          <p className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.08em] mb-1">
                            {label}
                          </p>
                          <p className="text-foreground font-semibold text-base leading-snug">
                            {value}
                          </p>
                          <p className="text-buzz-slate text-sm mt-1">{sub}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-start gap-3 rounded-xl bg-buzz-coral/10 border border-buzz-coral/25 p-4">
                    <Lightbulb className="w-5 h-5 text-buzz-coral shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/85 font-medium leading-relaxed">
                      If your work is better than what you&apos;re showing
                      online - this is your fix. Your ROI will speak for
                      itself.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <DentalPhotographyRegisterForm />
                  <p className="text-center text-sm text-buzz-slate leading-relaxed">
                    Questions? Call or text{" "}
                    <Link
                      href={`tel:${BUZZ_PHONE_TEL}`}
                      className="text-buzz-coral font-semibold hover:underline"
                    >
                      {BUZZ_PHONE}
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/contact"
                      className="text-buzz-coral font-semibold hover:underline"
                    >
                      send us a message
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </GlowCard>
          </FadeUp>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>What Happens Next</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Once you reserve your seat...
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_HAPPENS_NEXT.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-6 md:p-7 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-buzz-coral/10 text-buzz-coral">
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                      </span>
                      <span className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.14em]">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-base md:text-lg font-bold text-foreground mb-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-buzz-slate text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

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
            <SectionEyebrow light center>
              Common Questions
            </SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Got questions?{" "}
                <TextShimmer as="span">We&apos;ve got answers.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeUp key={faq.q} delay={i * 0.04}>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden h-full">
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      aria-controls={`dp-faq-panel-${i}`}
                      className="cursor-pointer w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                    >
                      <span className="font-[family-name:var(--font-outfit-var)] font-semibold text-white pr-2 text-sm md:text-base">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        className="shrink-0 text-buzz-coral"
                      >
                        <ChevronDown className="w-5 h-5" aria-hidden />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`dp-faq-panel-${i}`}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
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
            <p className="text-center mt-10 text-white/65 text-sm">
              Still curious?{" "}
              <Link
                href="/contact"
                className="text-buzz-coral font-semibold hover:underline cursor-pointer"
              >
                Reach out directly
              </Link>{" "}
              or visit{" "}
              <Link
                href="https://dentalpromaster.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-buzz-coral font-semibold hover:underline cursor-pointer"
              >
                dentalpromaster.com
              </Link>
              .
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="py-16 bg-warm-gray border-y border-buzz-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-buzz-slate font-medium">Explore more:</span>
            <Link
              href="/buzz-mastermind-group"
              className="text-buzz-coral font-semibold hover:underline"
            >
              Buzz Mastermind Group
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link
              href="/digital-marketing-sd"
              className="text-buzz-coral font-semibold hover:underline"
            >
              San Diego Results
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link
              href="/services"
              className="text-buzz-coral font-semibold hover:underline"
            >
              Services & Pricing
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link
              href="/digital-marketing-blog"
              className="text-buzz-coral font-semibold hover:underline"
            >
              Marketing Blog
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-buzz-dark">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 600, top: "10%", left: "20%", delay: 0 },
            { color: "rose", size: 400, bottom: "10%", right: "20%", delay: 2 },
            { color: "violet", size: 350, top: "50%", left: "60%", delay: 4 },
          ]}
        />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full border border-white/[0.05] pointer-events-none" />
        <div className="absolute bottom-10 -right-16 w-96 h-96 rounded-full border border-white/[0.04] pointer-events-none" />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8 text-center">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-tight mb-6">
              Two days.
              <br />
              <TextShimmer as="span">A whole new level.</TextShimmer>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Your clinical work deserves photography that matches. Come to
              Roseville Oct 16-17 and leave with the exact system to make it
              happen.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#reserve"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-coral text-white text-base font-semibold rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.03] active:scale-[0.97]"
              >
                Reserve Your Seat - $1,795
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={`tel:${BUZZ_PHONE_TEL}`}
                className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-white/80 text-sm font-medium cursor-pointer transition-all hover:border-white/30 hover:text-white hover:bg-white/[0.04]"
              >
                <Phone className="w-4 h-4" />
                Call {BUZZ_PHONE}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

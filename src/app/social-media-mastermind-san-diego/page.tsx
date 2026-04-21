"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronDown,
  Check,
  Users,
  Calendar,
  Gift,
  Building2,
  TrendingUp,
  FolderKanban,
  Zap,
  Rocket,
  Lightbulb,
  Phone,
  ArrowRight,
} from "lucide-react";

import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { MastermindRegisterForm } from "@/components/MastermindRegisterForm";

const BUZZ_PHONE = "(720) 363-9754";
const BUZZ_PHONE_TEL = "7203639754";

const WHO_ITS_FOR = [
  {
    icon: Building2,
    title: "Business owners who want real marketing systems that work",
    sub: "Not theory - hands-on frameworks you implement the same week.",
  },
  {
    icon: TrendingUp,
    title: "Marketing managers responsible for growth and performance",
    sub: "Get the playbooks, tools, and benchmarks that move the needle.",
  },
  {
    icon: FolderKanban,
    title: "Office managers and admins running day-to-day marketing",
    sub: "Build the structure and consistency your brand has been missing.",
  },
  {
    icon: Zap,
    title: "Teams who need structure, consistency, and better results",
    sub: "Align your team on one strategy - stop reinventing the wheel.",
  },
  {
    icon: Rocket,
    title: "Companies who want their internal team executing at a higher level",
    sub: "Leave with a clear roadmap your team can run without you.",
  },
];

const TOPICS = [
  {
    num: "01",
    title: "Social Media That Converts",
    desc:
      "Content calendars, platform strategy, and the posting systems that build audiences and drive real leads - not just likes.",
  },
  {
    num: "02",
    title: "Google Search Dominance",
    desc:
      "Local SEO fundamentals, Google Business Profile optimization, and on-page tactics that get San Diego customers finding you first.",
  },
  {
    num: "03",
    title: "AI Search Visibility",
    desc:
      "How to get cited by ChatGPT, Perplexity, and Google AI Overviews before your competitors even know this is a thing.",
  },
  {
    num: "04",
    title: "Paid Ads That Actually Work",
    desc:
      "Meta, Instagram, and Google Ads fundamentals. Targeting, creative strategy, and budget allocation without wasting money.",
  },
  {
    num: "05",
    title: "Content Systems & Repurposing",
    desc:
      "Build a content engine that runs without you. Shoot once, publish everywhere. Templates, batching, and delegation frameworks.",
  },
  {
    num: "06",
    title: "Measuring What Matters",
    desc:
      "The KPIs that actually predict revenue. Monthly reporting, attribution basics, and how to know what's working before you spend more.",
  },
];

const TEAM_ROLES = [
  "Office Manager",
  "Marketing Coordinator",
  "Admin Team",
  "Social Media Manager",
  "Anyone responsible for growth",
];

const TEAM_OUTCOMES = [
  "A unified strategy everyone understands",
  "Clear roles - who owns what, and when",
  "Systems ready to implement immediately",
  "No more miscommunication or dropped balls",
  "Clear strategy and execution across your entire team",
];

const EVENT_DETAILS = [
  {
    icon: MapPin,
    label: "Location",
    value: "San Diego, CA",
    sub: "Exact venue shared with registered attendees",
  },
  {
    icon: Calendar,
    label: "Format",
    value: "Half-day intensive",
    sub: "Morning session with live Q&A and action planning",
  },
  {
    icon: Users,
    label: "Group Size",
    value: "Intentionally limited",
    sub: "Small group ensures personalized feedback for every attendee",
  },
  {
    icon: Gift,
    label: "What's Included",
    value: "Workbook, templates, and follow-up resources",
    sub: "Plus access to the Buzz community network",
  },
];

const FAQS = [
  {
    q: "Who is the mastermind designed for?",
    a: "Business owners, marketing managers, office managers, and entire marketing teams in San Diego who want proven systems for social media, Google, and AI search. It is ideal for companies that want their internal team executing at a higher level - with or without a dedicated marketing hire.",
  },
  {
    q: "Can I bring my whole team?",
    a: "Yes - team attendance is strongly encouraged. Bringing your office manager, marketing coordinator, social media manager, and admin team ensures everyone leaves aligned and ready to implement immediately. Team bundle pricing is available starting at $750 for 3 to 5 seats with priority seating included.",
  },
  {
    q: "What will we learn?",
    a: "You will learn the exact systems, tools, and strategies used by The Buzz Marketing Co to grow businesses across social media platforms, Google search, and AI-powered discovery tools like ChatGPT and Perplexity. Every topic comes with a template or framework you can use the same week.",
  },
  {
    q: "Where is it held?",
    a: "The mastermind is held in San Diego, CA. Exact venue details are shared with registered attendees after booking. Sessions are designed specifically for local San Diego business owners and teams who want to grow in this market.",
  },
  {
    q: "How much does it cost?",
    a: "Individual seats are $250. Team bundles for groups of 3 to 5 people start at $750 and include priority seating. For teams larger than 5, contact The Buzz Marketing Co directly to discuss group options.",
  },
  {
    q: "Is this right for a non-marketing business owner?",
    a: "Absolutely. The mastermind is built for business owners who are not marketers - it gives you the frameworks and vocabulary to lead your marketing efforts confidently, delegate effectively, and hold your team accountable to real results.",
  },
];

export default function MastermindSanDiegoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (i: number) => setOpenFaq((prev) => (prev === i ? null : i));

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
                  San Diego Marketing Mastermind
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Stop guessing.
              <br />
              Start <TextShimmer as="span">growing.</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Learn the exact systems, tools, and strategies you and your team
              need to grow across social, Google, and AI search.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button href="#reserve" variant="glow" arrow>
                Reserve Your Seat
              </Button>
              <Link
                href="#what-we-cover"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-7 py-3.5 border border-white/20 bg-white/[0.04] glassmorphism text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                See What We Cover
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-buzz-coral/10 border border-buzz-coral/25 px-4 py-2 text-xs font-semibold text-buzz-coral uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Team bundles available - bring your whole crew
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
              <p className="mt-2 text-sm text-white/65">San Diego Clients</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={8} suffix=" yrs" />
              </div>
              <p className="mt-2 text-sm text-white/65">In the Market</p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter target={50} suffix="+" />
              </div>
              <p className="mt-2 text-sm text-white/65">Events Hosted</p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Sold Out
              </div>
              <p className="mt-2 text-sm text-white/65">Past Sessions</p>
            </FadeUp>
          </div>
        </div>
        <div className="coral-divider" />
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Who This Is For</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Built for the people
                <br />
                actually <TextShimmer as="span">doing the work.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <FadeUp>
              <ul className="space-y-4">
                {WHO_ITS_FOR.map(({ icon: Icon, title, sub }) => (
                  <li
                    key={title}
                    className="flex items-start gap-4 rounded-2xl bg-white border border-buzz-border p-5 shadow-sm"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-coral text-white shadow-luxury">
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </span>
                    <div>
                      <p className="text-foreground font-semibold text-sm md:text-base leading-snug">
                        {title}
                      </p>
                      <p className="text-buzz-slate text-sm mt-1 leading-relaxed">
                        {sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="lg:sticky lg:top-24">
                <GlowCard variant="light">
                  <div className="bg-buzz-dark rounded-2xl p-8 md:p-10 relative overflow-hidden">
                    <div className="dot-grid absolute inset-0 pointer-events-none" />
                    <AmbientOrbs
                      orbs={[
                        { color: "coral", size: 250, top: "10%", right: "10%", delay: 0 },
                      ]}
                    />
                    <div className="relative z-10">
                      <span className="inline-block text-[11px] font-bold text-buzz-coral uppercase tracking-[0.1em] mb-3">
                        Seats Are Limited
                      </span>
                      <h3 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                        Small group.
                        <br />
                        Big results.
                      </h3>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">
                        Every session is intentionally capped so every attendee
                        gets direct feedback and a custom action plan - not a
                        generic lecture.
                      </p>

                      <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center justify-between rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3">
                          <div>
                            <p className="text-white text-sm font-semibold">
                              Single Seat
                            </p>
                            <p className="text-white/45 text-xs">
                              Individual attendee
                            </p>
                          </div>
                          <p className="font-[family-name:var(--font-syne-var)] text-xl font-bold text-white">
                            $250
                          </p>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-buzz-coral/15 border border-buzz-coral/40 px-4 py-3">
                          <div>
                            <p className="text-white text-sm font-semibold">
                              Team Bundle
                            </p>
                            <p className="text-white/60 text-xs">
                              3-5 seats - Best value
                            </p>
                          </div>
                          <p className="font-[family-name:var(--font-syne-var)] text-xl font-bold text-buzz-coral">
                            $750+
                          </p>
                        </div>
                      </div>

                      <Button
                        href="#reserve"
                        variant="primary"
                        arrow
                        className="w-full"
                      >
                        Claim Your Seat
                      </Button>
                    </div>
                  </div>
                </GlowCard>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section
        id="what-we-cover"
        className="py-28 md:py-36 bg-surface-light border-y border-buzz-border"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>What We Cover</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Six sessions.
                <br />
                <TextShimmer as="span">Zero fluff.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((t, i) => (
              <FadeUp key={t.num} delay={i * 0.06}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-8 md:p-9 h-full flex flex-col">
                    <p className="font-[family-name:var(--font-syne-var)] text-5xl font-extrabold text-buzz-coral/20 leading-none mb-5">
                      {t.num}
                    </p>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-lg md:text-xl font-bold text-foreground mb-3 leading-snug">
                      {t.title}
                    </h3>
                    <p className="text-buzz-slate text-sm leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* BRING YOUR TEAM */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "10%", right: "5%", delay: 0 },
            { color: "violet", size: 300, bottom: "10%", left: "10%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="mb-14">
            <SectionEyebrow light>Team Attendance</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight">
                Bring your team.
                <br />
                Get everyone <TextShimmer as="span">aligned.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <FadeUp>
              <div className="space-y-5 text-white/55 leading-relaxed">
                <p>This isn&apos;t just for business owners.</p>
                <p className="text-white font-semibold text-lg">
                  Your marketing is only as strong as the team executing it.
                </p>
                <p>
                  When the whole team attends together, the strategy actually
                  gets implemented. No more going back and explaining
                  everything. No more miscommunication. No more guessing.
                </p>
                <p className="text-white/80">Bring your:</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {TEAM_ROLES.map((role) => (
                    <li
                      key={role}
                      className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 hover:border-buzz-coral/50 hover:bg-buzz-coral/5 transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-buzz-coral shrink-0" />
                      <span className="text-sm text-white/85 font-medium">
                        {role}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-white font-semibold pt-2">
                  So everyone leaves aligned, trained, and ready to execute.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="space-y-6">
                <GlowCard variant="dark">
                  <div className="bg-gradient-coral rounded-2xl p-8 md:p-9">
                    <h3 className="font-[family-name:var(--font-syne-var)] text-xl md:text-2xl font-bold text-white mb-5 leading-tight">
                      What your team walks away with:
                    </h3>
                    <ul className="space-y-3">
                      {TEAM_OUTCOMES.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-white/95 text-sm md:text-base leading-snug"
                        >
                          <Check
                            className="w-5 h-5 shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>

                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-7 md:p-8">
                  <h4 className="font-[family-name:var(--font-syne-var)] text-lg font-bold text-white mb-5">
                    Team bundle pricing
                  </h4>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-3">
                      <div>
                        <p className="text-white/85 text-sm font-medium">
                          1 seat
                        </p>
                        <p className="text-white/45 text-xs">Individual</p>
                      </div>
                      <p className="font-[family-name:var(--font-syne-var)] text-lg font-bold text-white">
                        $250
                      </p>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-buzz-coral/15 border border-buzz-coral/30 px-4 py-3">
                      <div>
                        <p className="text-white text-sm font-semibold">
                          3-5 seats
                        </p>
                        <p className="text-white/55 text-xs">
                          Best value - priority seating
                        </p>
                      </div>
                      <p className="font-[family-name:var(--font-syne-var)] text-lg font-bold text-buzz-coral">
                        $750-1,250
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`tel:${BUZZ_PHONE_TEL}`}
                    className="block text-center text-sm text-buzz-coral font-semibold hover:underline"
                  >
                    Call {BUZZ_PHONE} to book team seats
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS / RESERVE */}
      <section id="reserve" className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Event Details</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Your next session
                <br />
                is <TextShimmer as="span">waiting.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <FadeUp>
            <GlowCard variant="light">
              <div className="bg-white rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                <div>
                  <ul className="space-y-6">
                    {EVENT_DETAILS.map(({ icon: Icon, label, value, sub }) => (
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
                      Perfect for teams looking to level up together and
                      implement immediately.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <MastermindRegisterForm />
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
                      aria-controls={`mm-faq-panel-${i}`}
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
                          id={`mm-faq-panel-${i}`}
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
              href="/digital-marketing-sd"
              className="text-buzz-coral font-semibold hover:underline"
            >
              San Diego Results
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link
              href="/events"
              className="text-buzz-coral font-semibold hover:underline"
            >
              Upcoming Events
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
              Your team deserves
              <br />a <TextShimmer as="span">real strategy.</TextShimmer>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Stop piecing it together from YouTube. Come to one session and
              leave with a system your whole team can execute - starting
              Monday.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`tel:${BUZZ_PHONE_TEL}`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-coral text-white text-base font-semibold rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.03] active:scale-[0.97]"
              >
                Reserve Your Seat - $250
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

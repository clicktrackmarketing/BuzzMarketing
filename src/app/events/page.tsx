"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";

const UPCOMING = [
  {
    title: "The Buzz Effect - Branding & Marketing Mastermind",
    date: "Wednesday, May 13, 2026",
    time: "Evening · Sunset + dinner",
    location: "Top Floor · University Club, San Diego",
    capacity: 28,
    description:
      "A curated branding and marketing mastermind for ambitious San Diego owners, operators, and creators. Covers branding, content, social, positioning, SEO, and content tools - with dinner and drinks at one of the city's most elevated venues.",
    badge: "MAY 13",
    href: "/buzz-mastermind-group",
    cta: "Reserve Your Seat",
    price: "$250 per guest",
  },
  {
    title: "Shoot Like a Pro - Dental Photography Intensive",
    date: "October 16 & 17, 2026",
    time: "Two full days of hands-on training",
    location: "Arora Periodontics · Roseville, CA",
    capacity: 20,
    description:
      "A two-day hands-on dental photography intensive with Milos Miladinov. Camera setup, intraoral technique, cross-polarization, editing, and brand strategy. Co-hosted by Arora Periodontics and The Buzz Marketing Co.",
    badge: "OCT 16-17",
    href: "/dental-photography",
    cta: "Reserve Your Seat",
    price: "$1,795 general admission",
  },
];

const PAST = [
  { title: "2025 Marketing Summit", date: "Dec 2025", attendees: 180 },
  { title: "Holiday Networking Mixer", date: "Nov 2025", attendees: 90 },
  { title: "Social Media Bootcamp", date: "Oct 2025", attendees: 50 },
  { title: "Brand Photography Workshop", date: "Sep 2025", attendees: 35 },
];

export default function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "20%", right: "10%", delay: 0 },
            { color: "violet", size: 300, bottom: "10%", left: "15%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-90" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-28 text-center">
          <FadeUp>
            <div className="flex justify-center">
              <SectionEyebrow light center>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-buzz-coral shrink-0" aria-hidden />
                  Upcoming Events
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Where San Diego <TextShimmer as="span">Connects</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Mixers, workshops, and summits built for founders, marketers, and
              operators who want real relationships - not just business cards.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Save the Date</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground">
                Upcoming <TextShimmer as="span">Events</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {UPCOMING.map((ev, i) => (
              <FadeUp key={ev.title} delay={i * 0.08}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
                      <div className="inline-flex self-start rounded-full bg-gradient-coral px-4 py-1.5 text-xs font-bold text-white shadow-luxury">
                        {ev.badge}
                      </div>
                      <div className="text-xs font-semibold text-buzz-coral uppercase tracking-[0.1em]">
                        {ev.price}
                      </div>
                    </div>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground/80 mb-4">
                      {ev.date}
                    </p>
                    <p className="text-buzz-slate text-sm md:text-base leading-relaxed mb-6 flex-1">
                      {ev.description}
                    </p>
                    <ul className="space-y-2.5 text-sm text-foreground/80 mb-8">
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-buzz-coral shrink-0" />
                        {ev.location}
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-buzz-coral shrink-0" />
                        {ev.time}
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-buzz-coral shrink-0" />
                        {ev.capacity}-seat limit
                      </li>
                    </ul>
                    <Link
                      href={ev.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-7 py-3.5 bg-gradient-coral text-white shadow-luxury hover:shadow-glow-coral transition-all cursor-pointer"
                    >
                      {ev.cta}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT IMAGES STRIP */}
      <section className="bg-buzz-dark relative overflow-hidden">
        <div className="coral-divider" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="text-center mb-12">
            <SectionEyebrow light center>On the Ground</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Where you&apos;ll <TextShimmer as="span">find us.</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-4 text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Events, summits, mastermind rooms, trade show floors - real
                rooms, real conversations, real San Diego.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <FadeUp>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-luxury">
                <Image
                  src="/buzz-team-booth.jpg"
                  alt="The Buzz Marketing Co team at a branded event booth"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-luxury">
                <Image
                  src="/buzz-booth-duo.jpg"
                  alt="Buzz Marketing team members meeting attendees at an event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>
          </div>
        </div>
        <div className="coral-divider" />
      </section>

      {/* PAST EVENTS */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 350, top: "20%", left: "10%", delay: 0 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow light center>Past Highlights</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Past <TextShimmer as="span">Events</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAST.map((ev, i) => (
              <FadeUp key={ev.title} delay={i * 0.06}>
                <GlowCard variant="dark" className="text-center">
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-outfit-var)] font-bold text-white mb-2 text-sm md:text-base leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-white/65 text-sm mb-1">{ev.date}</p>
                    <p className="text-buzz-coral font-semibold text-sm">
                      {ev.attendees} attendees
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="py-16 bg-warm-gray border-t border-buzz-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-buzz-slate font-medium">Explore more:</span>
            <Link href="/services" className="text-buzz-coral font-semibold hover:underline">
              Our Services
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/about" className="text-buzz-coral font-semibold hover:underline">
              About Us
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/free-analysis" className="text-buzz-coral font-semibold hover:underline">
              Free Digital Analysis
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/digital-marketing-blog" className="text-buzz-coral font-semibold hover:underline">
              Marketing Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

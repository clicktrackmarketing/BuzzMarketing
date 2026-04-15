"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";

const UPCOMING = [
  {
    title: "San Diego Social Media Summit",
    date: "April 18, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "The Alexandria",
    capacity: 200,
    description:
      "Full-day summit with keynote speakers, interactive workshops, and unmatched networking opportunities for business owners and marketers.",
    badge: "APR 18",
  },
  {
    title: "Buzz Networking Mixer",
    date: "May 9, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Gaslamp Quarter",
    capacity: 80,
    description:
      "An intimate evening connecting San Diego's most ambitious entrepreneurs and creative professionals.",
    badge: "MAY 9",
  },
  {
    title: "Content Creation Workshop",
    date: "June 14, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Little Italy",
    capacity: 40,
    description:
      "Hands-on workshop covering photography, videography, and editing techniques for social media content.",
    badge: "JUN 14",
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {UPCOMING.map((ev, i) => (
              <FadeUp key={ev.title} delay={i * 0.08}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col h-full">
                    <div className="inline-flex self-start rounded-full bg-gradient-coral px-4 py-1.5 text-xs font-bold text-white shadow-luxury mb-6">
                      {ev.badge}
                    </div>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-xl font-bold text-foreground mb-2 leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground/80 mb-4">{ev.date}</p>
                    <p className="text-buzz-slate text-sm leading-relaxed mb-6 flex-1">
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
                        {ev.capacity} attendees
                      </li>
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-7 py-3.5 bg-gradient-coral text-white shadow-luxury hover:shadow-glow-coral transition-all cursor-pointer"
                    >
                      Reserve Your Spot
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
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
                    <p className="text-white/40 text-sm mb-1">{ev.date}</p>
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

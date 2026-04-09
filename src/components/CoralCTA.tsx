"use client";

import Link from "next/link";
import { FadeUp } from "./FadeUp";
import { AmbientOrbs } from "./AmbientOrbs";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { Phone, ArrowRight } from "lucide-react";

interface CoralCTAProps {
  title?: string;
  body?: string;
}

const DEFAULT_WORDS = [
  { text: "Ready" },
  { text: "to" },
  { text: "Build" },
  { text: "Your" },
  { text: "Brand?", className: "text-white drop-shadow-[0_0_16px_hsla(14,100%,58%,0.5)]" },
];

export function CoralCTA({
  title,
  body = "Let\u2019s create a strategy that drives real, measurable results for your business.",
}: CoralCTAProps) {
  // Parse title into words if custom title provided
  const words = title
    ? title.split(" ").map((w, i, arr) => ({
        text: w,
        className: i === arr.length - 1 ? "text-white drop-shadow-[0_0_16px_hsla(14,100%,58%,0.5)]" : undefined,
      }))
    : DEFAULT_WORDS;

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-buzz-dark">
      {/* Ambient background instead of solid coral */}
      <AmbientOrbs
        orbs={[
          { color: "coral", size: 600, top: "10%", left: "20%", delay: 0 },
          { color: "rose", size: 400, bottom: "10%", right: "20%", delay: 2 },
          { color: "violet", size: 350, top: "50%", left: "60%", delay: 4 },
        ]}
      />
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Decorative rings */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full border border-white/[0.05] pointer-events-none" />
      <div className="absolute bottom-10 -right-16 w-96 h-96 rounded-full border border-white/[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <FadeUp>
          <div className="flex justify-center">
            <TypewriterEffect
              words={words}
              className="font-[family-name:var(--font-syne-var)] !text-2xl sm:!text-3xl md:!text-4xl lg:!text-[56px] font-extrabold text-white leading-tight mb-6"
              cursorClassName="!h-6 sm:!h-8 md:!h-10 lg:!h-14 !bg-buzz-coral"
            />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {body}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-coral text-white text-base font-semibold rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.03] active:scale-[0.97]"
            >
              Book a Discovery Call
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="tel:7203639754"
              className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-white/70 text-sm font-medium cursor-pointer transition-all hover:border-white/30 hover:text-white hover:bg-white/[0.04]"
            >
              <Phone className="w-4 h-4" />
              (720) 363-9754
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

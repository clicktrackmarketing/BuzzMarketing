"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe,
  MapPinned,
  Users,
  BarChart3,
  Eye,
  ClipboardCheck,
  Check,
  X,
  ArrowRight,
  Phone,
  Sparkles,
  Play,
} from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { analysisFormSchema, type AnalysisFormValues } from "@/lib/analysis-form-schema";

/* ─── constants ─── */

const PROBLEM_ITEMS = [
  { icon: Globe, label: "Your website" },
  { icon: MapPinned, label: "Your Google reviews" },
  { icon: Users, label: "Your social media" },
  { icon: Eye, label: "Your photos + content" },
];

const DELIVERABLES = [
  {
    icon: Globe,
    title: "Website Review",
    desc: "Design, messaging, and conversion gaps that are costing you leads.",
  },
  {
    icon: MapPinned,
    title: "Google Presence",
    desc: "Maps, reviews, rankings — how you actually show up in local search.",
  },
  {
    icon: Users,
    title: "Social Media Audit",
    desc: "Content quality, consistency, and engagement across every platform.",
  },
  {
    icon: BarChart3,
    title: "Competitor Comparison",
    desc: "Where you're winning — and where competitors are pulling ahead.",
  },
  {
    icon: Eye,
    title: "Visibility Score",
    desc: "A clear picture of how you actually appear across every platform.",
  },
  {
    icon: ClipboardCheck,
    title: "Clear Action Plan",
    desc: "What to fix first to start getting results immediately.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Search,
    title: "Search Everywhere Optimization",
    desc: "We look at Google, social, maps, directories, and AI — everywhere your customers are validating you.",
  },
  {
    icon: ArrowRight,
    title: "Multi-Touch Customer Journey",
    desc: "Your customers don't just Google you anymore. They check 3–5 platforms before deciding. We analyze every touchpoint.",
  },
  {
    icon: BarChart3,
    title: "Real Buying Behavior",
    desc: "We don't measure vanity metrics. We look at what actually drives calls, clicks, and revenue.",
  },
];

const STATS = [
  { value: 300, suffix: "%", label: "Increase in views (SD Networking)" },
  { value: 150, suffix: "+", label: "Clients Served" },
  { value: 50, suffix: "+", label: "Sold-Out Events" },
  { value: 3, suffix: "x", label: "Avg. Engagement Lift" },
];

const FOR_YOU = [
  "Business owners serious about growth",
  "Brands investing in their visibility",
  "Service-based businesses (healthcare, legal, high-ticket)",
  "Businesses ready to take action on insights",
];

const NOT_FOR = [
  "People looking for cheap marketing",
  "Businesses not ready to take action",
  "Anyone expecting overnight results",
];

const STEPS = [
  { num: "01", title: "Submit Your Info", desc: "Fill out the short form below — takes 30 seconds." },
  { num: "02", title: "We Analyze Everything", desc: "We review your full digital presence across every platform." },
  { num: "03", title: "We Walk You Through It", desc: "A clear breakdown of what's working and what's costing you." },
  { num: "04", title: "You Decide", desc: "No pressure. You'll have the clarity to choose your next move." },
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-buzz-coral focus:outline-none focus:ring-2 focus:ring-buzz-coral/20 transition-all";

/* ─── page ─── */

export default function FreeAnalysisPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<AnalysisFormValues>({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    websiteUrl: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    if (!isSubmitting) setModalOpen(false);
  };

  const update = (field: keyof AnalysisFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const parsed = analysisFormSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Please check your info");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/free-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call (720) 363-9754.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── shared form JSX ─── */
  const formContent = (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 rounded-full bg-buzz-coral/15 flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <Check className="w-8 h-8 text-buzz-coral" />
            </motion.div>
          </div>
          <h3 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-white mb-3">
            We&apos;re on it!
          </h3>
          <p className="text-white/50 max-w-md mx-auto leading-relaxed">
            Your free digital analysis is being prepared. We&apos;ll be in
            touch within 24 hours to walk you through everything.
          </p>
          <a
            href="tel:7203639754"
            className="inline-flex items-center gap-2 mt-6 text-buzz-coral font-medium text-sm hover:underline"
          >
            <Phone className="w-4 h-4" />
            (720) 363-9754
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                className={inputClass}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="businessName"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
              >
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                placeholder="Acme Co"
                className={inputClass}
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@business.com"
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                className={inputClass}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="websiteUrl"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
              >
                Website URL
              </label>
              <input
                id="websiteUrl"
                type="text"
                placeholder="www.yourbusiness.com"
                className={inputClass}
                value={form.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
              />
            </div>
          </div>

          {formError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-3"
            >
              {formError}
            </motion.p>
          )}

          <Button type="submit" variant="glow" arrow disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Get My Free Analysis"}
          </Button>

          <p className="text-center text-white/25 text-xs">
            No spam. No obligation. Just clarity.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ─── FORM MODAL ─── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-buzz-dark/85 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-surface-dark-alt p-6 sm:p-8 shadow-elevated"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer z-10"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white">
                  Get Your Free{" "}
                  <TextShimmer as="span">Analysis</TextShimmer>
                </h2>
                <p className="mt-2 text-white/40 text-sm">
                  Takes 30 seconds. We&apos;ll be in touch within 24 hours.
                </p>
              </div>

              {formContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 1. HERO ─── */}
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
                  <Search className="w-4 h-4 text-buzz-coral shrink-0" aria-hidden />
                  Free Digital Analysis
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[32px] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              See How Your Business Actually{" "}
              <TextShimmer as="span">Shows Up Online</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Most businesses think they&apos;re visible. We show you what
              customers actually see — and what&apos;s costing you revenue.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={openModal}
                className="group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-8 py-4 bg-gradient-coral text-white shadow-glow-coral hover:shadow-[0_0_60px_-8px_hsla(14,100%,58%,0.5)] transition-all cursor-pointer hover:scale-[1.04] active:scale-[0.97]"
              >
                Get Your Free Analysis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-4 text-white/35 text-sm">
              Usually $500. Complimentary for a limited time.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── 2. VIDEO AUDIT (moved up) ─── */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden border-t border-white/[0.06]">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 350, top: "15%", right: "10%", delay: 0 },
            { color: "coral", size: 300, bottom: "10%", left: "15%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionEyebrow light>Bonus</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white mb-6">
                  <Play className="inline w-8 h-8 text-buzz-coral mr-2" aria-hidden />
                  Video Audit{" "}
                  <TextShimmer as="span">Option</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.08}>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6">
                  We&apos;ll record your analysis so you can rewatch and share
                  with your team. No more trying to remember what was said — you
                  get a clear, visual walkthrough of your entire digital presence.
                </p>
              </FadeUp>
              <FadeUp delay={0.16}>
                <button
                  onClick={openModal}
                  className="group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-8 py-4 bg-gradient-coral text-white shadow-glow-coral hover:shadow-[0_0_60px_-8px_hsla(14,100%,58%,0.5)] transition-all cursor-pointer hover:scale-[1.04] active:scale-[0.97]"
                >
                  Get Your Free Analysis
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </FadeUp>
            </div>

            <FadeUp delay={0.1}>
              <div className="relative w-full max-w-[360px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-elevated border border-white/[0.08]">
                <iframe
                  src="https://www.youtube.com/embed/4Jl35Y_NBL0"
                  title="Video audit walkthrough example"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── 3. PROBLEM HOOK ─── */}
      <section className="py-28 md:py-36 bg-warm-gray relative">
        <div className="coral-divider" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>The Reality</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Being online isn&apos;t the same as being{" "}
                <TextShimmer as="span">chosen</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-4 max-w-2xl mx-auto text-buzz-slate leading-relaxed text-lg">
                Before anyone buys, they check everything. If those touchpoints
                don&apos;t align — you&apos;re losing business.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEM_ITEMS.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.06}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-buzz-coral/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-buzz-coral" />
                    </div>
                    <p className="font-[family-name:var(--font-outfit-var)] font-semibold text-foreground">
                      {item.label}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-center mt-10 text-buzz-slate text-lg font-medium">
              Your customers don&apos;t just Google you anymore —{" "}
              <span className="text-foreground font-bold">they validate you everywhere.</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── 4. WHAT THEY GET ─── */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 400, top: "10%", left: "5%", delay: 0 },
            { color: "coral", size: 350, bottom: "10%", right: "10%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow light center>What You Get</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Inside Your Courtesy{" "}
                <TextShimmer as="span">Digital Analysis</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DELIVERABLES.map((d, i) => (
              <FadeUp key={d.title} delay={i * 0.06}>
                <GlowCard variant="dark" className="h-full">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-buzz-coral/15 flex items-center justify-center mb-4">
                      <d.icon className="w-6 h-6 text-buzz-coral" />
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit-var)] text-lg font-bold text-white mb-2">
                      {d.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. DIFFERENTIATOR ─── */}
      <section className="py-28 md:py-36 bg-warm-gray relative">
        <div className="coral-divider" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Our Approach</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground max-w-3xl mx-auto">
                We don&apos;t look at one platform. We look at how everything{" "}
                <TextShimmer as="span">works together</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {DIFFERENTIATORS.map((d, i) => (
              <FadeUp key={d.title} delay={i * 0.08}>
                <GlowCard variant="light" className="h-full">
                  <div className="p-6 md:p-8">
                    <div className="w-12 h-12 rounded-xl bg-buzz-coral/10 flex items-center justify-center mb-5">
                      <d.icon className="w-6 h-6 text-buzz-coral" />
                    </div>
                    <h3 className="font-[family-name:var(--font-syne-var)] text-xl font-bold text-foreground mb-3">
                      {d.title}
                    </h3>
                    <p className="text-buzz-slate leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. PROOF / STATS ─── */}
      <section className="relative bg-buzz-dark border-y border-white/[0.06]">
        <div className="coral-divider" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 text-center">
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.06}>
                <div className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-white/40">{s.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
        <div className="coral-divider" />
      </section>

      <TestimonialsSection />

      {/* ─── 7. WHO THIS IS FOR ─── */}
      <section className="py-28 md:py-36 bg-warm-gray relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>Is This For You?</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground">
                We don&apos;t work with{" "}
                <TextShimmer as="span">everyone</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FadeUp>
              <GlowCard variant="light" className="h-full">
                <div className="p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-buzz-coral mb-5">
                    This is for you if…
                  </p>
                  <ul className="space-y-4">
                    {FOR_YOU.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-buzz-coral/10 text-buzz-coral">
                          <Check className="w-4 h-4" strokeWidth={2.5} />
                        </span>
                        <span className="text-foreground/90 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </FadeUp>

            <FadeUp delay={0.08}>
              <GlowCard variant="light" className="h-full">
                <div className="p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-buzz-slate mb-5">
                    This is not for you if…
                  </p>
                  <ul className="space-y-4">
                    {NOT_FOR.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-buzz-slate">
                          <X className="w-4 h-4" strokeWidth={2.5} />
                        </span>
                        <span className="text-buzz-slate leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── 8. PROCESS ─── */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 350, top: "10%", right: "15%", delay: 0 },
            { color: "violet", size: 300, bottom: "15%", left: "5%", delay: 3 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow light center>How It Works</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Simple. No strings.{" "}
                <TextShimmer as="span">No pressure.</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.08}>
                <GlowCard variant="dark" className="h-full">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1.5 bg-gradient-coral text-white text-xs font-bold rounded-lg mb-4">
                      {step.num}
                    </span>
                    <h3 className="font-[family-name:var(--font-outfit-var)] text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. FOUNDER ─── */}
      <section className="py-28 md:py-36 bg-warm-gray relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeUp variant="left">
              <div className="relative rounded-2xl overflow-hidden group max-w-md mx-auto lg:mx-0">
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
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>

            <div>
              <SectionEyebrow>Meet The Founder</SectionEyebrow>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold mb-6">
                  Turning Visibility into{" "}
                  <TextShimmer as="span">Revenue</TextShimmer>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-buzz-slate leading-relaxed mb-4 text-base md:text-lg">
                  Brit Dhillon built The Buzz Marketing Co on a simple belief:
                  San Diego businesses deserve marketing that actually moves the
                  needle. Over 8 years and 150+ clients later, that belief has
                  become a track record.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <blockquote className="border-l-4 border-buzz-coral pl-5 mb-8">
                  <p className="text-foreground italic text-lg leading-relaxed">
                    &ldquo;If I take it on, it&apos;s because I know we can
                    elevate it.&rdquo;
                  </p>
                </blockquote>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex items-center gap-6">
                  <Button href="/about" arrow>
                    Our Story
                  </Button>
                  <div>
                    <p className="font-[family-name:var(--font-syne-var)] text-2xl font-bold">
                      8+
                    </p>
                    <p className="text-buzz-slate text-xs">Years in San Diego</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <div className="coral-divider" />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "20%", left: "30%", delay: 0 },
          ]}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 py-28 md:py-36 text-center">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to See{" "}
              <TextShimmer as="span">What&apos;s Possible?</TextShimmer>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Get clarity on where you stand and a plan to get where you want to
              be. No fluff, no pressure — just the truth.
            </p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-8 py-4 bg-gradient-coral text-white shadow-glow-coral hover:shadow-[0_0_60px_-8px_hsla(14,100%,58%,0.5)] transition-all cursor-pointer hover:scale-[1.04] active:scale-[0.97]"
              >
                Get Your Free Analysis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="tel:7203639754"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 bg-white/[0.04] text-white text-sm font-semibold rounded-full hover:bg-white/[0.08] transition-all"
              >
                <Phone className="w-4 h-4" />
                (720) 363-9754
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

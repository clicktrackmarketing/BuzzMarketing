"use client";

import { useState, useEffect, useRef } from "react";
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
import { getAttributionData } from "@/lib/attribution";

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
    smsConsent: false,
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Lock body scroll + move focus into modal + install ESC / focus trap
  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "";
      // Restore focus to whatever opened the modal
      lastFocusedRef.current?.focus?.();
      return;
    }

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    // Move focus to the close button after mount
    const rafId = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        e.preventDefault();
        setModalOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const root = modalRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, [modalOpen, isSubmitting]);

  // Move focus to success heading when submission completes (announces to SR)
  useEffect(() => {
    if (submitted) {
      successHeadingRef.current?.focus();
    }
  }, [submitted]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    if (!isSubmitting) setModalOpen(false);
  };

  const update = (field: keyof AnalysisFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  };

  const setSmsConsent = (checked: boolean) => {
    setForm((prev) => ({ ...prev, smsConsent: checked }));
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
      const attribution = getAttributionData();
      const res = await fetch("/api/free-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          ...attribution,
          form_page_url: window.location.href,
          // Honeypot — real users never fill this hidden field
          website_url_confirm: (form as unknown as { website_url_confirm?: string }).website_url_confirm ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      // Fire conversion events
      if (typeof window !== "undefined") {
        const w = window as unknown as {
          gtag?: (...args: unknown[]) => void;
          clarity?: (...args: unknown[]) => void;
          dataLayer?: unknown[];
        };
        w.gtag?.("event", "generate_lead", {
          event_category: "lead",
          event_label: "free_analysis",
          value: 500,
          currency: "USD",
        });
        w.clarity?.("event", "lead_submitted_free_analysis");
        w.dataLayer?.push({ event: "lead_submitted", form: "free_analysis" });
      }
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
          role="status"
          aria-live="polite"
          aria-atomic="true"
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
              <Check className="w-8 h-8 text-buzz-coral" aria-hidden="true" />
            </motion.div>
          </div>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-white mb-3 outline-none"
          >
            We&apos;re on it!
          </h3>
          <p className="text-white/65 max-w-md mx-auto leading-relaxed">
            Your free digital analysis is being prepared. We&apos;ll be in
            touch within 24 hours to walk you through everything.
          </p>
          <a
            href="tel:+17203639754"
            className="inline-flex items-center gap-2 mt-6 text-buzz-coral font-medium text-sm hover:underline outline-none focus-visible:ring-2 focus-visible:ring-buzz-coral/60 rounded"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            (720) 363-9754
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-5"
          aria-busy={isSubmitting}
          noValidate
        >
          {/* Honeypot — hidden from humans, catches bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website_url_confirm">Do not fill this field</label>
            <input
              id="website_url_confirm"
              name="website_url_confirm"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              onChange={(e) =>
                setForm((prev) => ({
                  ...(prev as AnalysisFormValues & { website_url_confirm?: string }),
                  website_url_confirm: e.target.value,
                }) as AnalysisFormValues)
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/65"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                aria-required="true"
                aria-invalid={!!formError && !form.fullName}
                aria-describedby={formError ? "free-analysis-error" : undefined}
                autoComplete="name"
                placeholder="Jane Smith"
                className={inputClass}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="businessName"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/65"
              >
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                required
                aria-required="true"
                aria-invalid={!!formError && !form.businessName}
                aria-describedby={formError ? "free-analysis-error" : undefined}
                autoComplete="organization"
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
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/65"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!formError && !form.email}
              aria-describedby={formError ? "free-analysis-error" : undefined}
              autoComplete="email"
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
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/65"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                aria-required="true"
                aria-invalid={!!formError && !form.phone}
                aria-describedby={formError ? "free-analysis-error" : undefined}
                autoComplete="tel"
                placeholder="(555) 123-4567"
                className={inputClass}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="websiteUrl"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/65"
              >
                Website URL
              </label>
              <input
                id="websiteUrl"
                type="url"
                required
                aria-required="true"
                aria-invalid={!!formError && !form.websiteUrl}
                aria-describedby={formError ? "free-analysis-error" : undefined}
                autoComplete="url"
                placeholder="www.yourbusiness.com"
                className={inputClass}
                value={form.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
              />
            </div>
          </div>

          {/* A2P 10DLC SMS opt-in */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <label
              htmlFor="smsConsent"
              className="flex cursor-pointer items-start gap-3"
            >
              <input
                id="smsConsent"
                name="smsConsent"
                type="checkbox"
                checked={form.smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/20 bg-white/[0.04] accent-buzz-coral outline-none focus-visible:ring-2 focus-visible:ring-buzz-coral/60"
              />
              <span className="text-xs leading-relaxed text-white/70">
                I agree to receive marketing and informational SMS/text
                messages from The Buzz Marketing Co at the phone number
                provided, including messages sent by autodialer. Consent is
                not a condition of any purchase. Message frequency varies.
                Message and data rates may apply. Reply STOP to unsubscribe
                or HELP for help. View our{" "}
                <Link
                  href="/privacy"
                  className="text-buzz-coral underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-buzz-coral underline-offset-2 hover:underline"
                >
                  Terms of Service
                </Link>
                .
              </span>
            </label>
          </div>

          {formError && (
            <motion.p
              id="free-analysis-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              aria-live="assertive"
              className="text-sm text-red-300 bg-red-500/15 rounded-xl px-4 py-3 border border-red-500/30"
            >
              {formError}
            </motion.p>
          )}

          <Button type="submit" variant="glow" arrow disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Get My Free Analysis"}
          </Button>

          <p className="text-center text-white/65 text-xs">
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
            <div className="absolute inset-0 bg-buzz-dark/85 backdrop-blur-sm" aria-hidden="true" />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="free-analysis-modal-title"
              aria-describedby="free-analysis-modal-subtitle"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-surface-dark-alt p-6 sm:p-8 shadow-elevated"
            >
              {/* Close button */}
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer z-10 outline-none focus-visible:ring-2 focus-visible:ring-buzz-coral/60"
                aria-label="Close form"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="text-center mb-6">
                <h2 id="free-analysis-modal-title" className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white">
                  Get Your Free{" "}
                  <TextShimmer as="span">Analysis</TextShimmer>
                </h2>
                <p id="free-analysis-modal-subtitle" className="mt-2 text-white/65 text-sm">
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
            <p className="mt-4 text-white/65 text-sm">
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
                <p className="mt-2 text-sm text-white/65">{s.label}</p>
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
                    <p className="text-white/65 text-sm leading-relaxed">
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
                    alt="Brittany Jenkins, founder of The Buzz Marketing Co"
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
                  Brittany Jenkins built The Buzz Marketing Co on a simple belief:
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

      {/* CROSS-LINKS */}
      <section className="py-16 bg-warm-gray border-t border-buzz-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-buzz-slate font-medium">Explore more:</span>
            <Link href="/services" className="text-buzz-coral font-semibold hover:underline">
              Services & Pricing
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/digital-marketing-sd" className="text-buzz-coral font-semibold hover:underline">
              San Diego Results
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/digital-marketing-blog" className="text-buzz-coral font-semibold hover:underline">
              Marketing Blog
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/events" className="text-buzz-coral font-semibold hover:underline">
              Upcoming Events
            </Link>
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

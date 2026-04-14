"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Megaphone,
  Camera,
  LayoutTemplate,
  MapPinned,
  Palette,
  Sparkles,
  Check,
  ChevronDown,
} from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { CoralCTA } from "@/components/CoralCTA";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";

const SOCIAL_TIERS: readonly {
  name: string;
  price: string;
  period: string;
  popular: boolean;
  subtitle?: string;
  features: readonly string[];
}[] = [
  {
    name: "Starter Buzz",
    price: "$750",
    period: "/month",
    popular: false,
    features: [
      "8 strategic posts",
      "Caption writing + posting",
      "Consistent, polished presence",
    ],
  },
  {
    name: "Growth Buzz",
    subtitle: "Most Popular",
    price: "$2,000",
    period: "/month",
    popular: true,
    features: [
      "20 strategic posts",
      "Full content planning",
      "Page management + support",
    ],
  },
  {
    name: "Full Buzz",
    price: "$3,000",
    period: "/month",
    popular: false,
    features: [
      "20 posts",
      "Monthly on-site content shoot",
      "High-end photo + video",
      "Full management",
    ],
  },
  {
    name: "Custom Campaigns",
    price: "Starting at $5,000",
    period: "/month",
    popular: false,
    features: [
      "Commercial content",
      "Events + launches",
      "Full-scale marketing support",
    ],
  },
];

type ServiceBlock = {
  id: string;
  icon: typeof Compass;
  image: string;
  title: string;
  description: string;
  bullets: readonly string[];
  priceLabel?: string;
};

const SERVICE_BLOCKS: ServiceBlock[] = [
  {
    id: "strategy",
    icon: Compass,
    image: "/service-brand.jpg",
    title: "Strategy + Creative Direction",
    description:
      "We build the foundation. If you feel scattered or stuck, this is where we fix it.",
    bullets: [
      "Brand clarity and positioning",
      "Messaging that attracts the right audience",
      "Content direction that actually converts",
      "A clear plan so you're not guessing",
    ],
  },
  {
    id: "social",
    icon: Megaphone,
    image: "/service-social.jpg",
    title: "Social Media Management",
    description:
      "We don't post just to post. Everything is intentional. Our focus: positioning you as the authority, attracting higher-value clients or patients, and creating content that builds trust and drives action.",
    bullets: [],
  },
  {
    id: "shoot",
    icon: Camera,
    image: "/service-content.jpg",
    title: "Signature Content Shoot",
    description:
      "Two full days of high-end content creation. This is for brands ready to elevate their image fast.",
    priceLabel: "$5,000",
    bullets: [
      "Travel included",
      "Professional photo + video",
      "Assets designed to last months",
    ],
  },
  {
    id: "website",
    icon: LayoutTemplate,
    image: "/service-ads.jpg",
    title: "Website + Conversion Optimization",
    description:
      "A good-looking site isn't enough. It needs to convert. So when people land on your site, they take action.",
    bullets: [
      "Messaging",
      "Layout + flow",
      "Trust signals",
      "User experience",
    ],
  },
  {
    id: "google",
    icon: MapPinned,
    image: "/service-seo.jpg",
    title: "Google + Local Presence",
    description:
      "Your Google profile is often the final decision point. So you don't just show up, you stand out.",
    bullets: [
      "Visuals",
      "Reviews strategy",
      "Service positioning",
      "Credibility signals",
    ],
  },
  {
    id: "branding",
    icon: Palette,
    image: "/service-email.jpg",
    title: "Branding + Positioning",
    description:
      "If your brand feels unclear, your marketing will too. Clarity here changes everything.",
    bullets: [
      "Voice",
      "Visual direction",
      "Content strategy",
      "Platform positioning",
    ],
  },
];

const WHO_FOR = [
  "Dental + medical professionals",
  "High-trust service providers",
  "Luxury and lifestyle brands",
  "Businesses ready to scale with intention",
] as const;

const SOCIAL_POSITIONING = [
  "Authority-building content",
  "Intentional planning",
  "Consistency that earns trust",
] as const;

const FAQS = [
  {
    q: "What platforms do you manage?",
    a: "We manage Instagram, Facebook, LinkedIn, TikTok, Google Business Profile, YouTube, X/Twitter, and Pinterest - tailored to where your audience actually spends time.",
  },
  {
    q: "How much does social media management cost?",
    a: "We offer Starter Buzz at $750/month, Growth Buzz at $2,000/month, Full Buzz at $3,000/month, and custom campaigns starting at $5,000/month, depending on scope and platforms.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most clients see a meaningful engagement lift within the first 30 days, with clearer growth trajectory emerging over a 90-day window as we optimize.",
  },
  {
    q: "Do you work with businesses outside San Diego?",
    a: "Yes. While we specialize in San Diego brands and local nuance, we partner with businesses nationwide when the fit is right.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We're boutique and founder-led: selective about clients, obsessed with craft, and allergic to cookie-cutter playbooks - every roadmap is built for your brand.",
  },
  {
    q: "Do you require long-term contracts?",
    a: "No lock-in traps. After an initial 90-day foundation period, most engagements continue month-to-month.",
  },
  {
    q: "Do you offer a signature content shoot?",
    a: "Yes. Our Signature Content Shoot is $5,000 for two full days of high-end photo and video, with travel included, designed to give you assets that last for months.",
  },
  {
    q: "Can I start with one service?",
    a: "Absolutely. Many clients begin with strategy or social, then expand as we prove ROI and your needs grow.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "20%", left: "10%", delay: 0 },
            { color: "violet", size: 350, bottom: "10%", right: "15%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-90" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-28 text-center">
          <FadeUp>
            <div className="flex justify-center">
              <SectionEyebrow light center>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-buzz-coral shrink-0" aria-hidden />
                  Marketing Services
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Creating Buzz for Brands that Deserve to{" "}
              <TextShimmer as="span">Be Seen</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mt-4 text-lg md:text-xl text-white/70 font-[family-name:var(--font-outfit-var)] font-medium max-w-2xl mx-auto">
              Marketing for brands that need to be chosen.
            </p>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              At The Buzz Marketing Co., we help high-trust brands (dental, medical,
              service, and luxury) build authority across every platform where
              decisions are made. This isn&apos;t generic marketing. This is strategic
              positioning designed to make your brand the obvious choice.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="glow" arrow>
                Book Your Consultation
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-16 md:py-20 bg-warm-gray border-y border-black/[0.06]">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-foreground">
              Our Approach: Search Everywhere Optimization
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="mt-4 text-buzz-slate leading-relaxed">
              People don&apos;t discover businesses in one place anymore. They find you on
              Instagram, validate you on Google, learn from you on YouTube, check
              reviews and conversations, and even ask AI what to believe. If your
              brand isn&apos;t aligned across all of it, you lose trust before you ever
              get the call. We make sure you show up everywhere with clarity,
              credibility, and consistency.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      <section id="services-detail" className="scroll-mt-28 py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <SectionEyebrow center>What We Do</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground mt-3">
                Services built for{" "}
                <TextShimmer as="span">high-trust brands</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-4 max-w-2xl mx-auto text-buzz-slate leading-relaxed">
                A cleaner, stronger ecosystem of strategy, content, and conversion
                support designed to make your brand feel aligned everywhere people
                find you.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {SERVICE_BLOCKS.map((service, index) => {
              const Icon = service.icon;
              const imageOnLeft = (index + 1) % 2 === 0;
              const isSocial = service.id === "social";
              const serviceNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={service.id}
                  className="relative overflow-hidden rounded-[32px] border border-black/[0.08] bg-white/80 p-4 shadow-[0_30px_110px_-85px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-6 lg:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-buzz-coral/60 to-transparent" />

                  <div
                    className={`grid grid-cols-1 items-stretch gap-8 lg:gap-10 ${
                      imageOnLeft
                        ? "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]"
                        : "lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]"
                    }`}
                  >
                    <FadeUp
                      variant={imageOnLeft ? "left" : "right"}
                      className={
                        imageOnLeft ? "order-1 lg:order-1" : "order-2 lg:order-2"
                      }
                    >
                      <div
                        className={`relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-buzz-dark/5 group ${
                          isSocial ? "h-full min-h-[340px] md:min-h-[480px]" : ""
                        }`}
                      >
                        <div
                          className={`relative w-full ${
                            isSocial
                              ? "h-full min-h-[340px] md:min-h-[480px]"
                              : "aspect-[5/4]"
                          }`}
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-buzz-dark/60 via-buzz-dark/10 to-transparent" />

                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-buzz-dark/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm md:left-5 md:top-5">
                          <span className="h-2 w-2 rounded-full bg-buzz-coral" />
                          {isSocial ? "Most Requested" : `Service ${serviceNumber}`}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
                      </div>
                    </FadeUp>

                    <FadeUp
                      delay={0.06}
                      variant={imageOnLeft ? "right" : "left"}
                      className={
                        imageOnLeft ? "order-2 lg:order-2" : "order-1 lg:order-1"
                      }
                    >
                      <div className="flex h-full flex-col">
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-buzz-coral/20 bg-buzz-coral/15">
                            <Icon className="w-7 h-7 text-buzz-coral" aria-hidden />
                          </div>
                          <span className="inline-flex items-center rounded-full border border-buzz-coral/15 bg-buzz-coral/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-buzz-coral">
                            {isSocial
                              ? "Monthly Management"
                              : service.priceLabel
                                ? "Signature Offer"
                                : "Tailored Service"}
                          </span>
                        </div>

                        <div className="max-w-2xl">
                          <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl lg:text-[2.15rem] font-bold text-foreground mb-4 leading-tight">
                            {service.title}
                          </h2>
                          {service.priceLabel ? (
                            <p className="mb-4 font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-buzz-coral">
                              {service.priceLabel}
                              <span className="ml-2 text-sm font-medium uppercase tracking-[0.18em] text-buzz-slate">
                                investment
                              </span>
                            </p>
                          ) : null}
                          <p className="mb-6 text-base md:text-lg leading-relaxed text-buzz-slate">
                            {service.description}
                          </p>
                        </div>

                        {isSocial ? (
                          <>
                            <div className="mb-6 flex flex-wrap gap-2.5">
                              {SOCIAL_POSITIONING.map((item) => (
                                <span
                                  key={item}
                                  className="inline-flex items-center rounded-full border border-black/[0.07] bg-white px-4 py-2 text-xs font-semibold text-foreground/80 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>

                            <div className="mb-8 rounded-[28px] border border-buzz-coral/15 bg-[#fffaf7] p-5 shadow-[0_30px_120px_-90px_rgba(255,107,74,0.75)] md:p-6 lg:p-7">
                              <div className="flex flex-col gap-3 border-b border-black/[0.06] pb-5 md:flex-row md:items-end md:justify-between">
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-buzz-coral">
                                    Package lineup
                                  </p>
                                  <h3 className="mt-2 font-[family-name:var(--font-syne-var)] text-xl md:text-2xl font-bold text-foreground">
                                    Choose the level of support that fits your growth
                                    stage.
                                  </h3>
                                </div>
                                <p className="max-w-sm text-sm leading-relaxed text-buzz-slate">
                                  Built for brands that need consistency, stronger
                                  positioning, and content that actually moves people
                                  to act.
                                </p>
                              </div>

                              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                {SOCIAL_TIERS.map((tier) => {
                                  const isPopular = tier.popular;
                                  const compactPrice = tier.price.startsWith("Starting");

                                  return (
                                    <div
                                      key={tier.name}
                                      className={`relative flex h-full flex-col rounded-[26px] border p-5 md:p-6 ${
                                        isPopular
                                          ? "border-buzz-coral/50 bg-buzz-dark text-white shadow-[0_30px_90px_-60px_rgba(255,107,74,0.7)]"
                                          : "border-black/[0.08] bg-white shadow-[0_20px_50px_-40px_rgba(15,23,42,0.35)]"
                                      }`}
                                    >
                                      {isPopular && tier.subtitle ? (
                                        <span className="absolute right-4 top-4 rounded-full bg-gradient-coral px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-luxury">
                                          {tier.subtitle}
                                        </span>
                                      ) : null}

                                      <div className={isPopular ? "pr-24" : ""}>
                                        <h4
                                          className={`font-[family-name:var(--font-syne-var)] text-lg md:text-xl font-bold ${
                                            isPopular ? "text-white" : "text-foreground"
                                          }`}
                                        >
                                          {tier.name}
                                        </h4>
                                        <p
                                          className={`mt-3 font-[family-name:var(--font-syne-var)] font-bold ${
                                            compactPrice
                                              ? "text-[1.85rem] leading-[1.05]"
                                              : "text-3xl"
                                          } ${isPopular ? "text-white" : "text-foreground"}`}
                                        >
                                          {tier.price}
                                          <span
                                            className={`ml-1 text-sm font-medium ${
                                              isPopular ? "text-white/60" : "text-buzz-slate"
                                            }`}
                                          >
                                            {tier.period}
                                          </span>
                                        </p>
                                      </div>

                                      <ul className="mt-6 space-y-3 flex-1">
                                        {tier.features.map((feature) => (
                                          <li
                                            key={feature}
                                            className={`flex items-start gap-3 text-sm leading-relaxed ${
                                              isPopular
                                                ? "text-white/82"
                                                : "text-foreground/90"
                                            }`}
                                          >
                                            <span
                                              className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                                isPopular
                                                  ? "border border-white/10 bg-white/10 text-buzz-coral"
                                                  : "bg-buzz-coral/10 text-buzz-coral"
                                              }`}
                                            >
                                              <Check
                                                className="w-3.5 h-3.5"
                                                strokeWidth={2.5}
                                              />
                                            </span>
                                            <span>{feature}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="mt-5 flex flex-col gap-3 border-t border-black/[0.06] pt-5 text-sm text-buzz-slate md:flex-row md:items-center md:justify-between">
                                <p>
                                  Every package includes strategy mapped to your
                                  audience, offers, and content goals.
                                </p>
                                <div className="inline-flex items-center gap-2 font-semibold text-foreground">
                                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-buzz-coral/10 text-buzz-coral">
                                    <Sparkles className="w-3.5 h-3.5" aria-hidden />
                                  </span>
                                  <span>
                                    Custom direction. Polished execution. Real support.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="mb-8 rounded-[24px] border border-black/[0.06] bg-warm-gray/80 p-4 md:p-5">
                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-buzz-coral">
                              What&apos;s included
                            </p>
                            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {service.bullets.map((item) => (
                                <li
                                  key={item}
                                  className="flex h-full items-start gap-3 rounded-2xl bg-white px-4 py-4 text-sm text-foreground/90 shadow-[0_14px_40px_-34px_rgba(15,23,42,0.28)] md:text-base"
                                >
                                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-buzz-coral/10 text-buzz-coral">
                                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-auto">
                          <Button href="/contact" arrow>
                            {isSocial ? "Start Your Plan" : "Get Started"}
                          </Button>
                        </div>
                      </div>
                    </FadeUp>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-20 md:py-28 bg-buzz-dark relative overflow-hidden">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-60" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8 text-center">
          <SectionEyebrow light center>
            Who This Is For
          </SectionEyebrow>
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white mt-3 mb-8">
              We work best with
            </h2>
          </FadeUp>
          <ul className="text-left max-w-lg mx-auto space-y-4">
            {WHO_FOR.map((line) => (
              <FadeUp key={line}>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-buzz-coral/20 text-buzz-coral">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span>
                    {line === "Businesses ready to scale with intention" ? (
                      <strong className="text-white font-semibold">
                        Businesses ready to scale with intention
                      </strong>
                    ) : (
                      line
                    )}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ul>
          <FadeUp delay={0.12}>
            <p className="mt-10 text-white/45 text-sm">
              We stay selective so we can deliver at a higher level.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-36 bg-warm-gray relative overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow center>FAQ</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground">
                Questions, <TextShimmer as="span">answered</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-4 text-buzz-slate max-w-2xl mx-auto">
                Straight answers about packages, what we manage, and what to expect
                when we partner together.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeUp key={faq.q} delay={i * 0.04}>
                  <div className="rounded-2xl bg-white border border-black/[0.06] overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="cursor-pointer w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                    >
                      <span className="font-[family-name:var(--font-outfit-var)] font-semibold text-foreground pr-2">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                        className="shrink-0 text-buzz-coral"
                      >
                        <ChevronDown className="w-5 h-5" aria-hidden />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 md:px-6 pb-5 md:pb-6 text-buzz-slate text-sm leading-relaxed border-t border-black/[0.06] pt-4">
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
        </div>
      </section>

      <CoralCTA />
    </>
  );
}

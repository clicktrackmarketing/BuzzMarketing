"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Camera,
  Target,
  Search,
  Mail,
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

const SERVICES = [
  {
    icon: Megaphone,
    image: "/service-social.jpg",
    title: "Social Media Management",
    description:
      "Strategic planning and daily management of your social media presence across Instagram, Facebook, LinkedIn, TikTok, and more.",
    bullets: [
      "Custom content calendars",
      "Community management & engagement",
      "Analytics & monthly reporting",
      "Platform-specific strategy",
    ],
  },
  {
    icon: Camera,
    image: "/service-content.jpg",
    title: "Content Creation",
    description:
      "From professional photography to scroll-stopping video, we create content that captures attention and converts followers into customers.",
    bullets: [
      "Professional photo & video shoots",
      "Graphic design & branding assets",
      "Reels & short-form video",
      "Content repurposing strategy",
    ],
  },
  {
    icon: Target,
    image: "/service-ads.jpg",
    title: "Paid Advertising",
    description:
      "Data-driven ad campaigns across Meta, Google, and more, optimized for maximum ROI and measurable results.",
    bullets: [
      "Meta & Instagram ad campaigns",
      "Google Ads & search campaigns",
      "Audience targeting & retargeting",
      "A/B testing & optimization",
    ],
  },
  {
    icon: Search,
    image: "/service-seo.jpg",
    title: "SEO & Local Search",
    description:
      "Get found by San Diego customers actively searching for your services with our comprehensive SEO strategy.",
    bullets: [
      "Google Business Profile optimization",
      "Local citation building",
      "On-page SEO & content strategy",
      "Monthly ranking reports",
    ],
  },
  {
    icon: Mail,
    image: "/service-email.jpg",
    title: "Email Marketing",
    description:
      "Turn subscribers into customers with automated email sequences and campaigns that nurture leads and drive revenue.",
    bullets: [
      "Automated welcome & nurture sequences",
      "Monthly newsletter campaigns",
      "List segmentation & personalization",
      "Performance tracking & optimization",
    ],
  },
  {
    icon: Palette,
    image: "/service-brand.jpg",
    title: "Brand Strategy",
    description:
      "Build a brand that stands out and stands for something with our comprehensive brand identity services.",
    bullets: [
      "Logo design & visual identity",
      "Brand voice & messaging",
      "Style guides & brand books",
      "Competitive positioning",
    ],
  },
] as const;

const FAQS = [
  {
    q: "What platforms do you manage?",
    a: "We manage Instagram, Facebook, LinkedIn, TikTok, Google Business Profile, YouTube, X/Twitter, and Pinterest — tailored to where your audience actually spends time.",
  },
  {
    q: "How much does social media marketing cost?",
    a: "Packages start at $1,500/month depending on scope, platforms, and how hands-on you want our team to be.",
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
    a: "We're boutique and founder-led: selective about clients, obsessed with craft, and allergic to cookie-cutter playbooks — every roadmap is built for your brand.",
  },
  {
    q: "Do you require long-term contracts?",
    a: "No lock-in traps. After an initial 90-day foundation period, most engagements continue month-to-month.",
  },
  {
    q: "How does the content creation process work?",
    a: "Discovery and strategy first, then production (shoot or design), your review and revisions, and finally scheduling and publishing with performance tracking.",
  },
  {
    q: "Can I start with just one service?",
    a: "Absolutely. Many clients begin with one core service, then expand as we prove ROI and your needs grow.",
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
                  Our Services
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Everything Your Brand Needs to{" "}
              <TextShimmer as="span">Stand Out</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              From strategy to execution, we handle every aspect of your digital
              marketing so you can focus on running your business.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 space-y-24 lg:space-y-32">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const imageOnLeft = (index + 1) % 2 === 0;

            return (
              <div
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                <FadeUp
                  variant={imageOnLeft ? "left" : "right"}
                  className={
                    imageOnLeft ? "order-1 lg:order-1" : "order-2 lg:order-2"
                  }
                >
                  <div className="rounded-2xl overflow-hidden relative group">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
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
                  <div className="w-14 h-14 rounded-xl bg-buzz-coral/15 flex items-center justify-center mb-5 border border-buzz-coral/20">
                    <Icon className="w-7 h-7 text-buzz-coral" aria-hidden />
                  </div>
                  <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-buzz-slate leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-foreground/90 text-sm md:text-base"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-buzz-coral/10 text-buzz-coral">
                          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" arrow>Get Started</Button>
                </FadeUp>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "violet", size: 400, top: "15%", right: "10%", delay: 0 },
            { color: "coral", size: 300, bottom: "20%", left: "5%", delay: 3 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow light center>FAQ</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-white">
                Questions, <TextShimmer as="span">answered</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-4 text-white/40 max-w-2xl mx-auto">
                Straight answers about how we work, what we manage, and what to
                expect when we partner together.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeUp key={faq.q} delay={i * 0.04}>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="cursor-pointer w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                    >
                      <span className="font-[family-name:var(--font-outfit-var)] font-semibold text-white pr-2">
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
        </div>
      </section>

      <CoralCTA />
    </>
  );
}

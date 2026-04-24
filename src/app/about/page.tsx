"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import {
  Search,
  Layers,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Users,
  Phone,
  ExternalLink,
  ArrowUpRight,
  Calendar,
  HandHeart,
} from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";

type PartnerHighlight = {
  icon: typeof Calendar;
  title: string;
  body: string;
  link?: { href: string; label: string };
};

type Partner = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  alt: string;
  paragraphs: string[];
  highlights?: PartnerHighlight[];
};

const PARTNERS: Partner[] = [
  {
    slug: "brittany-jenkins",
    name: "Brittany Jenkins",
    title: "Founder",
    photo: "/britt-jenkins.jpg",
    alt: "Brittany Jenkins, Founder of The Buzz Marketing Co",
    paragraphs: [
      "Brittany Jenkins is the Founder of The Buzz Marketing Co., a boutique, high-touch digital marketing firm based in San Diego that helps brands show up like industry leaders. With over 20 years of experience spanning from the Yellow Pages era to today's AI-driven landscape, Brittany specializes in what she calls \"Search Everywhere Optimization,\" ensuring businesses are visible, credible, and converting across websites, Google, social media, and emerging platforms like AI search.",
      "She works extensively with high-trust industries, particularly in the medical and dental space, and has helped thousands of brands elevate their presence through strategic marketing, content creation, and conversion-focused systems.",
      "Brittany is also an author and speaker, regularly presenting on modern marketing strategies, personal branding, and digital visibility. She is actively involved in continuing education and frequently attends and contributes to advanced programs such as Functional Aesthetics and Occlusion Demystified. She is known for blending clinical-level precision with high-end, editorial-style marketing.",
      "In addition, Brittany participates in dental photography and marketing courses across the country, reinforcing her commitment to staying at the forefront of both technology and aesthetics. She is passionate about helping businesses grow with clarity, confidence, and systems that create sustainable success.",
    ],
    highlights: [
      {
        icon: Calendar,
        title: "Mastermind",
        body: "Brittany leads an exclusive marketing mastermind for business owners, admins, and marketing teams. The program teaches a proven marketing formula, essential tools like Canva and CapCut, and insider strategies used to scale brands effectively. Next session: May 13 at the University Club in San Diego.",
        link: { href: "/buzz-mastermind-group", label: "Reserve your seat" },
      },
      {
        icon: HandHeart,
        title: "Community & Nonprofit",
        body: "Brittany is actively involved in the San Diego business community through networking events, educational workshops, and mentorship - passionate about sharing knowledge and empowering others through education, collaboration, and access to modern marketing tools.",
      },
    ],
  },
  {
    slug: "krizia-beraldo",
    name: "Krizia Beraldo",
    title: "President",
    photo: "/krizia-beraldo.jpg",
    alt: "Krizia Beraldo, President of The Buzz Marketing Co",
    paragraphs: [
      "Krizia Beraldo is the President of The Buzz Marketing Co., where strategy, brand elevation, and operational excellence intersect to create measurable business growth. With over a decade of experience leading inside high-trust, high-value industries, Krizia has built her career at the intersection of brand psychology, business operations, and intelligent marketing systems.",
      "Her background spans product strategy, executive leadership, and data operations. She specializes in Human-in-the-Loop Machine Learning and ethical AI operations, enabling her to design intelligent workflows that combine automation with strategic human oversight.",
      "Krizia has spent years scaling complex organizations, advancing from specialist to executive by designing the systems, structures, and operational frameworks that transform businesses from reactive to truly scalable.",
      "At The Buzz, she leads with a simple philosophy: marketing should never feel like noise. It should feel intentional, precise, and deeply aligned with the people a business is meant to attract. She believes the strongest brands are not built on trends or volume, but on clarity, positioning, consistency, and data. Krizia specializes in helping premium brands refine their authority, strengthen their visibility, and create systems that support long-term success - not just short-term attention.",
      "Known for her high standards and caring approach to both work and life, Krizia leads with a balance of executive precision and genuine human connection. At her core, she is an architect of growth - building brands, businesses, and systems designed to last.",
    ],
  },
  {
    slug: "jessica-johnson",
    name: "Jessica Johnson",
    title: "Product Performance Manager",
    photo: "/jessica-johnson.jpg",
    alt: "Jessica Johnson, Product Performance Manager at The Buzz Marketing Co",
    paragraphs: [
      "Jessica Johnson is a Product Performance Manager and digital marketing professional with over seven years of experience in fast-paced agency environments. In her current role, she drives product and campaign performance through a blend of data-driven strategy and creative execution - content creation, messaging, and social media development.",
      "Previously, Jessica specialized in paid media, managing and optimizing high-budget campaigns across Google Ads and Meta for clients in the dental, plastic surgery, and legal industries. She is known for balancing performance metrics with strong client relationships to deliver meaningful results.",
      "Jessica earned her degree in Business Administration from California State University San Marcos and has called San Diego home since she was 18. Outside of work, she teaches yoga - a passion that keeps her grounded and balanced.",
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Search,
    title: "We don't do \"SEO.\" We do Search Everywhere.",
    body: "People don't search in one place anymore. They decide across Google, Instagram, TikTok, YouTube, Reddit, and even AI tools. We build content that shows up and resonates everywhere decisions are made.",
  },
  {
    icon: Layers,
    title: "Every platform has its own code.",
    body: "What works on Instagram won't work on TikTok. What converts on Google won't build trust on Reddit. We optimize content for how each platform thinks, feels, and decides.",
  },
  {
    icon: Sparkles,
    title: "We don't build funnels. We build constellations.",
    body: "Your audience doesn't move in a straight line. They discover you here, validate you there, feel something somewhere else and then convert. We design content to support the entire decision ecosystem.",
  },
  {
    icon: HeartHandshake,
    title: "We optimize for emotion, not just keywords.",
    body: "People don't want to think. They want to feel. Our content is immediate, visual, and emotionally compelling, because feelings drive action.",
  },
  {
    icon: ShieldCheck,
    title: "We turn attention into trust.",
    body: "From raw authenticity to perceived authority, we help your brand earn belief, credibility, and follow-through, not just views.",
  },
  {
    icon: Users,
    title: "We're selective by design.",
    body: "We partner with brands we believe in, so we can go deeper, think smarter, and deliver real results, not mass-produced content.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.82]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] overflow-hidden flex flex-col items-center justify-center bg-buzz-dark"
      >
        <motion.div
          style={prefersReduced ? {} : { scale: heroScale }}
          className="absolute inset-0"
        >
          <HeroVideoBackground />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-hero-overlay" />
        <motion.div
          style={prefersReduced ? { opacity: 0.65 } : { opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />
        <div className="grain-overlay absolute inset-0 pointer-events-none z-[1]" />

        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "20%", left: "10%", delay: 0 },
            { color: "violet", size: 400, bottom: "20%", right: "15%", delay: 2 },
          ]}
        />

        <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 md:px-8 py-24 text-center flex flex-col items-center">
          <SectionEyebrow light pulse center>
            Strategic Brand Growth
          </SectionEyebrow>
          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-[40px] md:text-[52px] font-extrabold text-white leading-[1.08]"
          >
            About
            The Buzz Marketing Co
          </motion.h1>
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-5 text-lg md:text-xl text-white/70 font-[family-name:var(--font-outfit-var)] font-medium max-w-2xl"
          >
            Where strategy meets{" "}
            <TextShimmer as="span">buzz-worthy</TextShimmer> content
          </motion.p>
        </div>
      </section>

      <div className="coral-divider" />

      {/* FOUNDER STORY */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-start">
            <FadeUp variant="left">
              <div className="rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 relative group">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/founder.jpg"
                    alt="Brittany Jenkins, founder of The Buzz Marketing Co"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 28rem"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
              </div>
            </FadeUp>

            <div>
              <FadeUp>
                <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-8">
                  One Simple Mission
                </h2>
              </FadeUp>
              <FadeUp delay={0.06}>
                <p className="text-buzz-slate leading-relaxed mb-5 text-base md:text-lg">
                  I started The Buzz Marketing Co with one simple mission:{" "}
                  <strong className="text-foreground font-semibold">
                    To help small businesses show up like big brands.
                  </strong>
                </p>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="text-buzz-slate leading-relaxed mb-5">
                  After 20+ years in marketing (yep - I started in the Yellow
                  Pages), I&apos;ve seen what works, what doesn&apos;t, and what
                  makes a brand truly unforgettable. Now, I take that experience
                  and pour it into businesses I believe in, with bold ideas,
                  smart strategy, and scroll-stopping content.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="text-buzz-slate leading-relaxed mb-3">
                  At The Buzz, this isn&apos;t a volume shop.
                </p>
                <p className="text-buzz-slate leading-relaxed mb-5 text-base md:text-lg">
                  <strong className="text-foreground font-semibold">
                    It&apos;s boutique, high-touch marketing built on real
                    relationships.
                  </strong>
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <p className="text-buzz-slate leading-relaxed mb-10 text-base md:text-lg">
                  Every partnership comes with full intention. If I take it on,
                  it&apos;s because I know we can elevate it.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Button href="/contact" arrow>
                  Let&apos;s Work Together
                </Button>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP / MEET THE PARTNERS */}
      <section className="py-28 md:py-36 bg-surface-light border-y border-buzz-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
            <SectionEyebrow center>Leadership</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Meet the team
                <br />
                behind{" "}
                <TextShimmer as="span">The Buzz.</TextShimmer>
              </h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-5 text-buzz-slate text-base md:text-lg leading-relaxed">
                Three partners. One mission: help brands show up like industry
                leaders - with clarity, precision, and marketing that actually
                performs.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-20 md:space-y-28">
            {PARTNERS.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={p.slug}
                  id={p.slug}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start scroll-mt-24"
                >
                  <FadeUp
                    variant={reverse ? "right" : "left"}
                    className={`lg:col-span-2 ${reverse ? "lg:order-2" : ""}`}
                  >
                    <div className="relative aspect-[5/6] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-buzz-dark border border-buzz-border shadow-luxury">
                      <Image
                        src={p.photo}
                        alt={p.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 28rem"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-buzz-dark via-buzz-dark/70 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                        <p className="text-[10px] md:text-[11px] font-bold text-buzz-coral uppercase tracking-[0.18em] mb-2">
                          {p.title}
                        </p>
                        <p className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white leading-tight">
                          {p.name}
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-coral" />
                    </div>
                  </FadeUp>

                  <div className={`lg:col-span-3 ${reverse ? "lg:order-1" : ""}`}>
                    <FadeUp>
                      <p className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.14em] mb-3">
                        {p.title}
                      </p>
                      <h3 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                        {p.name}
                      </h3>
                    </FadeUp>

                    <div className="space-y-4 text-buzz-slate text-base md:text-[17px] leading-relaxed">
                      {p.paragraphs.map((para, j) => (
                        <FadeUp key={j} delay={0.04 + j * 0.04}>
                          <p>{para}</p>
                        </FadeUp>
                      ))}
                    </div>

                    {p.highlights && p.highlights.length > 0 && (
                      <FadeUp delay={0.2}>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {p.highlights.map((h) => {
                            const Icon = h.icon;
                            return (
                              <div
                                key={h.title}
                                className="rounded-2xl bg-white border border-buzz-border p-5 shadow-sm"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-buzz-coral/10 text-buzz-coral">
                                    <Icon
                                      className="w-4 h-4"
                                      strokeWidth={2.3}
                                    />
                                  </span>
                                  <p className="font-[family-name:var(--font-syne-var)] font-bold text-foreground text-sm md:text-base">
                                    {h.title}
                                  </p>
                                </div>
                                <p className="text-buzz-slate text-sm leading-relaxed">
                                  {h.body}
                                </p>
                                {h.link && (
                                  <Link
                                    href={h.link.href}
                                    className="mt-3 inline-flex items-center gap-1.5 text-buzz-coral font-semibold text-xs uppercase tracking-wider hover:underline"
                                  >
                                    {h.link.label}
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </Link>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </FadeUp>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-28 md:py-36 bg-buzz-dark relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "10%", right: "15%", delay: 0 },
            { color: "violet", size: 350, bottom: "15%", left: "5%", delay: 3 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <SectionEyebrow light center>Our Approach</SectionEyebrow>
            <FadeUp>
              <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                What Makes Us <TextShimmer as="span">Different</TextShimmer>
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIATORS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.06} variant={i % 2 === 0 ? "up" : "scale"}>
                <GlowCard variant="dark" className="h-full">
                  <div className="p-5 sm:p-7">
                    <div className="w-12 h-12 rounded-xl bg-buzz-coral/10 flex items-center justify-center mb-5">
                      <item.icon className="w-6 h-6 text-buzz-coral" />
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit-var)] text-lg font-bold text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </GlowCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES + SOCIAL (single band; phone only in CTA below) */}
      <section className="py-24 md:py-32 bg-warm-gray border-t border-black/[0.06]">
        <div className="max-w-[720px] mx-auto px-6 md:px-8">
          <FadeUp>
            <div className="rounded-[28px] border border-black/[0.08] bg-white/[0.55] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.12)] backdrop-blur-sm px-8 py-10 md:px-12 md:py-12 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-buzz-coral mb-4">
                Your Buzz, Your way
              </p>
              <h2 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-foreground leading-snug mb-5">
                Social that fits your flow - and work worth following
              </h2>
              <p className="text-buzz-slate leading-relaxed text-base md:text-[17px] mb-8">
                Whether you need content creation or full-scale social media
                management, we offer flexible packages. We&apos;ll always keep it
                real, creative, and{" "}
                <em className="text-foreground/90 font-semibold italic">
                  results-driven.
                </em>{" "}
                Catch{" "}
                <span className="text-buzz-coral font-semibold">
                  Insta-Highlights
                </span>{" "}
                for campaigns and behind-the-scenes from brands like yours.
              </p>
              <div className="flex flex-wrap items-stretch justify-center gap-3">
                <Button
                  href="https://www.instagram.com/thebuzzmarketingco"
                  variant="glow"
                  className="gap-2 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  Instagram
                </Button>
                <Button
                  href="https://www.facebook.com/660987293768723"
                  variant="ghost"
                  className="gap-2 border-foreground/15 bg-white/60 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  Facebook
                </Button>
                <Button
                  href="https://www.linkedin.com/company/the-buzz-marketing-co/"
                  variant="ghost"
                  className="gap-2 border-foreground/15 bg-white/60 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  LinkedIn
                </Button>
                <Button
                  href="https://www.youtube.com/@TheBuzzMarketingComany"
                  variant="ghost"
                  className="gap-2 border-foreground/15 bg-white/60 !py-3.5"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  YouTube
                </Button>
              </div>
              <p className="mt-8 text-buzz-slate text-sm">
                Ready to talk strategy? Use the{" "}
                <a
                  href="/contact"
                  className="text-buzz-coral font-medium hover:underline"
                >
                  contact form
                </a>{" "}
                or book a call in the next section.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="py-16 bg-warm-gray border-t border-buzz-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-buzz-slate font-medium">Explore more:</span>
            <Link href="/services" className="text-buzz-coral font-semibold hover:underline">
              Our Services & Pricing
            </Link>
            <span className="hidden md:inline text-buzz-border">|</span>
            <Link href="/free-analysis" className="text-buzz-coral font-semibold hover:underline">
              Free Digital Analysis
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

      {/* PRIMARY CTA */}
      <section className="py-24 md:py-28 bg-surface-dark-alt relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 500, top: "30%", left: "20%", delay: 0 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="coral-divider" />
        <div className="relative z-10 max-w-[640px] mx-auto px-6 md:px-8 text-center pt-8">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              Ready to Get Noticed?
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="text-white/55 text-base md:text-lg mb-10 leading-relaxed">
              Let&apos;s create something beautiful, bold, and buzz-worthy for
              your social media marketing.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="glow" arrow>
                Book a Discovery Call
              </Button>
              <Button
                href="tel:+17203639754"
                variant="ghost"
                className="text-white border-white/20 hover:bg-white/[0.06]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call (720) 363-9754
              </Button>
            </div>
          </FadeUp>
        </div>
        <div className="coral-divider mt-10" />
      </section>
    </>
  );
}

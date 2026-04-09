"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { GlowCard } from "@/components/GlowCard";
import { TextShimmer } from "@/components/TextShimmer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { NewsletterSection } from "@/components/NewsletterSection";

const POSTS = [
  {
    slug: "san-diego-social-media-strategy-2026",
    title: "Why San Diego Businesses Need a Social Media Strategy in 2026",
    category: "Social Media",
    readTime: "5 min",
    date: "Mar 15, 2026",
    excerpt:
      "The digital landscape has shifted dramatically. Here's what local brands should prioritize this year.",
    image: "/portfolio-1.jpg",
  },
  {
    slug: "local-seo-small-business",
    title: "Local SEO Tips That Actually Work for Small Businesses",
    category: "SEO",
    readTime: "7 min",
    date: "Mar 8, 2026",
    excerpt:
      "Forget the generic advice. These are the tactics that move the needle for San Diego businesses.",
    image: "/portfolio-2.jpg",
  },
  {
    slug: "scroll-stopping-content-budget",
    title: "How to Create Scroll-Stopping Content on a Budget",
    category: "Content",
    readTime: "4 min",
    date: "Feb 28, 2026",
    excerpt:
      "You don't need a massive budget to create content that converts. Here's how to do it right.",
    image: "/portfolio-3.jpg",
  },
  {
    slug: "roi-social-media-marketing",
    title: "The ROI of Social Media Marketing: What to Actually Expect",
    category: "Strategy",
    readTime: "6 min",
    date: "Feb 20, 2026",
    excerpt:
      "Setting realistic expectations and measuring what matters—without vanity metrics.",
    image: "/portfolio-4.jpg",
  },
  {
    slug: "email-marketing-local-businesses",
    title: "Email Marketing for Local Businesses: A Complete Guide",
    category: "Email",
    readTime: "8 min",
    date: "Feb 12, 2026",
    excerpt:
      "How to build, segment, and nurture an email list that drives repeat revenue.",
    image: "/portfolio-5.jpg",
  },
  {
    slug: "san-diego-marketing-trends-2026",
    title: "San Diego's Hottest Marketing Trends for 2026",
    category: "Trends",
    readTime: "5 min",
    date: "Feb 5, 2026",
    excerpt:
      "What's working right now in America's Finest City—from short-form to local partnerships.",
    image: "/portfolio-6.jpg",
  },
];

export default function DigitalMarketingBlogPage() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 400, top: "15%", left: "10%", delay: 0 },
            { color: "violet", size: 300, bottom: "15%", right: "10%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-90" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 py-28 text-center">
          <FadeUp>
            <div className="flex justify-center">
              <SectionEyebrow light center>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-buzz-coral shrink-0" aria-hidden />
                  The Blog
                </span>
              </SectionEyebrow>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-[family-name:var(--font-syne-var)] text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] max-w-4xl mx-auto">
              Marketing <TextShimmer as="span">Insights</TextShimmer>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Actionable tips, San Diego-specific playbooks, and strategy
              breakdowns you can use this week—not someday.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <FadeUp>
            <Link
              href={`/digital-marketing-blog#${featured.slug}`}
              className="group block rounded-2xl overflow-hidden cursor-pointer"
            >
              <GlowCard variant="light">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-3 py-1 bg-buzz-coral/10 text-buzz-coral text-xs font-medium rounded-full">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1 text-buzz-slate text-xs">
                        <Clock className="w-3 h-3" />
                        {featured.readTime}
                      </span>
                      <span className="text-buzz-slate text-xs">&middot; Featured</span>
                    </div>
                    <h2 className="font-[family-name:var(--font-syne-var)] font-bold text-xl md:text-2xl lg:text-3xl text-foreground mb-4 group-hover:text-buzz-coral transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-buzz-slate leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-xs font-medium text-foreground/40">{featured.date}</time>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-buzz-coral group-hover:translate-x-1 transition-transform">
                        Read Article
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </Link>
          </FadeUp>

          {/* BLOG GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {rest.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/digital-marketing-blog#${post.slug}`}
                  className="group block h-full cursor-pointer"
                >
                  <GlowCard variant="light" className="h-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:p-7">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-buzz-coral/10 text-buzz-coral text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-buzz-slate">
                          <Clock className="w-3.5 h-3.5" aria-hidden />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="font-[family-name:var(--font-outfit-var)] font-bold text-lg md:text-xl text-foreground line-clamp-2 mb-3 group-hover:text-buzz-coral transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-buzz-slate text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <time
                          className="text-xs font-medium text-foreground/40"
                          dateTime={post.date}
                        >
                          {post.date}
                        </time>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-buzz-coral opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Read
                          <ArrowUpRight className="w-4 h-4" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}

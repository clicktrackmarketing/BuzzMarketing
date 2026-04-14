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
import { BLOG_POSTS } from "@/data/blog-posts";

export default function DigitalMarketingBlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

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
              breakdowns you can use this week - not someday.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-28 md:py-36 bg-warm-gray">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <FadeUp>
            <Link
              href={`/digital-marketing-blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden cursor-pointer"
            >
              <GlowCard variant="light">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
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
                      <time
                        className="text-xs font-medium text-foreground/40"
                        dateTime={featured.dateIso}
                      >
                        {featured.date}
                      </time>
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
            {rest.length === 0 ? (
              <p className="col-span-full text-center text-buzz-slate text-sm md:text-base">
                More articles are on the way - check back soon.
              </p>
            ) : null}
            {rest.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/digital-marketing-blog/${post.slug}`}
                  className="group block h-full cursor-pointer"
                >
                  <GlowCard variant="light" className="h-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
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
                          dateTime={post.dateIso}
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

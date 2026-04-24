import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { DraftBlogContent } from "@/components/blog/DraftBlogContent";
import { getBlogPost } from "@/data/blog-posts";
import { getAllBlogSlugs, getBlogPostRecord } from "@/lib/blog-post-record";
import { resolveBlogSlug } from "@/lib/resolve-blog-slug";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = resolveBlogSlug(rawSlug) ?? rawSlug;
  const post = getBlogPost(slug);
  const record = getBlogPostRecord(slug);
  if (!post || !record) return { title: "Post" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/digital-marketing-blog/${encodeURIComponent(slug)}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: record.publishedDate,
      url: `https://thebuzzmarketingco.com/digital-marketing-blog/${encodeURIComponent(slug)}`,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = resolveBlogSlug(rawSlug) ?? rawSlug;
  const meta = getBlogPost(slug);
  const record = getBlogPostRecord(slug);

  if (!meta || !record?.draft) {
    notFound();
  }

  const subtitle =
    record.excerpt.length > 180
      ? `${record.excerpt.slice(0, 177)}…`
      : record.excerpt;

  const postUrl = `https://thebuzzmarketingco.com/digital-marketing-blog/${encodeURIComponent(slug)}`;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Blog", path: "/digital-marketing-blog" },
          { name: meta.title, path: `/digital-marketing-blog/${encodeURIComponent(slug)}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: meta.title,
          description: meta.excerpt,
          image: `https://thebuzzmarketingco.com${meta.image}`,
          datePublished: record.publishedDate,
          dateModified: record.publishedDate,
          mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
          author: { "@id": "https://thebuzzmarketingco.com/#brittany-jenkins" },
          publisher: { "@id": "https://thebuzzmarketingco.com/#organization" },
        }}
      />
      <section className="relative bg-buzz-dark overflow-hidden">
        <HeroBackdrop />
        <AmbientOrbs
          orbs={[
            { color: "coral", size: 350, top: "10%", left: "8%", delay: 0 },
            { color: "violet", size: 280, bottom: "20%", right: "12%", delay: 2 },
          ]}
        />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-80" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-10 pb-8">
          <Link
            href="/digital-marketing-blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-buzz-coral"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to blog
          </Link>
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8 pb-16 text-center">
          <p className="mb-4">
            <span className="inline-block rounded-full bg-buzz-coral/15 px-3 py-1 text-xs font-semibold text-buzz-coral">
              Insights
            </span>
          </p>
          <h1 className="font-[family-name:var(--font-syne-var)] text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-white leading-tight">
            {meta.title}
          </h1>
          <p className="mt-4 text-lg text-white/55 md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/65">
            <time dateTime={meta.dateIso}>{meta.date}</time>
            <span aria-hidden>&middot;</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {meta.readTime} read
            </span>
          </div>
        </div>
      </section>

      <article className="bg-warm-gray pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <DraftBlogContent draft={record.draft} />
        </div>
      </article>
    </>
  );
}

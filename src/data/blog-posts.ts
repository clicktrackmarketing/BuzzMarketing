import postsData from "@/content/blog/posts.json";
import { resolveBlogSlug } from "@/lib/resolve-blog-slug";

export type BlogPostMeta = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  dateIso: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

type RawPost = {
  slug: string;
  title: string;
  publishedDate: string;
  excerpt: string;
  readTime: string;
  featuredImage: string;
};

function toDisplayDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toDateIso(iso: string): string {
  return iso.slice(0, 10);
}

/** All posts, newest first (for listing + sitemap). */
export const BLOG_POSTS: BlogPostMeta[] = (Object.values(postsData) as RawPost[])
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    category: "Insights",
    readTime: p.readTime,
    date: toDisplayDate(p.publishedDate),
    dateIso: toDateIso(p.publishedDate),
    excerpt: p.excerpt,
    image: p.featuredImage,
    imageAlt: p.title,
  }))
  .sort(
    (a, b) =>
      new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime(),
  );

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  const key = resolveBlogSlug(slug) ?? slug;
  return BLOG_POSTS.find((p) => p.slug === key);
}

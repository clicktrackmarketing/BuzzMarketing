import postsData from "@/content/blog/posts.json";
import type { DraftContent } from "@/components/blog/DraftBlogContent";
import { resolveBlogSlug } from "@/lib/resolve-blog-slug";

export type BlogPostRecord = {
  slug: string;
  title: string;
  publishedDate: string;
  dateModified?: string;
  excerpt: string;
  readTime: string;
  featuredImage: string;
  draft: DraftContent;
};

export function getBlogPostRecord(slug: string): BlogPostRecord | undefined {
  const key = resolveBlogSlug(slug) ?? slug;
  return (postsData as Record<string, BlogPostRecord>)[key];
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(postsData as Record<string, unknown>);
}

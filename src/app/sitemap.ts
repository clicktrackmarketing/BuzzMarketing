import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thebuzzmarketingco.com";

  const routes = [
    "",
    "/services",
    "/about",
    "/contact",
    "/digital-marketing-sd",
    "/social-media-mastermind",
    "/events",
    "/free-analysis",
    "/digital-marketing-blog",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "/digital-marketing-blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/digital-marketing-blog/${encodeURIComponent(post.slug)}`,
    lastModified: new Date(post.dateIso),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...blogEntries];
}

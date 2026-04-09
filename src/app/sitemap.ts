import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thebuzzmarketingco.com";

  const routes = [
    "",
    "/services",
    "/about",
    "/contact",
    "/digital-marketing-sd",
    "/events",
    "/testimonials-results-roi",
    "/digital-marketing-blog",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/digital-marketing-blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

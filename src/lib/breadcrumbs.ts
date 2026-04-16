const SITE_URL = "https://thebuzzmarketingco.com";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Build a BreadcrumbList JSON-LD object. Always prepends "Home" -> "/".
 */
export function buildBreadcrumbs(items: BreadcrumbItem[]) {
  const full: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

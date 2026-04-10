/**
 * Fetches https://thebuzzmarketingco.com/digital-marketing-blog/f.json
 * and each post page, extracts window._BLOG_DATA.post.fullContent (Draft.js JSON),
 * writes src/content/blog/posts.json for the Next app.
 *
 * Run: node scripts/scrape-godaddy-blog.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "src/content/blog/posts.json");

const FEED = "https://thebuzzmarketingco.com/digital-marketing-blog/f.json";

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromDraft(draft, fallback) {
  if (!draft?.blocks?.length) return fallback.slice(0, 220);
  for (const b of draft.blocks) {
    if (b.type === "atomic") continue;
    const t = (b.text || "").replace(/\n/g, " ").trim();
    if (t.length > 40) return t.slice(0, 220) + (t.length > 220 ? "…" : "");
  }
  return fallback.slice(0, 220);
}

function readTimeFromDraft(draft) {
  let words = 0;
  if (!draft?.blocks) return "5 min";
  for (const b of draft.blocks) {
    if (b.text) words += b.text.split(/\s+/).filter(Boolean).length;
  }
  const mins = Math.max(1, Math.ceil(words / 180));
  return `${mins} min`;
}

async function main() {
  const res = await fetch(FEED);
  if (!res.ok) throw new Error(`Feed ${res.status}`);
  const feed = await res.json();
  const items = feed.items || [];
  /** @type {Record<string, unknown>} */
  const posts = {};

  for (const item of items) {
    const slug = decodeURIComponent(item.id);
    process.stderr.write(`Fetching ${slug}…\n`);
    const pageRes = await fetch(item.url);
    if (!pageRes.ok) {
      console.error(`  skip: HTTP ${pageRes.status}`);
      continue;
    }
    const html = await pageRes.text();
    const marker = "window._BLOG_DATA=";
    const start = html.indexOf(marker);
    if (start === -1) {
      console.error("  skip: no _BLOG_DATA");
      continue;
    }
    const rest = html.slice(start + marker.length);
    const endIdx = rest.indexOf(";</script>");
    if (endIdx === -1) {
      console.error("  skip: no closing script");
      continue;
    }
    let blogData;
    try {
      blogData = JSON.parse(rest.slice(0, endIdx));
    } catch (e) {
      console.error("  skip: outer JSON parse", e.message);
      continue;
    }
    const post = blogData?.post;
    if (!post?.fullContent) {
      console.error("  skip: no post.fullContent");
      continue;
    }
    let draft;
    try {
      draft = JSON.parse(post.fullContent);
    } catch (e) {
      console.error("  skip: fullContent JSON parse", e.message);
      continue;
    }

    const publishedDate = post.publishedDate || post.date || item.date_modified;
    const featuredImage = post.featuredImage || "";
    const htmlPreview = item.html_content || "";
    const excerpt = excerptFromDraft(
      draft,
      stripHtml(htmlPreview) || post.content || "",
    );

    posts[slug] = {
      slug,
      title: post.title || item.title,
      publishedDate,
      dateModified: item.date_modified,
      featuredImage,
      excerpt,
      readTime: readTimeFromDraft(draft),
      draft,
    };
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(posts, null, 2), "utf8");
  process.stderr.write(`Wrote ${Object.keys(posts).length} posts to ${outPath}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

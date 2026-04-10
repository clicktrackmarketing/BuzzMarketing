import postsData from "@/content/blog/posts.json";

const RIGHT_SINGLE_QUOTATION = "\u2019"; // ’
const HORIZONTAL_ELLIPSIS = "\u2026"; // …

function variants(s: string): string[] {
  const out = new Set<string>();
  const add = (x: string) => {
    out.add(x);
    out.add(x.normalize("NFC"));
  };
  add(s);
  add(s.replace(new RegExp(RIGHT_SINGLE_QUOTATION, "g"), "'"));
  add(s.replace(/'/g, RIGHT_SINGLE_QUOTATION));
  add(s.replace(new RegExp(HORIZONTAL_ELLIPSIS, "g"), "..."));
  add(s.replace(/\.\.\./g, HORIZONTAL_ELLIPSIS));
  return [...out];
}

/**
 * Maps the dynamic [slug] param (as Next.js provides it) to the canonical
 * key in posts.json. Handles percent-encoded segments, Unicode NFC/NFD, and
 * confusable apostrophe / ellipsis characters.
 */
export function resolveBlogSlug(raw: string): string | undefined {
  const keys = Object.keys(postsData as Record<string, unknown>);
  if (keys.includes(raw)) return raw;

  let decoded = raw;
  if (raw.includes("%")) {
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      /* ignore */
    }
  }

  for (const candidate of variants(decoded)) {
    if (keys.includes(candidate)) return candidate;
  }

  for (const candidate of variants(decoded)) {
    const n = candidate.normalize("NFC");
    const hit = keys.find((k) => k.normalize("NFC") === n);
    if (hit) return hit;
  }

  /* Encoding-equivalent match (e.g. segment still fully encoded) */
  for (const k of keys) {
    try {
      if (encodeURIComponent(k) === raw) return k;
    } catch {
      /* ignore */
    }
  }

  return undefined;
}

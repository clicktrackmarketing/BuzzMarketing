/**
 * Client-side utilities for the Peoplelytics webhook contact form.
 * Place at: src/lib/form-utils.ts
 *
 * - normalizePhoneE164: best-effort phone formatter for GHL
 * - splitName: "Sarah Smith" → { first_name: "Sarah", last_name: "Smith" }
 * - postWithRetry: fetch with one retry after 1.5s, for transient network blips
 */

/**
 * Normalize a US phone number to E.164 (+16195550000).
 * GHL prefers this format. Falls back to best-effort for non-US numbers.
 */
export function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length > 0) return `+${digits}`;
  return raw;
}

/** Split "John Smith" → ["John", "Smith"]. Multi-word last names get joined. */
export function splitName(full: string): { first_name: string; last_name: string } {
  const trimmed = full.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

/**
 * POST JSON with one retry after 1.5s. Why retry-once:
 *   - Luxury high-ticket leads are worth the extra 1.5s wait
 *   - One retry catches transient network blips without user-visible delay
 *   - Second failure is a real problem — show the user a real error
 *     (don't silently swallow and pretend success; the lead is lost)
 */
export async function postWithRetry(url: string, body: unknown): Promise<Response> {
  const payload = JSON.stringify(body);
  const doFetch = () =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

  try {
    const res = await doFetch();
    if (res.ok) return res;
  } catch {
    // fall through to retry
  }

  await new Promise((r) => setTimeout(r, 1500));
  return doFetch();
}

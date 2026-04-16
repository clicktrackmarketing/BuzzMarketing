/**
 * GoHighLevel webhook helpers shared by all lead-capture API routes.
 *
 * The webhook URL is read from GHL_WEBHOOK_URL at request time (NOT at
 * module load) so tests and preview environments can override it, and so
 * rotation only requires an env change, not a code deploy.
 */

const FALLBACK_URL =
  "https://services.leadconnectorhq.com/hooks/A4GV6zKNQKT5XMvVrKIu/webhook-trigger/8900d39e-111d-4117-b898-31d8b13ff3d6";

export function getGhlWebhookUrl(): string {
  return process.env.GHL_WEBHOOK_URL ?? FALLBACK_URL;
}

type LogFn = (
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) => void;

/**
 * Detect honeypot submissions. Real users never fill a hidden input named
 * `website_url_confirm`; bots crawl the DOM and auto-fill anything that
 * looks like a form field.
 *
 * Returns true when the body looks like a bot.
 */
export function isHoneypotTriggered(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const hp = (body as Record<string, unknown>).website_url_confirm;
  return typeof hp === "string" && hp.trim().length > 0;
}

/**
 * Forward a validated payload to GoHighLevel. Returns true on success.
 * Logs structured events; never throws.
 */
export async function forwardToGhl(
  payload: Record<string, unknown>,
  log: LogFn,
  requestId: string,
): Promise<{ ok: true } | { ok: false; status: number }> {
  const url = getGhlWebhookUrl();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const responseText = await res.text().catch(() => "<unreadable>");
    if (!res.ok) {
      log("error", "GHL webhook returned error", {
        requestId,
        status: res.status,
        response: responseText.slice(0, 500),
      });
      return { ok: false, status: res.status };
    }
    log("info", "GHL webhook accepted", {
      requestId,
      status: res.status,
      response: responseText.slice(0, 300),
    });
    return { ok: true };
  } catch (err) {
    log("error", "GHL webhook request failed (network)", {
      requestId,
      error: String(err),
    });
    return { ok: false, status: 0 };
  }
}

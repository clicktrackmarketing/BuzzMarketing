/**
 * POST /api/contact
 *
 * Main contact / discovery-call form. Writes contact directly to GHL
 * via Private Integration Token (Peoplelytics PIT pattern). Applies
 * baseline + contact-form tags, enforces first-touch attribution lock,
 * and honors honeypot.
 */

import { NextResponse } from "next/server";
import {
  buildContactPayload,
  contactFormSchema,
} from "@/lib/contact-form-schema";
import { pickAttribution, upsertContact } from "@/lib/ghl-contact-upsert";
import { buildConsentRecord, extractClientIp } from "@/lib/sms-consent";

const BASELINE_TAGS = ["website contact form submitted", "contact form"];
const CONTACT_SOURCE = "thebuzzmarketingco.com/contact";

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    ts: new Date().toISOString(),
    route: "POST /api/contact",
    level,
    message,
    ...data,
  };
  const json = JSON.stringify(entry);
  if (level === "error") console.error(json);
  else if (level === "warn") console.warn(json);
  else console.log(json);
}

/**
 * Honeypot — real users never fill `website_url_confirm`. Bots crawl
 * the DOM and auto-fill anything that looks like a form field, so the
 * presence of any value here flags the submission as a bot.
 */
function isHoneypotTriggered(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const hp = (body as Record<string, unknown>).website_url_confirm;
  return typeof hp === "string" && hp.trim().length > 0;
}

export async function POST(request: Request) {
  const PIT = process.env.GHL_PIT;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;
  const requestId = crypto.randomUUID().slice(0, 8);

  if (!PIT || !LOCATION_ID) {
    log("error", "Missing GHL_PIT or GHL_LOCATION_ID env", { requestId });
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Silently accept honeypots — returning 2xx prevents bots from retrying
  // or inferring the trap. Body is never written to GHL.
  if (isHoneypotTriggered(body)) {
    log("warn", "Honeypot triggered; dropping submission", { requestId });
    return NextResponse.json({ ok: true as const });
  }

  // Split the validated form fields from any attribution the client spread
  // in alongside them. The form-schema `parse` only knows its own fields,
  // so attribution keys live on the raw body and we pass them through.
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: parsed.error.issues[0]?.message ?? "Validation failed",
      },
      { status: 400 },
    );
  }

  const consent = buildConsentRecord(parsed.data.smsConsent, {
    ip: extractClientIp(request.headers),
    userAgent: request.headers.get("user-agent"),
  });

  // Merge: form fields (mapped to GHL keys) + whatever attribution the
  // client spread into the raw body (keys already match GHL fieldKeys).
  const payload = {
    ...buildContactPayload(parsed.data, consent),
    ...pickAttribution((body as Record<string, unknown>) || {}),
  };

  try {
    const result = await upsertContact({
      pit: PIT,
      locationId: LOCATION_ID,
      tags: BASELINE_TAGS,
      source: CONTACT_SOURCE,
      payload,
    });

    if (!result.ok) {
      log("error", "GHL upsert failed", {
        requestId,
        status: result.status,
        detail: result.errorDetail,
      });
      return NextResponse.json(
        {
          message:
            "We could not send your message. Please try again in a moment or call (720) 363-9754.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true as const,
      contactId: result.contactId,
      firstTouchWritten: result.firstTouchWritten,
    });
  } catch (err) {
    log("error", "Unexpected error", {
      requestId,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { message: "Internal error" },
      { status: 500 },
    );
  }
}

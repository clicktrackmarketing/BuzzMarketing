/**
 * POST /api/free-analysis
 *
 * Free Digital Analysis lead form. Writes contact directly to GHL via
 * Private Integration Token (Peoplelytics PIT pattern). Applies baseline
 * + free-analysis tags, enforces first-touch attribution lock, honors
 * honeypot.
 */

import { NextResponse } from "next/server";
import {
  buildAnalysisPayload,
  analysisFormSchema,
} from "@/lib/analysis-form-schema";
import { pickAttribution, upsertContact } from "@/lib/ghl-contact-upsert";
import { buildConsentRecord, extractClientIp } from "@/lib/sms-consent";

const BASELINE_TAGS = ["website contact form submitted", "free analysis"];
const CONTACT_SOURCE = "thebuzzmarketingco.com/free-analysis";

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    ts: new Date().toISOString(),
    route: "POST /api/free-analysis",
    level,
    message,
    ...data,
  };
  const json = JSON.stringify(entry);
  if (level === "error") console.error(json);
  else if (level === "warn") console.warn(json);
  else console.log(json);
}

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

  if (isHoneypotTriggered(body)) {
    log("warn", "Honeypot triggered; dropping submission", { requestId });
    return NextResponse.json({ ok: true as const });
  }

  const parsed = analysisFormSchema.safeParse(body);
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

  const payload = {
    ...buildAnalysisPayload(parsed.data, consent),
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
            "We could not send your request. Please try again in a moment or call (720) 363-9754.",
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

/**
 * POST /api/dental-photography-register
 *
 * "Shoot Like a Pro" dental photography intensive registration form.
 * Writes contact directly to GHL via Private Integration Token,
 * applies dental-photography-specific tags, then the client redirects
 * to the Square checkout for payment.
 */

import { NextResponse } from "next/server";
import { pickAttribution, upsertContact } from "@/lib/ghl-contact-upsert";

const BASELINE_TAGS = [
  "website contact form submitted",
  "dental photography registration",
];
const CONTACT_SOURCE = "thebuzzmarketingco.com/dental-photography";

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    ts: new Date().toISOString(),
    route: "POST /api/dental-photography-register",
    level,
    message,
    ...data,
  };
  const json = JSON.stringify(entry);
  if (level === "error") console.error(json);
  else if (level === "warn") console.warn(json);
  else console.log(json);
}

export async function POST(req: Request) {
  const PIT = process.env.GHL_PIT;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;
  const requestId = crypto.randomUUID().slice(0, 8);

  if (!PIT || !LOCATION_ID) {
    log("error", "Missing GHL_PIT or GHL_LOCATION_ID env", { requestId });
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawBody = (body as Record<string, unknown>) || {};

  const hasName =
    (rawBody.first_name as string)?.toString().trim() ||
    (rawBody.full_name as string)?.toString().trim();
  if (
    !hasName ||
    !(rawBody.email as string)?.toString().trim() ||
    !(rawBody.phone as string)?.toString().trim()
  ) {
    return NextResponse.json(
      { error: "Missing name, email, or phone" },
      { status: 400 },
    );
  }

  // Strip out any keys we don't want forwarded to GHL, then merge attribution.
  const payload = {
    first_name: rawBody.first_name,
    last_name: rawBody.last_name,
    email: rawBody.email,
    phone: rawBody.phone,
    ...pickAttribution(rawBody),
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
        { error: "Failed to save lead", detail: result.errorDetail },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      contactId: result.contactId,
      firstTouchWritten: result.firstTouchWritten,
    });
  } catch (err) {
    log("error", "Unexpected error", {
      requestId,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

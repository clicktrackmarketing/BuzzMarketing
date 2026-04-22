/**
 * POST /api/mastermind-register
 *
 * Mastermind / Shoot Like a Pro registration form.
 * Writes contact directly to GHL via Private Integration Token, applies
 * event-specific tags, then the client redirects to the Square checkout.
 */

import { NextResponse } from "next/server";
import { upsertContact } from "@/lib/ghl-contact-upsert";

const BASELINE_TAGS = [
  "website contact form submitted",
  "mastermind registration",
];
const CONTACT_SOURCE = "thebuzzmarketingco.com/social-media-mastermind";

function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: Record<string, unknown>,
) {
  const entry = {
    ts: new Date().toISOString(),
    route: "POST /api/mastermind-register",
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

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const hasName =
    (payload.first_name as string)?.toString().trim() ||
    (payload.full_name as string)?.toString().trim();
  if (
    !hasName ||
    !(payload.email as string)?.toString().trim() ||
    !(payload.phone as string)?.toString().trim()
  ) {
    return NextResponse.json(
      { error: "Missing name, email, or phone" },
      { status: 400 },
    );
  }

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
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    );
  }
}

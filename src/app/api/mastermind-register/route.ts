/**
 * POST /api/contact-submit
 *
 * Server-side contact form handler. Next.js App Router route.
 * Replaces direct-to-GHL webhook POSTs with a same-origin API call that uses
 * a Private Integration Token (PIT) to upsert contacts via GHL's Contacts API.
 *
 * Why this pattern:
 *   - Same-origin POST eliminates CORS concerns
 *   - PIT stays server-side (never shipped to browsers)
 *   - Custom fields are mapped by fieldKey → fieldId automatically — no GHL
 *     Inbound Webhook workflow mapping required
 *   - First-touch attribution lock is enforced server-side (reliable, auditable,
 *     doesn't depend on a correctly-configured GHL workflow)
 *   - Any baseline tag you want (e.g. "website contact form submitted") is
 *     applied atomically with the upsert
 *
 * Place this file at:  src/app/api/contact-submit/route.ts
 *
 * Required env vars (.env.local for dev, Vercel env for prod):
 *   GHL_PIT            Private Integration Token (pit-xxx)
 *   GHL_LOCATION_ID    Sub-account Location ID
 */

import { NextRequest, NextResponse } from "next/server";

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

// The fields that are LOCKED at first touch per Peoplelytics PRD section 1.2.
// If a contact already has visitor_source_first populated, we drop these from
// the incoming payload so we don't overwrite the original attribution.
const LOCKED_FIELDS = [
  "visitor_source_first",
  "attribution_method",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "gclid_captured",
  "fbclid_captured",
  "landing_page_first",
  "referrer_url_captured",
] as const;

// Field keys whose values live on the standard GHL contact object (not custom
// fields). These map into the top level of the upsert payload with camelCase.
const STANDARD_FIELDS = new Set([
  "first_name",
  "last_name",
  "email",
  "phone",
  "postal_code",
]);

// CUSTOMIZE PER PROJECT — the baseline tag applied to every submission.
const BASELINE_TAGS = [
  "website contact form submitted",
  "mastermind registration",
];

// CUSTOMIZE PER PROJECT — the `source` string GHL records on the contact.
const CONTACT_SOURCE = "thebuzzmarketingco.com/social-media-mastermind";

// Module-level field-map cache. Refreshed every 10 minutes or on cold start.
let fieldMapCache: Record<string, { id: string; dataType: string }> | null = null;
let fieldMapFetchedAt = 0;
const FIELD_MAP_TTL_MS = 10 * 60 * 1000;

async function getFieldMap(pit: string, locationId: string) {
  if (fieldMapCache && Date.now() - fieldMapFetchedAt < FIELD_MAP_TTL_MS) {
    return fieldMapCache;
  }
  const res = await fetch(`${GHL_API}/locations/${locationId}/customFields`, {
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_VERSION,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GHL list fields failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const fields = data.customFields || data.fields || [];
  const map: Record<string, { id: string; dataType: string }> = {};
  for (const f of fields) {
    const key = String(f.fieldKey || "").replace(/^contact\./, "");
    if (key) map[key] = { id: f.id, dataType: f.dataType };
  }
  fieldMapCache = map;
  fieldMapFetchedAt = Date.now();
  return map;
}

async function findContactByEmail(pit: string, locationId: string, email: string) {
  const url = new URL(`${GHL_API}/contacts/search/duplicate`);
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("email", email);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_VERSION,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json();
  return data.contact || null;
}

function getCustomFieldValue(contact: any, fieldId: string): string {
  if (!contact?.customFields) return "";
  const match = contact.customFields.find((f: any) => f.id === fieldId);
  return match?.value ? String(match.value) : "";
}

export async function POST(req: NextRequest) {
  const PIT = process.env.GHL_PIT;
  const LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!PIT || !LOCATION_ID) {
    console.error("[contact-submit] Missing GHL_PIT or GHL_LOCATION_ID env");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let payload: Record<string, any>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal validation — mirror what the form enforces
  const hasName =
    payload.first_name?.toString().trim() ||
    payload.full_name?.toString().trim();
  if (
    !hasName ||
    !payload.email?.toString().trim() ||
    !payload.phone?.toString().trim()
  ) {
    return NextResponse.json(
      { error: "Missing name, email, or phone" },
      { status: 400 },
    );
  }

  try {
    const fieldMap = await getFieldMap(PIT, LOCATION_ID);

    // First-touch protection: if contact exists + has attribution set, strip
    // locked fields so we don't overwrite.
    let shouldWriteLocked = true;
    if (payload.email) {
      const existing = await findContactByEmail(PIT, LOCATION_ID, String(payload.email));
      if (existing) {
        const firstSourceField = fieldMap["visitor_source_first"];
        if (firstSourceField) {
          const existingFirstSource = getCustomFieldValue(existing, firstSourceField.id);
          if (existingFirstSource) shouldWriteLocked = false;
        }
      }
    }

    // Build GHL upsert payload.
    // Note: GHL's public API does not allow setting `dateAdded` — GHL's
    // server sets it itself. If GHL's "Created" column looks wrong, the
    // issue is the sub-account's timezone setting (GHL → Settings →
    // Business Profile → Time Zone), not the form payload.
    const customFields: Array<{ id: string; key: string; field_value: string }> = [];
    const upsertBody: Record<string, any> = {
      locationId: LOCATION_ID,
      source: CONTACT_SOURCE,
      tags: BASELINE_TAGS,
    };

    for (const [key, rawValue] of Object.entries(payload)) {
      if (rawValue === null || rawValue === undefined || rawValue === "") continue;
      const value = typeof rawValue === "string" ? rawValue : String(rawValue);

      if (STANDARD_FIELDS.has(key)) {
        if (key === "first_name") upsertBody.firstName = value;
        else if (key === "last_name") upsertBody.lastName = value;
        else if (key === "postal_code") upsertBody.postalCode = value;
        else upsertBody[key] = value;
        continue;
      }

      // Client-only helper fields that shouldn't hit GHL
      if (key === "full_name" || key === "form_page_url") continue;

      // First-touch lock enforcement
      if (!shouldWriteLocked && LOCKED_FIELDS.includes(key as any)) continue;

      const field = fieldMap[key];
      if (!field) continue; // unknown key — ignore silently

      customFields.push({
        id: field.id,
        key,
        field_value: value,
      });
    }

    if (customFields.length) upsertBody.customFields = customFields;

    const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PIT}`,
        Version: GHL_VERSION,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsertBody),
    });

    const resText = await upsertRes.text();
    if (!upsertRes.ok) {
      console.error("[contact-submit] GHL upsert failed:", upsertRes.status, resText);
      return NextResponse.json(
        { error: "Failed to save lead", detail: resText },
        { status: 502 }
      );
    }

    const result = JSON.parse(resText);
    return NextResponse.json({
      ok: true,
      contactId: result.contact?.id || result.id,
      firstTouchWritten: shouldWriteLocked,
    });
  } catch (err: any) {
    console.error("[contact-submit] Error:", err);
    return NextResponse.json(
      { error: "Internal error", detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}

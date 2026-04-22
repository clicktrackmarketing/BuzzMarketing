/**
 * Shared GHL Contacts API upsert helper — Peoplelytics PIT pattern.
 *
 * Every Next.js form route (/api/contact, /api/free-analysis,
 * /api/mastermind-register) calls this to write a contact to GHL using a
 * Private Integration Token. Keeps the first-touch locking logic,
 * custom-field mapping, and tag handling in one place so each route is
 * just a thin validator.
 */

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

/**
 * Fields that are LOCKED at first touch per Peoplelytics PRD section 1.2.
 * If a contact already has `visitor_source_first` populated, these are
 * stripped from the incoming payload so the original attribution data
 * isn't overwritten on return visits.
 */
const LOCKED_FIELDS = new Set([
  "visitor_source_first",
  "attribution_method",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "utm_content_captured",
  "gclid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
  "landing_page_first",
  "referrer_url_captured",
]);

/**
 * All attribution field keys produced by the peoplelytics-attribution-lib
 * client. Forms spread `getAttributionData()` into the raw POST body, and
 * each route extracts these keys from the body before validating the
 * form-specific fields. Kept here so adding a new attribution field only
 * requires updating one place.
 */
export const ATTRIBUTION_KEYS = [
  "visitor_source_first",
  "visitor_source_recent",
  "attribution_method",
  "attribution_confidence",
  "utm_source_captured",
  "utm_medium_captured",
  "utm_campaign_captured",
  "utm_term_captured",
  "utm_content_captured",
  "gclid_captured",
  "fbclid_captured",
  "msclkid_captured",
  "ttclid_captured",
  "landing_page_first",
  "referrer_url_captured",
  "last_visit_at_iso",
  "last_landing_page",
  "last_referrer",
] as const;

export function pickAttribution(
  body: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of ATTRIBUTION_KEYS) {
    if (body[k] !== undefined && body[k] !== "") out[k] = body[k];
  }
  return out;
}

/**
 * Field keys that live on the GHL contact object's top level (camelCase
 * on the wire), not as custom fields. Anything else in the payload is
 * mapped via fieldKey → fieldId lookup.
 */
const STANDARD_FIELDS: Record<string, string> = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  phone: "phone",
  company_name: "companyName",
  website: "website",
  postal_code: "postalCode",
  address1: "address1",
  city: "city",
  state: "state",
  country: "country",
};

const FIELD_MAP_TTL_MS = 10 * 60 * 1000;
type FieldMap = Record<string, { id: string; dataType: string }>;
let fieldMapCache: FieldMap | null = null;
let fieldMapFetchedAt = 0;

async function getFieldMap(pit: string, locationId: string): Promise<FieldMap> {
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
  const map: FieldMap = {};
  for (const f of fields) {
    const key = String(f.fieldKey || "").replace(/^contact\./, "");
    if (key) map[key] = { id: f.id, dataType: f.dataType };
  }
  fieldMapCache = map;
  fieldMapFetchedAt = Date.now();
  return map;
}

async function findContactByEmail(
  pit: string,
  locationId: string,
  email: string,
): Promise<Record<string, unknown> | null> {
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
  return (data.contact as Record<string, unknown>) || null;
}

function getCustomFieldValue(
  contact: Record<string, unknown> | null,
  fieldId: string,
): string {
  const cfs = (contact?.customFields as Array<Record<string, unknown>>) || [];
  const match = cfs.find((f) => f.id === fieldId);
  return match?.value ? String(match.value) : "";
}

export interface UpsertOptions {
  /** PIT (Private Integration Token) from env */
  pit: string;
  /** GHL sub-account location id from env */
  locationId: string;
  /** Tags to apply on every submit — e.g. ["website contact form submitted", "contact form"] */
  tags: string[];
  /** Source string GHL records on the contact — e.g. "thebuzzmarketingco.com/contact" */
  source: string;
  /**
   * Payload from the form. Keys follow these rules:
   *   - STANDARD_FIELDS keys (first_name, last_name, email, phone, …)
   *     land on the GHL contact object's top level.
   *   - "full_name" and "form_page_url" are helper-only and dropped.
   *   - Any other key is looked up in the GHL customFields field map
   *     and sent as a custom field. Unknown keys are dropped silently.
   */
  payload: Record<string, unknown>;
}

export interface UpsertResult {
  ok: boolean;
  status: number;
  contactId?: string;
  firstTouchWritten?: boolean;
  errorDetail?: string;
}

export async function upsertContact(
  options: UpsertOptions,
): Promise<UpsertResult> {
  const { pit, locationId, tags, source, payload } = options;

  const fieldMap = await getFieldMap(pit, locationId);

  // First-touch protection: if contact exists and already has
  // visitor_source_first populated, drop all LOCKED fields from the
  // incoming payload so we don't overwrite the original attribution.
  let shouldWriteLocked = true;
  if (payload.email) {
    const existing = await findContactByEmail(
      pit,
      locationId,
      String(payload.email),
    );
    if (existing) {
      const firstSourceField = fieldMap["visitor_source_first"];
      if (firstSourceField) {
        const existingFirstSource = getCustomFieldValue(
          existing,
          firstSourceField.id,
        );
        if (existingFirstSource) shouldWriteLocked = false;
      }
    }
  }

  const customFields: Array<{
    id: string;
    key: string;
    field_value: unknown;
  }> = [];
  const upsertBody: Record<string, unknown> = {
    locationId,
    source,
    tags,
  };

  for (const [key, rawValue] of Object.entries(payload)) {
    if (rawValue === null || rawValue === undefined) continue;
    // Drop empty strings but preserve empty arrays → don't send them
    if (typeof rawValue === "string" && rawValue.trim() === "") continue;
    if (Array.isArray(rawValue) && rawValue.length === 0) continue;

    // Standard top-level fields
    const ghlKey = STANDARD_FIELDS[key];
    if (ghlKey) {
      upsertBody[ghlKey] = rawValue;
      continue;
    }

    // Helper-only keys that must not hit GHL
    if (key === "full_name" || key === "form_page_url") continue;

    // First-touch lock enforcement
    if (!shouldWriteLocked && LOCKED_FIELDS.has(key)) continue;

    // Custom field — look up by fieldKey
    const field = fieldMap[key];
    if (!field) continue; // unknown key — ignore silently

    // MULTIPLE_OPTIONS accepts arrays of strings; everything else stringifies.
    const fieldValue: unknown = Array.isArray(rawValue)
      ? rawValue
      : typeof rawValue === "boolean"
        ? rawValue
          ? "Yes"
          : "No"
        : String(rawValue);

    customFields.push({ id: field.id, key, field_value: fieldValue });
  }

  if (customFields.length) upsertBody.customFields = customFields;

  const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_VERSION,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(upsertBody),
  });

  const resText = await upsertRes.text();
  if (!upsertRes.ok) {
    return {
      ok: false,
      status: upsertRes.status,
      errorDetail: resText.slice(0, 500),
    };
  }

  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(resText);
  } catch {
    /* ignore */
  }
  const contact = parsed.contact as Record<string, unknown> | undefined;
  return {
    ok: true,
    status: upsertRes.status,
    contactId: (contact?.id as string) || (parsed.id as string) || undefined,
    firstTouchWritten: shouldWriteLocked,
  };
}

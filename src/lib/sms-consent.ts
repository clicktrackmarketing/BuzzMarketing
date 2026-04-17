/**
 * Shared A2P 10DLC opt-in language + consent record helpers.
 *
 * Carriers audit this exact string during campaign review, so it is kept
 * as a single source of truth used by the form UI AND stored with each
 * lead record in GoHighLevel. Do not change the disclosure without
 * refiling the A2P campaign.
 */
export const SMS_CONSENT_DISCLOSURE =
  "By checking this box, I agree to receive marketing and informational SMS/text messages from The Buzz Marketing Co at the phone number provided, including messages sent by autodialer. Consent is not a condition of any purchase. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for help. View our Privacy Policy and Terms of Service for more information.";

export type SmsConsentRecord = {
  smsConsent: boolean;
  smsConsentText: string;
  smsConsentTimestamp: string;
  smsConsentIp: string | null;
  smsConsentUserAgent: string | null;
};

/**
 * Build the consent record stored with a lead. Uses the exact disclosure
 * above so GHL has an auditable record of what the user agreed to.
 */
export function buildConsentRecord(
  consented: boolean,
  opts: { ip?: string | null; userAgent?: string | null } = {},
): SmsConsentRecord {
  return {
    smsConsent: consented,
    smsConsentText: consented ? SMS_CONSENT_DISCLOSURE : "",
    smsConsentTimestamp: consented ? new Date().toISOString() : "",
    smsConsentIp: consented ? opts.ip ?? null : null,
    smsConsentUserAgent: consented ? opts.userAgent ?? null : null,
  };
}

/**
 * Pull the client IP out of a Next.js Request. Handles common proxy
 * headers (x-forwarded-for, x-real-ip). Returns null if unknown.
 */
export function extractClientIp(headers: Headers): string | null {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    // x-forwarded-for may be a comma-separated list; first is the client.
    return xff.split(",")[0]?.trim() || null;
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

import { z } from "zod";
import {
  buildConsentRecord,
  type SmsConsentRecord,
} from "@/lib/sms-consent";

export const analysisFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Name is too long"),
  businessName: z
    .string()
    .trim()
    .min(1, "Business name is required")
    .max(200, "Business name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email({ error: "Enter a valid email" })),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Enter a valid phone number (at least 10 digits)",
    ),
  websiteUrl: z
    .string()
    .trim()
    .min(1, "Website URL is required")
    .max(500, "URL is too long"),
  // A2P 10DLC — default false; unchecked submissions allowed but will
  // not receive SMS. Stored boolean is used by GHL to gate SMS sends.
  smsConsent: z.boolean().default(false),
});

export type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

/**
 * Build the payload sent to /api/free-analysis, which proxies to the GHL
 * Contacts API via Private Integration Token.
 *
 * Keys match either STANDARD_FIELDS in ghl-contact-upsert.ts (top-level
 * contact fields) or GHL custom field fieldKeys. Attribution is spread
 * in separately by the client via getAttributionData().
 */
export function buildAnalysisPayload(
  values: AnalysisFormValues,
  consent: SmsConsentRecord = buildConsentRecord(false),
): Record<string, unknown> {
  const nameParts = values.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    // Top-level standard fields
    first_name: firstName,
    last_name: lastName,
    email: values.email,
    phone: values.phone,
    company_name: values.businessName,
    website: values.websiteUrl,

    // SMS consent audit trail on the existing consent_url custom field
    consent_url: consent.smsConsent
      ? `consented=true; ts=${consent.smsConsentTimestamp}; ip=${consent.smsConsentIp ?? "unknown"}; ua=${consent.smsConsentUserAgent ?? "unknown"}`
      : "",
  };
}

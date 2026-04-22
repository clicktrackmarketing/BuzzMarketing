import { z } from "zod";
import {
  buildConsentRecord,
  type SmsConsentRecord,
} from "@/lib/sms-consent";

export const GOALS = [
  "Generate More Leads",
  "Increase Brand Awareness",
  "Drive Foot Traffic",
  "Grow Online Sales",
  "Build Social Media Following",
  "Improve SEO",
  "Launch a New Product",
  "Build Brand Credibility",
  "Create Consistent Content",
  "Automate Email",
] as const;

export const SERVICES = [
  "Strategy + Creative Direction",
  "Social Media Management",
  "Signature Content Shoot",
  "Website + Conversion Optimization",
  "Google + Local Presence",
  "Branding + Positioning",
] as const;

const GOAL_SET = new Set<string>(GOALS);

const serviceEnum = z.enum(
  SERVICES as unknown as [string, ...string[]],
  { error: "Please select a service" },
);

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),
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
  businessName: z
    .string()
    .trim()
    .min(1, "Business name is required")
    .max(200, "Business name is too long"),
  selectedGoals: z
    .array(z.string())
    .min(1, "Select at least one goal")
    .refine(
      (arr) => arr.every((g) => GOAL_SET.has(g)),
      "Invalid goal selection",
    ),
  currentStrategy: z
    .string()
    .trim()
    .min(20, "Please share a bit more (at least 20 characters)"),
  successVision: z
    .string()
    .trim()
    .min(20, "Please share a bit more (at least 20 characters)"),
  service: serviceEnum,
  optionalMessage: z.string().max(2000, "Message is too long"),
  // A2P 10DLC — must default false; unchecked submissions are allowed but
  // the lead will not receive SMS. Stored boolean is used by GHL to gate
  // SMS automations.
  smsConsent: z.boolean().default(false),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const step1Schema = contactFormSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  businessName: true,
});

const step2Schema = contactFormSchema.pick({ selectedGoals: true });

const step3Schema = contactFormSchema.pick({ currentStrategy: true });

const step4Schema = contactFormSchema.pick({ successVision: true });

const step5Schema = contactFormSchema.pick({
  service: true,
  optionalMessage: true,
});

function firstIssueMessage(result: z.ZodSafeParseError<unknown>): string {
  return result.error.issues[0]?.message ?? "Please check your answers";
}

export function validateContactStep(
  step: 1 | 2 | 3 | 4 | 5,
  values: ContactFormValues,
): { ok: true } | { ok: false; message: string } {
  const schemas: Record<
    1 | 2 | 3 | 4 | 5,
    z.ZodType<
      Partial<ContactFormValues> | Pick<ContactFormValues, keyof ContactFormValues>
    >
  > = {
    1: step1Schema,
    2: step2Schema,
    3: step3Schema,
    4: step4Schema,
    5: step5Schema,
  };

  const parsed = schemas[step].safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: firstIssueMessage(parsed) };
  }
  return { ok: true };
}

/**
 * Build the payload sent to /api/contact, which proxies to the GHL
 * Contacts API via Private Integration Token.
 *
 * Keys MUST match either STANDARD_FIELDS in ghl-contact-upsert.ts (for
 * top-level contact fields) or GHL custom field fieldKeys exactly
 * (for custom fields). Unknown keys are dropped silently by the route.
 *
 * Attribution fields are NOT added here — the client spreads
 * getAttributionData() into the outgoing request so the 14 Group A
 * fieldKeys populate automatically.
 */
export function buildContactPayload(
  values: ContactFormValues,
  consent: SmsConsentRecord = buildConsentRecord(false),
): Record<string, unknown> {
  return {
    // Top-level standard fields
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    phone: values.phone,
    company_name: values.businessName,

    // Custom fields — fieldKeys from GHL Settings → Custom Fields
    what_are_your_top_goals_select_all_that_apply: values.selectedGoals,
    how_are_you_currently_generating_customers: values.currentStrategy,
    if_we_knocked_it_out_of_the_park_what_would_that_mean_for_your_business_in_612_months:
      values.successVision,
    which_service_are_you_most_interested_in: values.service,
    anything_else_we_should_know_optional: values.optionalMessage.trim(),

    // SMS consent audit trail (consent_url is existing TEXT custom field;
    // we store the disclosure text + timestamp + IP as one auditable blob)
    consent_url: consent.smsConsent
      ? `consented=true; ts=${consent.smsConsentTimestamp}; ip=${consent.smsConsentIp ?? "unknown"}; ua=${consent.smsConsentUserAgent ?? "unknown"}`
      : "",
  };
}

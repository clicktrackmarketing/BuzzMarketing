import { z } from "zod";

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
  "Social Media Management",
  "Content Creation",
  "Paid Advertising",
  "SEO & Local Search",
  "Email Marketing",
  "Brand Strategy",
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

export function buildContactPayload(values: ContactFormValues) {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    businessName: values.businessName,
    goals: values.selectedGoals,
    goalsText: values.selectedGoals.join("; "),
    currentStrategy: values.currentStrategy,
    successVision: values.successVision,
    service: values.service,
    optionalMessage: values.optionalMessage.trim(),
    source: "Buzz Marketing — Contact Form",
    submittedAt: new Date().toISOString(),
  };
}

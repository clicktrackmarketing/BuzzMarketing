import { z } from "zod";

export const mastermindFormSchema = z.object({
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
});

export type MastermindFormValues = z.infer<typeof mastermindFormSchema>;

export function buildMastermindPayload(values: MastermindFormValues) {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    name: `${values.firstName} ${values.lastName}`,
    email: values.email,
    phone: values.phone,
    source: "Buzz Marketing - Mastermind San Diego",
    submittedAt: new Date().toISOString(),
  };
}

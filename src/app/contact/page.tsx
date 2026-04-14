"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Check } from "lucide-react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { FadeUp } from "@/components/FadeUp";
import { Button } from "@/components/Button";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { TextShimmer } from "@/components/TextShimmer";
import {
  GOALS,
  SERVICES,
  contactFormSchema,
  validateContactStep,
  type ContactFormValues,
} from "@/lib/contact-form-schema";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-buzz-coral focus:outline-none focus:ring-2 focus:ring-buzz-coral/20 transition-all";

export default function ContactPage() {
  const prefersReduced = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [currentStrategy, setCurrentStrategy] = useState("");
  const [successVision, setSuccessVision] = useState("");
  const [service, setService] = useState("");
  const [optionalMessage, setOptionalMessage] = useState("");

  const pct = Math.round((currentStep / 5) * 100);

  useEffect(() => {
    setFormError(null);
  }, [
    firstName,
    lastName,
    email,
    phone,
    businessName,
    selectedGoals,
    currentStrategy,
    successVision,
    service,
    optionalMessage,
  ]);

  const buildValues = (): ContactFormValues =>
    ({
      firstName,
      lastName,
      email,
      phone,
      businessName,
      selectedGoals,
      currentStrategy,
      successVision,
      service,
      optionalMessage,
    }) as ContactFormValues;

  const toggleGoal = (g: string) => {
    setSelectedGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  };

  const goNext = () => {
    if (currentStep >= 5) return;
    const step = currentStep as 1 | 2 | 3 | 4 | 5;
    const result = validateContactStep(step, buildValues());
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    setFormError(null);
    setDirection(1);
    setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    if (currentStep <= 1) return;
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const values = buildValues();
    const full = contactFormSchema.safeParse(values);
    if (!full.success) {
      setFormError(
        full.error.issues[0]?.message ?? "Please check your answers",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(full.data),
      });
      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message: unknown }).message === "string"
            ? (data as { message: string }).message
            : "Something went wrong. Please try again.";
        setFormError(msg);
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError(
        "Network error. Check your connection and try again, or call (720) 363-9754.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideX = prefersReduced ? 0 : 80;

  return (
    <div className="relative min-h-screen overflow-hidden bg-buzz-dark">
      <HeroVideoBackground mediaClassName="object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-80" />
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      <AmbientOrbs
        orbs={[
          { color: "coral", size: 500, top: "10%", left: "5%", delay: 0 },
          { color: "violet", size: 400, bottom: "15%", right: "10%", delay: 3 },
        ]}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 md:py-24">
        <FadeUp className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-elevated"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={prefersReduced ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: 0.05,
                    }}
                    className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-coral shadow-glow-coral"
                  >
                    <Check
                      className="h-12 w-12 text-white"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </motion.div>
                  <h2 className="font-[family-name:var(--font-syne-var)] text-3xl font-extrabold text-white md:text-4xl">
                    We&apos;re on it!
                  </h2>
                  <p className="mt-4 max-w-md text-white/50 leading-relaxed">
                    Thanks for reaching out. We&apos;ll review your responses and
                    get back to you within 24 hours.
                  </p>
                  <div className="mt-10">
                    <Button href="/" arrow>Back to Home</Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="bg-black rounded-2xl p-5 sm:p-8 md:p-10 shadow-elevated"
              >
                <header className="mb-8">
                  <SectionEyebrow light pulse>Discovery Survey</SectionEyebrow>
                  <h1 className="font-[family-name:var(--font-syne-var)] text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-[2rem]">
                    Let&apos;s See If We&apos;re a{" "}
                    <TextShimmer as="span">Perfect Fit</TextShimmer>
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base">
                    Answer a few quick questions so we can understand your
                    business and come prepared to your strategy call.
                  </p>
                </header>

                <div className="mb-8">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-white/40">
                    <span>
                      Step {currentStep} of 5
                    </span>
                    <span className="tabular-nums text-white/60">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-coral"
                      initial={false}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
                  {formError ? (
                    <p
                      className="mb-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                      role="alert"
                    >
                      {formError}
                    </p>
                  ) : null}
                  <div className="relative min-h-[min(320px,50vh)] overflow-hidden md:min-h-[340px]">
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          custom={direction}
                          initial={{
                            opacity: 0,
                            x: prefersReduced ? 0 : direction * slideX,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: prefersReduced ? 0 : -direction * slideX,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="firstName"
                                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
                              >
                                First name
                              </label>
                              <input
                                id="firstName"
                                name="firstName"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={inputClass}
                                autoComplete="given-name"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="lastName"
                                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
                              >
                                Last name
                              </label>
                              <input
                                id="lastName"
                                name="lastName"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={inputClass}
                                autoComplete="family-name"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
                            >
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={inputClass}
                              autoComplete="email"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="phone"
                              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
                            >
                              Phone
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={inputClass}
                              autoComplete="tel"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="businessName"
                              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40"
                            >
                              Business name
                            </label>
                            <input
                              id="businessName"
                              name="businessName"
                              required
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                              className={inputClass}
                              autoComplete="organization"
                            />
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          custom={direction}
                          initial={{
                            opacity: 0,
                            x: prefersReduced ? 0 : direction * slideX,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: prefersReduced ? 0 : -direction * slideX,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                        >
                          <p className="mb-4 text-sm font-medium text-white">
                            What are your top goals? (Select all that apply)
                          </p>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {GOALS.map((goal) => {
                              const selected = selectedGoals.includes(goal);
                              return (
                                <button
                                  key={goal}
                                  type="button"
                                  onClick={() => toggleGoal(goal)}
                                  className={`cursor-pointer rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${
                                    selected
                                      ? "border-buzz-coral bg-buzz-coral/10 text-white"
                                      : "border-white/10 bg-white/[0.03] text-white/60 hover:border-buzz-coral/40 hover:text-white/80"
                                  }`}
                                >
                                  {goal}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          custom={direction}
                          initial={{
                            opacity: 0,
                            x: prefersReduced ? 0 : direction * slideX,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: prefersReduced ? 0 : -direction * slideX,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                        >
                          <label
                            htmlFor="currentStrategy"
                            className="mb-1.5 block text-sm font-medium text-white"
                          >
                            How are you currently generating customers?
                          </label>
                          <textarea
                            id="currentStrategy"
                            name="currentStrategy"
                            value={currentStrategy}
                            onChange={(e) =>
                              setCurrentStrategy(e.target.value)
                            }
                            rows={6}
                            className={`${inputClass} min-h-[140px] resize-y cursor-text`}
                          />
                        </motion.div>
                      )}

                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          custom={direction}
                          initial={{
                            opacity: 0,
                            x: prefersReduced ? 0 : direction * slideX,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: prefersReduced ? 0 : -direction * slideX,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                        >
                          <label
                            htmlFor="successVision"
                            className="mb-1.5 block text-sm font-medium text-white"
                          >
                            If we knocked it out of the park, what would that
                            mean for your business in 6–12 months?
                          </label>
                          <textarea
                            id="successVision"
                            name="successVision"
                            value={successVision}
                            onChange={(e) => setSuccessVision(e.target.value)}
                            rows={6}
                            className={`${inputClass} min-h-[140px] resize-y cursor-text`}
                          />
                        </motion.div>
                      )}

                      {currentStep === 5 && (
                        <motion.div
                          key="step5"
                          custom={direction}
                          initial={{
                            opacity: 0,
                            x: prefersReduced ? 0 : direction * slideX,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            x: prefersReduced ? 0 : -direction * slideX,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <label
                              htmlFor="service"
                              className="mb-1.5 block text-sm font-medium text-white"
                            >
                              Which service are you most interested in?
                            </label>
                            <select
                              id="service"
                              name="service"
                              required
                              value={service}
                              onChange={(e) => setService(e.target.value)}
                              className={inputClass}
                            >
                              <option value="">
                                Select a service
                              </option>
                              {SERVICES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="optionalMessage"
                              className="mb-1.5 block text-sm font-medium text-white"
                            >
                              Anything else we should know? (optional)
                            </label>
                            <textarea
                              id="optionalMessage"
                              name="optionalMessage"
                              value={optionalMessage}
                              onChange={(e) =>
                                setOptionalMessage(e.target.value)
                              }
                              rows={4}
                              className={`${inputClass} min-h-[100px] resize-y cursor-text`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 flex flex-col gap-6 border-t border-white/[0.06] pt-8">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={goBack}
                            disabled={isSubmitting}
                            className="cursor-pointer text-sm font-medium text-white/40 underline-offset-4 transition-colors hover:text-buzz-coral hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Back
                          </button>
                        ) : (
                          <span className="hidden sm:block" aria-hidden />
                        )}
                      </div>
                      {currentStep < 5 ? (
                        <Button
                          type="button"
                          onClick={goNext}
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending…" : "Submit"}
                        </Button>
                      )}
                    </div>
                    <p className="text-center text-sm text-white/35">
                      Prefer to talk? Call us at{" "}
                      <a
                        href="tel:+17203639754"
                        className="cursor-pointer font-medium text-buzz-coral underline-offset-2 hover:underline"
                      >
                        (720) 363-9754
                      </a>
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { mastermindFormSchema } from "@/lib/mastermind-form-schema";

// TODO: Replace with the real Stripe payment link once the client provides it.
const STRIPE_CHECKOUT_URL = "";

type Status = "idle" | "submitting" | "success" | "error";

export function MastermindRegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const parsed = mastermindFormSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
    });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Please check your info");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/mastermind-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website_url_confirm: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(
          data?.message ??
            "Something went wrong. Please try again or call (720) 363-9754.",
        );
        return;
      }

      setStatus("success");

      if (STRIPE_CHECKOUT_URL) {
        // Brief pause so user sees the success state before redirect.
        setTimeout(() => {
          window.location.href = STRIPE_CHECKOUT_URL;
        }, 900);
      }
    } catch {
      setStatus("error");
      setMessage(
        "Network error. Check your connection and try again, or call (720) 363-9754.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-buzz-dark rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-buzz-coral/15 border border-buzz-coral/40 mb-5">
            <Check className="w-6 h-6 text-buzz-coral" strokeWidth={2.5} />
          </span>
          <h3 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-white mb-3">
            You&apos;re in.
          </h3>
          <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6">
            {STRIPE_CHECKOUT_URL
              ? "Redirecting you to secure checkout to complete your seat reservation..."
              : "We got your info. Someone from The Buzz team will be in touch shortly to confirm your seat and payment."}
          </p>
          {STRIPE_CHECKOUT_URL && (
            <Loader2 className="w-5 h-5 text-buzz-coral animate-spin mx-auto" />
          )}
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl bg-white/[0.04] border border-white/[0.1] px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-buzz-coral/60 focus:bg-white/[0.06] transition-colors";
  const labelCls =
    "block text-[11px] font-bold text-white/70 uppercase tracking-[0.08em] mb-2";

  return (
    <div className="bg-buzz-dark rounded-2xl p-8 md:p-10 relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.1em] mb-2">
          Reserve Your Seat
        </p>
        <h3 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
          Secure your spot.
        </h3>
        <p className="text-white/50 text-sm mb-6">
          Starting at{" "}
          <span className="text-white font-semibold">$250 / seat</span>. Team
          bundles from $750.
        </p>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="mm-first" className={labelCls}>
                First name
              </label>
              <input
                id="mm-first"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={inputCls}
                placeholder="Jane"
              />
            </div>
            <div>
              <label htmlFor="mm-last" className={labelCls}>
                Last name
              </label>
              <input
                id="mm-last"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={inputCls}
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="mm-email" className={labelCls}>
              Email
            </label>
            <input
              id="mm-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputCls}
              placeholder="jane@company.com"
            />
          </div>

          <div>
            <label htmlFor="mm-phone" className={labelCls}>
              Phone
            </label>
            <input
              id="mm-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputCls}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Honeypot — hidden from real users */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="website_url_confirm">
              Leave this field empty
              <input
                id="website_url_confirm"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>

          {status === "error" && message && (
            <p
              role="alert"
              className="rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm px-4 py-3"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-coral text-white text-sm font-semibold rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Continue to Checkout
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-white/40 leading-relaxed">
            We&apos;ll only use your info to confirm your seat. No spam.
          </p>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { mastermindFormSchema } from "@/lib/mastermind-form-schema";
import { getAttributionData } from "@/lib/attribution";
import { normalizePhoneE164, postWithRetry } from "@/lib/form-utils";

const SQUARE_CHECKOUT_URL =
  "https://checkout.square.site/merchant/MLYBDJ7NWR0F5/checkout/W6TQ2UA3RFMMBHGHQBBBUBBJ";

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

    // Honeypot — silently drop bot submissions
    if (honeypot.trim().length > 0) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    // Build PIT-compatible payload: standard fields use snake_case to match
    // the /api/mastermind-register route + GHL fieldKeys. Attribution data
    // is spread in — keys already match GHL fieldKeys 1:1.
    const attribution = getAttributionData();
    const payload = {
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName,
      email: parsed.data.email,
      phone: normalizePhoneE164(parsed.data.phone),
      ...attribution,
      form_page_url:
        typeof window !== "undefined" ? window.location.href : undefined,
    };

    try {
      const res = await postWithRetry("/api/mastermind-register", payload);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(
          data?.error ??
            "Something went wrong. Please try again or call (720) 363-9754.",
        );
        return;
      }

      setStatus("success");
      // Redirect to Square checkout after a short pause so the user sees the
      // confirmation state.
      setTimeout(() => {
        window.location.href = SQUARE_CHECKOUT_URL;
      }, 900);
    } catch {
      setStatus("error");
      setMessage(
        "Network error. Check your connection and try again, or call (720) 363-9754.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-buzz-dark rounded-2xl p-6 md:p-10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-buzz-coral/15 border border-buzz-coral/40 mb-5">
            <Check className="w-6 h-6 text-buzz-coral" strokeWidth={2.5} />
          </span>
          <h3 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-white mb-3">
            You&apos;re in.
          </h3>
          <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6">
            Redirecting you to secure checkout to complete your seat
            reservation...
          </p>
          <Loader2 className="w-5 h-5 text-buzz-coral animate-spin mx-auto" />
          <p className="text-white/40 text-xs mt-4">
            Didn&apos;t redirect?{" "}
            <a
              href={SQUARE_CHECKOUT_URL}
              className="text-buzz-coral hover:underline"
            >
              Click here to continue to checkout
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl bg-white/[0.04] border border-white/[0.1] px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-buzz-coral/60 focus:bg-white/[0.06] transition-colors";
  const labelCls =
    "block text-[11px] font-bold text-white/70 uppercase tracking-[0.08em] mb-2";

  return (
    <div className="bg-buzz-dark rounded-2xl p-6 md:p-10 relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.1em] mb-2">
          Reserve Your Seat
        </p>
        <h3 className="font-[family-name:var(--font-syne-var)] text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
          Secure your spot.
        </h3>
        <p className="text-white/50 text-sm mb-6">
          <span className="text-white font-semibold">$1,795 / seat</span> · Oct
          16, 2026 · Limited seats.
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
            className="group w-full inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-4 bg-gradient-coral text-white text-sm font-semibold whitespace-nowrap rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
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

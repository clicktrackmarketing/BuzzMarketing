"use client";

/**
 * ConsentManager
 *
 * GDPR/CCPA-compliant cookie consent banner with Google Consent Mode v2
 * integration. Gates non-essential tracking (Microsoft Clarity, PearlDiver
 * visitor identification) until the user explicitly accepts.
 *
 * GA4 is allowed to load so pageviews can be counted in aggregate even
 * before consent — but Consent Mode v2 signals denied by default, so GA4
 * only sends cookieless pings until the user accepts. Google specifically
 * supports this pattern as compliant.
 *
 * State machine:
 *   - "idle"      → first visit, banner visible, no tracking beyond cookieless GA4
 *   - "accepted"  → user clicked Accept, all tracking granted
 *   - "rejected"  → user clicked Reject, only essential cookies allowed
 *
 * Choice persists in localStorage (buzz_cookie_consent_v1) and survives
 * page reloads. User can revisit the choice via the Cookie Preferences
 * link in the footer (TODO: wire that link once the banner ships).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "buzz_cookie_consent_v1";
type ConsentStatus = "idle" | "accepted" | "rejected";

// Globals `window.gtag`, `window.clarity`, and `window.dataLayer` are
// already declared elsewhere in the project (RouteChangeTracker.tsx) —
// we rely on that shared declaration and don't re-declare here.

/**
 * Grant full tracking consent to Google Consent Mode v2. Called after
 * the user clicks Accept, or on page load if the user previously accepted.
 */
function grantGoogleConsent() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // Use dataLayer.push directly — gtag() may not be defined yet if the
  // GA4 script is still loading when we're called.
  w.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
    },
  ]);
}

/**
 * Load Microsoft Clarity only after consent. Clarity is not called via
 * Consent Mode; instead we inject the script tag here so it doesn't run
 * at all for users who reject.
 */
function loadClarity() {
  if (typeof window === "undefined") return;
  if (window.clarity) return; // already loaded

  // Standard Clarity snippet with project ID wct5lcfcpc
  const w = window as Window & {
    clarity?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  };
  const clarityFn = function (...args: unknown[]) {
    (clarityFn.q = clarityFn.q || []).push(args);
  } as ((...args: unknown[]) => void) & { q?: unknown[] };
  w.clarity = clarityFn;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.clarity.ms/tag/wct5lcfcpc";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(s, firstScript);
}

/**
 * Load PearlDiver visitor identification. Like Clarity, gated fully —
 * the script is only injected for users who accept.
 */
function loadPearlDiver() {
  if (typeof window === "undefined") return;
  if (document.querySelector('script[src*="clicktrackmarketing.com/ldc.js"]')) {
    return; // already loaded
  }
  const s = document.createElement("script");
  s.async = true;
  s.src =
    "https://tag.clicktrackmarketing.com/ldc.js?pid=1cca4737c771f3757afbe5c4644eb68a&aid=16de03f2";
  document.head.appendChild(s);
}

function activateTracking() {
  grantGoogleConsent();
  loadClarity();
  loadPearlDiver();
}

export function ConsentManager() {
  const [status, setStatus] = useState<ConsentStatus>("idle");
  const [mounted, setMounted] = useState(false);

  // Read persisted consent on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted") {
        setStatus("accepted");
        activateTracking();
      } else if (stored === "rejected") {
        setStatus("rejected");
      }
    } catch {
      // localStorage unavailable — leave as idle, banner will show
    }
  }, []);

  function acceptAll() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setStatus("accepted");
    activateTracking();
  }

  function rejectAll() {
    try {
      localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {
      /* ignore */
    }
    setStatus("rejected");
    // No scripts loaded; Consent Mode defaults remain denied.
  }

  // Hide the banner before hydration finishes to prevent SSR/CSR mismatch
  // and before a choice has been read from localStorage.
  if (!mounted) return null;
  if (status !== "idle") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[60] md:inset-x-auto md:bottom-6 md:right-6 md:max-w-md"
    >
      <div className="bg-buzz-dark text-white border-t border-white/[0.08] md:border md:rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative p-5 md:p-6">
          <button
            type="button"
            onClick={rejectAll}
            aria-label="Reject non-essential cookies and close"
            className="absolute top-3 right-3 w-8 h-8 inline-flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <p
            id="cookie-consent-description"
            className="text-[11px] font-bold text-buzz-coral uppercase tracking-[0.1em] mb-2"
          >
            Your Privacy
          </p>
          <h2 className="font-[family-name:var(--font-syne-var)] text-lg md:text-xl font-bold text-white mb-2 leading-snug">
            We use cookies to improve your experience.
          </h2>
          <p className="text-white/55 text-sm leading-relaxed mb-5 pr-6">
            We use analytics and session-recording tools (Google Analytics,
            Microsoft Clarity, and visitor identification) to understand how
            our site is used.{" "}
            <Link
              href="/privacy"
              className="text-buzz-coral hover:underline font-medium"
            >
              See our privacy policy
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-coral text-white text-sm font-semibold rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.02] active:scale-[0.98]"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/15 bg-white/[0.03] text-white/80 text-sm font-semibold rounded-full cursor-pointer transition-all hover:border-white/30 hover:text-white hover:bg-white/[0.06]"
            >
              Reject non-essential
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

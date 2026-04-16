"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GtagFn = (
  command: "config" | "event" | "js" | "set",
  targetId: string,
  params?: Record<string, unknown>
) => void;

type ClarityFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    clarity?: ClarityFn;
  }
}

/**
 * Fires a virtual page_view to GA4 and tells Microsoft Clarity to start a
 * new recording boundary every time the app-router pathname or query string
 * changes. Without this, SPAs under-report pageviews because the initial
 * gtag('config') only fires once on hard load.
 */
export function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const path = queryString ? `${pathname}?${queryString}` : pathname;
    const url = `https://thebuzzmarketingco.com${path}`;

    if (typeof window.gtag === "function") {
      window.gtag("config", "G-CT9KHYS5SC", {
        page_path: path,
        page_location: url,
      });
      window.gtag("event", "page_view", {
        page_path: path,
        page_location: url,
      });
    }

    if (typeof window.clarity === "function") {
      window.clarity("set", "page", path);
    }
  }, [pathname, searchParams]);

  return null;
}

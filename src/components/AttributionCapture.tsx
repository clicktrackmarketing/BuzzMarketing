"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/**
 * Invisible component. Runs captureAttribution() on every route change so
 * localStorage reflects the latest first/last-touch + classified channel.
 * Mount once in app/layout.tsx (or a top-level provider).
 *
 *   <AttributionCapture />
 *
 * Returns null — no visible output.
 */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    // Intentionally include pathname so SPA navigations re-capture
  }, [pathname]);

  return null;
}

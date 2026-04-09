"use client";

import dynamic from "next/dynamic";

/**
 * Client-only petals overlay. `ssr: false` must live in a Client Component (not in layout).
 */
export const FloatingPetals = dynamic(
  () => import("./FloatingPetalsInner").then((mod) => mod.FloatingPetalsInner),
  { ssr: false },
);

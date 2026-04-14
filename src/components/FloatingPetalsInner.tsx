"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Deterministic pseudo-random float in [0, 1) from an integer seed. */
function seeded(seed: number): number {
  return ((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;
}

const PETALS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  size: 6 + seeded(i) * 8,
  x: seeded(i + 17) * 100,
  delay: i * 0.8 + seeded(i + 31) * 2,
  duration: 8 + seeded(i + 47) * 6,
  hue: seeded(i + 59) > 0.5 ? 14 : 330,
  opacity: 0.12 + seeded(i + 71) * 0.08,
}));

/**
 * Floating organic petal shapes that drift down the page.
 * Subtle feminine touch - thin, transparent, and slow-moving.
 * Loaded with `dynamic(..., { ssr: false })` from FloatingPetals.tsx.
 * First paint returns null so the client matches the server (no petal markup) before mount.
 */
export function FloatingPetalsInner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            left: `${p.x}%`,
            top: "-20px",
            background: `hsl(${p.hue} 70% 70% / ${p.opacity})`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: `blur(${p.size > 10 ? 1 : 0}px)`,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, Math.sin(p.id) * 40, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

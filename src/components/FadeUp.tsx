"use client";

import { motion, useReducedMotion } from "framer-motion";

type FadeVariant = "up" | "down" | "left" | "right" | "scale" | "blur";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: FadeVariant;
  duration?: number;
}

const VARIANTS: Record<FadeVariant, { opacity: number; y?: number; x?: number; scale?: number; filter?: string }> = {
  up: { opacity: 0, y: 40 },
  down: { opacity: 0, y: -40 },
  left: { opacity: 0, x: 60 },
  right: { opacity: 0, x: -60 },
  scale: { opacity: 0, scale: 0.9 },
  blur: { opacity: 0, filter: "blur(10px)" },
};

export function FadeUp({
  children,
  delay = 0,
  className,
  variant = "up",
  duration = 0.7,
}: FadeUpProps) {
  const prefersReduced = useReducedMotion();
  const initial = VARIANTS[variant];

  return (
    <motion.div
      initial={prefersReduced ? {} : initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

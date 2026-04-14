"use client";

import { motion, useReducedMotion } from "framer-motion";

interface HeroTextEffectProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Kinetic letter-stagger entrance for the hero headline accent text.
 * Each character drops in individually, then the whole text gets a
 * slow-cycling aurora gradient (coral → violet → rose → coral).
 */
export function HeroTextEffect({
  text,
  className = "",
  delay = 0,
}: HeroTextEffectProps) {
  const prefersReduced = useReducedMotion();
  const characters = text.split("");

  if (prefersReduced) {
    return <span className={`text-gradient-coral ${className}`}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block text-aurora"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          initial={{
            y: "120%",
            rotateX: -80,
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={{
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

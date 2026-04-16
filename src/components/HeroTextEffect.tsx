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
  const words = text.split(" ");

  if (prefersReduced) {
    return <span className={`text-gradient-coral ${className}`}>{text}</span>;
  }

  let charIndex = 0;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => {
        const chars = word.split("");
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {chars.map((char) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={i}
                  className="inline-block text-aurora"
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
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">{"\u00A0"}</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

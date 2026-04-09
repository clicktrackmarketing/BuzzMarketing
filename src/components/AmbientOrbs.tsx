"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Orb {
  color: "coral" | "violet" | "gold" | "rose";
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

interface AmbientOrbsProps {
  orbs?: Orb[];
  className?: string;
}

const COLOR_MAP = {
  coral: "hsla(14, 100%, 58%, 0.12)",
  violet: "hsla(270, 60%, 55%, 0.1)",
  gold: "hsla(38, 70%, 50%, 0.08)",
  rose: "hsla(330, 70%, 60%, 0.1)",
};

const DEFAULT_ORBS: Orb[] = [
  { color: "coral", size: 500, top: "10%", left: "15%", delay: 0 },
  { color: "violet", size: 400, top: "60%", right: "10%", delay: 2 },
  { color: "gold", size: 300, bottom: "20%", left: "50%", delay: 4 },
];

export function AmbientOrbs({ orbs = DEFAULT_ORBS, className = "" }: AmbientOrbsProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size || 400,
            height: orb.size || 400,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${COLOR_MAP[orb.color]} 0%, transparent 70%)`,
            filter: "blur(80px)",
            willChange: prefersReduced ? "auto" : "transform",
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, 30, -20, 15, 0],
                  y: [0, -25, 15, -10, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1],
                }
          }
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay || 0,
          }}
        />
      ))}
    </div>
  );
}

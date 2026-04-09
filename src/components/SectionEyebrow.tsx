"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionEyebrowProps {
  children: React.ReactNode;
  light?: boolean;
  pulse?: boolean;
  center?: boolean;
}

export function SectionEyebrow({ children, light, pulse, center }: SectionEyebrowProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}
    >
      <motion.span
        initial={prefersReduced ? {} : { width: 0 }}
        whileInView={{ width: 28 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`h-[2px] rounded-full ${light ? "bg-white/25" : "bg-buzz-coral/50"}`}
      />
      {pulse && (
        <span className="w-2 h-2 rounded-full bg-buzz-coral animate-[pulse-dot_2s_ease-in-out_infinite]" />
      )}
      <span
        className={`text-[0.7rem] font-semibold tracking-[0.2em] uppercase font-[family-name:var(--font-dm-sans-var)] ${
          light ? "text-white/50" : "text-buzz-coral"
        }`}
      >
        {children}
      </span>
    </motion.div>
  );
}

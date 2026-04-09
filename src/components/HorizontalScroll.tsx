"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing px-6 md:px-8 py-4"
        drag={prefersReduced ? false : "x"}
        dragConstraints={scrollRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  glowColor?: string;
}

export function GlowCard({
  children,
  className = "",
  variant = "light",
  glowColor = "hsla(14, 100%, 58%, 0.15)",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseStyles =
    variant === "dark"
      ? "bg-white/[0.03] border border-white/[0.08]"
      : "bg-white/90 border border-buzz-border";

  const hoverStyles =
    variant === "dark"
      ? "hover:border-white/[0.15] hover:bg-white/[0.05]"
      : "hover:border-buzz-coral/20 hover:shadow-card-hover";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileHover={prefersReduced ? {} : { y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${baseStyles} ${hoverStyles} ${className}`}
    >
      {/* Mouse spotlight */}
      {!prefersReduced && hovering && (
        <div
          className="pointer-events-none absolute z-0 transition-opacity duration-300"
          style={{
            width: 300,
            height: 300,
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: hovering ? 1 : 0,
          }}
        />
      )}
      <div className="relative z-10 h-full min-h-0">{children}</div>
    </motion.div>
  );
}

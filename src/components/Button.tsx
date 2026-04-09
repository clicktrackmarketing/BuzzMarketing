"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "glow";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  arrow?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  arrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all cursor-pointer";

  const variants = {
    primary:
      "px-7 py-3.5 bg-gradient-coral text-white shadow-luxury hover:shadow-glow-coral",
    ghost:
      "px-7 py-3.5 border border-current bg-transparent hover:bg-white/5",
    glow:
      "px-8 py-4 bg-gradient-coral text-white shadow-glow-coral hover:shadow-[0_0_60px_-8px_hsla(14,100%,58%,0.5)]",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.04, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
    whileTap: { scale: 0.97 },
  };

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block group">
        <Link href={href} className={cls}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      type={type}
      className={`group ${cls}`}
    >
      {content}
    </motion.button>
  );
}

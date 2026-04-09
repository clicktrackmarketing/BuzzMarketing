"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function TextShimmer({
  children,
  className = "",
  as: Tag = "span",
}: TextShimmerProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Tag className={`text-gradient-coral ${className}`}>{children}</Tag>;
  }

  return (
    <Tag className={`text-shimmer ${className}`}>
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Subtle sparkle cursor trail — adds tiny ✦ particles on mouse move.
 * Uses vanilla DOM for performance. Auto-cleans up.
 */
export function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef(0);

  const spawn = useCallback((x: number, y: number) => {
    const el = document.createElement("span");
    const size = Math.random() * 6 + 4;
    const hue = Math.random() > 0.5 ? 14 : 330; // coral or rose

    Object.assign(el.style, {
      position: "fixed",
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      pointerEvents: "none",
      zIndex: "9999",
      borderRadius: "50%",
      background: `hsl(${hue} 80% 70% / 0.7)`,
      boxShadow: `0 0 ${size}px hsl(${hue} 80% 70% / 0.4)`,
      transform: "scale(1)",
      transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    });

    containerRef.current?.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `scale(0) translateY(-${12 + Math.random() * 16}px)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 650);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - throttleRef.current < 50) return; // throttle to ~20fps
      throttleRef.current = now;
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [spawn]);

  return <div ref={containerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" />;
}

"use client";

import { useReducedMotion } from "framer-motion";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  /** How many identical segments in the track. More segments = wider strip (no empty gap on large viewports). */
  segments?: number;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  segments = 6,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  const prefersReduced = useReducedMotion();
  const safeSegments = prefersReduced
    ? 1
    : Math.max(2, Math.round(segments));

  const animationClass = reverse
    ? "animate-[marquee-reverse_var(--speed)_linear_infinite]"
    : "animate-[marquee_var(--speed)_linear_infinite]";

  return (
    <div
      className={`marquee-container ${className}`}
      style={{ ["--speed" as string]: `${speed}s` }}
    >
      <div
        className={`flex w-max flex-nowrap ${
          prefersReduced ? "" : animationClass
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={
          !prefersReduced
            ? {
                animationDuration: `${speed}s`,
                ["--marquee-segments" as string]: String(safeSegments),
              }
            : undefined
        }
      >
        {Array.from({ length: safeSegments }, (_, i) => (
          <div
            key={i}
            className="flex shrink-0"
            aria-hidden={i > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useReducedMotion } from "framer-motion";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  const prefersReduced = useReducedMotion();

  const animationClass = reverse
    ? "animate-[marquee-reverse_var(--speed)_linear_infinite]"
    : "animate-[marquee_var(--speed)_linear_infinite]";

  return (
    <div
      className={`marquee-container ${className}`}
      style={{ ["--speed" as string]: `${speed}s` }}
    >
      <div
        className={`flex w-max ${
          prefersReduced ? "" : animationClass
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={
          !prefersReduced
            ? { animationDuration: `${speed}s` }
            : undefined
        }
      >
        {children}
        {/* Duplicate for seamless loop */}
        <div aria-hidden="true" className="flex">
          {children}
        </div>
      </div>
    </div>
  );
}

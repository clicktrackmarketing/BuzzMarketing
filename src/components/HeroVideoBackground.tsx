"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type HeroVideoBackgroundProps = {
  className?: string;
  /** Applied to the video or fallback image (e.g. `object-cover opacity-35`). */
  mediaClassName?: string;
};

/**
 * Full-bleed looping hero video with poster frame. Falls back to static image when
 * the user prefers reduced motion.
 */
export function HeroVideoBackground({
  className = "absolute inset-0",
  mediaClassName = "object-cover",
}: HeroVideoBackgroundProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={`${className} pointer-events-none`}>
        <div className="relative h-full min-h-full w-full">
          <Image
            src="/hero-sd.jpeg"
            alt=""
            fill
            priority
            className={mediaClassName}
            sizes="100vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} pointer-events-none overflow-hidden`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-sd.jpeg"
        aria-hidden
        className={`absolute inset-0 h-full w-full ${mediaClassName}`}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

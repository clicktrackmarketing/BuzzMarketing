import Image from "next/image";

type HeroVideoBackgroundProps = {
  className?: string;
  /** Applied to the hero image (e.g. `object-cover opacity-35`). */
  mediaClassName?: string;
};

/**
 * Full-bleed static hero image (San Diego). Used behind gradients on home, about, contact, and interior heroes.
 */
export function HeroVideoBackground({
  className = "absolute inset-0",
  mediaClassName = "object-cover",
}: HeroVideoBackgroundProps) {
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

import { HeroVideoBackground } from "@/components/HeroVideoBackground";

/** San Diego hero video + tint for interior page heroes (matches home / about). */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <HeroVideoBackground mediaClassName="object-cover opacity-[0.2]" />
      <div className="absolute inset-0 bg-foreground/94" />
    </div>
  );
}

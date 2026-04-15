import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-buzz-dark">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-buzz-coral mb-4">
        404 — Page Not Found
      </p>
      <h1 className="font-[family-name:var(--font-syne-var)] text-3xl md:text-5xl font-bold text-white mb-6">
        This page doesn&apos;t exist
      </h1>
      <p className="text-white/50 max-w-md mb-10">
        The page you&apos;re looking for may have moved or no longer exists.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-coral text-white text-sm font-semibold rounded-full shadow-luxury hover:shadow-glow-coral hover:scale-[1.03] active:scale-[0.97] transition-all"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 bg-white/[0.04] text-white text-sm font-semibold rounded-full hover:bg-white/[0.08] transition-all"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}

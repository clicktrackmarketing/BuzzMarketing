"use client";

import Link from "next/link";
import { Phone, MessageSquare, CalendarCheck } from "lucide-react";

/**
 * Sticky bottom conversion bar for mobile viewports. Hidden on md+.
 * Pair with a <div className="h-14 md:hidden" /> spacer at the bottom
 * of the page shell so the fixed bar doesn't cover footer content.
 */
export function MobileCTABar() {
  return (
    <nav
      aria-label="Quick contact"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-buzz-dark/95 backdrop-blur-md"
    >
      <a
        href="tel:+17203639754"
        aria-label="Call The Buzz Marketing Co at 720-363-9754"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-white/80 active:text-buzz-coral outline-none focus-visible:ring-2 focus-visible:ring-buzz-coral/60"
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        <span className="text-[11px] font-semibold tracking-wide">Call</span>
      </a>
      <a
        href="sms:+17203639754"
        aria-label="Text The Buzz Marketing Co"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-white/80 active:text-buzz-coral outline-none focus-visible:ring-2 focus-visible:ring-buzz-coral/60"
      >
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
        <span className="text-[11px] font-semibold tracking-wide">Text</span>
      </a>
      <Link
        href="/free-analysis"
        aria-label="Request a free digital analysis"
        className="flex flex-col items-center justify-center gap-1 py-2.5 bg-gradient-coral text-white outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <CalendarCheck className="w-4 h-4" aria-hidden="true" />
        <span className="text-[11px] font-semibold tracking-wide">Free Quote</span>
      </Link>
    </nav>
  );
}

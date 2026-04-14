"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { FadeUp } from "./FadeUp";
import { AmbientOrbs } from "./AmbientOrbs";

const SERVICE_LINKS = [
  { href: "/services", label: "Strategy + Creative Direction" },
  { href: "/services", label: "Social Media Management" },
  { href: "/services", label: "Signature Content Shoot" },
  { href: "/services", label: "Website + Conversion Optimization" },
  { href: "/services", label: "Google + Local Presence" },
  { href: "/services", label: "Branding + Positioning" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/testimonials-results-roi", label: "Results" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

const RESOURCE_LINKS = [
  { href: "/digital-marketing-blog", label: "Blog" },
  { href: "/digital-marketing-sd", label: "San Diego Marketing" },
];

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
    </svg>
  );
}

function LiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  );
}

function YtIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram", icon: IgIcon },
  { href: "https://facebook.com", label: "Facebook", icon: FbIcon },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LiIcon },
  { href: "https://youtube.com", label: "YouTube", icon: YtIcon },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-buzz-dark text-white relative overflow-hidden">
      <div className="coral-divider" />

      <AmbientOrbs
        orbs={[
          { color: "coral", size: 350, bottom: "10%", left: "5%", delay: 0 },
          { color: "violet", size: 250, top: "20%", right: "10%", delay: 3 },
        ]}
      />

      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <FadeUp variant="up" className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="The Buzz Marketing Co"
                width={200}
                height={48}
                className="h-10 w-auto max-w-[200px] object-contain object-left mix-blend-screen opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="mt-5 text-white/50 text-sm leading-relaxed max-w-sm">
              San Diego&apos;s premier social media marketing agency. Building
              brands, growing audiences, driving revenue.
            </p>
            <a
              href="tel:7203639754"
              className="inline-flex items-center gap-2 mt-6 text-buzz-coral font-medium text-sm hover:underline cursor-pointer group"
            >
              (720) 363-9754
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeUp>

          <FadeUp variant="up" delay={0.1}>
            <h4 className="font-[family-name:var(--font-dm-sans-var)] text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp variant="up" delay={0.15}>
            <h4 className="font-[family-name:var(--font-dm-sans-var)] text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp variant="up" delay={0.2}>
            <h4 className="font-[family-name:var(--font-dm-sans-var)] text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-[family-name:var(--font-dm-sans-var)] text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-white/30 mb-5 mt-8">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/35 hover:text-buzz-coral hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="coral-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>&copy; {new Date().getFullYear()} The Buzz Marketing Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>San Diego, California</p>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-buzz-coral hover:bg-white/[0.08] transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

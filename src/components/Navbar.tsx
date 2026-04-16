"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/digital-marketing-sd", label: "Results" },
  { href: "/events", label: "Events" },
  { href: "/digital-marketing-blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < 300 || y < lastScroll.current);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isHero = pathname === "/";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: visible ? 0 : -120 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed z-50 transition-all duration-500 ${
          scrolled
            ? "top-3 left-3 right-3 rounded-2xl bg-buzz-dark/80 glassmorphism border border-white/[0.08] shadow-elevated"
            : isHero
              ? "top-0 left-0 right-0 bg-transparent"
              : "top-0 left-0 right-0 bg-buzz-dark/95 glassmorphism"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 h-[64px] md:h-[72px] flex items-center justify-between">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-buzz-coral/60 focus-visible:ring-offset-2 focus-visible:ring-offset-buzz-dark rounded-lg"
          >
            <span className="font-[family-name:var(--font-syne-var)] text-[15px] font-bold leading-tight tracking-tight text-white sm:text-base md:text-lg">
              The Buzz Marketing Co
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors cursor-pointer rounded-lg ${
                    active
                      ? "text-white"
                      : "text-white/55 hover:text-white/90"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-lg"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:7203639754"
              className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-xs font-medium transition-colors"
              aria-label="Call (720) 363-9754"
            >
              <Phone className="w-3.5 h-3.5" />
              (720) 363-9754
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-coral text-white text-sm font-semibold rounded-full shadow-luxury cursor-pointer transition-all hover:shadow-glow-coral hover:scale-[1.03] active:scale-[0.97]"
            >
              <Sparkles className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              Book a Call
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center cursor-pointer text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-coral rounded-full"
          style={{ width: progressWidth }}
        />
      </motion.header>

      {/* Mobile menu - full-screen with stagger */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-buzz-dark flex flex-col"
          >
            <div className="ambient-glow-coral top-10 -left-20 opacity-20" />
            <div className="ambient-glow-violet bottom-20 -right-10 opacity-15" />

            <nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              className="relative z-10 flex flex-col items-start gap-2 px-8 pt-24 pb-8 flex-1"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={`flex items-center justify-between py-3 border-b border-white/[0.06] text-2xl font-bold font-[family-name:var(--font-syne-var)] cursor-pointer transition-colors ${
                      pathname === link.href
                        ? "text-buzz-coral"
                        : "text-white/70 hover:text-white active:text-buzz-coral"
                    }`}
                  >
                    <span>{link.label}</span>
                    {pathname === link.href && (
                      <span className="w-2 h-2 rounded-full bg-buzz-coral animate-pulse" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.35 }}
                className="mt-auto pt-8 w-full"
              >
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-coral text-white text-lg font-semibold rounded-2xl shadow-luxury cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Book a Discovery Call
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <p className="text-center text-white/65 text-xs mt-4">
                  Women-Founded · San Diego&apos;s Premier Agency
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

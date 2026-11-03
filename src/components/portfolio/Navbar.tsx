"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  Menu,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

import adilImage from "../../img/adil.png";

// Navigation links
const links = [
  { href: "#home", label: "Home", icon: House },
  { href: "#about", label: "About", icon: UserRound },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  const closeMenu = () => setOpen(false);

  // Scroll progress bar + scrolled state
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 20);
  });

  // Je section screen e ache seta highlight korbe
  useEffect(() => {
    const elements = links
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-white/10 bg-slate-950/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "border-transparent bg-slate-950/20 backdrop-blur-md"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-300 md:px-6 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo and Profile Image */}
        <a
          href="#home"
          onClick={() => {
            setActive("#home");
            closeMenu();
          }}
          aria-label="Mahedi Hasan - Home"
          className="group flex items-center gap-3 text-lg font-bold tracking-tight text-white"
        >
          {/* Avatar (spinning ring + online dot) */}
          <motion.span
            initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.3 }}
            whileHover={reduceMotion ? undefined : { scale: 1.12, rotate: -6 }}
            className="relative block h-10 w-10 shrink-0"
          >
            {/* Glow */}
            <motion.span
              aria-hidden="true"
              animate={
                reduceMotion ? undefined : { opacity: [0.4, 0.9, 0.4], scale: [1, 1.25, 1] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500/50 to-cyan-400/50 blur-md"
            />

            {/* Spinning gradient ring */}
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[3px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #22d3ee, transparent 55%, #8b5cf6)",
              }}
            />

            {/* Image */}
            <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-slate-950 bg-slate-900">
              <img
                src={adilImage}
                alt="Mahedi Hasan"
                width={40}
                height={40}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </span>

            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </span>
          </motion.span>

          {/* Name */}
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            MAHEDI HASAN{" "}
            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-violet-400"
            >
              .
            </motion.span>
          </motion.span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map(({ href, label, icon: Icon }, index) => {
            const isActive = active === href;

            return (
              <motion.a
                key={href}
                href={href}
                onClick={() => setActive(href)}
                initial={reduceMotion ? false : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.07, duration: 0.5 }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className={`group relative isolate inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {/* Sliding active pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full border border-violet-400/30 bg-violet-500/15 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                  />
                )}

                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                />
                {label}
              </motion.a>
            );
          })}

          {/* CTA button (pulse ring + shine) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.35 + links.length * 0.07,
              type: "spring",
              stiffness: 240,
              damping: 14,
            }}
            className="relative ml-4"
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.25], opacity: [0.55, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-violet-400"
              />
            )}

            <motion.a
              href="#contact"
              onClick={() => setActive("#contact")}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className="group relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-600/40"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[400%]"
              />
              <span className="relative">Contact Me</span>
            </motion.a>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          whileTap={reduceMotion ? undefined : { scale: 0.88 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={reduceMotion ? false : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="px-4 py-4">
              {links.map(({ href, label, icon: Icon }, index) => {
                const isActive = active === href;

                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => {
                      setActive(href);
                      closeMenu();
                    }}
                    initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.06, duration: 0.4 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                      isActive
                        ? "border border-violet-400/30 bg-violet-500/15 text-white"
                        : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {label}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                onClick={() => {
                  setActive("#contact");
                  closeMenu();
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.06, duration: 0.4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      )}
    </motion.header>
  );
}
"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import adilImage from "../../img/adil.png";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/borakcomputer",
    icon: Github,
    color: "#ffffff",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
    color: "#0A66C2",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mdmahedihasan.adil.3",
    icon: Facebook,
    color: "#0866FF",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mdmahedihasanadil/",
    icon: Instagram,
    color: "#E4405F",
  },
  {
    label: "WhatsApp",
    // Country code (880) soho number dite hoy, shuru te 0 thakbe na
    href: "https://wa.me/8801949853773",
    icon: MessageCircle,
    color: "#25D366",
  },
];

// Profile card er rotating designation
const roles = ["Web Developer", "E-Commerce Builder", "Frontend Developer"];

// =====================================
// ANIMATION VARIANTS
// =====================================

const ease = [0.22, 1, 0.36, 1];

const leftContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// Heading line (niche theke mask kore uthe ashe)
const lineReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease } },
};

const socialContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const socialPop = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

// Heading er 3rd line (letter by letter)
const charContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.9 } },
};

const charVariant = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.35, ease } },
};

const underlineVariant = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease } },
};

const cursorAppear = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const sentence = [
  { text: "I" },
  { text: "build" },
  { text: "websites", underline: true },
  { text: "that" },
  { text: "work." },
];

// =====================================
// TYPED HEADING LINE
// =====================================

function TypedLine({ reduceMotion }) {
  if (reduceMotion) {
    return <span className="block text-white">I build websites that work.</span>;
  }

  return (
    <span className="block text-white" aria-label="I build websites that work.">
      <motion.span aria-hidden="true" variants={charContainer} className="block">
        {sentence.map((word, wi) => (
          <span key={wi} className="relative mr-[0.25em] inline-block whitespace-nowrap">
            {word.text.split("").map((char, ci) => (
              <motion.span key={ci} variants={charVariant} className="inline-block">
                {char}
              </motion.span>
            ))}

            {word.underline && (
              <motion.span
                variants={underlineVariant}
                style={{ originX: 0 }}
                className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400"
              />
            )}
          </span>
        ))}

        {/* Blinking cursor */}
        <motion.span variants={cursorAppear} className="inline-block">
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-violet-400"
          />
        </motion.span>
      </motion.span>
    </span>
  );
}

// =====================================
// ROTATING ROLE TEXT
// =====================================

function RotatingRole({ reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <span className="relative mt-1 block h-5 overflow-hidden text-sm text-slate-300">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={reduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// =====================================
// HERO
// =====================================

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? false : "hidden";

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-slate-950"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* Browser prothom ta try kore, na pele porer ta */}
          <source src="/hero-bg.mp4" type="video/mp4" />
          <source src="/hero-bg.mp4.mp4" type="video/mp4" />
        </motion.video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/30" />

        {/* Left Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30" />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      {/* Background Glow (slowly moving) */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-20 -z-0 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]"
      />

      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 bottom-10 -z-0 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2 md:px-6">
        {/* Left Side */}
        <motion.div
          variants={leftContainer}
          initial={initialState}
          animate="show"
          className="text-left"
        >
          {/* Location */}
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md"
          >
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex"
            >
              <MapPin className="h-4 w-4 text-violet-400" />
            </motion.span>
            Based in Bangladesh
          </motion.p>

          {/* Heading (line reveal + waving hand + glowing name + typed line) */}
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} className="block">
                Hi,{" "}
                <motion.span
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { rotate: [0, 18, -8, 18, -4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    delay: 1.2,
                    ease: "easeInOut",
                  }}
                  style={{ originX: 0.7, originY: 0.7 }}
                  className="inline-block"
                >
                  👋
                </motion.span>
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} className="block">
                I'm{" "}
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          filter: [
                            "drop-shadow(0 0 0px rgba(139,92,246,0))",
                            "drop-shadow(0 0 16px rgba(139,92,246,0.65))",
                            "drop-shadow(0 0 0px rgba(139,92,246,0))",
                          ],
                        }
                  }
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% 100%" }}
                  className="inline-block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  MAHEDI
                </motion.span>{" "}
                HASAN
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1">
              <TypedLine reduceMotion={reduceMotion} />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            A web developer with a diploma in hand and a passion for clean,
            fast, modern websites — from e-commerce stores to business pages.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-start gap-4"
          >
            {/* Primary button (pulse ring + shine) */}
            <div className="relative">
              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.18], opacity: [0.55, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-violet-400"
                />
              )}

              <motion.a
                href="#projects"
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-600/40"
              >
                {/* Shine */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[400%]"
                />
                <span className="relative">View My Work</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>

            <motion.a
              href="#contact"
              whileHover={reduceMotion ? undefined : { y: -4 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Links (pop in one by one) */}
          <motion.div
            variants={socialContainer}
            className="mt-8 flex flex-wrap items-center justify-start gap-3"
          >
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <motion.a
                key={label}
                variants={socialPop}
                whileHover={reduceMotion ? undefined : { y: -6, scale: 1.12 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                style={{ color }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-md backdrop-blur-md transition-colors duration-300 hover:border-white/50 hover:bg-white/20"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Profile */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* Floating wrapper */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Profile Glow (pulse) */}
            <motion.div
              animate={
                reduceMotion ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-5 rounded-full bg-gradient-to-r from-violet-600/30 to-blue-500/30 blur-3xl"
            />

            {/* Profile Card */}
            <div className="relative flex aspect-square items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md transition-colors duration-500 hover:border-violet-400/40">
              <div>
                {/* Profile Image (spinning gradient ring) */}
                <div className="relative mx-auto h-44 w-44 sm:h-48 sm:w-48 md:h-52 md:w-52">
                  <motion.div
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1.5 rounded-full opacity-90"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #22d3ee, transparent 55%, #8b5cf6)",
                    }}
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-slate-950 bg-slate-900 shadow-xl shadow-violet-500/20">
                    <img
                      src={adilImage}
                      alt="Mahedi Hasan"
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <p className="mt-5 text-xl font-bold text-white">Mahedi Hasan</p>

                {/* Designation (rotating) */}
                <RotatingRole reduceMotion={reduceMotion} />

                {/* Accent Line (grows and shrinks) */}
                <motion.div
                  animate={reduceMotion ? undefined : { width: [32, 80, 32] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 64 }}
                  className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex">
        <motion.a
          href="#about"
          aria-label="Scroll down"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="pointer-events-auto flex h-10 w-6 justify-center rounded-full border-2 border-white/40 pt-2"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </motion.a>
      </div>
    </section>
  );
}
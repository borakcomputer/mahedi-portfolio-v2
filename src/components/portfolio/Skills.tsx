"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Database, Layout, Smartphone, ArrowUpRight, Terminal } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

// =====================================
// SKILLS DATA
// =====================================

const skills = [
  {
    icon: Code2,
    name: "Frontend",
    number: "01",
    file: "frontend.tsx",
    description: "Building beautiful and interactive user interfaces.",
    color: "#22FF88",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    icon: Layout,
    name: "UI Design",
    number: "02",
    file: "ui-design.css",
    description: "Designing clean, modern and responsive experiences.",
    color: "#2DE6B4",
    items: ["Tailwind CSS", "Responsive Design", "Figma"],
  },
  {
    icon: Database,
    name: "Backend",
    number: "03",
    file: "server.js",
    description: "Creating powerful server-side applications.",
    color: "#7CFF5B",
    items: ["Node.js", "REST APIs", "Databases"],
  },
  {
    icon: Smartphone,
    name: "Tools",
    number: "04",
    file: "workflow.sh",
    description: "Tools that help me build and ship projects.",
    color: "#35F0D0",
    items: ["Git & GitHub", "VS Code", "Deployment"],
  },
];

// =====================================
// COUNT UP (numbers count from 0)
// =====================================

function CountUp({ to, start, reduceMotion }: { to: number; start: boolean; reduceMotion: boolean | null }) {
  const [value, setValue] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (!start || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, to, reduceMotion]);

  return <>{String(value).padStart(2, "0")}</>;
}

// =====================================
// TITLE WORD ANIMATION
// =====================================

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const titleWord = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// =====================================
// SKILL CARD
// =====================================

function SkillCard({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  const Icon = skill.icon;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 60, scale: 0.92, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transformPerspective: 900 }}
      className="group relative h-full"
    >
      <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_45px_rgba(34,255,136,0.18)]">
        {/* Scan line (hover korle upor theke niche jay) */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ top: "0%", opacity: 0 }}
            animate={
              hovered
                ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }
                : { top: "0%", opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "linear" }}
            className="pointer-events-none absolute left-0 z-20 h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
              boxShadow: `0 0 12px ${skill.color}`,
            }}
          />
        )}

        {/* Terminal title bar */}
        <div className="relative flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <span className="font-mono text-[11px] text-slate-500 transition-colors duration-300 group-hover:text-emerald-300">
            {skill.file}
          </span>
        </div>

        {/* Glow decoration */}
        <div
          className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-25"
          style={{ backgroundColor: skill.color }}
        />

        <div className="relative flex flex-1 flex-col p-6 md:p-7">
          {/* Top section */}
          <div className="flex items-center justify-between">
            {/* Icon (floating + pulse ring) */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.1 }}
                transition={{ duration: 0.35 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border"
                style={{
                  backgroundColor: `${skill.color}14`,
                  borderColor: `${skill.color}40`,
                  boxShadow: `0 0 24px ${skill.color}22`,
                }}
              >
                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: index * 0.3,
                    }}
                    className="absolute inset-0 rounded-2xl border"
                    style={{ borderColor: skill.color }}
                  />
                )}
                <Icon
                  size={30}
                  strokeWidth={1.8}
                  className="relative"
                  style={{ color: skill.color }}
                />
              </motion.div>
            </motion.div>

            {/* Number */}
            <span className="font-mono text-5xl font-black tracking-tighter text-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:text-emerald-400/20">
              {skill.number}
            </span>
          </div>

          {/* Heading */}
          <div className="mt-7">
            <h3 className="text-2xl font-extrabold italic tracking-tight text-white">
              {skill.name}
            </h3>

            <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-400">
              {skill.description}
            </p>
          </div>

          {/* Divider (draws from left) */}
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.14, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="my-6 h-px w-full bg-gradient-to-r from-emerald-400/30 via-white/5 to-transparent"
          />

          {/* Skills list */}
          <div className="mt-auto pb-8">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {"// Technologies & Skills"}
            </p>

            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, itemIndex) => (
                <motion.span
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.08 }}
                  transition={{
                    delay: 0.5 + index * 0.14 + itemIndex * 0.08,
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  }}
                  className="cursor-default rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-colors duration-300 group-hover:bg-emerald-400/10"
                  style={{
                    color: skill.color,
                    borderColor: `${skill.color}40`,
                    backgroundColor: `${skill.color}0D`,
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom arrow */}
        <div
          className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
          style={{
            backgroundColor: `${skill.color}1A`,
            borderColor: `${skill.color}55`,
            color: skill.color,
          }}
        >
          <ArrowUpRight size={19} />
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
          style={{
            backgroundColor: skill.color,
            boxShadow: `0 0 14px ${skill.color}`,
          }}
        />
      </div>
    </motion.div>
  );
}

// =====================================
// MAIN SKILLS SECTION
// =====================================

export function Skills() {
  const reduceMotion = useReducedMotion();

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });

  return (
    <section id="skills" className="relative isolate overflow-hidden bg-[#03070a] py-24 md:py-32">
      {/* ============ BACKGROUND ============ */}

      {/* Background image (file: public/bg-mane.png) */}

      {/* Desktop / tablet: pura image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: "url('/bg-mane.png')" }}
      />

      {/* Mobile: image er bam ar dan dik alada kore mix kora */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 md:hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/bg-mane.png')",
            backgroundPosition: "right center",
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-no-repeat mix-blend-screen"
          style={{
            backgroundImage: "url('/bg-mane.png')",
            backgroundPosition: "left center",
          }}
        />
      </div>

      {/* Dark overlay (text porar jonno) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#03070a]/30 md:bg-[#03070a]/45"
      />

      {/* Floating glow orbs (slowly moving) */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-[120px]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[400px] w-[400px] rounded-full bg-purple-600/25 blur-[130px]"
          />
        </>
      )}

      {/* Top & bottom fade (onno section er sathe blend korar jonno) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#03070a]/80 via-transparent to-[#03070a]/80"
      />

      {/* ============ CONTENT ============ */}
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Section heading */}
        <div className="mb-16 max-w-3xl text-left">
          {/* Label */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 shadow-[0_0_25px_rgba(34,255,136,0.15)] backdrop-blur-md"
          >
            <motion.span
              animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="flex"
            >
              <Terminal size={15} className="text-emerald-400" />
            </motion.span>

            <span className="font-mono text-[15px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              Skills & Expertise
            </span>
          </motion.div>

          {/* Title (word by word) */}
          <motion.h2
            variants={titleContainer}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl font-black uppercase italic leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <motion.span variants={titleWord} className="mr-[0.25em] inline-block">
              What
            </motion.span>
            <motion.span variants={titleWord} className="mr-[0.25em] inline-block">
              I
            </motion.span>
            <motion.span
              variants={titleWord}
              className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text pr-2 text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
            >
              Work With
            </motion.span>
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-xl text-sm leading-8 text-slate-400 md:text-base"
          >
            My skills, tools and technologies that help me transform creative ideas into meaningful
            digital experiences.
          </motion.p>

          {/* Animated underline (with moving shine) */}
          <motion.div
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={{ width: 90 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative mt-7 h-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ x: ["-100%", "250%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 w-8 bg-white/70 blur-[2px]"
              />
            )}
          </motion.div>
        </div>

        {/* Category information */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-9 flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <div className="text-center sm:text-left">
            <h3 className="font-mono text-lg font-extrabold text-white">
              <span className="text-emerald-400">{"</>"}</span> My Technical Arsenal
            </h3>
            <p className="mt-1 text-xs text-slate-500">Four areas I focus on.</p>
          </div>

          {/* Stats pill (numbers count up) */}
          <div
            ref={statsRef}
            className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-white/5 px-4 py-2 font-mono text-xs font-bold text-slate-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#22ff88]" />
            </span>
            <span>
              <CountUp to={4} start={statsInView} reduceMotion={reduceMotion} /> Categories
            </span>
            <span className="mx-1 text-emerald-400">•</span>
            <span>
              <CountUp to={14} start={statsInView} reduceMotion={reduceMotion} /> Skills
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-400/20 bg-[#070d0b]/70 px-6 py-5 shadow-[0_0_40px_rgba(34,255,136,0.06)] backdrop-blur-md sm:flex-row"
        >
          <div className="text-center sm:text-left">
            <p className="text-sm font-extrabold text-white">Learning never stops.</p>
            <p className="mt-1 font-mono text-xs text-slate-500">
              $ exploring new technologies and improving every day
              {!reduceMotion && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-emerald-400"
                />
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#22ff88]" />
            </span>
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
              Always Growing
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
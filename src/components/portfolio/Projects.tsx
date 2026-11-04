"use client";

import { Fragment, useState } from "react";
import { ShoppingCart, Layout, Code2, ArrowUpRight, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// ===== Edit your projects here =====
const projects = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    number: "01",
    file: "ecommerce.tsx",
    color: "#22FF88",
    description:
      "A full-featured online store with product listings, shopping cart, secure checkout, and order management — built for a smooth shopping experience on any device.",
    tags: ["React", "Node.js", "Payments", "Responsive"],
  },
  {
    icon: Layout,
    title: "Business Landing Page",
    number: "02",
    file: "landing.html",
    color: "#2DE6B4",
    description:
      "A fast, modern landing page for a small business with clear calls to action, service sections, and a contact form.",
    tags: ["HTML/CSS", "JavaScript", "SEO"],
  },
  {
    icon: Code2,
    title: "Personal Dashboard",
    number: "03",
    file: "dashboard.tsx",
    color: "#7CFF5B",
    description:
      "A clean dashboard app for tracking tasks and stats, with interactive charts and a mobile-friendly layout.",
    tags: ["React", "Charts", "Tailwind"],
  },
];

// =====================================
// ANIMATION VARIANTS
// =====================================

const ease = [0.22, 1, 0.36, 1] as const;

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const titleWord = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

// =====================================
// PROJECT CARD
// =====================================

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const Icon = project.icon;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 60, scale: 0.92, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.14, ease }}
      whileHover={reduceMotion ? undefined : { y: -10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transformPerspective: 900 }}
      className="group relative h-full"
    >
      <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_45px_rgba(34,255,136,0.18)]">
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
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              boxShadow: `0 0 12px ${project.color}`,
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
            {project.file}
          </span>
        </div>

        {/* Glow decoration */}
        <div
          className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-25"
          style={{ backgroundColor: project.color }}
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
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{
                  backgroundColor: `${project.color}14`,
                  borderColor: `${project.color}40`,
                  boxShadow: `0 0 24px ${project.color}22`,
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
                    style={{ borderColor: project.color }}
                  />
                )}
                <Icon
                  size={28}
                  strokeWidth={1.8}
                  className="relative"
                  style={{ color: project.color }}
                />
              </motion.div>
            </motion.div>

            {/* Number */}
            <span className="font-mono text-5xl font-black tracking-tighter text-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:text-emerald-400/20">
              {project.number}
            </span>
          </div>

          {/* Title + description */}
          <div className="mt-7 flex-1">
            <h3 className="text-xl font-extrabold italic tracking-tight text-white">
              {project.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {project.description}
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

          {/* Tags */}
          <div className="pb-8">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {"// Tech Stack"}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.08 }}
                  transition={{
                    delay: 0.5 + index * 0.14 + tagIndex * 0.08,
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  }}
                  className="cursor-default rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-colors duration-300 group-hover:bg-emerald-400/10"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    backgroundColor: `${project.color}0D`,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom arrow */}
        <div
          className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
          style={{
            backgroundColor: `${project.color}1A`,
            borderColor: `${project.color}55`,
            color: project.color,
          }}
        >
          <ArrowUpRight size={19} />
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
          style={{
            backgroundColor: project.color,
            boxShadow: `0 0 14px ${project.color}`,
          }}
        />
      </div>
    </motion.article>
  );
}

// =====================================
// PROJECTS SECTION
// =====================================

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#03070a] py-24 md:py-32"
    >
      {/* ============ BACKGROUND ============ */}

      {/* Background image (file: public/bg-mane.png) */}

      {/* Desktop / tablet: pura image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: "url('/bg-mane.png')" }}
      />

      {/* Mobile: image er bam ar dan dik alada kore mix kora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 md:hidden"
      >
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

      {/* Top & bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#03070a]/80 via-transparent to-[#03070a]/80"
      />

      {/* ============ CONTENT ============ */}
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Label */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 shadow-[0_0_25px_rgba(34,255,136,0.15)] backdrop-blur-md"
        >
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex"
          >
            <Terminal size={15} className="text-emerald-400" />
          </motion.span>
          <span className="font-mono text-[15px] font-bold uppercase tracking-[0.2em] text-emerald-300">
            Projects
          </span>
        </motion.div>

        {/* Title (word by word) */}
        <motion.h2
          variants={titleContainer}
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-5 max-w-3xl text-3xl font-black uppercase italic leading-tight tracking-tight text-white md:text-5xl"
        >
          <Fragment>
            <motion.span variants={titleWord} className="inline-block">
              Selected
            </motion.span>{" "}
          </Fragment>
          <motion.span
            variants={titleWord}
            className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text pr-2 text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
          >
            work
          </motion.span>
        </motion.h2>

        {/* Animated underline (with moving shine) */}
        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={{ width: 90 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-6 h-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
        >
          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              animate={{ x: ["-100%", "250%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-8 bg-white/70 blur-[2px]"
            />
          )}
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}



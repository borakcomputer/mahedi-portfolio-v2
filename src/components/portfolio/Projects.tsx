"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Globe,
  BookOpen,
  School,
  Code2,
  ArrowUpRight,
  Terminal,
  Eye,
  X,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// ===== Edit your projects here =====
interface Project {
  icon: LucideIcon;
  title: string;
  category?: string;
  number: string;
  file: string;
  color: string;
  description: string;
  longDescription?: string;
  features?: string[];
  contributions?: string[];
  tags: string[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    icon: Globe,
    title: "AGUNTECH — Internet Service Provider Website",
    category: "Frontend Web Development • ISP Platform",
    number: "01",
    file: "aguntech.com",
    color: "#FF5722",
    image: "/projects/aguntech.jpg",
    link: "https://aguntech.com/",
    description:
      "A modern, responsive multi-page website for an Internet Service Provider (ISP), featuring a professional dark-themed UI with vibrant gradient accents, interactive elements, 3D card tilt, and smooth animations.",
    longDescription:
      "Designed and developed a comprehensive, responsive multi-page website for Agun Tech Limited (an authorized ISP in Dhaka, Bangladesh). The platform delivers a fast, modern cyber-aesthetic with glassmorphism UI, interactive package comparison, real-time coverage guides, bKash & Nagad bill payment instructions, filterable media/FTP server access, and Web3Forms contact integration.",
    features: [
      "Multi-Page Architecture (Home, About, Packages, Coverage, Bill Pay, Media/FTP, Gallery, Contact)",
      "Modern Glassmorphism UI with gradient accents, dark grid background, and subtle glow effects",
      "Interactive 3D Card Tilt on mouse movement and responsive hover interactions",
      "Scroll Reveal Animations & Animated Number Counters via Intersection Observer",
      "Filterable Image Gallery with responsive category tabs and fullscreen Lightbox",
      "Interactive Testimonial Slider & Dynamic Typing Animation in Hero Section",
      "Functional Contact & Newsletter Forms integrated with Web3Forms API",
      "Embedded Google Maps and direct WhatsApp Chat Integration",
      "Step-by-step bKash and Nagad Bill Payment Guides",
      "Media Server & High-Speed BDXI/FTP Server Navigation",
    ],
    contributions: [
      "Designed and developed the entire multi-page website interface from scratch.",
      "Implemented pixel-perfect responsive layouts using Tailwind CSS and CSS3.",
      "Crafted custom animations including 3D tilt, counter-up, typing effects, and scroll reveals.",
      "Engineered JavaScript UI interactivity, testimonial slider, and filterable gallery lightbox.",
      "Integrated Web3Forms API for real-time contact form processing without backend dependencies.",
      "Optimized performance, cross-browser compatibility, and accessibility (prefers-reduced-motion).",
    ],
    tags: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript",
      "Glassmorphism",
      "3D Hover Effects",
      "Web3Forms API",
      "Google Maps",
      "Font Awesome",
      "Responsive Design",
    ],
  },
  {
    icon: BookOpen,
    title: "Noor Online Women's Madrasa (OWM)",
    category: "Full-Stack Web Application • Madrasa Management",
    number: "02",
    file: "owmbd.com",
    color: "#38BDF8",
    image: "/projects/owmbd.jpg",
    link: "https://owmbd.com/",
    description:
      "A modern, responsive bilingual educational platform featuring an online student admission system, Supabase database integration, secure admin dashboard, manual payment verification, and WhatsApp handoff.",
    longDescription:
      "Developed a comprehensive full-stack bilingual educational web application for Noor Online Women's Madrasa. The platform bridges Quranic and Islamic education with modern web technology, offering seamless Bengali and English language switching, a multi-step student admission workflow with unique registration codes, Supabase PostgreSQL database integration, and a password-protected Admin Dashboard for managing student enrollments and bKash/Nagad payment submissions.",
    features: [
      "Bilingual Interface with Instant Bengali & English Language Switching",
      "Online Student Admission System with Unique Registration Code Generation",
      "Supabase Database & Authentication with Row Level Security (RLS) Policies",
      "Protected Admin Dashboard for Managing Enrollments & Admission Status",
      "Manual Payment Verification System for bKash & Nagad Transaction IDs",
      "Structured Course Curriculum Cards, Syllabus Details & Learning Benefits",
      "Interactive FAQ Accordion, Testimonials & WhatsApp Admission Handoff",
      "Type-Safe Form Validation powered by React Hook Form & Zod Schema",
      "Modern Educational UI/UX with Lucide Icons and Smooth Scroll Animations",
      "SEO & Open Graph Metadata Optimization for Course Discoverability",
    ],
    contributions: [
      "Architected the full-stack application using React 19, TypeScript, and TanStack Start.",
      "Designed and implemented the bilingual UI/UX with Tailwind CSS and Radix UI.",
      "Engineered the student admission workflow with unique registration code generation.",
      "Configured Supabase PostgreSQL database schemas and migrations via Drizzle ORM.",
      "Built a secure Admin Dashboard with authentication for review of student & payment records.",
      "Integrated WhatsApp communication handoff for streamlined admission inquiries.",
    ],
    tags: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS",
      "Supabase",
      "Drizzle ORM",
      "PostgreSQL",
      "Full-Stack",
      "Admin Dashboard",
      "Bilingual UI",
    ],
  },
  {
    icon: School,
    title: "Alokdia High School – School Management Website",
    category: "Full-Stack Web Application • School Management",
    number: "03",
    file: "alokdia-high-school.vercel.app",
    color: "#22FF88",
    image: "/projects/alokdia-high-school.jpg",
    link: "https://alokdia-high-school.vercel.app/",
    description:
      "A modern, responsive full-stack school management web application with a dynamic admin dashboard, role-based approval system, notice/news CMS, student result charts, and bilingual support.",
    longDescription:
      "Developed a comprehensive full-stack school management web application for Alokdia High School. The platform provides a dynamic Content Management System (CMS), Super Admin authentication with role-based admin approval, notice and events management, photo/video galleries, student results and statistics charts powered by Recharts, teacher profiles, academic calendars, ImgBB image uploads, and Resend email-based password recovery.",
    features: [
      "Responsive Design with Mobile, Tablet & Desktop Support",
      "Dynamic Admin Dashboard with Super Admin Authentication",
      "Role-Based Admin Approval & Access Control System",
      "Notice, News & Upcoming Events Management System",
      "Interactive Photo Gallery & Video Showcase",
      "Student Academic Results & Statistics Charts (Recharts)",
      "Teachers & Staff Directory Information Management",
      "Academic Calendar, Routines & Class Schedules",
      "Admission Information & Student Guidance Portal",
      "Bilingual Interface with Instant Bangla & English Language Support",
      "Cloud Image Upload Integration using ImgBB API",
      "MongoDB Database Integration with Optimized Schemas",
      "Secure Password Reset via Resend Email API",
    ],
    contributions: [
      "Engineered the full-stack architecture using React 19, TypeScript, and TanStack Start.",
      "Crafted a responsive educational interface using Tailwind CSS 4, Shadcn UI, and Radix UI.",
      "Developed dynamic Super Admin authentication and role-based admin approval workflows.",
      "Designed and optimized MongoDB database schemas for notices, results, events, and staff.",
      "Implemented interactive student results visualization charts using Recharts.",
      "Integrated third-party APIs including ImgBB for media uploads and Resend for email services.",
    ],
    tags: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS 4",
      "Node.js",
      "MongoDB",
      "REST API",
      "Shadcn UI",
      "Radix UI",
      "Recharts",
      "ImgBB API",
      "Resend API",
    ],
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
// PROJECT DETAILS MODAL
// =====================================

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#070e0b] shadow-[0_0_60px_rgba(0,0,0,0.85)]"
          >
            {/* Modal Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  {project.file} — details
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-red-400/40 hover:bg-red-500/20 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6 md:p-8">
              {/* Project Image Preview */}
              {project.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              )}

              {/* Title & Category Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {project.category && (
                    <span
                      className="rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}15`,
                      }}
                    >
                      {project.category}
                    </span>
                  )}
                  {project.link && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Project
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-extrabold italic tracking-tight text-white md:text-3xl">
                  {project.title}
                </h3>
              </div>

              {/* Full Description */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                  {"// Project Overview"}
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                    {"// Key Features & Highlights"}
                  </h4>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.015] p-3 text-xs text-slate-300 md:text-sm"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0"
                          style={{ color: project.color }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* My Contributions */}
              {project.contributions && project.contributions.length > 0 && (
                <div>
                  <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                    {"// My Key Contributions"}
                  </h4>
                  <div className="space-y-2">
                    {project.contributions.map((contribution, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.015] p-3 text-xs text-slate-300 md:text-sm"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0"
                          style={{ color: project.color }}
                        />
                        <span>{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                  {"// Technologies Used"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}0F`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Close
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border px-5 py-2.5 font-mono text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: project.color,
                    borderColor: project.color,
                    boxShadow: `0 0 25px ${project.color}44`,
                  }}
                >
                  <span>Visit Live Website</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =====================================
// PROJECT CARD
// =====================================

function ProjectCard({
  project,
  index,
  onViewDetails,
}: {
  project: Project;
  index: number;
  onViewDetails: () => void;
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
      whileHover={reduceMotion ? undefined : { y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transformPerspective: 900 }}
      className="group relative h-full"
    >
      <div className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_45px_rgba(34,255,136,0.18)]">
        {/* Scan line (hover korle upor theke niche jay) */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ top: "0%", opacity: 0 }}
            animate={
              hovered ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }
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

          <div className="flex items-center gap-2">
            {project.link && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
            <span className="font-mono text-[11px] text-slate-500 transition-colors duration-300 group-hover:text-emerald-300">
              {project.file}
            </span>
          </div>
        </div>

        {/* Project Preview Image (if provided) */}
        {project.image ? (
          <div
            onClick={onViewDetails}
            className="group/img relative aspect-[16/9] w-full cursor-pointer overflow-hidden border-b border-white/5 bg-black/40"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d0b] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-black/70 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-300 shadow-xl">
                <Eye size={14} />
                <span>Quick View</span>
              </span>
            </div>
          </div>
        ) : null}

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
                className="relative flex h-13 w-13 items-center justify-center rounded-2xl border"
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
                  size={26}
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

          {/* Title + category + description */}
          <div className="mt-5 flex-1">
            {project.category && (
              <p
                className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-wider"
                style={{ color: project.color }}
              >
                {project.category}
              </p>
            )}

            <h3
              onClick={onViewDetails}
              className="cursor-pointer text-xl font-extrabold italic tracking-tight text-white transition-colors duration-300 hover:text-emerald-300"
            >
              {project.title}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-400 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Divider */}
          <div className="my-5 h-px w-full bg-gradient-to-r from-emerald-400/30 via-white/5 to-transparent" />

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold"
                style={{
                  color: project.color,
                  borderColor: `${project.color}35`,
                  backgroundColor: `${project.color}0D`,
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-400">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons Bar */}
          <div className="mt-auto flex items-center gap-2.5 pt-2">
            {/* View Details Button */}
            <button
              type="button"
              onClick={onViewDetails}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 py-2.5 px-3.5 font-mono text-xs font-semibold text-emerald-300 shadow-[0_0_15px_rgba(34,255,136,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-400/20 hover:text-white hover:shadow-[0_0_20px_rgba(34,255,136,0.25)]"
            >
              <Eye size={15} />
              <span>View Details</span>
            </button>

            {/* Live Site Button */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                title={`Visit ${project.title}`}
                className="flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3.5 font-mono text-xs font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${project.color}1A`,
                  borderColor: `${project.color}55`,
                  color: project.color,
                }}
              >
                <span>Live Site</span>
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative isolate overflow-hidden bg-[#03070a] py-24 md:py-32">
      {/* ============ BACKGROUND ============ */}

      {/* Background image (file: public/bg-mane.png) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: "url('/bg-mane.png')" }}
      />

      {/* Mobile: image mix */}
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

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#03070a]/30 md:bg-[#03070a]/45"
      />

      {/* Floating glow orbs */}
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

        {/* Title */}
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

        {/* Animated underline */}
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

        {/* Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

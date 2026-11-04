"use client";

import { useEffect, useState } from "react";
import {
  Facebook,
  FolderKanban,
  Github,
  GraduationCap,
  House,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

const quickLinks = [
  { href: "#home", label: "Home", icon: House },
  { href: "#about", label: "About", icon: UserRound },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/borakcomputer", icon: Github, color: "#f3f4f6" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin, color: "#0a66c2" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mdmahedihasan.adil.3",
    icon: Facebook,
    color: "#0866ff",
  },
  { label: "X", href: "https://x.com/", icon: X, color: "#f3f4f6" },
  { label: "WhatsApp", href: "https://wa.me/8801949853773", icon: MessageCircle, color: "#25d366" },
];

// =====================================
// ANIMATION VARIANTS
// =====================================

const ease = [0.22, 1, 0.36, 1] as const;

// Footer er 3 ta column ek ek kore ashe
const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const columnIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// List er item gulo bam theke ek ek kore ashe
const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const itemFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

// Social icon gulo pop kore
const socialContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const socialPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

// =====================================
// ROTATING ROLE ("Web Developer" er jaygay bodle bodle ashe)
// =====================================

const roles = ["Web Developer", "E-Commerce Builder", "Frontend Developer"];

function RotatingRole({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <p className="mt-1 flex h-6 items-center gap-2 overflow-hidden font-medium text-cyan-300">
      <span aria-hidden="true" className="font-mono text-violet-400">
        {"</>"}
      </span>

      <AnimatePresence mode="wait" initial={false}>
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
    </p>
  );
}

// =====================================
// FOOTER
// =====================================

export function Footer() {
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? "show" : "hidden";

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0b0b0f] text-slate-300">
      {/* Top light sweep (upor er border er upor diye alo chole jay) */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-100%", "400%"] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      )}

      {/* Grid background (dhire dhire sore) */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "72px 72px"] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div
        variants={gridContainer}
        initial={initialState}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-x-8 md:px-6 md:py-14 lg:grid-cols-3 lg:gap-x-12"
      >
        {/* Column 1: Brand */}
        <motion.div variants={columnIn}>
          <motion.a
            href="#home"
            whileHover={reduceMotion ? undefined : { x: 4 }}
            className="inline-block text-2xl font-bold tracking-tight md:text-[1.75rem]"
          >
            {/* Gradient name (rong sore + halka glow) */}
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      filter: [
                        "drop-shadow(0 0 0px rgba(139,92,246,0))",
                        "drop-shadow(0 0 14px rgba(139,92,246,0.55))",
                        "drop-shadow(0 0 0px rgba(139,92,246,0))",
                      ],
                    }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% 100%" }}
              className="inline-block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              MD: Mahedi Hasan
            </motion.span>
          </motion.a>

          <RotatingRole reduceMotion={reduceMotion} />
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            I build clean, fast, modern websites — from e-commerce stores to business pages.
            Let&apos;s make your next idea work on the web.
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.nav variants={columnIn} aria-label="Footer navigation">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Quick Links
          </h2>
          <motion.ul variants={listContainer} className="mt-5 space-y-3">
            {quickLinks.map(({ href, label, icon: Icon }) => (
              <motion.li key={href} variants={itemFromLeft}>
                <motion.a
                  href={href}
                  whileHover={reduceMotion ? undefined : { x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex w-fit items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                  />
                  {label}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>

        {/* Column 3: Connect */}
        <motion.div variants={columnIn} className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Connect</h2>

          <motion.div variants={socialContainer} className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <motion.a
                key={label}
                variants={socialPop}
                whileHover={reduceMotion ? undefined : { y: -6, scale: 1.1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                style={{ color }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] transition-colors hover:border-white/20 hover:bg-white/8"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={listContainer}
            className="mt-6 space-y-3 text-sm text-slate-400"
          >
            <motion.a
              variants={itemFromLeft}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              href="mailto:mdmahedihasanadil749@gmail.com"
              className="flex w-fit items-center gap-2 transition-colors hover:text-primary"
            >
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex"
              >
                <Mail className="h-4 w-4 shrink-0" />
              </motion.span>
              <span className="break-all">mdmahedihasanadil749@gmail.com</span>
            </motion.a>

            <motion.a
              variants={itemFromLeft}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              href="tel:+8801949853773"
              className="flex w-fit items-center gap-2 transition-colors hover:text-primary"
            >
              {/* Phone ring */}
              <motion.span
                animate={
                  reduceMotion ? undefined : { rotate: [0, -18, 18, -12, 12, 0] }
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="flex"
              >
                <Phone className="h-4 w-4 shrink-0" />
              </motion.span>
              01949853773
            </motion.a>
          </motion.div>

          <motion.a
            variants={itemFromLeft}
            whileHover={reduceMotion ? undefined : { x: 5 }}
            href="https://wa.me/8801949853773"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
          >
            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex"
            >
              <MessageCircle className="h-4 w-4" />
            </motion.span>
            Message me on WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-6"
        >
          <motion.p
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            className="text-base font-semibold  hover:text-primary"
          >
            Mahedi Hasan
          </motion.p>

          <p>© {new Date().getFullYear()} — Web Developer, America. All rights reserved.</p>

          <a
            href="#home"
            className="group inline-flex items-center justify-center gap-1 transition-colors hover:text-slate-300"
          >
            Back to top
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ↑
            </motion.span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

// import {
//   ArrowUp,
//   Facebook,
//   FolderKanban,
//   Github,
//   GraduationCap,
//   House,
//   Linkedin,
//   Mail,
//   MessageCircle,
//   Phone,
//   UserRound,
//   Wrench,
//   X,
// } from "lucide-react";

// const quickLinks = [
//   { href: "#home", label: "Home", icon: House },
//   { href: "#about", label: "About", icon: UserRound },
//   { href: "#skills", label: "Skills", icon: Wrench },
//   { href: "#projects", label: "Projects", icon: FolderKanban },
//   { href: "#education", label: "Education", icon: GraduationCap },
//   { href: "#contact", label: "Contact", icon: Mail },
// ];

// const socialLinks = [
//   { label: "GitHub", href: "https://github.com/borakcomputer", icon: Github, color: "#f3f4f6" },
//   { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin, color: "#0a66c2" },
//   {
//     label: "Facebook",
//     href: "https://www.facebook.com/mdmahedihasan.adil.3",
//     icon: Facebook,
//     color: "#0866ff",
//   },
//   { label: "X", href: "https://x.com/", icon: X, color: "#f3f4f6" },
//   { label: "WhatsApp", href: "https://wa.me/8801949853773", icon: MessageCircle, color: "#25d366" },
// ];

// export function Footer() {
//   return (
//     <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0b0b0f] text-slate-300">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 opacity-40"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
//           backgroundSize: "72px 72px",
//         }}
//       />
//       <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-x-8 md:px-6 md:py-14 lg:grid-cols-3 lg:gap-x-12">
//         <div>
//           <a
//             href="#home"
//             className="text-2xl font-bold tracking-tight text-primary md:text-[1.75rem]"
//           >
//             MD: Mahedi Hasan
//           </a>
//           <p className="mt-1 font-medium text-primary/90">Web Developer</p>
//           <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
//             I build clean, fast, modern websites — from e-commerce stores to business pages.
//             Let&apos;s make your next idea work on the web.
//           </p>
//         </div>

//         <nav aria-label="Footer navigation">
//           <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
//             Quick Links
//           </h2>
//           <ul className="mt-5 space-y-3">
//             {quickLinks.map(({ href, label, icon: Icon }) => (
//               <li key={href}>
//                 <a
//                   href={href}
//                   className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
//                 >
//                   <Icon aria-hidden="true" className="h-4 w-4" />
//                   {label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="sm:col-span-2 lg:col-span-1">
//           <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Connect</h2>
//           <div className="mt-5 flex flex-wrap gap-3">
//             {socialLinks.map(({ label, href, icon: Icon, color }) => (
//               <a
//                 key={label}
//                 href={href}
//                 target="_blank"
//                 rel="noreferrer"
//                 aria-label={label}
//                 title={label}
//                 style={{ color }}
//                 className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 motion-reduce:transform-none"
//               >
//                 <Icon className="h-5 w-5" />
//               </a>
//             ))}
//           </div>
//           <div className="mt-6 space-y-3 text-sm text-slate-400">
//             <a
//               href="mailto:mdmahedihasanadil749@gmail.com"
//               className="flex items-center gap-2 transition-colors hover:text-primary"
//             >
//               <Mail className="h-4 w-4 shrink-0" />
//               <span className="break-all">mdmahedihasanadil749@gmail.com</span>
//             </a>
//             <a
//               href="tel:+8801949853773"
//               className="flex items-center gap-2 transition-colors hover:text-primary"
//             >
//               <Phone className="h-4 w-4 shrink-0" />
//               01949853773
//             </a>
//           </div>
//           <a
//             href="https://wa.me/8801949853773"
//             target="_blank"
//             rel="noreferrer"
//             className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
//           >
//             <MessageCircle className="h-4 w-4" />
//             Message me on WhatsApp
//           </a>
//         </div>
//       </div>
//       <div className="border-t border-white/10">
//         <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-6">
//           <p className="text-base font-semibold  hover:text-primary">Mahedi Hasan</p>
//           <p>© {new Date().getFullYear()} — Web Developer, America. All rights reserved.</p>
//           <a href="#home" className="transition-colors hover:text-slate-300">
//             Back to top ↑
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

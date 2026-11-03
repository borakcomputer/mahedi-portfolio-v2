"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Terminal } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// =====================================
// TYPEWRITER (terminal command animation)
// =====================================

function TypeWriter({
  text,
  start,
  speed = 55,
}: {
  text: string;
  start: boolean;
  speed?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [start, count, text, speed]);

  return <>{text.slice(0, count)}</>;
}

// =====================================
// TITLE WORD ANIMATION
// =====================================

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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const titleWords = ["A", "developer", "who", "cares", "about"];

// =====================================
// ABOUT SECTION
// =====================================

export function About() {
  const reduceMotion = useReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.4 });

  const command = "$ cat about.me";
  const typingDone = reduceMotion ? true : cardInView;

  return (
    <section
      id="about"
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
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-emerald-500/20 blur-[120px]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[380px] w-[380px] rounded-full bg-purple-600/25 blur-[130px]"
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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 shadow-[0_0_25px_rgba(34,255,136,0.15)] backdrop-blur-md"
        >
          <Terminal size={15} className="text-emerald-400" />
          <span className="font-mono text-[15px] font-bold uppercase tracking-[0.2em] text-emerald-300">
            About
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
          {titleWords.map((w) => (
            <motion.span
              key={w}
              variants={titleWord}
              className="mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            variants={titleWord}
            className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
          >
            results
          </motion.span>
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={{ width: 90 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
          {/* Description card (slides from left) */}
          <motion.div
            ref={cardRef}
            initial={reduceMotion ? false : { opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-500 hover:border-emerald-400/40"
          >
            {/* Scanning line */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                animate={{ top: ["0%", "100%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1.5,
                }}
                className="pointer-events-none absolute left-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
              />
            )}

            {/* Terminal title bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                about.me
              </span>
            </div>

            <div className="p-6 md:p-7">
              {/* Typing command */}
              <p className="mb-4 font-mono text-sm text-emerald-400">
                {reduceMotion ? (
                  command
                ) : (
                  <TypeWriter text={command} start={typingDone} />
                )}
                {!reduceMotion && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400"
                  />
                )}
              </p>

              {/* Paragraph (appears after typing) */}
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={cardInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="leading-relaxed text-slate-300"
              >
                I'm Mahedi Hasan, a web developer living in America. I completed my
                diploma in web development and since then I've been building
                real projects — most recently a complete e-commerce website
                with cart, checkout, and product management. I focus on clean
                code, fast loading pages, and designs that look great on every
                screen.
              </motion.p>
            </div>
          </motion.div>

          {/* Highlight card (slides from right) */}
          <div className="space-y-4">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group flex items-start gap-4 rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-emerald-400/50 hover:shadow-[0_0_45px_rgba(34,255,136,0.18)]"
            >
              {/* Floating icon with pulse ring */}
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_24px_rgba(34,255,136,0.15)]"
              >
                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-xl border border-emerald-400"
                  />
                )}
                <ShoppingCart className="relative h-6 w-6 text-emerald-400" />
              </motion.div>

              <div>
                <p className="font-semibold text-white">E-Commerce Specialist</p>
                <p className="mt-1 text-sm text-slate-400">
                  Built a full online store from scratch — products, cart,
                  checkout, and orders.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { ShoppingCart } from "lucide-react";

// export function About() {
//   return (
//     <section id="about" className="section-pad bg-card">
//       <div className="mx-auto max-w-6xl px-4 md:px-6">
//         <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
//         <h2 className="mt-2 text-3xl font-bold md:text-4xl">A developer who cares about results</h2>
//         <div className="mt-8 grid gap-8 md:grid-cols-2">
//           <p className="leading-relaxed text-muted-foreground">
//             I'm Mahedi, a web developer living in America. I completed my
//             diploma in web development and since then I've been building
//             real projects — most recently a complete e-commerce website with
//             cart, checkout, and product management. I focus on clean code,
//             fast loading pages, and designs that look great on every screen.
//           </p>
//           <div className="space-y-4">
//             <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5">
//               <ShoppingCart className="mt-1 h-6 w-6 shrink-0 text-primary" />
//               <div>
//                 <p className="font-semibold">E-Commerce Specialist</p>
//                 <p className="text-sm text-muted-foreground">
//                   Built a full online store from scratch — products, cart, checkout, and orders.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

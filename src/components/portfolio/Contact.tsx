"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Check, Mail, Send, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Status = "idle" | "sending" | "sent";

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

const cardIn = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease,
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fromBottom = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const titleWords = ["Let's", "build", "something"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none backdrop-blur-md transition-all duration-300 hover:border-emerald-400/30 focus:border-emerald-400/60 focus:bg-emerald-400/5 focus:shadow-[0_0_25px_rgba(34,255,136,0.15)]";

// =====================================
// CONTACT SECTION
// =====================================

export function Contact() {
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? "show" : "hidden";

  const [status, setStatus] = useState<Status>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;

    const form = event.currentTarget;
    setStatus("sending");

    // Ekhane pore tomar real send logic (API / EmailJS) boshate paro
    const t1 = window.setTimeout(() => {
      setStatus("sent");
      form.reset();

      const t2 = window.setTimeout(() => setStatus("idle"), 4500);
      timers.current.push(t2);
    }, 1200);
    timers.current.push(t1);
  };

  return (
    <section
      id="contact"
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
      <div className="relative mx-auto max-w-3xl px-4 text-left md:px-6">
        {/* Label */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 shadow-[0_0_25px_rgba(34,255,136,0.15)] backdrop-blur-md"
        >
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex"
          >
            <Terminal size={15} className="text-emerald-400" />
          </motion.span>
          <span className="font-mono text-[15px] font-bold uppercase tracking-[0.2em] text-emerald-300">
            Contact
          </span>
        </motion.div>

        {/* Title (word by word) */}
        <motion.h2
          variants={titleContainer}
          initial={initialState}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-black uppercase italic leading-tight tracking-tight text-white md:text-5xl"
        >
          {titleWords.map((word) => (
            <Fragment key={word}>
              <motion.span variants={titleWord} className="inline-block">
                {word}
              </motion.span>{" "}
            </Fragment>
          ))}
          <motion.span
            variants={titleWord}
            className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text pr-2 text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
          >
           together
          </motion.span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 text-slate-400"
        >
          Have a project in mind? Need an e-commerce store or a website for your
          business? Send me a message and I'll get back to you soon.
        </motion.p>

        {/* Animated underline (with moving shine) */}
        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={{ width: 90 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative mt-7 h-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
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

        {/* Form card (terminal style) */}
        <motion.div
          variants={cardIn}
          initial={initialState}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-10 overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 text-left shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-500 hover:border-emerald-400/35"
        >
          {/* Scanning line */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              animate={{ top: ["0%", "100%"] }}
              transition={{
                duration: 6,
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
              new-message.ts
            </span>
          </div>

          <form className="space-y-4 p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div variants={fromLeft}>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={fromRight}>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className={inputClass}
                />
              </motion.div>
            </div>

            <motion.div variants={fromBottom}>
              <textarea
                required
                rows={5}
                name="message"
                placeholder="Tell me about your project..."
                className={`${inputClass} resize-none`}
              />
            </motion.div>

            <motion.div
              variants={fromBottom}
              className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              {/* Submit button (pulse ring + shine) */}
              <div className="relative">
                {!reduceMotion && status === "idle" && (
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: [1, 1.18], opacity: [0.55, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-emerald-400"
                  />
                )}

                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  whileHover={reduceMotion || status !== "idle" ? undefined : { y: -3 }}
                  whileTap={reduceMotion || status !== "idle" ? undefined : { scale: 0.96 }}
                  className="group relative inline-flex min-w-[10.5rem] items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-400 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-90"
                >
                  {/* Shine */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/40 transition-transform duration-700 group-hover:translate-x-[400%]"
                  />

                  <motion.span
                    key={status}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="relative flex items-center gap-2"
                  >
                    {status === "idle" && (
                      <>
                        <Mail className="h-4 w-4" /> Send Message
                      </>
                    )}

                    {status === "sending" && (
                      <>
                        <motion.span
                          animate={
                            reduceMotion
                              ? undefined
                              : { x: [0, 26], y: [0, -14], opacity: [1, 0] }
                          }
                          transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
                          className="flex"
                        >
                          <Send className="h-4 w-4" />
                        </motion.span>
                        Sending...
                      </>
                    )}

                    {status === "sent" && (
                      <>
                        <Check className="h-4 w-4" strokeWidth={3} /> Message Sent
                      </>
                    )}
                  </motion.span>
                </motion.button>
              </div>

              {/* Success message */}
              {status === "sent" && (
                <motion.p
                  role="status"
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="font-mono text-xs leading-relaxed text-emerald-300"
                >
                  $ Thanks for your message! Mahedi will get back to you soon.
                </motion.p>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


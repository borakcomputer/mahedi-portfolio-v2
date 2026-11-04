"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Terminal,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

// =====================================
// CONTACT DATA (ekhane edit koro)
// =====================================

const EMAIL = "mdmahedihasanadil749@gmail.com";
const PHONE_LABEL = "+880 1949-853773";
const PHONE_HREF = "tel:+8801949853773";

// -------------------------------------------------------------
// MESSAGE PATHANOR SETUP (duita option, jekono ekta kaj korbe)
//
// Option A (default): FormSubmit.co
//   -> Prothom message pathale tomar Gmail e "Activate Form" email ashe,
//      oitate click na korle message jay na.
//
// Option B (beshi nirbharjogyo, activation lage na): Web3Forms
//   1) https://web3forms.com e giye tomar email diye "Create Access Key" chapo
//   2) Email e key ashbe, oita niche "" er bhitore boshao
//   -> Key boshale automatic Web3Forms bebohar hobe.
// -------------------------------------------------------------
const WEB3FORMS_ACCESS_KEY = "a180ee6d-3b1f-48bb-9fce-e1db1e6c624c";

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Network atke gele "Sending..." jeno chirokal na thake (15 second por fail)
async function fetchWithTimeout(url: string, init: RequestInit, ms = 15000) {
  const controller = new AbortController();
  const id = window.setTimeout(() => controller.abort(), ms);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(id);
  }
}

async function sendMessage({ name, email, subject, message }: Payload) {
  // ----- Option B: Web3Forms -----
  if (WEB3FORMS_ACCESS_KEY) {
    const response = await fetchWithTimeout("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name,
        email,
        replyto: email,
        subject: subject || `New portfolio message from ${name}`,
        from_name: "Portfolio Contact Form",
        message,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(result.message || `Server error (HTTP ${response.status})`);
    }
    return;
  }

  // ----- Option A: FormSubmit -----
  const response = await fetchWithTimeout(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      subject: subject || "(no subject)",
      message,
      _subject: `New portfolio message from ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || String(result.success) === "false") {
    throw new Error(result.message || `Server error (HTTP ${response.status})`);
  }
}

const socialLinks = [
  { label: "GitHub", href: "https://github.com/borakcomputer", icon: Github, color: "#e5e7eb" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin, color: "#3b82f6" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mdmahedihasan.adil.3",
    icon: Facebook,
    color: "#1877f2",
  },
  { label: "WhatsApp", href: "https://wa.me/8801949853773", icon: MessageCircle, color: "#25d366" },
  // { label: "Email", href: `mailto:${EMAIL}`, icon: Mail, color: "#ef4444" },
];

// =====================================
// ANIMATION VARIANTS
// =====================================

const ease = [0.22, 1, 0.36, 1] as const;

const titleContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const titleWord: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

// Dui ta card dui dik theke ashe, bhitorer item gulo stagger hoy
const panelFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease, staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const panelFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease, staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const socialContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const socialPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

const titleWords = ["Let's", "build", "something"];

const panelClass =
  "relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#14121c]/70 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-500 hover:border-indigo-400/30 md:p-8";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-indigo-400/30 focus:border-indigo-400/60 focus:bg-indigo-400/5 focus:shadow-[0_0_25px_rgba(99,102,241,0.2)]";

// =====================================
// CONTACT SECTION
// =====================================

export function Contact() {
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? "show" : "hidden";

  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [lastPayload, setLastPayload] = useState<Payload | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  const isBusy = status === "sending" || status === "sent";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBusy) return;

    // await er age form ta dhore rakhte hobe
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload: Payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setLastPayload(payload);
    setStatus("sending");
    setErrorDetail("");

    try {
      // Lukano spam field bhora thakle bot, kichu pathabo na
      if (!data.get("_honey")) {
        await sendMessage(payload);
      }

      setStatus("sent");
      form.reset();

      const timer = window.setTimeout(() => setStatus("idle"), 5000);
      timers.current.push(timer);
    } catch (error) {
      // Asol karon browser console e dekha jabe (F12 -> Console)
      console.error("Contact form error:", error);

      setErrorDetail(
        error instanceof DOMException && error.name === "AbortError"
          ? "Request timed out (server did not respond in 15 seconds)."
          : error instanceof TypeError
          ? "Request blocked or no internet (ad-blocker / network / CORS)."
          : error instanceof Error
            ? error.message
            : "Unknown error"
      );
      setStatus("error");
    }
  };

  // Service kaj na korleo jeno message harai na jay: user er email app khule jabe
  const mailtoHref = lastPayload
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(
        lastPayload.subject || `Message from ${lastPayload.name}`
      )}&body=${encodeURIComponent(
        `Name: ${lastPayload.name}\nEmail: ${lastPayload.email}\n\n${lastPayload.message}`
      )}`
    : `mailto:${EMAIL}`;

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
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
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
          className="max-w-3xl text-3xl font-black uppercase italic leading-tight tracking-tight text-white md:text-5xl"
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
          className="mt-5 max-w-2xl text-slate-400"
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

        {/* ============ TWO COLUMN CARDS ============ */}
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* ---------- Left: Contact Information ---------- */}
          <motion.div
            variants={panelFromLeft}
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={`${panelClass} lg:col-span-2`}
          >
            <motion.p
              variants={itemUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
            >
              Reach Out
            </motion.p>

            <motion.h3
              variants={itemUp}
              className="mt-3 text-2xl font-bold text-white md:text-3xl"
            >
              Contact Information
            </motion.h3>

            <motion.p variants={itemUp} className="mt-3 leading-relaxed text-slate-400">
              Feel free to reach out through any of these channels. I typically respond
              within 24 hours.
            </motion.p>

            {/* Email */}
            <motion.a
              variants={itemUp}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              href={`mailto:${EMAIL}`}
              className="group mt-8 flex items-center gap-4"
            >
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/15 text-indigo-400 transition-colors duration-300 group-hover:bg-indigo-500/25"
              >
                <Mail className="h-6 w-6" />
              </motion.span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">Email</span>
                <span className="block break-all font-semibold text-slate-100">{EMAIL}</span>
              </span>
            </motion.a>

            {/* Phone */}
            <motion.a
              variants={itemUp}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              href={PHONE_HREF}
              className="group mt-5 flex items-center gap-4"
            >
              {/* Phone ring */}
              <motion.span
                animate={reduceMotion ? undefined : { rotate: [0, -14, 14, -10, 10, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-500/15 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500/25"
              >
                <Phone className="h-6 w-6" />
              </motion.span>
              <span>
                <span className="block text-xs text-slate-500">Phone</span>
                <span className="block font-semibold text-slate-100">{PHONE_LABEL}</span>
              </span>
            </motion.a>

            {/* Divider (draws from left) */}
            <motion.div
              variants={itemUp}
              className="my-8 h-px w-full bg-white/10"
            />

            {/* Social */}
            <motion.p
              variants={itemUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Connect With Me
            </motion.p>

            <motion.div variants={socialContainer} className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon, color }) => (
                <motion.a
                  key={label}
                  variants={socialPop}
                  whileHover={reduceMotion ? undefined : { y: -6, scale: 1.1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border transition-shadow duration-300 hover:shadow-[0_0_25px_var(--glow)]"
                  style={
                    {
                      color,
                      backgroundColor: `${color}1F`,
                      borderColor: `${color}2E`,
                      "--glow": `${color}55`,
                    } as CSSProperties
                  }
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Availability */}
            <motion.div
              variants={itemUp}
              className="mt-10 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-slate-300 lg:mt-auto"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span>
                Currently <span className="font-bold text-emerald-400">available</span> for
                freelance &amp; full-time roles
              </span>
            </motion.div>
          </motion.div>

          {/* ---------- Right: Send Me a Message ---------- */}
          <motion.div
            variants={panelFromRight}
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={`${panelClass} lg:col-span-3`}
          >
            <motion.p
              variants={itemUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
            >
              Message
            </motion.p>

            <motion.h3
              variants={itemUp}
              className="mt-3 text-2xl font-bold text-white md:text-3xl"
            >
              Send Me a Message
            </motion.h3>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {/* Spam bot dhorar jonno lukano field (kichu likho na) */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <motion.div variants={itemUp}>
                  <label htmlFor="contact-name" className={labelClass}>
                    Your Name
                  </label>
                  <input
                    required
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div variants={itemUp}>
                  <label htmlFor="contact-email" className={labelClass}>
                    Your Email
                  </label>
                  <input
                    required
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                </motion.div>
              </div>

              <motion.div variants={itemUp}>
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Project discussion, collaboration..."
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={itemUp}>
                <label htmlFor="contact-message" className={labelClass}>
                  Your Message
                </label>
                <textarea
                  required
                  id="contact-message"
                  rows={6}
                  name="message"
                  placeholder="Hello, I would like to talk about..."
                  className={`${inputClass} resize-none`}
                />
              </motion.div>

              <motion.div variants={itemUp}>
                {/* Submit button (pulse + shine) */}
                <div className="relative">
                  {!reduceMotion && (status === "idle" || status === "error") && (
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(99,102,241,0.5)",
                          "0 0 0 16px rgba(99,102,241,0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                    />
                  )}

                  <motion.button
                    type="submit"
                    disabled={isBusy}
                    whileHover={reduceMotion || isBusy ? undefined : { y: -3 }}
                    whileTap={reduceMotion || isBusy ? undefined : { scale: 0.98 }}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 py-4 text-sm font-bold text-white shadow-[0_10px_40px_rgba(99,102,241,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_50px_rgba(139,92,246,0.5)] disabled:cursor-not-allowed disabled:opacity-90"
                  >
                    {/* Shine */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[500%]"
                    />

                    <motion.span
                      key={status}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="relative flex items-center gap-2"
                    >
                      {(status === "idle" || status === "error") && (
                        <>
                          <Send className="h-4 w-4" /> Send Message
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                    initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="mt-4 font-mono text-xs leading-relaxed text-emerald-300"
                  >
                    $ Thanks for your message! Mahedi will get back to you soon.
                  </motion.p>
                )}

                {/* Error message + email app fallback */}
                {status === "error" && (
                  <motion.div
                    role="alert"
                    initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4"
                  >
                    <p className="font-mono text-xs leading-relaxed text-red-300">
                      $ Could not send your message right now.
                    </p>

                    {/* Karon ta shudhu localhost e (tumi dekhar jonno) dekhabe */}
                    {typeof window !== "undefined" &&
                      window.location.hostname === "localhost" && (
                        <p className="mt-2 font-mono text-xs leading-relaxed text-red-300/80">
                          Reason: {errorDetail}
                          {!WEB3FORMS_ACCESS_KEY &&
                            " | Tip: Contact.tsx er upore WEB3FORMS_ACCESS_KEY e key boshao."}
                        </p>
                      )}

                    <p className="mt-3 text-xs text-slate-400">
                      You can try again, or send it from your email app instead (your
                      message is already filled in):
                    </p>

                    <a
                      href={mailtoHref}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <Mail className="h-4 w-4" /> Send via my email app
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { Fragment, useEffect, useRef, useState } from "react";
// import type { CSSProperties, FormEvent } from "react";
// import {
//   ArrowRight,
//   Check,
//   Facebook,
//   Github,
//   Linkedin,
//   Mail,
//   MessageCircle,
//   Phone,
//   Send,
//   Terminal,
// } from "lucide-react";
// import { motion, useReducedMotion } from "framer-motion";
// import type { Variants } from "framer-motion";

// type Status = "idle" | "sending" | "sent" | "error";

// // =====================================
// // CONTACT DATA (ekhane edit koro)
// // =====================================

// const EMAIL = "mdmahedihasanadil749@gmail.com";
// const PHONE_LABEL = "+880 1949-853773";
// const PHONE_HREF = "tel:+8801949853773";

// // Form er message ei email e ashbe (FormSubmit.co diye, kono backend lage na)
// const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

// const socialLinks = [
//   { label: "GitHub", href: "https://github.com/borakcomputer", icon: Github, color: "#e5e7eb" },
//   { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin, color: "#3b82f6" },
//   {
//     label: "Facebook",
//     href: "https://www.facebook.com/mdmahedihasan.adil.3",
//     icon: Facebook,
//     color: "#1877f2",
//   },
//   { label: "WhatsApp", href: "https://wa.me/8801949853773", icon: MessageCircle, color: "#25d366" },
//   { label: "Email", href: `mailto:${EMAIL}`, icon: Mail, color: "#ef4444" },
// ];

// // =====================================
// // ANIMATION VARIANTS
// // =====================================

// const ease = [0.22, 1, 0.36, 1] as const;

// const titleContainer: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
// };

// const titleWord: Variants = {
//   hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.6, ease },
//   },
// };

// // Dui ta card dui dik theke ashe, bhitorer item gulo stagger hoy
// const panelFromLeft: Variants = {
//   hidden: { opacity: 0, x: -60 },
//   show: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.8, ease, staggerChildren: 0.1, delayChildren: 0.25 },
//   },
// };

// const panelFromRight: Variants = {
//   hidden: { opacity: 0, x: 60 },
//   show: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.8, ease, staggerChildren: 0.1, delayChildren: 0.25 },
//   },
// };

// const itemUp: Variants = {
//   hidden: { opacity: 0, y: 24 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
// };

// const socialContainer: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08 } },
// };

// const socialPop: Variants = {
//   hidden: { opacity: 0, scale: 0 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 260, damping: 14 },
//   },
// };

// const titleWords = ["Let's", "build", "something"];

// const panelClass =
//   "relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#14121c]/70 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-500 hover:border-indigo-400/30 md:p-8";

// const labelClass =
//   "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500";

// const inputClass =
//   "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-indigo-400/30 focus:border-indigo-400/60 focus:bg-indigo-400/5 focus:shadow-[0_0_25px_rgba(99,102,241,0.2)]";

// // =====================================
// // CONTACT SECTION
// // =====================================

// export function Contact() {
//   const reduceMotion = useReducedMotion();
//   const initialState = reduceMotion ? "show" : "hidden";

//   const [status, setStatus] = useState<Status>("idle");
//   const timers = useRef<number[]>([]);

//   useEffect(() => {
//     const list = timers.current;
//     return () => list.forEach((id) => window.clearTimeout(id));
//   }, []);

//   const isBusy = status === "sending" || status === "sent";

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (isBusy) return;

//     // await er age form ta dhore rakhte hobe
//     const form = event.currentTarget;
//     const data = new FormData(form);
//     const name = String(data.get("name") ?? "");
//     const subject = String(data.get("subject") ?? "").trim();

//     setStatus("sending");

//     try {
//       const response = await fetch(FORM_ENDPOINT, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json" },
//         body: JSON.stringify({
//           name,
//           email: data.get("email"),
//           subject: subject || "(no subject)",
//           message: data.get("message"),
//           _subject: `New portfolio message from ${name}`,
//           _template: "table",
//           _captcha: "false",
//           _honey: data.get("_honey") ?? "",
//         }),
//       });

//       const result = await response.json().catch(() => ({}));

//       if (!response.ok || String(result.success) === "false") {
//         throw new Error(result.message || "Request failed");
//       }

//       setStatus("sent");
//       form.reset();

//       const timer = window.setTimeout(() => setStatus("idle"), 5000);
//       timers.current.push(timer);
//     } catch {
//       setStatus("error");
//     }
//   };

//   return (
//     <section
//       id="contact"
//       className="relative isolate overflow-hidden bg-[#03070a] py-24 md:py-32"
//     >
//       {/* ============ BACKGROUND ============ */}

//       {/* Background image (file: public/bg-mane.png) */}

//       {/* Desktop / tablet: pura image */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 hidden bg-cover bg-center bg-no-repeat md:block"
//         style={{ backgroundImage: "url('/bg-mane.png')" }}
//       />

//       {/* Mobile: image er bam ar dan dik alada kore mix kora */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 md:hidden"
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-no-repeat"
//           style={{
//             backgroundImage: "url('/bg-mane.png')",
//             backgroundPosition: "right center",
//           }}
//         />
//         <div
//           className="absolute inset-0 bg-cover bg-no-repeat mix-blend-screen"
//           style={{
//             backgroundImage: "url('/bg-mane.png')",
//             backgroundPosition: "left center",
//           }}
//         />
//       </div>

//       {/* Dark overlay (text porar jonno) */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 bg-[#03070a]/30 md:bg-[#03070a]/45"
//       />

//       {/* Floating glow orbs (slowly moving) */}
//       {!reduceMotion && (
//         <>
//           <motion.div
//             aria-hidden="true"
//             animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//             transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//             className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-emerald-500/20 blur-[120px]"
//           />
//           <motion.div
//             aria-hidden="true"
//             animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
//             transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
//             className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[380px] w-[380px] rounded-full bg-purple-600/25 blur-[130px]"
//           />
//         </>
//       )}

//       {/* Top & bottom fade */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#03070a]/80 via-transparent to-[#03070a]/80"
//       />

//       {/* ============ CONTENT ============ */}
//       <div className="relative mx-auto max-w-6xl px-4 md:px-6">
//         {/* Label */}
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease }}
//           className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 shadow-[0_0_25px_rgba(34,255,136,0.15)] backdrop-blur-md"
//         >
//           <motion.span
//             animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
//             transition={{ duration: 1.6, repeat: Infinity }}
//             className="flex"
//           >
//             <Terminal size={15} className="text-emerald-400" />
//           </motion.span>
//           <span className="font-mono text-[15px] font-bold uppercase tracking-[0.2em] text-emerald-300">
//             Contact
//           </span>
//         </motion.div>

//         {/* Title (word by word) */}
//         <motion.h2
//           variants={titleContainer}
//           initial={initialState}
//           whileInView="show"
//           viewport={{ once: true, amount: 0.5 }}
//           className="max-w-3xl text-3xl font-black uppercase italic leading-tight tracking-tight text-white md:text-5xl"
//         >
//           {titleWords.map((word) => (
//             <Fragment key={word}>
//               <motion.span variants={titleWord} className="inline-block">
//                 {word}
//               </motion.span>{" "}
//             </Fragment>
//           ))}
//           <motion.span
//             variants={titleWord}
//             className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text pr-2 text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
//           >
//             together
//           </motion.span>
//         </motion.h2>

//         {/* Description */}
//         <motion.p
//           initial={reduceMotion ? false : { opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="mt-5 max-w-2xl text-slate-400"
//         >
//           Have a project in mind? Need an e-commerce store or a website for your
//           business? Send me a message and I'll get back to you soon.
//         </motion.p>

//         {/* Animated underline (with moving shine) */}
//         <motion.div
//           initial={reduceMotion ? false : { width: 0 }}
//           whileInView={{ width: 90 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.7 }}
//           className="relative mt-7 h-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
//         >
//           {!reduceMotion && (
//             <motion.span
//               aria-hidden="true"
//               animate={{ x: ["-100%", "250%"] }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatDelay: 1.5,
//                 ease: "easeInOut",
//               }}
//               className="absolute inset-y-0 w-8 bg-white/70 blur-[2px]"
//             />
//           )}
//         </motion.div>

//         {/* ============ TWO COLUMN CARDS ============ */}
//         <div className="mt-10 grid gap-6 lg:grid-cols-5">
//           {/* ---------- Left: Contact Information ---------- */}
//           <motion.div
//             variants={panelFromLeft}
//             initial={initialState}
//             whileInView="show"
//             viewport={{ once: true, amount: 0.2 }}
//             className={`${panelClass} lg:col-span-2`}
//           >
//             <motion.p
//               variants={itemUp}
//               className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
//             >
//               Reach Out
//             </motion.p>

//             <motion.h3
//               variants={itemUp}
//               className="mt-3 text-2xl font-bold text-white md:text-3xl"
//             >
//               Contact Information
//             </motion.h3>

//             <motion.p variants={itemUp} className="mt-3 leading-relaxed text-slate-400">
//               Feel free to reach out through any of these channels. I typically respond
//               within 24 hours.
//             </motion.p>

//             {/* Email */}
//             <motion.a
//               variants={itemUp}
//               whileHover={reduceMotion ? undefined : { x: 5 }}
//               href={`mailto:${EMAIL}`}
//               className="group mt-8 flex items-center gap-4"
//             >
//               <motion.span
//                 animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
//                 transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
//                 className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/15 text-indigo-400 transition-colors duration-300 group-hover:bg-indigo-500/25"
//               >
//                 <Mail className="h-6 w-6" />
//               </motion.span>
//               <span className="min-w-0">
//                 <span className="block text-xs text-slate-500">Email</span>
//                 <span className="block break-all font-semibold text-slate-100">{EMAIL}</span>
//               </span>
//             </motion.a>

//             {/* Phone */}
//             <motion.a
//               variants={itemUp}
//               whileHover={reduceMotion ? undefined : { x: 5 }}
//               href={PHONE_HREF}
//               className="group mt-5 flex items-center gap-4"
//             >
//               {/* Phone ring */}
//               <motion.span
//                 animate={reduceMotion ? undefined : { rotate: [0, -14, 14, -10, 10, 0] }}
//                 transition={{
//                   duration: 0.8,
//                   repeat: Infinity,
//                   repeatDelay: 3,
//                   ease: "easeInOut",
//                 }}
//                 className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-500/15 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500/25"
//               >
//                 <Phone className="h-6 w-6" />
//               </motion.span>
//               <span>
//                 <span className="block text-xs text-slate-500">Phone</span>
//                 <span className="block font-semibold text-slate-100">{PHONE_LABEL}</span>
//               </span>
//             </motion.a>

//             {/* Divider (draws from left) */}
//             <motion.div
//               variants={itemUp}
//               className="my-8 h-px w-full bg-white/10"
//             />

//             {/* Social */}
//             <motion.p
//               variants={itemUp}
//               className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
//             >
//               Connect With Me
//             </motion.p>

//             <motion.div variants={socialContainer} className="mt-5 flex flex-wrap gap-3">
//               {socialLinks.map(({ label, href, icon: Icon, color }) => (
//                 <motion.a
//                   key={label}
//                   variants={socialPop}
//                   whileHover={reduceMotion ? undefined : { y: -6, scale: 1.1 }}
//                   whileTap={reduceMotion ? undefined : { scale: 0.92 }}
//                   href={href}
//                   target={href.startsWith("http") ? "_blank" : undefined}
//                   rel={href.startsWith("http") ? "noreferrer" : undefined}
//                   aria-label={label}
//                   title={label}
//                   className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-shadow duration-300 hover:shadow-[0_0_25px_var(--glow)]"
//                   style={
//                     {
//                       color,
//                       backgroundColor: `${color}1F`,
//                       borderColor: `${color}2E`,
//                       "--glow": `${color}55`,
//                     } as CSSProperties
//                   }
//                 >
//                   <Icon className="h-6 w-6" />
//                 </motion.a>
//               ))}
//             </motion.div>

//             {/* Availability */}
//             <motion.div
//               variants={itemUp}
//               className="mt-10 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-slate-300 lg:mt-auto"
//             >
//               <span className="relative flex h-2.5 w-2.5 shrink-0">
//                 {!reduceMotion && (
//                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//                 )}
//                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
//               </span>
//               <span>
//                 Currently <span className="font-bold text-emerald-400">available</span> for
//                 freelance &amp; full-time roles
//               </span>
//             </motion.div>
//           </motion.div>

//           {/* ---------- Right: Send Me a Message ---------- */}
//           <motion.div
//             variants={panelFromRight}
//             initial={initialState}
//             whileInView="show"
//             viewport={{ once: true, amount: 0.2 }}
//             className={`${panelClass} lg:col-span-3`}
//           >
//             <motion.p
//               variants={itemUp}
//               className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
//             >
//               Message
//             </motion.p>

//             <motion.h3
//               variants={itemUp}
//               className="mt-3 text-2xl font-bold text-white md:text-3xl"
//             >
//               Send Me a Message
//             </motion.h3>

//             <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
//               {/* Spam bot dhorar jonno lukano field (kichu likho na) */}
//               <input
//                 type="text"
//                 name="_honey"
//                 tabIndex={-1}
//                 autoComplete="off"
//                 aria-hidden="true"
//                 className="hidden"
//               />

//               <div className="grid gap-5 sm:grid-cols-2">
//                 <motion.div variants={itemUp}>
//                   <label htmlFor="contact-name" className={labelClass}>
//                     Your Name
//                   </label>
//                   <input
//                     required
//                     id="contact-name"
//                     type="text"
//                     name="name"
//                     placeholder="John Doe"
//                     className={inputClass}
//                   />
//                 </motion.div>

//                 <motion.div variants={itemUp}>
//                   <label htmlFor="contact-email" className={labelClass}>
//                     Your Email
//                   </label>
//                   <input
//                     required
//                     id="contact-email"
//                     type="email"
//                     name="email"
//                     placeholder="john@example.com"
//                     className={inputClass}
//                   />
//                 </motion.div>
//               </div>

//               <motion.div variants={itemUp}>
//                 <label htmlFor="contact-subject" className={labelClass}>
//                   Subject
//                 </label>
//                 <input
//                   id="contact-subject"
//                   type="text"
//                   name="subject"
//                   placeholder="Project discussion, collaboration..."
//                   className={inputClass}
//                 />
//               </motion.div>

//               <motion.div variants={itemUp}>
//                 <label htmlFor="contact-message" className={labelClass}>
//                   Your Message
//                 </label>
//                 <textarea
//                   required
//                   id="contact-message"
//                   rows={6}
//                   name="message"
//                   placeholder="Hello, I would like to talk about..."
//                   className={`${inputClass} resize-none`}
//                 />
//               </motion.div>

//               <motion.div variants={itemUp}>
//                 {/* Submit button (pulse + shine) */}
//                 <div className="relative">
//                   {!reduceMotion && (status === "idle" || status === "error") && (
//                     <motion.span
//                       aria-hidden="true"
//                       animate={{
//                         boxShadow: [
//                           "0 0 0 0 rgba(99,102,241,0.5)",
//                           "0 0 0 16px rgba(99,102,241,0)",
//                         ],
//                       }}
//                       transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
//                       className="pointer-events-none absolute inset-0 rounded-2xl"
//                     />
//                   )}

//                   <motion.button
//                     type="submit"
//                     disabled={isBusy}
//                     whileHover={reduceMotion || isBusy ? undefined : { y: -3 }}
//                     whileTap={reduceMotion || isBusy ? undefined : { scale: 0.98 }}
//                     className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 py-4 text-sm font-bold text-white shadow-[0_10px_40px_rgba(99,102,241,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_50px_rgba(139,92,246,0.5)] disabled:cursor-not-allowed disabled:opacity-90"
//                   >
//                     {/* Shine */}
//                     <span
//                       aria-hidden="true"
//                       className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[500%]"
//                     />

//                     <motion.span
//                       key={status}
//                       initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 18 }}
//                       className="relative flex items-center gap-2"
//                     >
//                       {(status === "idle" || status === "error") && (
//                         <>
//                           <Send className="h-4 w-4" /> Send Message
//                           <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                         </>
//                       )}

//                       {status === "sending" && (
//                         <>
//                           <motion.span
//                             animate={
//                               reduceMotion
//                                 ? undefined
//                                 : { x: [0, 26], y: [0, -14], opacity: [1, 0] }
//                             }
//                             transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
//                             className="flex"
//                           >
//                             <Send className="h-4 w-4" />
//                           </motion.span>
//                           Sending...
//                         </>
//                       )}

//                       {status === "sent" && (
//                         <>
//                           <Check className="h-4 w-4" strokeWidth={3} /> Message Sent
//                         </>
//                       )}
//                     </motion.span>
//                   </motion.button>
//                 </div>

//                 {/* Success message */}
//                 {status === "sent" && (
//                   <motion.p
//                     role="status"
//                     initial={reduceMotion ? false : { opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, ease }}
//                     className="mt-4 font-mono text-xs leading-relaxed text-emerald-300"
//                   >
//                     $ Thanks for your message! Mahedi will get back to you soon.
//                   </motion.p>
//                 )}

//                 {/* Error message */}
//                 {status === "error" && (
//                   <motion.p
//                     role="alert"
//                     initial={reduceMotion ? false : { opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, ease }}
//                     className="mt-4 font-mono text-xs leading-relaxed text-red-400"
//                   >
//                     $ Could not send your message. Please try again, or email me directly at{" "}
//                     <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
//                       {EMAIL}
//                     </a>
//                   </motion.p>
//                 )}
//               </motion.div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { Fragment, useEffect, useRef, useState } from "react";
// import type { FormEvent } from "react";
// import { Check, Mail, Send, Terminal } from "lucide-react";
// import { motion, useReducedMotion } from "framer-motion";

// type Status = "idle" | "sending" | "sent";

// // =====================================
// // ANIMATION VARIANTS
// // =====================================

// const ease = [0.22, 1, 0.36, 1] as const;

// const titleContainer = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
// };

// const titleWord = {
//   hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.6, ease },
//   },
// };

// const cardIn = {
//   hidden: { opacity: 0, y: 50, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.8,
//       ease,
//       staggerChildren: 0.12,
//       delayChildren: 0.3,
//     },
//   },
// };

// const fromLeft = {
//   hidden: { opacity: 0, x: -40 },
//   show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
// };

// const fromRight = {
//   hidden: { opacity: 0, x: 40 },
//   show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
// };

// const fromBottom = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
// };

// const titleWords = ["Let's", "build", "something"];

// const inputClass =
//   "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none backdrop-blur-md transition-all duration-300 hover:border-emerald-400/30 focus:border-emerald-400/60 focus:bg-emerald-400/5 focus:shadow-[0_0_25px_rgba(34,255,136,0.15)]";

// // =====================================
// // CONTACT SECTION
// // =====================================

// export function Contact() {
//   const reduceMotion = useReducedMotion();
//   const initialState = reduceMotion ? "show" : "hidden";

//   const [status, setStatus] = useState<Status>("idle");
//   const timers = useRef<number[]>([]);

//   useEffect(() => {
//     const list = timers.current;
//     return () => list.forEach((id) => window.clearTimeout(id));
//   }, []);

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (status !== "idle") return;

//     const form = event.currentTarget;
//     setStatus("sending");

//     // Ekhane pore tomar real send logic (API / EmailJS) boshate paro
//     const t1 = window.setTimeout(() => {
//       setStatus("sent");
//       form.reset();

//       const t2 = window.setTimeout(() => setStatus("idle"), 4500);
//       timers.current.push(t2);
//     }, 1200);
//     timers.current.push(t1);
//   };

//   return (
//     <section
//       id="contact"
//       className="relative isolate overflow-hidden bg-[#03070a] py-24 md:py-32"
//     >
//       {/* ============ BACKGROUND ============ */}

//       {/* Background image (file: public/bg-mane.png) */}

//       {/* Desktop / tablet: pura image */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 hidden bg-cover bg-center bg-no-repeat md:block"
//         style={{ backgroundImage: "url('/bg-mane.png')" }}
//       />

//       {/* Mobile: image er bam ar dan dik alada kore mix kora */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 md:hidden"
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-no-repeat"
//           style={{
//             backgroundImage: "url('/bg-mane.png')",
//             backgroundPosition: "right center",
//           }}
//         />
//         <div
//           className="absolute inset-0 bg-cover bg-no-repeat mix-blend-screen"
//           style={{
//             backgroundImage: "url('/bg-mane.png')",
//             backgroundPosition: "left center",
//           }}
//         />
//       </div>

//       {/* Dark overlay (text porar jonno) */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 bg-[#03070a]/30 md:bg-[#03070a]/45"
//       />

//       {/* Floating glow orbs (slowly moving) */}
//       {!reduceMotion && (
//         <>
//           <motion.div
//             aria-hidden="true"
//             animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//             transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//             className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-emerald-500/20 blur-[120px]"
//           />
//           <motion.div
//             aria-hidden="true"
//             animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
//             transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
//             className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[380px] w-[380px] rounded-full bg-purple-600/25 blur-[130px]"
//           />
//         </>
//       )}

//       {/* Top & bottom fade */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#03070a]/80 via-transparent to-[#03070a]/80"
//       />

//       {/* ============ CONTENT ============ */}
//       <div className="relative mx-auto max-w-3xl px-4 text-left md:px-6">
//         {/* Label */}
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease }}
//           className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 shadow-[0_0_25px_rgba(34,255,136,0.15)] backdrop-blur-md"
//         >
//           <motion.span
//             animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
//             transition={{ duration: 1.6, repeat: Infinity }}
//             className="flex"
//           >
//             <Terminal size={15} className="text-emerald-400" />
//           </motion.span>
//           <span className="font-mono text-[15px] font-bold uppercase tracking-[0.2em] text-emerald-300">
//             Contact
//           </span>
//         </motion.div>

//         {/* Title (word by word) */}
//         <motion.h2
//           variants={titleContainer}
//           initial={initialState}
//           whileInView="show"
//           viewport={{ once: true, amount: 0.5 }}
//           className="text-3xl font-black uppercase italic leading-tight tracking-tight text-white md:text-5xl"
//         >
//           {titleWords.map((word) => (
//             <Fragment key={word}>
//               <motion.span variants={titleWord} className="inline-block">
//                 {word}
//               </motion.span>{" "}
//             </Fragment>
//           ))}
//           <motion.span
//             variants={titleWord}
//             className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text pr-2 text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
//           >
//            together
//           </motion.span>
//         </motion.h2>

//         {/* Description */}
//         <motion.p
//           initial={reduceMotion ? false : { opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="mt-5 text-slate-400"
//         >
//           Have a project in mind? Need an e-commerce store or a website for your
//           business? Send me a message and I'll get back to you soon.
//         </motion.p>

//         {/* Animated underline (with moving shine) */}
//         <motion.div
//           initial={reduceMotion ? false : { width: 0 }}
//           whileInView={{ width: 90 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.7 }}
//           className="relative mt-7 h-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
//         >
//           {!reduceMotion && (
//             <motion.span
//               aria-hidden="true"
//               animate={{ x: ["-100%", "250%"] }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatDelay: 1.5,
//                 ease: "easeInOut",
//               }}
//               className="absolute inset-y-0 w-8 bg-white/70 blur-[2px]"
//             />
//           )}
//         </motion.div>

//         {/* Form card (terminal style) */}
//         <motion.div
//           variants={cardIn}
//           initial={initialState}
//           whileInView="show"
//           viewport={{ once: true, amount: 0.15 }}
//           className="relative mt-10 overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 text-left shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-500 hover:border-emerald-400/35"
//         >
//           {/* Scanning line */}
//           {!reduceMotion && (
//             <motion.div
//               aria-hidden="true"
//               animate={{ top: ["0%", "100%"] }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "linear",
//                 repeatDelay: 1.5,
//               }}
//               className="pointer-events-none absolute left-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
//             />
//           )}

//           {/* Terminal title bar */}
//           <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-3">
//             <div className="flex items-center gap-1.5">
//               <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
//               <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
//               <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
//             </div>
//             <span className="font-mono text-[11px] text-slate-500">
//               new-message.ts
//             </span>
//           </div>

//           <form className="space-y-4 p-6 md:p-8" onSubmit={handleSubmit}>
//             <div className="grid gap-4 sm:grid-cols-2">
//               <motion.div variants={fromLeft}>
//                 <input
//                   required
//                   type="text"
//                   name="name"
//                   placeholder="Your name"
//                   className={inputClass}
//                 />
//               </motion.div>

//               <motion.div variants={fromRight}>
//                 <input
//                   required
//                   type="email"
//                   name="email"
//                   placeholder="Your email"
//                   className={inputClass}
//                 />
//               </motion.div>
//             </div>

//             <motion.div variants={fromBottom}>
//               <textarea
//                 required
//                 rows={5}
//                 name="message"
//                 placeholder="Tell me about your project..."
//                 className={`${inputClass} resize-none`}
//               />
//             </motion.div>

//             <motion.div
//               variants={fromBottom}
//               className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
//             >
//               {/* Submit button (pulse ring + shine) */}
//               <div className="relative">
//                 {!reduceMotion && status === "idle" && (
//                   <motion.span
//                     aria-hidden="true"
//                     animate={{ scale: [1, 1.18], opacity: [0.55, 0] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
//                     className="pointer-events-none absolute inset-0 rounded-full border-2 border-emerald-400"
//                   />
//                 )}

//                 <motion.button
//                   type="submit"
//                   disabled={status !== "idle"}
//                   whileHover={reduceMotion || status !== "idle" ? undefined : { y: -3 }}
//                   whileTap={reduceMotion || status !== "idle" ? undefined : { scale: 0.96 }}
//                   className="group relative inline-flex min-w-[10.5rem] items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-400 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-90"
//                 >
//                   {/* Shine */}
//                   <span
//                     aria-hidden="true"
//                     className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/40 transition-transform duration-700 group-hover:translate-x-[400%]"
//                   />

//                   <motion.span
//                     key={status}
//                     initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 18 }}
//                     className="relative flex items-center gap-2"
//                   >
//                     {status === "idle" && (
//                       <>
//                         <Mail className="h-4 w-4" /> Send Message
//                       </>
//                     )}

//                     {status === "sending" && (
//                       <>
//                         <motion.span
//                           animate={
//                             reduceMotion
//                               ? undefined
//                               : { x: [0, 26], y: [0, -14], opacity: [1, 0] }
//                           }
//                           transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
//                           className="flex"
//                         >
//                           <Send className="h-4 w-4" />
//                         </motion.span>
//                         Sending...
//                       </>
//                     )}

//                     {status === "sent" && (
//                       <>
//                         <Check className="h-4 w-4" strokeWidth={3} /> Message Sent
//                       </>
//                     )}
//                   </motion.span>
//                 </motion.button>
//               </div>

//               {/* Success message */}
//               {status === "sent" && (
//                 <motion.p
//                   role="status"
//                   initial={reduceMotion ? false : { opacity: 0, x: -12 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5, ease }}
//                   className="font-mono text-xs leading-relaxed text-emerald-300"
//                 >
//                   $ Thanks for your message! Mahedi will get back to you soon.
//                 </motion.p>
//               )}
//             </motion.div>
//           </form>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


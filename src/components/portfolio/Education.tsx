"use client";

import { GraduationCap, Building2, BookOpen, Landmark, MapPin, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// =====================================
// EDUCATION DATA (ekhane edit koro)
// =====================================

const education = [
  {
    number: "01",
    file: "diploma.",
    examination: "Diploma in Engineering",
    institute: "Borak Polytechnic Institute",
    address: "Ashulia, Savar, Dhaka",
    department: "Computer Science and Technology",
    board: "BTEB",
    result: "Waiting for Final Exam & Result",
    ongoing: true,
    color: "#22FF88",
    // Diploma te ja ja shikhecho (edit koro)
    learned: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Databases"],
  },
  {
    number: "02",
    file: "ssc.",
    examination: "SSC",
    institute: "Alokdia High School",
    address: "Madhupur, Tangail",
    department: "Science",
    board: "Dhaka",
    result: "0.00",
    ongoing: false,
    color: "#2DE6B4",
    learned: [] as string[],
  },
];

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
// EDUCATION CARD (taller flex row)
// =====================================

function EducationCard({ item, index }: { item: (typeof education)[number]; index: number }) {
  const reduceMotion = useReducedMotion();

  const chips = [
    { icon: Building2, value: item.institute },
    { icon: MapPin, value: item.address },
    { icon: BookOpen, value: item.department },
    { icon: Landmark, value: item.board },
  ];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#070d0b]/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_45px_rgba(34,255,136,0.18)]">
        {/* Terminal title bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] text-slate-500 transition-colors duration-300 group-hover:text-emerald-300">
            {item.file}
          </span>
        </div>

        {/* Glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-25"
          style={{ backgroundColor: item.color }}
        />

        {/* Flex row */}
        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-8 md:px-9 md:py-10">
          {/* Icon */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="shrink-0"
          >
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl border"
              style={{
                backgroundColor: `${item.color}14`,
                borderColor: `${item.color}40`,
                boxShadow: `0 0 28px ${item.color}22`,
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
                  style={{ borderColor: item.color }}
                />
              )}
              <GraduationCap
                size={36}
                strokeWidth={1.8}
                className="relative"
                style={{ color: item.color }}
              />
            </div>
          </motion.div>

          {/* Main info */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-extrabold italic tracking-tight text-white md:text-3xl">
                {item.examination}
              </h3>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${
                  item.ongoing
                    ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                    : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  {item.ongoing && !reduceMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      item.ongoing ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                </span>
                {item.ongoing ? "Ongoing" : "Completed"}
              </span>
            </div>

            {/* Info chips */}
            <div className="mt-5 flex flex-wrap gap-3">
              {chips.map((c) => {
                const ChipIcon = c.icon;
                return (
                  <span
                    key={c.value}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs font-semibold"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      backgroundColor: `${item.color}0D`,
                    }}
                  >
                    <ChipIcon size={14} />
                    {c.value}
                  </span>
                );
              })}
            </div>

            {/* What I learned */}
            {item.learned.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {"// What I learned"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.learned.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.08 }}
                      transition={{
                        delay: 0.4 + i * 0.07,
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                      }}
                      className="cursor-default rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 transition-colors duration-300 hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result (right side) */}
          <div className="shrink-0 border-t border-dashed border-white/10 pt-5 md:min-w-[180px] md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {"// GPA / CGPA"}
            </p>
            {item.ongoing ? (
              <span
                className="inline-block max-w-[210px] rounded-md border px-3 py-1.5 font-mono text-xs font-semibold leading-snug"
                style={{
                  color: "#fcd34d",
                  borderColor: "#fcd34d40",
                  backgroundColor: "#fcd34d0D",
                }}
              >
                {item.result}
              </span>
            ) : (
              <p
                className="font-mono text-4xl font-black leading-none md:text-5xl"
                style={{ color: item.color, textShadow: `0 0 24px ${item.color}65` }}
              >
                {item.result}
                <span className="ml-1.5 text-sm font-medium text-slate-500">/ 5.00</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: item.color, boxShadow: `0 0 14px ${item.color}` }}
        />
      </div>
    </motion.div>
  );
}

// =====================================
// MAIN EDUCATION SECTION
// =====================================

export function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="relative isolate overflow-hidden bg-[#03070a] py-24 md:py-28">
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#03070a]/80 via-transparent to-[#03070a]/80"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading */}
        <div className="mb-12 max-w-3xl text-left">
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
              Education
            </span>
          </motion.div>

          <motion.h2
            variants={titleContainer}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl font-black uppercase italic leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <motion.span variants={titleWord} className="mr-[0.25em] inline-block">
              My
            </motion.span>
            <motion.span
              variants={titleWord}
              className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text pr-2 text-transparent drop-shadow-[0_0_25px_rgba(34,255,136,0.35)]"
            >
              Education
            </motion.span>
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 max-w-xl text-sm leading-7 text-slate-400 md:text-base"
          >
            My academic journey and the foundation behind my skills.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={{ width: 90 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative mt-6 h-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 shadow-[0_0_16px_rgba(34,255,136,0.7)]"
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

        {/* Cards (full-width stack) */}
        <div className="flex flex-col gap-6">
          {education.map((item, index) => (
            <EducationCard key={item.examination} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
// import { GraduationCap } from "lucide-react";

// // ===== Edit your education details here =====
// const education = [
//   {
//     title: "Diploma in Web Development",
//     description:
//       "Completed with hands-on training in frontend and backend technologies — HTML, CSS, JavaScript, React, Node.js, and databases.",
//   },
// ];

// export function Education() {
//   return (
//     <section id="education" className="section-pad">
//       <div className="mx-auto max-w-6xl px-4 md:px-6">
//         <p className="text-sm font-semibold uppercase tracking-widest text-primary">Education</p>
//         <h2 className="mt-2 text-3xl font-bold md:text-4xl">My education</h2>
//         <div className="mt-10 space-y-4">
//           {education.map((e) => (
//             <div
//               key={e.title}
//               className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
//             >
//               <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-primary" />
//               <div>
//                 <p className="font-semibold">{e.title}</p>
//                 <p className="text-sm text-muted-foreground">{e.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

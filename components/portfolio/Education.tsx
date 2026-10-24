import { GraduationCap } from "lucide-react";

// ===== Edit your education details here =====
const education = [
  {
    title: "Diploma in Web Development",
    description:
      "Completed with hands-on training in frontend and backend technologies — HTML, CSS, JavaScript, React, Node.js, and databases.",
  },
];

export function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Education</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">My education</h2>
        <div className="mt-10 space-y-4">
          {education.map((e) => (
            <div
              key={e.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">{e.title}</p>
                <p className="text-sm text-muted-foreground">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

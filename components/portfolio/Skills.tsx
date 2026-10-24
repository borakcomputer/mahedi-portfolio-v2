import { Code2, Database, Layout, Smartphone } from "lucide-react";

// ===== Edit your skills here =====
const skills = [
  { icon: Code2, name: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
  { icon: Layout, name: "UI Design", items: ["Tailwind CSS", "Responsive Design", "Figma"] },
  { icon: Database, name: "Backend", items: ["Node.js", "REST APIs", "Databases"] },
  { icon: Smartphone, name: "Tools", items: ["Git & GitHub", "VS Code", "Deployment"] },
];

export function Skills() {
  return (
    <section id="skills" className="section-pad bg-card">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Skills</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">What I work with</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <s.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-semibold">{s.name}</h3>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

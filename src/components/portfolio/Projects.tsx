import { ShoppingCart, Layout, Code2 } from "lucide-react";

// ===== Edit your projects here =====
const projects = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    description:
      "A full-featured online store with product listings, shopping cart, secure checkout, and order management — built for a smooth shopping experience on any device.",
    tags: ["React", "Node.js", "Payments", "Responsive"],
  },
  {
    icon: Layout,
    title: "Business Landing Page",
    description:
      "A fast, modern landing page for a small business with clear calls to action, service sections, and a contact form.",
    tags: ["HTML/CSS", "JavaScript", "SEO"],
  },
  {
    icon: Code2,
    title: "Personal Dashboard",
    description:
      "A clean dashboard app for tracking tasks and stats, with interactive charts and a mobile-friendly layout.",
    tags: ["React", "Charts", "Tailwind"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Projects</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Selected work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

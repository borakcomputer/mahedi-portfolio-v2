import { ShoppingCart } from "lucide-react";

export function About() {
  return (
    <section id="about" className="section-pad bg-card">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">A developer who cares about results</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="leading-relaxed text-muted-foreground">
            I'm Mahedi, a web developer living in America. I completed my
            diploma in web development and since then I've been building
            real projects — most recently a complete e-commerce website with
            cart, checkout, and product management. I focus on clean code,
            fast loading pages, and designs that look great on every screen.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5">
              <ShoppingCart className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">E-Commerce Specialist</p>
                <p className="text-sm text-muted-foreground">
                  Built a full online store from scratch — products, cart, checkout, and orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

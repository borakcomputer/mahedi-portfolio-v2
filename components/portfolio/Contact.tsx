import { Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="section-pad bg-card">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Let's build something together</h2>
        <p className="mt-4 text-muted-foreground">
          Have a project in mind? Need an e-commerce store or a website for your
          business? Send me a message and I'll get back to you soon.
        </p>
        <form
          className="mt-10 space-y-4 text-left"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for your message! Mahedi will get back to you soon.");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <textarea
            required
            rows={5}
            placeholder="Tell me about your project..."
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

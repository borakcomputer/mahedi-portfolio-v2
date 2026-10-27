import {
  ArrowUp,
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

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0b0b0f] text-slate-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-x-8 md:px-6 md:py-14 lg:grid-cols-3 lg:gap-x-12">
        <div>
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight text-primary md:text-[1.75rem]"
          >
            MD: Mahedi Hasan
          </a>
          <p className="mt-1 font-medium text-primary/90">Web Developer</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            I build clean, fast, modern websites — from e-commerce stores to business pages.
            Let&apos;s make your next idea work on the web.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3">
            {quickLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Connect</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                style={{ color }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 motion-reduce:transform-none"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-400">
            <a
              href="mailto:mdmahedihasanadil749@gmail.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">mdmahedihasanadil749@gmail.com</span>
            </a>
            <a
              href="tel:+8801949853773"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 shrink-0" />
              01949853773
            </a>
          </div>
          <a
            href="https://wa.me/8801949853773"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
            Message me on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-6">
          <p className="text-base font-semibold  hover:text-primary">Mahedi Hasan</p>
          <p>© {new Date().getFullYear()} — Web Developer, America. All rights reserved.</p>
          <a href="#home" className="transition-colors hover:text-slate-300">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

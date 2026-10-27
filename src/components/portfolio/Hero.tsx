import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
} from "lucide-react";
import adilImage from "../../img/adil.png";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/borakcomputer", icon: Github, color: "var(--foreground)" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin, color: "#0A66C2" },
  { label: "Facebook", href: "https://www.facebook.com/mdmahedihasan.adil.3", icon: Facebook, color: "#0866FF" },
  { label: "Instagram", href: "https://www.instagram.com/mdmahedihasanadil/", icon: Instagram, color: "#E4405F" },
  { label: "WhatsApp", href: "https://wa.me/01949853773", icon: MessageCircle, color: "#25D366" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-bg-gradient absolute inset-0" />
        <div className="hero-bg-float absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="hero-bg-float-delayed absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-15 px-4 py-20 md:grid-cols-2 md:px-6 md:py-32">
        <div>
          <p className="mb-3 inline-flex animate-in fade-in slide-in-from-bottom-3 duration-700 motion-reduce:animate-none items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Based in America
          </p>
          <h1 className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100 motion-reduce:animate-none text-4xl font-bold leading-tight md:text-5xl">
            Hi,<br /> I'm{" "}
            <span className="hero-name-shimmer">MAHEDI</span> HASAN
            <br />
            I build websites that work.
          </h1>
          <p className="mt-5 max-w-lg animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 motion-reduce:animate-none text-base leading-relaxed text-muted-foreground md:text-lg">
            A web developer with a diploma in hand and a passion for clean,
            fast, modern websites — from e-commerce stores to business pages.
          </p>
          <div className="mt-8 flex animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300 motion-reduce:animate-none flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-6 flex animate-in fade-in slide-in-from-bottom-3 duration-700 delay-500 motion-reduce:animate-none items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                style={{ color }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-current hover:bg-secondary hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm animate-in fade-in zoom-in-95 duration-700 delay-200 motion-reduce:animate-none">
          <div className="absolute -inset-4 animate-pulse rounded-3xl bg-primary/10 blur-2xl motion-reduce:animate-none" />
          <div className="relative flex aspect-square items-center justify-center rounded-3xl border border-border bg-card text-center shadow-xl transition-transform duration-500 hover:-translate-y-1">
            <div>
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-primary/20 bg-primary/10 shadow-lg">
                <img  src={adilImage} alt="Mahedi Hasan" className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-lg font-semibold">Mahedi Hasan</p>
              <p className="text-sm text-muted-foreground">Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

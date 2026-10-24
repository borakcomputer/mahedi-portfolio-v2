import { FolderKanban, GraduationCap, House, Mail, Menu, UserRound, Wrench, X } from "lucide-react";
import { useState } from "react";
import adilImage from "../../img/adil.png";

// ===== Edit your nav links here =====
const links = [
  { href: "#home", label: "Home", icon: House },
  { href: "#about", label: "About", icon: UserRound },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-enter fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 transition-transform duration-300 hover:scale-110">
            <img
              src={adilImage}
              alt="mahedi"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </span>
          <span>
            MAHEDI HASAN<span className="text-primary">.</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(({ href, label, icon: Icon }, index) => (
            <a
              key={href}
              href={href}
              style={{ animationDelay: `${index * 70 + 150}ms` }}
              className="navbar-link-enter group relative inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </a>
          ))}
          <a
            href="#contact"
            style={{ animationDelay: `${links.length * 70 + 150}ms` }}
            className="navbar-link-enter rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
          >
            contact me{" "}
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"

          onClick={() => {
            console.log("Menu button clicked");
            setOpen((prev) => !prev);
          }}
          
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="animate-in fade-in slide-in-from-top-2 duration-200 border-t border-border bg-background px-4 py-4 md:hidden motion-reduce:animate-none"
        >
          {links.map(({ href, label, icon: Icon }, index) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${index * 60}ms` }}
              className="navbar-link-enter flex min-h-11 items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:bg-secondary hover:text-foreground motion-reduce:transform-none motion-reduce:transition-none"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

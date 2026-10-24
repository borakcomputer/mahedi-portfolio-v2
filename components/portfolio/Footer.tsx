export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-6">
        <p className="font-semibold text-foreground">
          Mahedi Hasan<span className="text-primary">.</span>
        </p>
        <p className="text-center">© {new Date().getFullYear()} Mahedi — Web Developer, America. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#about" className="transition-colors hover:text-foreground">About</a>
          <a href="#projects" className="transition-colors hover:text-foreground">Projects</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

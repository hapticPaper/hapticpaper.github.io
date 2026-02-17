import type { ReactNode } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Background />
      <header className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-10">
        <div className="leading-tight">
          <NavLink to="/" className="heading-serif text-lg font-semibold tracking-tight">
            hapticpaper
          </NavLink>
          <div className="mt-1 text-sm text-[color:var(--muted)]">bio • projects • generated • cv</div>
        </div>
        <nav className="flex items-center gap-1 text-sm">
          <TopNavLink to="/projects">Projects</TopNavLink>
          <TopNavLink to="/generated">Generated</TopNavLink>
          <TopNavLink to="/cv">CV</TopNavLink>
          <a
            href="https://github.com/hapticPaper"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg px-3 py-2 text-[color:var(--muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="relative mx-auto w-full max-w-5xl px-6 pb-16">{children}</main>

      <footer className="relative mx-auto w-full max-w-5xl px-6 pb-12 text-sm text-[color:var(--muted)]">
        <div className="border-t border-[color:var(--border)] pt-8">
          <span className="font-medium text-[color:var(--text)]">hapticpaper</span>
          <span className="mx-2">•</span>
          <span>Built with MDX</span>
        </div>
      </footer>
    </div>
  );
}

function TopNavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "rounded-lg px-3 py-2 text-[color:var(--muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]",
          isActive && "bg-[color:var(--surface)] text-[color:var(--text)]",
        )
      }
    >
      {children}
    </NavLink>
  );
}

function Background() {
  // The background gradient is defined in `globals.css` under `.app-background`.
  return (
    <div
      aria-hidden
      className="app-background pointer-events-none fixed inset-0 -z-10"
    />
  );
}

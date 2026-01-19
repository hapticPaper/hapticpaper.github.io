import type { ReactNode } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Background />
      <header className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-10">
        <div className="leading-tight">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">
            hapticpaper
          </NavLink>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">bio • projects • cv</div>
        </div>
        <nav className="flex items-center gap-1 text-sm">
          <TopNavLink to="/projects">Projects</TopNavLink>
          <TopNavLink to="/cv">CV</TopNavLink>
          <a
            href="https://github.com/hapticPaper"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900/70 dark:hover:text-zinc-50"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="relative mx-auto w-full max-w-5xl px-6 pb-16">{children}</main>

      <footer className="relative mx-auto w-full max-w-5xl px-6 pb-12 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">hapticpaper</span>
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
          "rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900/70 dark:hover:text-zinc-50",
          isActive && "bg-zinc-100 text-zinc-950 dark:bg-zinc-900/70 dark:text-zinc-50",
        )
      }
    >
      {children}
    </NavLink>
  );
}

function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_20%_-10%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(244,114,182,0.18),transparent_55%),radial-gradient(800px_circle_at_20%_90%,rgba(52,211,153,0.14),transparent_55%)]"
    />
  );
}

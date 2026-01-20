import type { ReactNode } from "react";

export function MdxPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <article>
      <header className="mb-10">
        <h1 className="heading-serif text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-pretty text-lg text-[color:var(--muted)]">{subtitle}</p>}
      </header>
      <div className="prose max-w-none">{children}</div>
    </article>
  );
}

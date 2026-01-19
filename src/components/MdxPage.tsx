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
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
      </header>
      <div className="prose prose-zinc max-w-none dark:prose-invert">{children}</div>
    </article>
  );
}

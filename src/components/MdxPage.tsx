import type { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";

import { mdxComponents } from "@/mdx/components";

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
    <MDXProvider components={mdxComponents}>
      <article>
        <header className="mb-10">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
        </header>
        <div className="prose prose-zinc max-w-none dark:prose-invert">{children}</div>
      </article>
    </MDXProvider>
  );
}

import clsx from "clsx";
import { Link } from "react-router-dom";

import type { ProjectEntry } from "@/content/projects";

export function ProjectCard({ project, className }: { project: ProjectEntry; className?: string }) {
  const { frontmatter } = project;

  return (
    <article className={clsx("rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/30", className)}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            <Link className="hover:underline" to={`/projects/${project.slug}`}>
              {frontmatter.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{frontmatter.blurb}</p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <Link
            to={`/projects/${project.slug}`}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
          >
            Read
          </Link>
          {frontmatter.url && (
            <a
              href={frontmatter.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
            >
              Visit
            </a>
          )}
        </div>
      </div>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2 sm:hidden">
        <Link
          to={`/projects/${project.slug}`}
          className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
        >
          Read
        </Link>
        {frontmatter.url && (
          <a
            href={frontmatter.url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
          >
            Visit
          </a>
        )}
      </div>
    </article>
  );
}

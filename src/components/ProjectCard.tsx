import { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import type { ProjectEntry } from "@/content/projects";

export function ProjectCard({ project, className }: { project: ProjectEntry; className?: string }) {
  const { frontmatter } = project;
  const [previewError, setPreviewError] = useState(false);
  const previewImage = "previewImage" in frontmatter ? frontmatter.previewImage : undefined;
  const previewAlt = "previewImage" in frontmatter ? frontmatter.previewAlt : undefined;
  const hasPreviewConfigured = Boolean(previewImage);
  const hasPreview = hasPreviewConfigured && !previewError;

  useEffect(() => {
    setPreviewError(false);
  }, [previewImage]);

  return (
    <article
      className={clsx(
        "group overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur",
        className,
      )}
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="card-preview-bg relative aspect-[16/9] w-full overflow-hidden">
          {hasPreview ? (
            <img
              alt={previewAlt ?? `${frontmatter.title} preview`}
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={previewImage}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              onError={() => {
                if (import.meta.env.DEV) {
                  console.warn("Project preview image failed to load", {
                    title: frontmatter.title,
                    src: previewImage,
                  });
                }

                setPreviewError(true);
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4">
              <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-solid)] px-3 py-2 text-xs font-medium text-[color:var(--muted)]">
                {hasPreviewConfigured ? "Preview failed to load" : "Preview coming soon"}
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight">
          <Link className="heading-serif hover:underline" to={`/projects/${project.slug}`}>
            {frontmatter.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{frontmatter.blurb}</p>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-solid)] px-2.5 py-1 text-xs text-[color:var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to={`/projects/${project.slug}`}
            className="rounded-lg bg-[color:var(--text)] px-3 py-2 text-sm font-medium text-[color:var(--background)] hover:opacity-90"
          >
            Read
          </Link>
          {frontmatter.url && (
            <a
              href={frontmatter.url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-solid)] px-3 py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--surface)]"
            >
              Live
            </a>
          )}
          {frontmatter.repo && (
            <a
              href={frontmatter.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-solid)] px-3 py-2 text-sm font-medium text-[color:var(--text)] hover:bg-[color:var(--surface)]"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

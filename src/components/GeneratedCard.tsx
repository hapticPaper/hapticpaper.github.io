import clsx from "clsx";
import { Link } from "react-router-dom";

import type { GeneratedEntry } from "@/content/generated";

export function GeneratedCard({
  entry,
  className,
}: {
  entry: GeneratedEntry;
  className?: string;
}) {
  return (
    <article
      className={clsx(
        "overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur",
        className,
      )}
    >
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight">
          <Link className="heading-serif hover:underline" to={`/generated/${entry.slug}`}>
            {entry.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{entry.blurb}</p>

        <div className="mt-5">
          <Link
            to={`/generated/${entry.slug}`}
            className="inline-flex rounded-lg bg-[color:var(--text)] px-3 py-2 text-sm font-medium text-[color:var(--background)] hover:opacity-90"
          >
            Open
          </Link>
        </div>
      </div>
    </article>
  );
}

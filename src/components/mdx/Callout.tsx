import type { ReactNode } from "react";
import clsx from "clsx";

type CalloutVariant = "note" | "tip" | "warning";

export function Callout({
  title,
  variant = "note",
  children,
}: {
  title?: string;
  variant?: CalloutVariant;
  children: ReactNode;
}) {
  const styles = getVariantStyles(variant);

  return (
    <aside className={clsx("not-prose my-6 rounded-xl border p-4", styles.container)}>
      {(title ?? styles.defaultTitle) && (
        <div className={clsx("mb-2 text-sm font-semibold", styles.title)}>{title ?? styles.defaultTitle}</div>
      )}
      <div className={clsx("prose prose-sm max-w-none prose-zinc dark:prose-invert", styles.body)}>{children}</div>
    </aside>
  );
}

function getVariantStyles(variant: CalloutVariant) {
  switch (variant) {
    case "tip":
      return {
        defaultTitle: "Tip",
        container: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/40",
        title: "text-emerald-900 dark:text-emerald-200",
        body: "text-emerald-950 dark:text-emerald-100",
      };
    case "warning":
      return {
        defaultTitle: "Watch out",
        container: "border-amber-200 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/40",
        title: "text-amber-900 dark:text-amber-200",
        body: "text-amber-950 dark:text-amber-100",
      };
    case "note":
    default:
      return {
        defaultTitle: "Note",
        container: "border-sky-200 bg-sky-50/60 dark:border-sky-900/60 dark:bg-sky-950/40",
        title: "text-sky-900 dark:text-sky-200",
        body: "text-sky-950 dark:text-sky-100",
      };
  }
}

import { Suspense } from "react";
import { Link } from "react-router-dom";

import { getGeneratedBySlug } from "@/content/generated";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function MeteorStrikesPage() {
  const entry = getGeneratedBySlug("meteor-strikes");
  if (!entry) return <NotFoundPage />;

  const Content = entry.Content;

  return (
    <div className="space-y-4">
      <div className="not-prose">
        <Link className="text-sm text-[color:var(--muted)] hover:underline" to="/generated">
          ← Generated
        </Link>
      </div>
      <div className="not-prose">
        <Suspense fallback={<div className="text-sm text-[color:var(--muted)]">Loading...</div>}>
          <Content />
        </Suspense>
      </div>
    </div>
  );
}

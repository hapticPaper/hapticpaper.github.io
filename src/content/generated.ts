import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export type GeneratedEntry = {
  slug: string;
  title: string;
  blurb: string;
  Content: LazyExoticComponent<ComponentType>;
};

export const generated: GeneratedEntry[] = [
  {
    slug: "engulfing-flow",
    title: "The Engulfing Flow",
    blurb: "A fluid-dynamics metaphor for how diverse issues collapse into a binary political channel.",
    Content: lazy(() => import("@/content/engulfing-flow.jsx")),
  },
  {
    slug: "meteor-strikes",
    title: "Meteor strikes over time",
    blurb: "An interactive dashboard of Earth’s impact record across geological time.",
    Content: lazy(() => import("@/content/meteor-strikes.jsx")),
  },
];

const generatedBySlug = new Map(generated.map((entry) => [entry.slug, entry]));

export const featuredGenerated = (() => {
  const entry = generatedBySlug.get("engulfing-flow");
  if (!entry) {
    throw new Error('[content] Featured generated entry not found: "engulfing-flow"');
  }
  return entry;
})();

export function getGeneratedBySlug(slug: string): GeneratedEntry | undefined {
  return generatedBySlug.get(slug);
}

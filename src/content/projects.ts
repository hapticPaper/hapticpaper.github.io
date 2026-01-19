import type { ComponentType } from "react";

import type { MdxModule } from "@/content/mdxTypes";

export type ProjectFrontmatter = {
  title: string;
  blurb: string;
  url?: string;
  repo?: string;
  date?: string;
  tags?: string[];
};

export type ProjectEntry = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  Content: ComponentType<{ components?: Record<string, unknown> }>;
};

const projectModules = import.meta.glob("../../content/projects/*.mdx", { eager: true }) as Record<
  string,
  MdxModule<ProjectFrontmatter>
>;

type ProjectEntryWithSource = ProjectEntry & { sourcePath: string };

const unsortedProjects: ProjectEntryWithSource[] = Object.entries(projectModules).map(([path, mod]) => {
  const slug = path.split("/").pop()?.replace(/\.mdx$/, "") ?? path;
  const fm = mod.frontmatter;
  if (!fm?.title || !fm?.blurb) {
    throw new Error(`Project MDX is missing required frontmatter (title/blurb): ${path}`);
  }

  return {
    sourcePath: path,
    slug,
    frontmatter: fm,
    Content: mod.default,
  };
});

assertUniqueProjectSlugs(unsortedProjects);

export const projects: ProjectEntry[] = unsortedProjects
  .map(({ sourcePath: _sourcePath, ...rest }) => rest)
  .sort((a, b) => {
    const aTime = parseIsoDate(a.frontmatter.date);
    const bTime = parseIsoDate(b.frontmatter.date);
  if (aTime !== bTime) return bTime - aTime;
  return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}

function parseIsoDate(value: string | undefined): number {
  if (!value) return 0;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

class DuplicateProjectSlugError extends Error {
  constructor(slug: string, a: string, b: string) {
    super(
      `Duplicate MDX project slug "${slug}". Slugs are derived from filenames and must be unique. Offenders: ${a} and ${b}`,
    );
    this.name = "DuplicateProjectSlugError";
  }
}

function assertUniqueProjectSlugs(entries: ProjectEntryWithSource[]) {
  const seen = new Map<string, string>();

  for (const entry of entries) {
    const existing = seen.get(entry.slug);
    if (existing) {
      throw new DuplicateProjectSlugError(entry.slug, existing, entry.sourcePath);
    }
    seen.set(entry.slug, entry.sourcePath);
  }
}

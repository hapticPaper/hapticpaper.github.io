import type { ComponentType } from "react";

import type { MdxModule } from "@/content/mdxTypes";

export type ProjectFrontmatterBase = {
  title: string;
  blurb: string;
  // Live deployment URL (optional).
  url?: string;
  // Source repo URL (recommended for GitHub projects you want to showcase).
  repo?: string;
  date?: string;
  tags?: string[];
};

export type ProjectFrontmatterWithPreview = ProjectFrontmatterBase & {
  previewImage: string;
  previewAlt: string;
};

export type ProjectFrontmatter = ProjectFrontmatterBase | ProjectFrontmatterWithPreview;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

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
  // NOTE: Slugs are derived from the MDX filename under content/projects/.
  // They must be globally unique because they map directly to /projects/:slug.
  const slug = path.split("/").pop()?.replace(/\.mdx$/, "") ?? path;
  const fm = mod.frontmatter;
  if (!fm?.title || !fm?.blurb) {
    throw new Error(`Project MDX (slug: "${slug}") is missing required frontmatter (title/blurb): ${path}`);
  }

  if ("previewImage" in fm && (!isNonEmptyString(fm.previewImage) || !isNonEmptyString(fm.previewAlt))) {
    throw new Error(`Project MDX (slug: "${slug}") has previewImage but is missing previewAlt: ${path}`);
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

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projectBySlug.get(slug);
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

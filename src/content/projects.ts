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
  Content: ComponentType;
};

const projectModules = import.meta.glob("../../content/projects/*.mdx", { eager: true }) as Record<
  string,
  MdxModule<ProjectFrontmatter>
>;

export const projects: ProjectEntry[] = Object.entries(projectModules)
  .map(([path, mod]) => {
    const slug = path.split("/").pop()?.replace(/\.mdx$/, "") ?? path;
    const fm = mod.frontmatter;
    if (!fm?.title || !fm?.blurb) {
      throw new Error(`Project MDX is missing required frontmatter (title/blurb): ${path}`);
    }

    return {
      slug,
      frontmatter: fm,
      Content: mod.default,
    };
  })
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

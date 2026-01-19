import type { ComponentType } from "react";

import HomeContent, { frontmatter as homeFrontmatter } from "../../content/home.mdx";
import CvContent, { frontmatter as cvFrontmatter } from "../../content/cv.mdx";

export type PageFrontmatter = {
  title: string;
  subtitle?: string;
};

export type PageEntry = {
  frontmatter: PageFrontmatter;
  Content: ComponentType<{ components?: Record<string, unknown> }>;
};

function requirePageFrontmatter(raw: unknown, source: string): PageFrontmatter {
  const fm = raw as Partial<PageFrontmatter>;
  if (!fm.title) {
    throw new Error(`[content] Page frontmatter is missing required "title" in ${source}`);
  }

  return {
    title: fm.title,
    subtitle: fm.subtitle,
  };
}

export const homePage: PageEntry = {
  frontmatter: requirePageFrontmatter(homeFrontmatter, "content/home.mdx"),
  Content: HomeContent,
};

export const cvPage: PageEntry = {
  frontmatter: requirePageFrontmatter(cvFrontmatter, "content/cv.mdx"),
  Content: CvContent,
};

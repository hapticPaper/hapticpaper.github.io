import type { ComponentType } from "react";

import HomeContent, { frontmatter as homeFrontmatter } from "../../content/home.mdx";
import CvContent, { frontmatter as cvFrontmatter } from "../../content/cv.mdx";

export type PageFrontmatter = {
  title: string;
  subtitle?: string;
};

export type PageEntry = {
  frontmatter: PageFrontmatter;
  Content: ComponentType;
};

export const homePage: PageEntry = {
  frontmatter: homeFrontmatter as PageFrontmatter,
  Content: HomeContent,
};

export const cvPage: PageEntry = {
  frontmatter: cvFrontmatter as PageFrontmatter,
  Content: CvContent,
};

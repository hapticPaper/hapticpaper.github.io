import type { ComponentType } from "react";

export type MdxModule<Frontmatter extends Record<string, unknown>> = {
  default: ComponentType;
  frontmatter?: Frontmatter;
};

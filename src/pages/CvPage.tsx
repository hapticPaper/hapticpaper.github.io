import { MdxPage } from "@/components/MdxPage";
import { cvPage } from "@/content/pages";
import { mdxComponents } from "@/mdx/components";

export function CvPage() {
  const Content = cvPage.Content;

  return (
    <MdxPage title={cvPage.frontmatter.title} subtitle={cvPage.frontmatter.subtitle}>
      <Content components={mdxComponents} />
    </MdxPage>
  );
}

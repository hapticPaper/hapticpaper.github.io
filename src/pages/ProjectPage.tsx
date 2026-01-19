import { useParams } from "react-router-dom";

import { MdxPage } from "@/components/MdxPage";
import { getProjectBySlug } from "@/content/projects";
import { mdxComponents } from "@/mdx/components";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  if (!project) return <NotFoundPage />;

  const Content = project.Content;
  const fm = project.frontmatter;

  return (
    <MdxPage title={fm.title} subtitle={fm.blurb}>
      <div className="not-prose mb-8 flex flex-wrap gap-2">
        {fm.url && (
          <a
            href={fm.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
          >
            Visit site
          </a>
        )}
        {fm.repo && (
          <a
            href={fm.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
          >
            View repo
          </a>
        )}
      </div>
      <Content components={mdxComponents} />
    </MdxPage>
  );
}

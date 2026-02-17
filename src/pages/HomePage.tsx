import { Link } from "react-router-dom";

import { GeneratedCard } from "@/components/GeneratedCard";
import { MdxPage } from "@/components/MdxPage";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredGenerated } from "@/content/generated";
import { homePage } from "@/content/pages";
import { projects } from "@/content/projects";
import { mdxComponents } from "@/mdx/components";

export function HomePage() {
  const Content = homePage.Content;
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-14">
      <MdxPage title={homePage.frontmatter.title} subtitle={homePage.frontmatter.subtitle}>
        <Content components={mdxComponents} />
      </MdxPage>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="heading-serif text-xl font-semibold tracking-tight">Generated content</h2>
          <Link className="text-sm text-[color:var(--muted)] hover:underline" to="/generated">
            See all
          </Link>
        </div>
        <GeneratedCard entry={featuredGenerated} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="heading-serif text-xl font-semibold tracking-tight">Featured projects</h2>
          <Link className="text-sm text-[color:var(--muted)] hover:underline" to="/projects">
            See all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

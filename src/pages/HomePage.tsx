import { Link } from "react-router-dom";

import { MdxPage } from "@/components/MdxPage";
import { ProjectCard } from "@/components/ProjectCard";
import { homePage } from "@/content/pages";
import { projects } from "@/content/projects";

export function HomePage() {
  const Content = homePage.Content;
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-14">
      <MdxPage title={homePage.frontmatter.title} subtitle={homePage.frontmatter.subtitle}>
        <Content />
      </MdxPage>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Featured projects</h2>
          <Link className="text-sm text-zinc-600 hover:underline dark:text-zinc-400" to="/projects">
            See all
          </Link>
        </div>
        <div className="grid gap-4">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

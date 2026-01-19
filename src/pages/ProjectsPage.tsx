import { MdxPage } from "@/components/MdxPage";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export function ProjectsPage() {
  return (
    <MdxPage title="Projects" subtitle="A living index of things I’ve built (or am actively building).">
      <div className="not-prose grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </MdxPage>
  );
}

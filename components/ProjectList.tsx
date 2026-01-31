import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  return (
    <section className="relative z-10 px-6 py-24 sm:py-32 bg-section-band" id="projects">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Work</span>
          <span className="w-8 h-px bg-surface-border" aria-hidden />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight mb-16">
          프로젝트
        </h2>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

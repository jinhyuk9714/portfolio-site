import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <article
        className="project-card opacity-0 relative rounded-2xl border border-surface-border bg-surface-elevated bg-card-gradient p-6 sm:p-8 transition-all duration-300 hover:border-accent/25 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_8px_30px_-8px_rgba(0,0,0,0.4)] overflow-hidden"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <span className="absolute top-5 right-5 text-[10px] font-semibold tabular-nums text-ink-tertiary/60 group-hover:text-accent/70 transition-colors" aria-hidden>
          0{index + 1}
        </span>
        {project.imageUrl ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-surface border border-surface-border">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        ) : (
          <div
            className="w-full aspect-video rounded-xl mb-6 bg-surface border border-surface-border flex items-center justify-center text-ink-tertiary/40 group-hover:text-ink-tertiary/60 transition-colors"
            aria-hidden
          >
            <span className="text-sm font-medium">{project.title}</span>
          </div>
        )}
        <h2 className="text-xl font-semibold text-ink-primary tracking-tight">
          {project.title}
        </h2>
        <p className="mt-3 text-sm text-ink-secondary leading-relaxed line-clamp-2">
          {project.summary}
        </p>
        <p className="mt-5 pt-4 border-t border-surface-border/80 group-hover:border-accent/20 text-xs font-medium text-accent flex items-center gap-1.5 transition-colors">
          <span>자세히 보기</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </p>
      </article>
    </Link>
  );
}

import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const stackColors: Record<string, string> = {
  "Java": "text-terminal-orange",
  "Spring Boot": "text-terminal-green",
  "Spring Boot 3": "text-terminal-green",
  "Spring Security": "text-terminal-green",
  "Spring Data JPA": "text-terminal-green",
  "Spring Events": "text-terminal-green",
  "Spring Cloud Gateway": "text-terminal-green",
  "MySQL": "text-terminal-cyan",
  "PostgreSQL": "text-terminal-cyan",
  "Redis": "text-terminal-red",
  "Docker": "text-terminal-cyan",
  "Kubernetes": "text-terminal-cyan",
  "React": "text-terminal-cyan",
  "TypeScript": "text-terminal-cyan",
  "k6": "text-terminal-purple",
  "RabbitMQ": "text-terminal-orange",
  "JWT": "text-terminal-yellow",
  default: "text-ink-secondary",
};

function getStackColor(tech: string): string {
  return stackColors[tech] || stackColors.default;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const topStacks = project.stack?.slice(0, 4) || [];
  const remainingCount = (project.stack?.length || 0) - 4;

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <article
        className="project-card opacity-0 relative rounded-2xl overflow-hidden transition-all duration-500 hover-lift"
        style={{
          animationDelay: `${index * 0.1}s`,
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-surface-border)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />

        {/* Index number */}
        <div className="absolute top-4 right-4 z-10">
          <span className="font-mono text-xs text-ink-muted group-hover:text-accent/60 transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Image or placeholder */}
        {project.imageUrl ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-surface-card) 0%, transparent 50%)" }} />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] bg-surface overflow-hidden">
            {/* Abstract pattern for projects without images */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center group-hover:border-accent/30 transition-colors duration-500">
                  <svg className="w-8 h-8 text-ink-muted group-hover:text-accent/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="absolute -inset-4 border border-dashed border-surface-border rounded-2xl opacity-50" />
              </div>
            </div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-surface-card) 0%, color-mix(in srgb, var(--color-surface-card) 80%, transparent) 40%, transparent 100%)" }} />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold text-ink-primary tracking-tight group-hover:text-glow-subtle transition-all duration-300">
            {project.title}
          </h2>

          {/* Summary */}
          <p className="mt-3 text-sm text-ink-secondary leading-relaxed line-clamp-2">
            {project.summary}
          </p>

          {/* Tech stack preview */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {topStacks.map((tech) => (
              <span
                key={tech}
                className={`font-mono text-[10px] px-2 py-1 rounded bg-surface-elevated border border-surface-border ${getStackColor(tech)} transition-all duration-300 group-hover:border-surface-border-light`}
              >
                {tech}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="font-mono text-[10px] px-2 py-1 text-ink-muted">
                +{remainingCount}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-surface-border group-hover:border-accent/20 flex items-center justify-between transition-colors duration-300">
            <span className="text-xs font-medium text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
              <span>자세히 보기</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            {/* GitHub icon hint */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -mr-2 text-ink-muted hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub 저장소"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </Link>
  );
}

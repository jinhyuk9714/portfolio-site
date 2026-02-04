import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getDiagramLabel } from "@/data/projects";
import ImageLightbox from "@/components/ImageLightbox";
import MermaidDiagram from "@/components/MermaidDiagram";
import PageTransition from "@/components/PageTransition";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

const stackColors: Record<string, string> = {
  "Java": "text-terminal-orange border-terminal-orange/20",
  "Java 17": "text-terminal-orange border-terminal-orange/20",
  "Java 21": "text-terminal-orange border-terminal-orange/20",
  "Spring Boot": "text-terminal-green border-terminal-green/20",
  "Spring Boot 3": "text-terminal-green border-terminal-green/20",
  "Spring Security": "text-terminal-green border-terminal-green/20",
  "Spring Data JPA": "text-terminal-green border-terminal-green/20",
  "Spring Events": "text-terminal-green border-terminal-green/20",
  "Spring Cloud Gateway": "text-terminal-green border-terminal-green/20",
  "MySQL": "text-terminal-cyan border-terminal-cyan/20",
  "PostgreSQL": "text-terminal-cyan border-terminal-cyan/20",
  "H2": "text-terminal-cyan border-terminal-cyan/20",
  "Redis": "text-terminal-red border-terminal-red/20",
  "Docker": "text-terminal-cyan border-terminal-cyan/20",
  "Kubernetes": "text-terminal-cyan border-terminal-cyan/20",
  "Helm": "text-terminal-cyan border-terminal-cyan/20",
  "React": "text-terminal-cyan border-terminal-cyan/20",
  "React 18": "text-terminal-cyan border-terminal-cyan/20",
  "TypeScript": "text-terminal-cyan border-terminal-cyan/20",
  "Tailwind CSS": "text-terminal-cyan border-terminal-cyan/20",
  "SwiftUI": "text-terminal-orange border-terminal-orange/20",
  "HealthKit": "text-terminal-red border-terminal-red/20",
  "k6": "text-terminal-purple border-terminal-purple/20",
  "RabbitMQ": "text-terminal-orange border-terminal-orange/20",
  "JWT": "text-terminal-yellow border-terminal-yellow/20",
  "Prometheus": "text-terminal-orange border-terminal-orange/20",
  "Nginx": "text-terminal-green border-terminal-green/20",
  "GitHub Actions": "text-ink-secondary border-ink-muted/20",
  "AWS S3": "text-terminal-orange border-terminal-orange/20",
  "Swagger": "text-terminal-green border-terminal-green/20",
  "JaCoCo": "text-terminal-red border-terminal-red/20",
  "Caffeine": "text-terminal-yellow border-terminal-yellow/20",
  "Resilience4j": "text-terminal-purple border-terminal-purple/20",
  "Querydsl": "text-terminal-cyan border-terminal-cyan/20",
  "Testcontainers": "text-terminal-cyan border-terminal-cyan/20",
  "Springdoc OpenAPI": "text-terminal-green border-terminal-green/20",
  default: "text-ink-secondary border-surface-border-light",
};

function getStackColor(tech: string): string {
  return stackColors[tech] || stackColors.default;
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-4 text-lg font-bold mt-14 mb-5 first:mt-0" style={{ color: "var(--color-ink-primary)" }}>
      {icon && <span className="text-accent">{icon}</span>}
      <span className="w-6 h-0.5 shrink-0" style={{ backgroundColor: "var(--color-accent)" }} aria-hidden />
      {children}
    </h2>
  );
}

function OverviewBlock({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className="text-ink-secondary leading-[1.8] text-[15px]"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

function NumberedBlock({ text }: { text: string }) {
  const lines = text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const isNumbered = lines.length > 0 && /^\d+\.\s/.test(lines[0]);

  if (isNumbered) {
    return (
      <ol className="space-y-4">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-4 text-ink-secondary leading-relaxed">
            <span className="font-mono text-sm text-accent shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
            <span>{line.replace(/^\d+\.\s*/, "")}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p className="text-ink-secondary leading-relaxed whitespace-pre-line">
      {text}
    </p>
  );
}

function DiagramBlock({
  title,
  url,
  mermaidCode,
  collapsible = false,
}: {
  title: string;
  url: string | null | undefined;
  mermaidCode?: string | null;
  collapsible?: boolean;
}) {
  const hasMermaid = mermaidCode?.trim();
  const hasUrl = url?.trim();
  if (!hasMermaid && !hasUrl) return null;

  const content = hasMermaid ? (
    <div className="rounded-xl border border-surface-border bg-surface-card p-4 overflow-hidden">
      <MermaidDiagram code={mermaidCode!} />
    </div>
  ) : (
    <div className="relative w-full rounded-xl overflow-hidden bg-surface-card border border-surface-border">
      <ImageLightbox src={url!} alt={title}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url!}
          alt={title}
          className="w-full h-auto object-contain"
        />
      </ImageLightbox>
    </div>
  );

  if (collapsible) {
    return (
      <details className="group mt-10 first:mt-0">
        <summary
          className="flex cursor-pointer list-none items-center gap-3 text-xs font-mono font-semibold uppercase tracking-[0.2em] [&::-webkit-details-marker]:hidden py-3 px-4 rounded-lg transition-colors"
          style={{
            color: "var(--color-ink-primary)",
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-surface-border)",
          }}
        >
          <span className="w-6 h-px shrink-0" style={{ backgroundColor: "var(--color-accent)" }} aria-hidden />
          {title}
          <span className="ml-auto text-accent group-open:rotate-180 transition-transform text-[10px]">▼</span>
        </summary>
        <div className="mt-4">{content}</div>
      </details>
    );
  }

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      {content}
    </>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const diagramLabel = getDiagramLabel(project.diagramType);

  return (
    <PageTransition>
    <main className="relative z-10 flex-1 px-6 py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 15%, transparent 85%, var(--color-surface) 100%)" }} aria-hidden />

      <div className="relative mx-auto max-w-3xl">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-accent transition-colors mb-12 rounded-lg px-4 py-2 -ml-4 hover:bg-surface-elevated border border-transparent hover:border-surface-border"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-mono text-xs">cd ..</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight text-glow-subtle">
            {project.title}
          </h1>

          {/* Tech stack */}
          {project.stack?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`font-mono text-[11px] px-2.5 py-1 rounded border bg-surface-elevated ${getStackColor(tech)}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:scale-[1.02]"
              style={{
                color: "var(--color-ink-primary)",
                backgroundColor: "var(--color-surface-elevated)",
                border: "1px solid var(--color-surface-border-light)",
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all hover:scale-[1.02] hover:shadow-glow"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <span>Live Demo</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </header>

        {/* Content */}
        <article className="prose-custom">
          <SectionTitle>개요</SectionTitle>
          <OverviewBlock text={project.detail} />

          {/* Sections (팀 역할, 학습 목표 등) */}
          {project.sections && project.sections.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.sections.map(({ title, items }) => (
                <div
                  key={title}
                  className="rounded-xl border border-surface-border p-5"
                  style={{ backgroundColor: "var(--color-surface-card)" }}
                >
                  <h3 className="text-sm font-semibold text-ink-primary mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {title}
                  </h3>
                  <ul className="space-y-2.5">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-ink-secondary text-sm leading-relaxed">
                        <span className="text-accent/60 shrink-0 mt-1">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <DiagramBlock title="아키텍처" url={project.diagramUrl} mermaidCode={project.diagramMermaid} />

          {/* ERD - 리스트 형태 또는 단일 */}
          {project.erdDiagrams?.length ? (
            <>
              <SectionTitle>ERD</SectionTitle>
              <div className="space-y-3">
                {project.erdDiagrams.map(({ title, mermaid }) => (
                  <details
                    key={title}
                    className="group rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-surface-card)",
                      border: "1px solid var(--color-surface-border)",
                    }}
                  >
                    <summary
                      className="cursor-pointer list-none px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2"
                      style={{
                        color: "var(--color-ink-primary)",
                        backgroundColor: "var(--color-surface-elevated)",
                      }}
                    >
                      <span className="font-mono text-xs">{title}</span>
                      <span className="text-accent text-[10px] group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <div className="p-4" style={{ borderTop: "1px solid var(--color-surface-border)" }}>
                      <MermaidDiagram code={mermaid} />
                    </div>
                  </details>
                ))}
              </div>
            </>
          ) : (
            <DiagramBlock title="ERD" url={project.erdUrl} mermaidCode={project.erdMermaid} collapsible />
          )}

          {project.sequenceDiagrams?.length ? (
            <>
              <SectionTitle>시퀀스 다이어그램</SectionTitle>
              <div className="space-y-3">
                {project.sequenceDiagrams.map(({ title, mermaid }) => (
                  <details
                    key={title}
                    className="group rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-surface-card)",
                      border: "1px solid var(--color-surface-border)",
                    }}
                  >
                    <summary
                      className="cursor-pointer list-none px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2"
                      style={{
                        color: "var(--color-ink-primary)",
                        backgroundColor: "var(--color-surface-elevated)",
                      }}
                    >
                      <span className="font-mono text-xs">{title}</span>
                      <span className="text-accent text-[10px] group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <div className="p-4" style={{ borderTop: "1px solid var(--color-surface-border)" }}>
                      <MermaidDiagram code={mermaid} />
                    </div>
                  </details>
                ))}
              </div>
            </>
          ) : (
            <DiagramBlock title="시퀀스 다이어그램" url={project.sequenceDiagramUrl} mermaidCode={project.sequenceDiagramMermaid} />
          )}

          {!project.diagramUrl &&
          !project.diagramMermaid &&
          !project.erdUrl &&
          !project.erdMermaid &&
          !project.sequenceDiagramUrl &&
          !project.sequenceDiagramMermaid &&
          !project.sequenceDiagrams?.length ? (
            <>
              <SectionTitle>{diagramLabel}</SectionTitle>
              <p className="text-sm text-ink-tertiary py-10 border border-dashed border-surface-border rounded-xl text-center font-mono">
                // diagram not configured
              </p>
            </>
          ) : null}

          <SectionTitle>문제 원인</SectionTitle>
          <div className="rounded-xl border border-surface-border p-6" style={{ backgroundColor: "var(--color-surface-card)" }}>
            <NumberedBlock text={project.problem} />
          </div>

          <SectionTitle>해결 과정</SectionTitle>
          <div className="rounded-xl border border-surface-border p-6" style={{ backgroundColor: "var(--color-surface-card)" }}>
            <NumberedBlock text={project.solution} />
          </div>

          <SectionTitle>결과</SectionTitle>
          <div className="rounded-xl border border-surface-border p-6" style={{ backgroundColor: "var(--color-surface-card)" }}>
            <NumberedBlock text={project.result} />
          </div>
        </article>

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-surface-border">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-accent transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>다른 프로젝트 보기</span>
          </Link>
        </div>
      </div>
    </main>
    </PageTransition>
  );
}

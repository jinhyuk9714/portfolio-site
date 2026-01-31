import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getDiagramLabel } from "@/data/projects";
import ImageLightbox from "@/components/ImageLightbox";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-tertiary mt-12 mb-4 first:mt-0">
      <span className="w-6 h-px bg-accent/50 shrink-0" aria-hidden />
      {children}
    </h2>
  );
}

/** 개요: 문단(\n\n) 단위로 나누어 표시 */
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
          className="text-ink-secondary leading-[1.75] text-[15px]"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

/** "1. ... 2. ..." 형태 문자열을 번호 목록으로 렌더 */
function NumberedBlock({ text }: { text: string }) {
  const lines = text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const isNumbered = lines.length > 0 && /^\d+\.\s/.test(lines[0]);

  if (isNumbered) {
    return (
      <ol className="list-decimal list-outside pl-6 space-y-3 text-ink-secondary leading-relaxed">
        {lines.map((line, i) => (
          <li key={i} className="pl-1">
            {line.replace(/^\d+\.\s*/, "")}
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

/** 다이어그램 이미지 블록 (제목 + 클릭 시 확대 이미지) */
function DiagramBlock({
  title,
  url,
}: {
  title: string;
  url: string | null | undefined;
}) {
  if (!url) return null;
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className="relative w-full rounded-xl overflow-hidden bg-surface border border-surface-border">
        <ImageLightbox src={url} alt={title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={title}
            className="w-full h-auto object-contain"
          />
        </ImageLightbox>
      </div>
    </>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const diagramLabel = getDiagramLabel(project.diagramType);

  return (
    <main className="relative z-10 flex-1 px-6 py-16 sm:py-24">
      <div className="absolute inset-0 bg-hero-grid bg-grid-sm opacity-30 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-2xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-accent transition-colors mb-10 rounded-full px-4 py-2 -ml-4 hover:bg-surface-elevated"
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
          프로젝트 목록
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight">
          {project.title}
        </h1>

        {project.stack?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-elevated text-ink-secondary border border-surface-border"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        <SectionTitle>개요</SectionTitle>
        <OverviewBlock text={project.detail} />

        <DiagramBlock title="아키텍처" url={project.diagramUrl} />
        <DiagramBlock title="ERD" url={project.erdUrl} />
        <DiagramBlock title="시퀀스 다이어그램" url={project.sequenceDiagramUrl} />

        {!project.diagramUrl && !project.erdUrl && !project.sequenceDiagramUrl ? (
          <>
            <SectionTitle>{diagramLabel}</SectionTitle>
            <p className="text-sm text-ink-tertiary py-8 border border-dashed border-surface-border rounded-xl text-center">
              다이어그램 이미지를 추가하려면 data/projects.ts의 diagramUrl·erdUrl·sequenceDiagramUrl에 이미지 경로를 넣어 주세요.
            </p>
          </>
        ) : null}

        <SectionTitle>문제 원인</SectionTitle>
        <NumberedBlock text={project.problem} />

        <SectionTitle>해결 과정</SectionTitle>
        <NumberedBlock text={project.solution} />

        <SectionTitle>결과</SectionTitle>
        <NumberedBlock text={project.result} />

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-muted transition-colors"
          >
            <span>GitHub</span>
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              <span>데모</span>
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </main>
  );
}

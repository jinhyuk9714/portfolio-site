"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useEffect, useState, useMemo } from "react";

// 기술 스택 카테고리 정의 (핵심만)
const stackCategories: Record<string, string[]> = {
  "Backend": ["Spring Boot 3", "Spring Security", "Redis"],
  "Frontend": ["React 18", "SwiftUI"],
  "Database": ["MySQL", "PostgreSQL"],
  "Infra": ["Docker", "Kubernetes", "GitHub Actions"],
};

// 프로젝트에서 사용된 모든 스택 추출
function getUsedStacks(): string[] {
  const allStacks = projects.flatMap((p) => p.stack);
  return [...new Set(allStacks)];
}

export default function ProjectList() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const usedStacks = useMemo(() => getUsedStacks(), []);

  // 카테고리별로 그룹화 (사용된 스택만)
  const groupedStacks = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const [category, stacks] of Object.entries(stackCategories)) {
      const filtered = stacks.filter((s) => usedStacks.includes(s));
      if (filtered.length > 0) {
        result[category] = filtered;
      }
    }
    return result;
  }, [usedStacks]);

  // 필터링된 프로젝트
  const filteredProjects = useMemo(() => {
    if (selectedStacks.length === 0) return projects;
    return projects.filter((p) =>
      selectedStacks.every((stack) => p.stack.includes(stack))
    );
  }, [selectedStacks]);

  const toggleStack = (stack: string) => {
    setSelectedStacks((prev) =>
      prev.includes(stack)
        ? prev.filter((s) => s !== stack)
        : [...prev, stack]
    );
  };

  const clearFilters = () => setSelectedStacks([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 sm:py-32" id="projects">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 15%, transparent 85%, var(--color-surface) 100%)" }} aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Projects
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-accent/70 to-transparent" aria-hidden />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight">
                프로젝트
              </h2>
              <p className="mt-3 text-ink-secondary max-w-lg">
                문제 해결 과정과 기술적 성과를 담은 프로젝트들입니다.
              </p>
            </div>

            {/* Project count */}
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-bold text-accent">{String(filteredProjects.length).padStart(2, "0")}</span>
              <span className="text-sm text-ink-tertiary">/ {projects.length} projects</span>
            </div>
          </div>

          {/* Filter tags */}
          <div className="mt-8 space-y-4">
            {Object.entries(groupedStacks).map(([category, stacks]) => (
              <div key={category} className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-ink-tertiary w-20 shrink-0">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {stacks.map((stack) => {
                    const isSelected = selectedStacks.includes(stack);
                    const count = projects.filter((p) => p.stack.includes(stack)).length;
                    return (
                      <button
                        key={stack}
                        onClick={() => toggleStack(stack)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                          isSelected
                            ? "bg-accent text-white border-accent"
                            : "bg-surface-elevated border-surface-border hover:border-accent/50"
                        }`}
                        style={{
                          color: isSelected ? "white" : "var(--color-ink-secondary)",
                        }}
                      >
                        {stack}
                        <span className={`ml-1.5 ${isSelected ? "text-white/70" : "text-ink-tertiary"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {selectedStacks.length > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-ink-tertiary hover:text-accent transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                필터 초기화
              </button>
            )}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mt-12">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-2 py-16 text-center">
              <p className="text-ink-tertiary font-mono text-sm">
                // 선택한 조건에 맞는 프로젝트가 없습니다
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-accent hover:underline text-sm"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>

        {/* Bottom decoration */}
        <div className={`mt-20 flex justify-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-4 text-ink-muted">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-surface-border" />
            <span className="font-mono text-xs tracking-wider">EOF</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-surface-border" />
          </div>
        </div>
      </div>
    </section>
  );
}

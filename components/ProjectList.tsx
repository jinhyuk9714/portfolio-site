"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";

export default function ProjectList() {
  const [isVisible, setIsVisible] = useState(false);

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
              <span className="text-3xl font-bold text-accent">{String(projects.length).padStart(2, "0")}</span>
              <span className="text-sm text-ink-tertiary">projects</span>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
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

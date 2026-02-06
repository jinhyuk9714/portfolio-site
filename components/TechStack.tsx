"use client";

import { skillCategories } from "@/data/skills";
import { useEffect, useState } from "react";

export default function TechStack() {
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

    const section = document.getElementById("skills");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 sm:py-32" id="skills">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-surface) 0%, transparent 15%, transparent 85%, var(--color-surface) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Tech Stack
              </span>
            </div>
            <div
              className="flex-1 h-0.5 bg-gradient-to-r from-accent/70 to-transparent"
              aria-hidden
            />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--color-ink-primary)" }}>
            기술 스택
          </h2>
          <p className="mt-3 text-ink-secondary max-w-lg">
            프로젝트에서 사용한 기술들입니다.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <div
              key={category.category}
              className={`rounded-xl p-6 transition-all duration-500 hover-lift ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                backgroundColor: "var(--color-surface-card)",
                border: "1px solid var(--color-surface-border)",
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-semibold" style={{ color: "var(--color-ink-primary)" }}>
                  {category.category}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: "var(--color-ink-secondary)" }}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs" style={{ color: "var(--color-ink-tertiary)" }}>
                        Lv.{skill.level}
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--color-surface-border)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${(skill.level / 5) * 100}%` : "0%",
                          backgroundColor: "var(--color-accent)",
                          transitionDelay: `${index * 100 + 300}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { profile } from "@/data/profile";
import { useEffect, useState } from "react";

const codeLines = [
  { type: "comment", text: "// 백엔드 개발자 성진혁" },
  { type: "code", text: "" },
  { type: "code", text: '<span class="keyword">const</span> <span class="function">developer</span> = {' },
  { type: "code", text: '  <span class="string">name</span>: <span class="string">"성진혁"</span>,' },
  { type: "code", text: '  <span class="string">role</span>: <span class="string">"Backend Developer"</span>,' },
  { type: "code", text: '  <span class="string">skills</span>: [<span class="string">"Spring"</span>, <span class="string">"MSA"</span>, <span class="string">"동시성"</span>],' },
  { type: "code", text: '  <span class="string">passion</span>: <span class="string">"문제 해결과 성능 최적화"</span>' },
  { type: "code", text: "}" },
];

function TerminalLine({ line, index, isVisible }: { line: typeof codeLines[0]; index: number; isVisible: boolean }) {
  return (
    <div
      className={`code-line text-sm transition-all duration-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="text-ink-muted select-none mr-4 w-5 inline-block text-right">{index + 1}</span>
      <span dangerouslySetInnerHTML={{ __html: line.text || "&nbsp;" }} />
    </div>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setShowTerminal(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

      {/* Floating orbs */}
      <div
        className="floating-orb w-[400px] h-[400px] bg-terminal-green/20 top-[-10%] right-[-10%]"
        style={{ animationDelay: "0s" }}
        aria-hidden
      />
      <div
        className="floating-orb w-[300px] h-[300px] bg-terminal-cyan/15 bottom-[10%] left-[-5%]"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />
      <div
        className="floating-orb w-[200px] h-[200px] bg-terminal-purple/10 top-[40%] right-[20%]"
        style={{ animationDelay: "4s" }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="hero-content flex flex-col">
            {/* Status badge */}
            <div
              className={`flex items-center gap-3 mb-8 opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}
            >
              <div className="status-dot" />
              <span className="font-mono text-xs text-terminal-green tracking-wider uppercase">
                Available for work
              </span>
            </div>

            {/* Role tag */}
            {profile.role && (
              <div className={`opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}>
                <span className="inline-block font-mono text-xs px-3 py-1.5 rounded bg-accent-soft border border-accent/20 text-accent tracking-wide uppercase">
                  {profile.role}
                </span>
              </div>
            )}

            {/* Name */}
            <h1
              className={`mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink-primary opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}
            >
              <span className="text-glow-subtle">{profile.name}</span>
            </h1>

            {/* Headline */}
            <p
              className={`mt-6 text-xl sm:text-2xl text-ink-secondary font-light leading-relaxed opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}
            >
              {profile.headline}
            </p>

            {/* Bio */}
            {profile.bio && (
              <p
                className={`mt-4 text-base text-ink-tertiary leading-relaxed max-w-md opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}
              >
                {profile.bio}
              </p>
            )}

            {/* Keywords */}
            {profile.keywords?.length ? (
              <div
                className={`mt-8 flex flex-wrap gap-2 opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}
              >
                {profile.keywords.map((keyword) => (
                  <span key={keyword} className="tech-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            ) : null}

            {/* CTA Buttons */}
            <div
              className={`mt-10 flex flex-wrap gap-4 opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-accent text-surface font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow"
              >
                <span className="relative z-10">프로젝트 보기</span>
                <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-surface-border-light text-ink-secondary font-medium rounded-lg transition-all duration-300 hover:border-accent/40 hover:text-accent"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right: Terminal window */}
          <div
            className={`hidden lg:block transition-all duration-700 ${showTerminal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="terminal-window shadow-card-hover">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="ml-4 font-mono text-xs text-ink-tertiary">developer.ts</span>
              </div>
              <div className="p-6 space-y-1">
                {codeLines.map((line, index) => (
                  <TerminalLine
                    key={index}
                    line={line}
                    index={index}
                    isVisible={showTerminal}
                  />
                ))}
                <div
                  className={`code-line text-sm transition-all duration-300 ${showTerminal ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: `${codeLines.length * 80 + 200}ms` }}
                >
                  <span className="text-ink-muted select-none mr-4 w-5 inline-block text-right">{codeLines.length + 1}</span>
                  <span className="cursor-blink" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 ${isLoaded ? "animate-fade-in" : ""}`}
          style={{ animationDelay: "1.2s" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-tertiary">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

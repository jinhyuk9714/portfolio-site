"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: Command[] = [
    // Navigation
    {
      id: "home",
      label: "홈으로 이동",
      icon: <HomeIcon />,
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
      category: "네비게이션",
    },
    {
      id: "projects",
      label: "프로젝트 섹션으로 이동",
      icon: <ProjectIcon />,
      action: () => {
        router.push("/#projects");
        setIsOpen(false);
      },
      category: "네비게이션",
    },
    // Projects
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      icon: <CodeIcon />,
      action: () => {
        router.push(`/projects/${project.id}`);
        setIsOpen(false);
      },
      category: "프로젝트",
    })),
    // External Links
    {
      id: "github",
      label: "GitHub 프로필",
      shortcut: "G",
      icon: <GitHubIcon />,
      action: () => {
        window.open(profile.githubUrl, "_blank");
        setIsOpen(false);
      },
      category: "링크",
    },
    {
      id: "email",
      label: "이메일 보내기",
      shortcut: "E",
      icon: <EmailIcon />,
      action: () => {
        window.location.href = `mailto:${profile.email}`;
        setIsOpen(false);
      },
      category: "링크",
    },
    // Actions
    {
      id: "resume",
      label: "이력서 다운로드",
      shortcut: "R",
      icon: <DownloadIcon />,
      action: () => {
        if (profile.resumeUrl) {
          window.open(profile.resumeUrl, "_blank");
        }
        setIsOpen(false);
      },
      category: "액션",
    },
    {
      id: "scroll-top",
      label: "맨 위로 스크롤",
      shortcut: "T",
      icon: <ArrowUpIcon />,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
      category: "액션",
    },
  ];

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  const flatFilteredCommands = filteredCommands;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open/Close with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch("");
        setSelectedIndex(0);
      }

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }

      if (!isOpen) return;

      // Navigate with arrows
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < flatFilteredCommands.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : flatFilteredCommands.length - 1
        );
      }

      // Execute with Enter
      if (e.key === "Enter" && flatFilteredCommands[selectedIndex]) {
        e.preventDefault();
        flatFilteredCommands[selectedIndex].action();
      }
    },
    [isOpen, flatFilteredCommands, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-6 z-50 p-3 rounded-xl bg-surface-elevated border border-surface-border hover:border-accent/30 transition-all duration-300 group"
        aria-label="Open command palette (⌘K)"
      >
        <svg
          className="w-5 h-5 text-ink-secondary group-hover:text-accent transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[70]"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[80] w-full max-w-lg mx-4 rounded-xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                border: "1px solid var(--color-surface-border)",
              }}
            >
              {/* Search Input */}
              <div
                className="flex items-center gap-3 px-4 py-4"
                style={{ borderBottom: "1px solid var(--color-surface-border)" }}
              >
                <SearchIcon />
                <input
                  type="text"
                  placeholder="명령어 검색..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--color-ink-primary)" }}
                  autoFocus
                />
                <kbd
                  className="px-2 py-1 rounded text-xs font-mono"
                  style={{
                    backgroundColor: "var(--color-surface-card)",
                    color: "var(--color-ink-tertiary)",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {Object.entries(groupedCommands).map(([category, cmds]) => (
                  <div key={category} className="mb-2">
                    <div
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-ink-tertiary)" }}
                    >
                      {category}
                    </div>
                    {cmds.map((command) => {
                      const globalIndex = flatFilteredCommands.findIndex(
                        (c) => c.id === command.id
                      );
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          onClick={command.action}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                          style={{
                            backgroundColor: isSelected
                              ? "var(--color-accent)"
                              : "transparent",
                            color: isSelected
                              ? "white"
                              : "var(--color-ink-secondary)",
                          }}
                        >
                          <span style={{ opacity: isSelected ? 1 : 0.6 }}>
                            {command.icon}
                          </span>
                          <span className="flex-1 text-sm font-medium">
                            {command.label}
                          </span>
                          {command.shortcut && (
                            <kbd
                              className="px-2 py-0.5 rounded text-xs font-mono"
                              style={{
                                backgroundColor: isSelected
                                  ? "rgba(255,255,255,0.2)"
                                  : "var(--color-surface-card)",
                                color: isSelected
                                  ? "white"
                                  : "var(--color-ink-tertiary)",
                              }}
                            >
                              {command.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {flatFilteredCommands.length === 0 && (
                  <div
                    className="px-4 py-8 text-center text-sm"
                    style={{ color: "var(--color-ink-tertiary)" }}
                  >
                    검색 결과가 없습니다
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-3 text-xs"
                style={{
                  borderTop: "1px solid var(--color-surface-border)",
                  color: "var(--color-ink-tertiary)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-card">↑↓</kbd>
                    이동
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-card">↵</kbd>
                    선택
                  </span>
                </div>
                <span className="font-mono opacity-60">v1.0</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Icons
function SearchIcon() {
  return (
    <svg
      className="w-5 h-5"
      style={{ color: "var(--color-ink-tertiary)" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  );
}

"use client";

import { useLayoutEffect, useState, useRef, useEffect } from "react";
import mermaid from "mermaid";
import { useTheme } from "./ThemeProvider";

const darkThemeVars = {
  primaryColor: "#00ff88",
  primaryTextColor: "#f0f0f5",
  primaryBorderColor: "#2a2a35",
  lineColor: "#55556a",
  secondaryColor: "#0c0c10",
  tertiaryColor: "#050508",
  background: "#050508",
  mainBkg: "#0a0a0e",
  nodeBorder: "#2a2a35",
  clusterBkg: "#0c0c10",
  titleColor: "#f0f0f5",
  edgeLabelBackground: "#0a0a0e",
};

const lightThemeVars = {
  primaryColor: "#047857",
  primaryTextColor: "#111111",
  primaryBorderColor: "#c0c0c0",
  lineColor: "#4b5563",
  secondaryColor: "#f3f4f6",
  tertiaryColor: "#fafafa",
  background: "#fafafa",
  mainBkg: "#ffffff",
  nodeBorder: "#d1d5db",
  clusterBkg: "#f9fafb",
  titleColor: "#111111",
  edgeLabelBackground: "#ffffff",
};

interface MermaidDiagramProps {
  code: string;
  className?: string;
}

export default function MermaidDiagram({ code, className = "" }: MermaidDiagramProps) {
  const { theme } = useTheme();
  const idRef = useRef(
    `mermaid-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`
  );
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  // Re-render when theme changes
  useEffect(() => {
    setRenderKey((k) => k + 1);
  }, [theme]);

  useLayoutEffect(() => {
    if (!code.trim()) return;

    const isDark = theme === "dark";

    // Re-initialize mermaid with current theme
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      themeVariables: isDark ? darkThemeVars : lightThemeVars,
    });

    const renderId = `${idRef.current}-${renderKey}`;

    mermaid
      .render(renderId, code.trim())
      .then(({ svg: result }) => {
        setSvg(result);
        setError(null);
      })
      .catch((err) => {
        setError(err.message ?? "Mermaid 렌더 실패");
        setSvg(null);
      });
  }, [code, theme, renderKey]);

  if (error) {
    return (
      <pre className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400 overflow-x-auto">
        {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="min-h-[200px] rounded-xl border border-surface-border bg-surface p-8 flex items-center justify-center text-ink-tertiary text-sm">
        로딩 중…
      </div>
    );
  }

  return (
    <div
      className={`min-h-[120px] rounded-xl overflow-hidden p-4 [&_svg]:max-w-full [&_svg]:h-auto ${className}`}
      style={{ backgroundColor: "var(--color-surface-card)", borderColor: "var(--color-surface-border)" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

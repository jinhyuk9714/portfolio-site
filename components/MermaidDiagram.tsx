"use client";

import { useLayoutEffect, useState, useRef } from "react";
import mermaid from "mermaid";

let mermaidInitialized = false;
function ensureMermaidInit() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
      primaryColor: "#f59e0b",
      primaryTextColor: "#fafafa",
      primaryBorderColor: "#27272a",
      lineColor: "#71717a",
      secondaryColor: "#141416",
      tertiaryColor: "#0a0a0b",
    },
  });
  mermaidInitialized = true;
}

interface MermaidDiagramProps {
  code: string;
  className?: string;
}

export default function MermaidDiagram({ code, className = "" }: MermaidDiagramProps) {
  const idRef = useRef(
    `mermaid-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`
  );
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!code.trim()) return;

    ensureMermaidInit();
    const renderId = idRef.current;

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
  }, [code]);

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
      className={`min-h-[120px] rounded-xl overflow-hidden bg-surface border border-surface-border p-4 [&_svg]:max-w-full [&_svg]:h-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

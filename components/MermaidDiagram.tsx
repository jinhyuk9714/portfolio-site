"use client";

import { useLayoutEffect, useState, useId } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  code: string;
  className?: string;
}

export default function MermaidDiagram({ code, className = "" }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!code.trim()) return;

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

    const renderId = `mermaid-${id}`;
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
  }, [code, id]);

  if (error) {
    return (
      <pre className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400 overflow-x-auto">
        {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="rounded-xl border border-surface-border bg-surface p-8 text-center text-ink-tertiary text-sm">
        로딩 중…
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl overflow-hidden bg-surface border border-surface-border p-4 [&_svg]:max-w-full [&_svg]:h-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

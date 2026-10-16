"use client";
// components/pipeline-diagram.tsx
// The hero's signature visual: scientific sources on the left flow (animated beams) into a
// central AIScientificLabs node, which then sends verified outputs to the right.
// It shows in one picture what the company does: turn messy scientific data into trusted answers.

import { useRef, forwardRef, type ReactNode } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

// A small labelled node (one source or one output)
const Node = forwardRef<HTMLDivElement, { children: ReactNode; side: "in" | "out" }>(
  function Node({ children, side }, ref) {
    return (
      <div
        ref={ref}
        className={
          "relative z-10 rounded-lg border px-2.5 py-2 text-[0.72rem] leading-tight sm:px-3 sm:text-sm " +
          (side === "in" ? "text-left" : "text-right")
        }
        style={{ borderColor: "var(--hero-line)", background: "color-mix(in srgb, var(--hero-bg) 85%, #000)", color: "var(--hero-ink)" }}
      >
        {children}
      </div>
    );
  }
);

// Data for the diagram
const sources = ["ClinicalTrials.gov", "PubMed literature", "FDA labels & guidance", "Patents", "Lab reports & PDFs"];
const outputs = ["Cited evidence", "Ranked candidates", "Review-ready summaries"];

export function PipelineDiagram() {
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  // one ref per node so each beam knows where to start/end
  const srcRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const outRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  return (
    <div
      ref={container}
      className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6 sm:gap-12"
      role="img"
      aria-label="Diagram: clinical, literature, regulatory, patent and lab data flow into AIScientificLabs, which produces cited evidence, ranked candidates and review-ready summaries."
    >
      {/* left column: sources */}
      <div className="flex flex-col gap-3">
        {sources.map((s, i) => <Node key={s} ref={srcRefs[i]} side="in">{s}</Node>)}
      </div>

      {/* centre: the hub, drawn as a benzene-style hexagon */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div ref={hub}><svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-28 sm:w-28" aria-hidden>
          <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="var(--hero-bg)" stroke="var(--hero-teal)" strokeWidth="2.5" />
          <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="var(--hero-teal)" strokeOpacity=".35" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="var(--signal)" />
        </svg></div>
        <span className="text-center text-[0.7rem] sm:text-xs" style={{ color: "var(--hero-muted)" }}>
          Retrieve, reason, verify
        </span>
      </div>

      {/* right column: outputs */}
      <div className="flex flex-col gap-6">
        {outputs.map((o, i) => <Node key={o} ref={outRefs[i]} side="out">{o}</Node>)}
      </div>

      {/* beams: every source into the hub, then the hub out to every output */}
      {srcRefs.map((r, i) => (
        <AnimatedBeam key={`in-${i}`} containerRef={container} fromRef={r} toRef={hub}
          curvature={(2 - i) * 18} duration={3.6} delay={i * 0.35} />
      ))}
      {outRefs.map((r, i) => (
        <AnimatedBeam key={`out-${i}`} containerRef={container} fromRef={hub} toRef={r}
          curvature={(1 - i) * 16} duration={3.2} delay={1.9 + i * 0.3} />
      ))}
    </div>
  );
}

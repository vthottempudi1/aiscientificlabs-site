"use client";
// components/magicui/animated-beam.tsx
// AnimatedBeam (Magic UI pattern): draws a curved SVG line between two elements on the page
// and sends a glowing gradient "pulse" along it, to show data flowing from one node to another.
// It measures the real positions of the two elements, so the line stays attached on resize.

import { useEffect, useId, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  containerRef: RefObject<HTMLElement | null>; // box that holds both nodes (the SVG covers it)
  fromRef: RefObject<HTMLElement | null>;      // start node
  toRef: RefObject<HTMLElement | null>;        // end node
  curvature?: number;                          // how much the line bends (px, + is up)
  reverse?: boolean;                           // pulse travels end -> start instead
  duration?: number;                           // seconds for one pulse
  delay?: number;                              // seconds before the first pulse
};

export function AnimatedBeam({
  containerRef, fromRef, toRef, curvature = 0, reverse = false, duration = 4, delay = 0,
}: Props) {
  const id = useId();                       // unique id so each beam has its own gradient
  const reduce = useReducedMotion();        // respects the visitor's "reduce motion" setting
  const [path, setPath] = useState("");     // the SVG path string ("M x y Q cx cy x2 y2")
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Measure both elements and compute a quadratic curve between their centres.
  useEffect(() => {
    function update() {
      const c = containerRef.current, a = fromRef.current, b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const x1 = ar.left - cr.left + ar.width / 2;
      const y1 = ar.top - cr.top + ar.height / 2;
      const x2 = br.left - cr.left + br.width / 2;
      const y2 = br.top - cr.top + br.height / 2;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2 - curvature;
      setSize({ w: cr.width, h: cr.height });
      setPath(`M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`);
    }
    update();
    const ro = new ResizeObserver(update);   // recompute whenever the layout changes size
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  // The pulse is a short bright segment of a gradient that slides along the path.
  const start = reverse ? ["110%", "-10%"] : ["-10%", "110%"];
  const end = reverse ? ["100%", "-20%"] : ["0%", "120%"];

  return (
    <svg
      aria-hidden
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className="pointer-events-none absolute inset-0"
    >
      {/* faint base line, always visible */}
      <path d={path} stroke="var(--beam-base)" strokeWidth={1.5} fill="none" />
      {/* animated pulse line, coloured by the moving gradient below */}
      {!reduce && (
        <path d={path} stroke={`url(#${id})`} strokeWidth={2} fill="none" strokeLinecap="round" />
      )}
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{ x1: start, x2: end, y1: ["0%", "0%"], y2: ["0%", "0%"] }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 1.2 }}
        >
          <stop stopColor="var(--teal)" stopOpacity="0" />
          <stop stopColor="var(--teal)" />
          <stop offset="32.5%" stopColor="var(--signal)" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

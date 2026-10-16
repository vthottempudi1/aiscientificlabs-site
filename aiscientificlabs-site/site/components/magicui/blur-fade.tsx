"use client";
// components/magicui/blur-fade.tsx
// BlurFade (Magic UI pattern): content starts slightly blurred and lower, then sharpens into place
// once it scrolls into view. Used only for the hero's single load sequence, not every section.

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Props = { children: ReactNode; delay?: number; className?: string };

export function BlurFade({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>; // no animation if requested

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ delay, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

"use client";
// components/magicui/number-ticker.tsx
// NumberTicker (Magic UI pattern): counts up from 0 to `value` the first time it scrolls into view.
// Used for real project metrics (e.g. RAGAS scores, number of studies indexed).

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type Props = { value: number; decimals?: number; className?: string };

export function NumberTicker({ value, decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);                         // the raw animated number
  const spring = useSpring(motionValue, { damping: 40, stiffness: 90 }); // smooths the count
  const inView = useInView(ref, { once: true, margin: "-40px" }); // start only when visible

  // Formats a number with thousands separators and fixed decimals, e.g. 400,000 or 0.965
  const fmt = (n: number) =>
    Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

  // Kick off the count when the element enters the viewport.
  // The final number is in the HTML (good for Google and no-JS visitors); when it scrolls
  // into view we reset to 0 and count up.
  useEffect(() => {
    if (!inView || reduce) return;
    spring.jump(0);
    motionValue.jump(0);
    motionValue.set(value);
  }, [inView, value, motionValue, spring, reduce]);

  // Write each animated frame straight into the DOM (cheaper than React re-renders).
  useEffect(
    () => spring.on("change", (v) => { if (ref.current) ref.current.textContent = fmt(v); }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring]
  );

  // Visitors who prefer reduced motion simply keep the final number.
  return <span ref={ref} className={className}>{fmt(value)}</span>;
}

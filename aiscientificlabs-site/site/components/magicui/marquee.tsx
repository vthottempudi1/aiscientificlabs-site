// components/magicui/marquee.tsx
// Marquee (Magic UI pattern): a row of items that scrolls sideways forever.
// The children are rendered twice back-to-back so the loop has no visible gap.
// Pauses on hover; stops completely for visitors who prefer reduced motion (see globals.css).

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string; duration?: string };

export function Marquee({ children, className, duration = "40s" }: Props) {
  return (
    <div
      className={cn("marquee group flex overflow-hidden [--gap:2.5rem] [gap:var(--gap)]", className)}
      style={{ ["--duration" as string]: duration }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}            // screen readers only read the first copy
          className="marquee-track flex shrink-0 items-center justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]"
        >
          {children}
        </div>
      ))}
    </div>
  );
}

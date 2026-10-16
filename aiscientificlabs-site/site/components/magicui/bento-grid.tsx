// components/magicui/bento-grid.tsx
// BentoGrid (Magic UI pattern): an asymmetric grid where each tile can span different
// numbers of columns/rows, so the most important project gets the most space.

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The grid container: 1 column on phones, 6 columns on large screens.
export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-6", className)}>{children}</div>;
}

// One tile. Pass span classes like "lg:col-span-4 lg:row-span-2" via className.
export function BentoCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article className={cn("bento-card relative flex flex-col overflow-hidden p-6 sm:p-7", className)}>
      {children}
    </article>
  );
}

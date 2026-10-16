// lib/utils.ts
// cn(): merges Tailwind class names safely (later classes win over earlier conflicting ones).
// This is the same helper Magic UI and shadcn/ui components expect.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

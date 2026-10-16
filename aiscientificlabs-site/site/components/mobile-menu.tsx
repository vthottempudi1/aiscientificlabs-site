"use client";
// components/mobile-menu.tsx
// Menu button for small screens, where the header links are hidden.
// Opens a dropdown of the same section links and closes when one is tapped.

import { useState } from "react";

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center rounded-md border"
        style={{ borderColor: "var(--hero-line)", color: "var(--hero-ink)" }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute right-0 top-12 flex w-48 flex-col rounded-lg border py-2 shadow-lg"
          style={{ background: "var(--hero-bg)", borderColor: "var(--hero-line)" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-[0.95rem] hover:text-white" style={{ color: "var(--hero-muted)" }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

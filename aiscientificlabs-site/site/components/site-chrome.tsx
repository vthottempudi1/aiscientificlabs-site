// components/site-chrome.tsx
// Header and footer shared by every page (home and case studies).
// Section links start with "/" so they also work from a case-study page.

import { site } from "@/lib/site";
import { MobileMenu } from "@/components/mobile-menu";

// Section links in the header (and the phone menu)
const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#lab", label: "Projects" },
  { href: "/#approach", label: "Approach" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
];

// The hexagon logo mark used in the header and footer
export function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
      <path d="M16 3 L27 9.5 L27 22.5 L16 29 L5 22.5 L5 9.5 Z" fill="none" stroke="var(--hero-teal)" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="3.4" fill="var(--signal)" />
    </svg>
  );
}

// Sticky header, same colour as the hero
export function SiteHeader() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ background: "color-mix(in srgb, var(--hero-bg) 88%, transparent)", borderColor: "var(--hero-line)", paddingTop: "env(safe-area-inset-top)" }}>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
          <a href="/" className="flex items-center gap-2.5 font-medium" style={{ color: "var(--hero-ink)" }}>
            <LogoMark />
            <span className="text-[1.05rem] tracking-tight">AIScientificLabs</span>
          </a>
          <div className="hidden items-center gap-7 text-sm md:flex" style={{ color: "var(--hero-muted)" }}>
            {navLinks.map((l) => <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <a href={site.bookingUrl} className="btn-primary !px-4 !py-2 text-sm">Book a call</a>
            <MobileMenu links={navLinks} />
          </div>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ color: "var(--muted)" }}>
        <div className="flex items-center gap-2"><LogoMark /><span>© {new Date().getFullYear()} AIScientificLabs</span></div>
        <div className="flex gap-6">
          <a href={site.links.linkedin} className="hover:underline">LinkedIn</a>
          <a href={site.links.github} className="hover:underline">GitHub</a>
          <a href={`mailto:${site.email}`} className="hover:underline">Email</a>
        </div>
      </div>
    </footer>
  );
}

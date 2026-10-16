// app/layout.tsx
// Root layout: wraps every page. Sets the <html> language, page title and description
// (used by Google and link previews), loads the fonts, and renders the page content.

import type { Metadata, Viewport } from "next";
import "./globals.css";

// SEO + social sharing metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://aiscientificlabs.com"),
  title: "AIScientificLabs | AI systems for drug discovery, clinical and regulatory science",
  description:
    "AIScientificLabs designs and deploys retrieval, agent and molecular AI systems for life-science teams: scientific document intelligence, ADMET and property prediction, clinical trial and regulatory copilots.",
  openGraph: {
    title: "AIScientificLabs",
    description: "Production AI systems for drug discovery, clinical research and regulatory science.",
    url: "https://aiscientificlabs.com",
    siteName: "AIScientificLabs",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

// Lets phones draw edge to edge and sets the browser bar colour
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d1f33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Newsreader (headings), IBM Plex Sans (body), IBM Plex Mono (SMILES/data) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

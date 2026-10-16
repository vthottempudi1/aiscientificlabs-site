# AIScientificLabs website

Next.js + Tailwind CSS + Magic UI-style components (Animated Beam, Bento Grid, Number Ticker,
Blur Fade, Marquee), exported as a static site for free hosting on Cloudflare Pages.

## 1. Edit your details
Open `lib/site.ts` and replace every `TODO` (email, LinkedIn, Medium, Formspree form id, Calendly link).

## 2. Run locally
    npm install
    npm run dev        # open http://localhost:3000

## 3. Deploy (Cloudflare Pages, free)
1. Push this folder to a new GitHub repo (e.g. `aiscientificlabs-site`).
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick the repo.
3. Build settings: Framework preset `Next.js (Static HTML Export)`, build command `npm run build`,
   output directory `out`.
4. After the first deploy: Custom domains > add `aiscientificlabs.com` and `www.aiscientificlabs.com`.
   Cloudflare creates the DNS records automatically.

Every `git push` to the main branch redeploys the site.

## Files
- `app/page.tsx` – all page sections and text
- `app/globals.css` – colours (light + dark), fonts, hexagon pattern
- `components/pipeline-diagram.tsx` – hero data-flow diagram
- `components/contact-form.tsx` – Formspree contact form
- `components/magicui/` – the animated components

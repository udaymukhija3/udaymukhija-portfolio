# Uday Mukhija Portfolio

The homepage is a minimal personal portfolio: a short introduction, one animated berry/terracotta sunrise, and a native expandable project list. The previous `/quiet` preview URL redirects to `/`. The earlier [DAYBREAK implementation](docs/DAYBREAK.md) remains available at `/daybreak`.

The homepage uses self-hosted [Source Sans 3](https://github.com/adobe-fonts/source-sans), with its OFL license in `src/fonts/quiet`. The sunrise reflection responds to pointer movement, taps, and keyboard controls (arrow keys, Enter/Space, Escape), and stays static with reduced motion. Its animation loop stops when settled or offscreen.

An editorial design-engineering portfolio for backend-heavy product systems, data engineering, and applied ML work. The interface itself is a working sample: typography-led composition, a responsive selected-work stage, authored SVG, purposeful motion, a route-local Three.js study, and reduced-motion fallbacks.

The site is organized around one engineering thesis: calm interfaces should be supported by explicit state, access, retry, and failure contracts. The homepage leads with three product experiences: Gathr, VibeGrid, and Murmur. The full archive and case studies keep implementation evidence available without making it the first thing a visitor has to parse.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
```

## Stack

- Next.js 16.3 and React 19.2
- TypeScript in strict mode
- Semantic HTML, modern CSS, native SVG
- Three.js for one lazy-loaded spatial experiment
- Next Image for real project captures
- ESLint with the Next.js Core Web Vitals and TypeScript rules

No component kit, animation package, or analytics script. Space Grotesk and IBM Plex Mono are self-hosted through `next/font/local`, with OFL licenses in `src/fonts/optical`. Instrument Serif remains available for the retained Daybreak treatment.

## Architecture

- Server-rendered routes own page structure, metadata, and factual content.
- `src/data/projects.ts`, `src/data/experiments.ts`, `src/data/resume.ts`, and `src/data/siteContent.ts` are the typed content boundary.
- Client code is limited to the homepage selected-work interaction, global reading progress, and Lab studies.
- `src/app/globals.css` contains the type, spacing, color, responsive, and motion systems.
- Real captures live in `public/images/projects`; category-specific editorial architecture plates remain explicitly labeled when capture media is unavailable.

## Content and media rules

- Project claims live in `src/data/projects.ts`.
- Real product media lives in `public/images/projects`.
- Gathr and VibeGrid use captured product assets from their current repositories.
- Murmur uses a native DOM fragment based on its current product UI, not a fabricated screenshot.
- Projects without media use labeled product, data, or ML evidence plates derived from documented architecture.

`public/llms.txt` is the fast, plain-text project and route index.

## Routes

- `/`: the minimal personal homepage with sunrise and selected work
- `/quiet`: redirects to `/`
- `/projects`: filterable project archive
- `/projects/[slug]`: experience-first case study with technical proof in disclosure
- `/lab`: original SVG, motion, typography, and Three.js experiments
- `/about`: positioning, principles, factual record, and contact
- `/experience`: work history
- `/resume`: resume page and external document link

## Editing content

Add project entries to `src/data/projects.ts`; the archive, detail route generation, metadata, sitemap, and navigation resolve from the same source. Do not expose absent fields or unsupported outcomes. Add implemented experiments to `src/data/experiments.ts`, then render their interactive study in `LabWorkbench.tsx` using the entry slug as the section id.

See `CONTENT_TODO.md` for missing real-world assets and links. `DESIGN_DIRECTION.md` records the visual and interaction rationale; `QUALITY_REPORT.md` records the latest verified checks.

## Deployment and performance

Production is [udaymukhija-portfolio.vercel.app](https://udaymukhija-portfolio.vercel.app), deployed through the repository's Vercel integration. Changes pushed to `main` deploy automatically. A new route only changes its own URL; the root homepage is controlled by `src/app/page.tsx`.

The application is compatible with standard Next.js hosting: install with `npm ci`, build with `npm run build`, and start with `npm start`. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin and optionally set `NEXT_PUBLIC_RESUME_URL`.

All content pages are static except the query-filtered project archive. Image dimensions are declared, homepage animation work is bounded, and the Three.js dependency is isolated behind a near-viewport dynamic import. Its renderer caps pixel density, pauses outside the viewport or in background tabs, respects reduced motion, and disposes GPU resources on cleanup.

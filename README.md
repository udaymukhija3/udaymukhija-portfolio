# Uday Mukhija Portfolio

The homepage is a minimal personal portfolio: a short introduction, one animated ocean sunrise that warms from silver dawn to golden light when you arrive, and a native expandable project list. The previous `/quiet` preview URL redirects to `/`. The earlier [DAYBREAK implementation](docs/DAYBREAK.md) remains available at `/daybreak`.

The homepage uses a Helvetica Neue / Arial system font stack, pure white paper, and black primary text. The sunrise strip has three behaviors: an opening sunrise that warms over roughly eight seconds in dawn order (a high cloud catches the light first, then the sky, then the sun — which sits a little higher in gold — and the water last, with a short bloom as the sun clears the horizon and a horizon haze that burns off), a few SVG light bands and sun glitter that wake from the horizon down once it has settled and then drift, swell, and shimmer, and direct control — moving horizontally across the strip (or dragging on touch, with a little momentum, or pressing the arrow keys) scrubs between silver and gold while a glint trails the pointer, and letting go eases the scene back to the morning. The control is a slider for assistive technology, names the light as it moves, and shows a rail with silver/gold ends on keyboard focus. Enter, Space, a click, or a tap replays the sunrise; Esc lets it settle. The sunrise plays once per tab session: an inline script marks a remembered morning on `<html>` before hydration so returning to the homepage paints gold on the first frame. Every gold layer, band, cloud, and glint is its own composited layer, so none of this repaints the blurred water; a static grain tile takes the banding out of the gradients; the JavaScript loop sleeps whenever the light is at rest, offscreen, or in a hidden tab. Reduced motion shows the settled gold scene with nothing moving and no control. Project rows unfold and refold through `::details-content` where the browser supports it and open instantly elsewhere.

Every other page — the Work archive, each case study, About, Experience, Resume, Notes, and the 404 — is set in the homepage's language: the same 672px measure, the same lowercase header and footer, the same type scale and muted grey, hover underlines, faint rules for rows, and the same unfolding `<details>` rows. The shared pieces are [`src/components/quiet/QuietPage.tsx`](src/components/quiet/QuietPage.tsx) and [`src/app/quiet/quiet-pages.css`](src/app/quiet/quiet-pages.css); the archive keeps its small progressive category filter. Only the retained experiments (`/lab`, `/daybreak`, `/alternate`) keep their own chrome.

`/panel` is a shelved design prototype: a grid-led, Dieter Rams–influenced homepage where one panel of 1px rules holds the identity, navigation, three project regions, and a readout band, with a matching Work archive, case study, and About underneath it. It is noindexed and reachable only by URL, kept for when there is more work to show at that density. Its code lives in [`src/components/panel`](src/components/panel), [`src/data/panel.ts`](src/data/panel.ts), [`src/app/panel.css`](src/app/panel.css), and [`src/app/panel`](src/app/panel).

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
- `/projects`: the Work archive, one unfolding row per project with a category filter
- `/projects/[slug]`: case study in the homepage's voice, with the verification path in a disclosure
- `/lab`: original SVG, motion, typography, and Three.js experiments
- `/about`: positioning, principles, factual record, and contact
- `/experience`: work history
- `/resume`: resume page and external document link
- `/panel`: shelved grid-led homepage prototype (noindexed), with `/panel/work`, `/panel/work/[slug]`, and `/panel/about`

## Editing content

Add project entries to `src/data/projects.ts`; the archive, detail route generation, metadata, sitemap, and navigation resolve from the same source. Do not expose absent fields or unsupported outcomes. Add implemented experiments to `src/data/experiments.ts`, then render their interactive study in `LabWorkbench.tsx` using the entry slug as the section id.

See `CONTENT_TODO.md` for missing real-world assets and links. `DESIGN_DIRECTION.md` records the visual and interaction rationale; `QUALITY_REPORT.md` records the latest verified checks.

## Deployment and performance

Production is [udaymukhija-portfolio.vercel.app](https://udaymukhija-portfolio.vercel.app), deployed through the repository's Vercel integration. Changes pushed to `main` deploy automatically. A new route only changes its own URL; the root homepage is controlled by `src/app/page.tsx`.

The application is compatible with standard Next.js hosting: install with `npm ci`, build with `npm run build`, and start with `npm start`. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin and optionally set `NEXT_PUBLIC_RESUME_URL`.

All content pages are static except the query-filtered project archive. Image dimensions are declared, homepage animation work is bounded, and the Three.js dependency is isolated behind a near-viewport dynamic import. Its renderer caps pixel density, pauses outside the viewport or in background tabs, respects reduced motion, and disposes GPU resources on cleanup.

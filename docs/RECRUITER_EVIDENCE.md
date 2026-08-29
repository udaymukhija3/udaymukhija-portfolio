# Recruiter Evidence

Last verified: 2026-08-29

## Engineering thesis

This portfolio presents calm product experiences backed by explicit engineering contracts. The selected work emphasizes state, permissions, retries, failure behavior, and honest launch boundaries without forcing implementation metadata into the first screen.

## Capability scorecard

| Capability | Evidence in this repository | Verification |
| --- | --- | --- |
| Product information architecture | Three featured products on `/`; compact full archive on `/projects`; experience-first case studies with a native technical-proof disclosure | Browser-reviewed at 1440×1000 and 390×844 |
| Truthful product presentation | Real Gathr capture, real VibeGrid artwork, and a labeled Murmur DOM fragment based on the current product UI | Both image assets returned HTTP 200 and loaded with non-zero natural dimensions |
| Responsive and accessible UI | Semantic landmarks/headings, visible focus states, skip link, labeled media, no phone-width overflow, reduced-motion override | DOM snapshots plus 390px and 1440px rendered checks |
| Rendering and performance posture | Static homepage, static experience/resume pages, statically generated case studies, optimized `next/image` media, CSS-only ambient motion | Successful Next.js production build; 23 static/generated pages |
| Claim and route integrity | Project claims centralized in `src/data/projects.ts`; all 14 case-study routes, filters, metadata routes, and media verified | HTTP 200 route sweep and clean browser console |

## Selected implementation evidence

- `src/components/HomeWorkbench.tsx` — selected-work, archive, About, and contact hierarchy.
- `src/components/ProjectMedia.tsx` — truthful media routing and labeled system portraits for projects without screenshots.
- `src/app/projects/[slug]/page.tsx` — product-first case-study structure with progressive technical disclosure.
- `src/app/globals.css` — Calibrated Quiet tokens, responsive compositions, focus treatment, motion, and reduced-motion behavior.
- `src/data/projects.ts` — centralized claims; VibeGrid updated to match its current make/judge/reveal product contract.
- `public/images/projects` — source product assets used by the presentation layer.

## Exact verification

```bash
npm run typecheck
npm run build
git diff --check
```

All three commands passed on 2026-08-29. The build compiled successfully with TypeScript, generated 23 pages, and emitted all 14 case-study paths.

Rendered checks covered:

- Homepage at 1440×1000 and 390×844.
- Hero, hero-to-project continuity, all three featured-project compositions, archive, About, and contact rhythm.
- Gathr case-study opening and expanded technical-proof disclosure.
- Project archive filters; data returned 2 entries and AI/ML returned 3 entries.
- Resume and experience routes at phone width.
- No horizontal overflow at either inspected viewport.
- No browser warnings or errors in the inspected flows.
- HTTP 200 for `/`, `/projects`, all three filtered archive URLs, all 14 case studies, `/experience`, `/resume`, metadata routes, and both product-media assets.

## Deployment status and honest gaps

The repository is build-ready. The existing Vercel site has not been redeployed from this work, so the production URL should not be treated as updated until a deployment is run and inspected.

Remaining manual checks before calling the redesign fully deployed:

- Deploy the reviewed commit to Vercel and repeat the key route/media sweep against the production URL.
- Run a production performance audit if numeric Lighthouse/Web Vitals evidence is required; no score is claimed here.
- Add automated visual regression coverage if the design will be changed frequently.

## Interview defense

The strongest walkthrough is: start with the Gathr interaction and explain why the interface stays calm while the backend owns attendance, reliability, safety, privacy, and realtime behavior. Then use VibeGrid to trace one staged rule from visible UI through authorization, transaction semantics, stable identity, and database constraints. Close with Murmur to discuss private-media access and deliberately narrow product scope. The portfolio structure itself demonstrates the same judgment: product understanding first, proof available when the conversation goes deeper.

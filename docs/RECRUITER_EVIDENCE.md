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
| Motion and interaction | Staged hero type, a living system path, global reading progress, route entry, scroll-linked Gathr expansion, VibeGrid stage travel, Murmur playback motion, About and contact state paths, archive filter and row feedback, experience timeline, resume evaluation signal, pointer depth, section reveals, case-study proof opening, and directional project navigation | Motion states inspected before, during, and after scroll at desktop and phone widths |
| Rendering and performance posture | Static pages and case studies, optimized `next/image` media, two scoped passive requestAnimationFrame scroll controllers, IntersectionObserver reveals, and offscreen animation pausing | Successful Next.js production build; 23 static/generated pages; animation lifecycle inspected in-browser |
| Claim and route integrity | Project claims centralized in `src/data/projects.ts`; all 14 case-study routes, filters, metadata routes, and media verified | HTTP 200 route sweep and clean browser console |

## Selected implementation evidence

- `src/components/HomeWorkbench.tsx`: selected-work, archive, About, and contact hierarchy.
- `src/components/NavBar.tsx`: route-aware navigation plus a global requestAnimationFrame reading-progress controller.
- `src/components/usePortfolioMotion.ts`: scroll progress, reveal observers, offscreen pausing, pointer depth, touch response, and reduced-motion short circuit.
- `src/app/template.tsx`: a remounting route frame that gives client navigation one restrained arrival state.
- `src/app/experience/page.tsx` and `src/app/resume/page.tsx`: a work-history rail and finite evaluation path using native document content.
- `src/components/ProjectMedia.tsx`: truthful media routing and labeled system portraits for projects without screenshots.
- `src/app/projects/[slug]/page.tsx`: product-first case-study structure with progressive technical disclosure.
- `src/app/globals.css`: Calibrated Quiet tokens, responsive compositions, focus treatment, motion, and reduced-motion behavior.
- `src/data/projects.ts`: centralized claims; VibeGrid updated to match its current make/judge/reveal product contract.
- `public/images/projects`: source product assets used by the presentation layer.

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
- Staged hero states at 180 ms and after settling, with 48 declared motion hooks and project animation paused while offscreen.
- Scroll-linked endpoint travel and scale, Gathr clip/scale/opacity expansion, VibeGrid make/judge/reveal runner, and Murmur waveform/playhead motion.
- Project animation lifecycle: hero motion pauses after its transition; each featured project starts and stops based on viewport intersection.
- Pointer-driven project depth and touch press fallback.
- Global reading progress on the homepage and case-study route.
- About permission, retry, and recovery state path, with animation scoped to section visibility.
- Contact open-channel signal path, with animation scoped to section visibility.
- Archive-row directional feedback and the animated native technical-proof disclosure.
- Archive category changes with route re-entry, card reveals, and one active-lens indicator.
- Experience timeline drawing, resume card reveals, and a finite Product to Backend to Data evaluation signal.
- Expanded previous and next project navigation with directional focus and hover feedback.
- Gathr case-study opening and expanded technical-proof disclosure.
- Project archive filters; data returned 2 entries and AI/ML returned 3 entries.
- Resume and experience routes at phone width.
- No horizontal overflow at either inspected viewport.
- No browser warnings or errors in the inspected flows.
- HTTP 200 for `/`, `/projects`, all three filtered archive URLs, all 14 case studies, `/experience`, `/resume`, metadata routes, and both product-media assets.

## Deployment status and honest gaps

The extended motion pass was deployed to Vercel from commit `4b720f2` and verified on the production URL. The live homepage exposed the hero, continuity, reading-progress, About-system, contact-signal, and project-state markup. The global reading line responded to production scroll position, the About and contact paths entered their running states in view, and the Gathr technical-proof disclosure opened with the intended reveal. The inspected production pages had no horizontal overflow. The homepage, archive, three featured case studies, experience, resume, and metadata routes returned HTTP 200 in the final production sweep.

Remaining evidence gaps:

- Run a production performance audit if numeric Lighthouse or Web Vitals evidence is required; no score is claimed here.
- Add automated visual regression coverage if the design will be changed frequently.

## Interview defense

The strongest walkthrough is: start with the Gathr interaction and explain why the interface stays calm while the backend owns attendance, reliability, safety, privacy, and realtime behavior. Then use VibeGrid to trace one staged rule from visible UI through authorization, transaction semantics, stable identity, and database constraints. Close with Murmur to discuss private-media access and deliberately narrow product scope. The portfolio structure itself demonstrates the same judgment: product understanding first, proof available when the conversation goes deeper.

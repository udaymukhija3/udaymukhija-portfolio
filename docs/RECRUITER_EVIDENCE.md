# Recruiter evidence

Last verified: 2026-09-07

## Engineering thesis

This portfolio argues that Uday can make complex product behavior feel calm without hiding the contracts underneath it. The site proves that claim at two levels: factual case studies expose state, permissions, retries, failure handling, data quality, and evaluation paths; the portfolio itself demonstrates authored responsive composition, accessible interaction, restrained motion, native SVG, typed content, static generation, metadata, testing, and deployment readiness.

## Evidence scorecard

| Capability | Status | Strongest evidence | Remaining weakness |
| --- | --- | --- | --- |
| Product information architecture | PROVEN | Home prioritizes identity and three selected products; `/projects`, `/lab`, `/about`, case studies, experience, and resume each have a distinct job. | Notes/writing is intentionally omitted until real material exists. |
| Editorial frontend craft | PROVEN | Fluid type hierarchy, 12/8/1-column recomposition, controlled measures, real media at judgeable scale, an editorial practice index, and category-specific project plates in `HomeWorkbench.tsx`, `ProjectMedia.tsx`, and `globals.css`. | Automated visual regression is not present. |
| Accessible interaction | PROVEN | Semantic controls, visible focus, skip link, reduced-motion completion states, no pointer-only action, passing `jsx-a11y` lint, and browser keyboard/AX checks. | No external axe certification is claimed. |
| Bespoke browser-medium work | PROVEN | `/lab` contains original SVG routing, transition-tempo, typography-measure, and Three.js constraint-field studies without a UI or animation library. | The Lab is intentionally small; it should grow only with finished studies. |
| Truthful project presentation | PROVEN | Claims are centralized in `src/data/projects.ts`; Gathr/VibeGrid use real captures; Murmur is labeled as a native UI fragment; other projects use labeled product/data/ML evidence plates. | More repository-backed captures are needed. |
| Rendering and performance posture | CREDIBLE_BUT_THIN | Static content routes, 14 generated project pages, Next Image sizing, bounded client islands, offscreen animation pausing, and a Three.js chunk lazy-loaded only near its Lab study. | No Lighthouse or field Web Vitals measurement; the Three.js chunk is about 128KB gzip. |
| Verification and security hygiene | PROVEN | Lint, strict typecheck, 7 tests, 25-route production build, browser visual checks, and zero production dependency advisories on Next 16.3.4/React 19.2.8/Three.js 0.185.1. | No hosted CI workflow is present in this repository. |
| Deployment readiness | CREDIBLE_BUT_THIN | Standard Next build/start contract, canonical URL configuration, metadata, manifest, robots, sitemap, and documented environment variables. | Current changes were not deployed in this session. |

## Changes implemented in this pass

- Replaced the repeated line-and-node signature across the hero, About, Contact, and generic project media with an editorial practice index, working principles, typographic contact mark, and distinct product/data/ML evidence plates.
- Sharpened the hero into a concise design-engineering proposition and made the selected-work heading/project navigation more direct.
- Rebuilt the routing SVG around four labeled process stages so the path is explanatory rather than decorative.
- Expanded `/lab` to four original studies: interactive state-routing SVG, motion-role comparison, variable reading measure, and a lazy-loaded Three.js constraint field with three response modes.
- Added WebGL lifecycle controls: near-viewport loading, DPR cap, offscreen/background pause, reduced-motion behavior, GPU disposal, and a static capability fallback.
- Added `/about` with repository-backed positioning, principles, experience, and education.
- Reworked navigation and metadata discovery so Work, Lab, About, Contact, sitemap, manifest, and `llms.txt` agree.
- Added `DESIGN_DIRECTION.md`, prioritized `CONTENT_TODO.md`, `QUALITY_REPORT.md`, ESLint configuration, and seven executable repository tests.
- Upgraded Next.js/React and verified that the production dependency audit moved from four high-severity findings to zero known advisories.
- Corrected small-text contrast tokens after measuring them against both stone and sage surfaces.

## Verification evidence

See `QUALITY_REPORT.md` for exact commands, viewport coverage, accessibility checks, contrast ratios, motion review, and honest performance limits.

## Deployment status

READY_WITH_MANUAL_STEPS. The build is deployable to standard Next.js hosting after setting the canonical production URL. No claim is made that this local revision is currently live.

## Interview defense

| Likely question | Evidence-based answer | Trade-off to discuss |
| --- | --- | --- |
| Why is this more convincing than a CRUD tutorial? | Fourteen factual projects expose explicit state, idempotency, permission, realtime, data-quality, and evaluation boundaries, while the portfolio itself has original interaction work, typed content, static generation, tests, and production metadata. | Breadth makes fast evaluation harder, so the homepage deliberately limits first contact to three products. |
| Why is Three.js used only once? | The Constraint Field is specifically about spatial input and connected deformation. The dependency is route-local, near-viewport loaded, DPR-capped, paused offscreen, and backed by a CSS capability fallback. | The isolated chunk is about 128KB gzip, so using it as homepage decoration would be an unjustified cost. |
| How was accessibility treated as design? | Focus, keyboard order, state labels, contrast, reduced motion, and non-pointer equivalents are part of the primitives and automated checks. | A complete audit would add axe and assistive-technology testing rather than treating lint as certification. |
| How do you keep the content credible? | Claims live in one typed source; real screenshots, native fragments, and editorial architecture plates are labeled differently; missing artifacts remain explicit in `CONTENT_TODO.md`. | This is less visually uniform than fabricated mockups, but much easier to defend. |

## Honest verdict

RECRUITER_READY_WITH_GAPS. The portfolio now makes a coherent design-engineering case without repeating one visual trick, works across the required routes, and has repeatable quality checks. The remaining gaps are measurable performance evidence, visual-regression coverage, current deployment, defensible project outcomes, and more real media for secondary projects—not missing core product or interface structure.

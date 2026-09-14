# Quality report

Last verified: 2026-09-14

## Automated checks

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | PASS — ESLint completed with zero warnings or errors. |
| TypeScript | `npm run typecheck` | PASS — strict TypeScript emitted no errors. |
| Tests | `npm test` | PASS — 32/32 tests passed, including the homepage sunrise curve, its dawn-ordered layers, slider value names, touch fling, scrub mapping, keyboard steps, frame-rate independent easing, the session-memory contract, and the strip's reduced-motion contract. |
| Production build | `npm run build` | PASS — Next.js 16.3 compiled with every route prerendered, including all 14 project paths. |
| Patch hygiene | `git diff --check` | PASS — no whitespace errors. |
| Production dependency audit | `npm audit --omit=dev --json` | PASS — 0 known vulnerabilities after upgrading Next.js and React. |

## Accessibility review

- ESLint ran the Next.js Core Web Vitals, React, hooks, TypeScript, and `jsx-a11y` rule sets with no findings.
- Browser inspection confirmed semantic landmarks, one page-level heading, labeled navigation, named controls, native buttons/links/range input, descriptive media labels, and an ordered heading structure across Home, Work, Lab, About, and project pages.
- Keyboard entry was exercised at 1024px: the first Tab target is the visible “Skip to content” link with a designed high-contrast focus treatment.
- All reviewed light-surface text tokens meet 4.5:1 for normal text: muted/stone 5.35:1, quiet/sage 4.64:1, slate/sage 4.53:1. Ink/stone is 14.82:1 and paper/ink is 16.03:1.
- No automated axe/browser extension audit was run, so this report does not claim WCAG certification.

## Responsive review

The earlier full responsive pass covered:

- 375 × 812: Home hero and workbench, Lab SVG/motion controls, About hero, and Gathr case study.
- 768 × 1024: full project archive.
- 1024 × 768: Home hero and navigation.
- 1280 × 800: Gathr case study.
- 1440 × 900: Home hero/workbench, Lab hero/SVG, and About hero.
- 1680 × 1000: wide Home hero.

The final direction change was then re-inspected in the app browser at its narrow viewport across the homepage hero, selected-work heading, closing panels, SVG, WebGL fallback, and all three evidence-plate categories. No inspected surface had horizontal overflow; the new layouts also retain explicit 980px, 860px, and 760px recomposition rules. A fresh cross-browser visual-regression baseline remains outstanding.

## Motion and reduced-motion review

- Motion tokens separate immediate feedback, ordinary state changes, and the few expressive transitions.
- The repeated homepage line/node animations were removed. Homepage requestAnimationFrame scroll work is passive, scheduled once per frame, and cleaned up.
- `usePortfolioMotion` exits early for `prefers-reduced-motion`, reveals all hidden content, and skips pointer/scroll animation setup.
- CSS reduced-motion rules remove travel, transforms, clipped entrances, and transitions while forcing the SVG into a complete readable state.
- The Three.js study renders a static surface for reduced motion, caps DPR at 1.5, pauses when offscreen or backgrounded, and disposes geometry, material, renderer, and context on cleanup.
- Repository tests verify the media query, JavaScript short-circuit, lazy Lab boundary, DPR cap, and GPU cleanup. OS-level reduced-motion emulation was not available in the browser harness, so no runtime emulation result is claimed.
- The homepage sunrise strip was exercised in the app browser: the opening sunrise reached gold in about eight seconds and flipped the settled state; hovering left, centre, and right read 0, 0.5, and 1; leaving eased back toward gold; arrow keys, Home, and Esc moved and released the light; a click and a programmatic activation replayed the sunrise while a drag did not; synthetic touch events confirmed that a small move is ignored, a sideways drag scrubs, release settles, and a tap replays. The drifting bands changed transform and opacity between samples and paused while the strip was offscreen. The loop is driven by one `requestAnimationFrame` chain that stops when the light is at rest, offscreen, or in a hidden tab; the gold scene and each band are their own composited layers so the blurred base scene is never repainted.
- The second pass on the strip was exercised the same way: a replay showed the four gold layers warming in order (cloud ahead of sky ahead of sun ahead of water) with the horizon bloom firing as the sun crossed the halfway mark; the slider reported 0–100 and “silver dawn / first light / warming / golden”; the focus rail, its labels, and its dot tracked arrow-key steps; a pointer sweep lit the wake at the pointer and it faded at rest; a synthetic touch flick carried the light past the finger before it settled; and a reload within the session painted gold before hydration with no hydration warning.
- Project rows were opened, switched, and closed in the app browser: `::details-content` unfolded and refolded over about 380ms with `content-visibility` flipping only after the fold, the exclusive accordion animated both rows at once, and the plus glyph turned into a minus. Browsers without `::details-content` open instantly as before.

## Performance review

- All content routes are prerendered except the query-driven project archive; all 14 project details are statically generated.
- The site uses no component library, animation dependency, analytics script, or external font request.
- Client behavior is limited to navigation progress, the selected-work stage, and Lab controls. Three.js is isolated in a separate near-viewport dynamic chunk rather than the homepage bundle.
- Real captures total 340KB at source and render through `next/image` with intrinsic dimensions and responsive `sizes`.
- The isolated Three.js chunk is approximately 520KB uncompressed and 128KB gzip; this is a build-artifact size, not a measured network transfer.
- No Lighthouse or field Core Web Vitals result was run, so no numeric performance score is claimed.

## Browser/runtime review

- Browser inspection covered the new homepage hero/work heading, About/Contact close, labeled routing SVG, WebGL capability fallback, and product/data/ML evidence plates at the app browser's narrow viewport.
- Wide-browser inspection confirmed the 12-column hero/practice composition and the two-column About/Contact close. The SVG retry control changed both its selected state and result copy to “Duplicate absorbed.”
- The Three.js surface has a filled folded-surface fallback when the browser cannot create a WebGL context; the browser harness exercised that fallback and confirmed its Calm/Pressure selection state still changes visibly and semantically.
- The application has no authentication, mutation, database, uploads, or user-generated HTML; its meaningful security boundary is dependency/configuration hygiene and truthful outbound links.

## Deployment status

READY_WITH_MANUAL_STEPS. The application builds for standard Next.js hosting. Set `NEXT_PUBLIC_SITE_URL`, optionally set `NEXT_PUBLIC_RESUME_URL`, run `npm ci && npm run build`, and deploy through the chosen host. This local design-engineering pass was not deployed in this session.

## Remaining material gaps

- Most non-featured projects still use labeled editorial evidence plates because no real capture exists in the repository.
- Flagship project outcomes are mostly qualitative; defensible measured outcomes would increase recruiter confidence.
- Numeric Lighthouse/Web Vitals evidence and automated visual regression are not yet present.
- The resume remains an external Google Drive link until a same-origin PDF is supplied.

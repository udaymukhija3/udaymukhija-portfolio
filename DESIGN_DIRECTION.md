# Design direction — Margin / Material

## Thesis and personality

The portfolio treats software as a designed surface supported by explicit technical responsibility. It reads like an editorial dossier: decisive typography, narrow annotations, generous margins, and project media that changes character with the work. There is deliberately no universal decorative diagram. Product, data, ML, SVG, and spatial work each receive a visual form that explains their subject.

The references are translated into principles rather than copied: Shift Nudge informs composition and visual calibration; Typography in Web Design informs measure and hierarchy; Animations on the Web informs motion roles; Refactoring UI informs grouping and contrast; interactive SVG animation informs the request-routing study; Three.js Journey informs the spatial Lab study and its render lifecycle.

## Typography and hierarchy

The composition is type-led and uses a neo-grotesque system stack for interface precision, with Georgia reserved for occasional human or editorial asides. Display text is tightly tracked, medium weight, and fluid; body text stays between 32–68 characters per line. The homepage opens with a complete sentence, not a visual effect. Project names outweigh labels by several scale steps. Metadata remains readable at 12–13px and never carries essential meaning alone. The hierarchy survives in grayscale and with motion disabled.

## Grid and spacing

Pages use a 12-column grid at wide sizes, an 8-column middle state, and authored single-column mobile compositions. A fluid outer gutter and a small spacing scale govern most relationships. Rules establish sequence; spacing establishes grouping. The hero offsets a large proposition with a compact practice index. Media may cross text columns, but text keeps a controlled measure. Mobile changes order and emphasis instead of merely shrinking desktop.

## Color and imagery

Warm stone and paper separate page and artifact surfaces. Near-black supplies text and focused inspection fields. Desaturated eucalyptus marks state; slate marks interaction. Neither accent is decorative. Real product captures are shown large and unframed. Projects without captures receive clearly labeled editorial architecture plates: product projects use a behavioral index, data projects use a contract ledger, and ML projects use an evaluation sheet. None pretends to be product UI.

## Interaction and motion

Controls expose visible hover, focus, pressed, and selected states. Motion communicates entrance, transfer, selection, tempo, audio playback, or spatial response. Fast feedback is 160–180ms; ordinary changes are 360–520ms; a small number of spatial transitions may take 800–1100ms. Transform and opacity carry nearly all DOM movement. Continuous rendering is isolated to the visible Three.js study and stops offscreen or when the document is hidden. Reduced-motion mode removes travel while preserving every state and relationship.

## SVG strategy

The Lab contains one authored interactive SVG: a request-routing study whose labeled stages, path, packet, and output change together. It uses rectangular process stages instead of the former repeated node motif, a readable coordinate system, semantic surrounding controls, vector-effect strokes, and a complete reduced-motion result. Elsewhere, DOM/CSS is preferred when it communicates the same idea with less machinery.

## Three.js / WebGL strategy

WebGL appears once, in the Lab’s Constraint Field. The subject is spatial computation: one input deforms a connected surface under three response modes. The Three.js module is loaded only when the study nears the viewport, caps device-pixel ratio at 1.5, pauses offscreen and in background tabs, disposes geometry/material/context on cleanup, and has a non-WebGL folded-surface fallback. It is not used in the hero or project pages.

## Responsive, accessibility, and performance

At 375px the navigation, practice index, project selector, media stage, experiment controls, and case-study facts must remain complete without horizontal scrolling. Semantic landmarks and headings, native buttons/links, designed focus rings, sufficient contrast, accessible names, and non-pointer alternatives are built into primitives. Most pages remain server-rendered; client JavaScript is limited to the selected-work stage, global reading progress, and Lab controls. Images use Next.js sizing. The heavier spatial dependency is route-local and lazy.

## Deliberate refusals

The design refuses a repeated signature graphic, glass cards, gradient blobs, fake windows, terminal theater, percentage skills, logo clouds, cursor followers, scroll hijacking, decorative WebGL, fabricated screenshots, and anonymous three-card feature grids. It does not add a dark mode, testimonial section, or page merely to make the navigation feel larger.

# Optical editorial refresh

The sunrise remains the organizing idea: a continuous change in illumination,
silhouette, reflection, and spatial density across six sections. Color supports
that progression. The Monochrome control removes hue from the composition so
its hierarchy and lightness can be judged directly.

- Space Grotesk replaces the serif display voice; IBM Plex Mono handles small
  captions, numbering, and exposure readouts. Both are self-hosted with OFL files.
- The opening uses oversized, offset type and an asymmetric optical figure.
  Its toroidal curves are projected in Canvas 2D, sorted by depth, and respond
  to pointer position. It is an abstract study, not a product visualization.
- Persimmon, amber, celadon, ice blue, periwinkle, and lilac are material accents.
  Project selection also uses markers and lightness, so it survives grayscale.
- The sun's broad halo now fades continuously. Moving reflection strokes and
  a broken light path add motion on the water. Shading follows the reading
  column to keep text legible across the bright portion of the sunrise.
- Native scroll remains authoritative. The environment eases toward its
  position; section copy resolves with staggered translation and focus.
- Pause motion freezes the optical study and CSS loops. Reduced motion presents
  a complete state without entrances or looping animation. Canvas rendering is
  capped at 30fps / 1.5 device pixel ratio and stops outside the viewport or in
  hidden documents. Observers, listeners, and animation frames are cleaned up.
- Mobile recomposes the opening vertically; the transaction diagram retains
  its own horizontal scrolling container instead of overflowing the page.

Implementation: `Band.tsx`, `BandStage.tsx`, `Band.module.css`, `OpticalStudy.tsx`.
Shared type and material tokens live in `layout.tsx` and `system.css`.

Validation includes the repository's 24 existing tests, lint, TypeScript, and
the static production build. Browser review covers the desktop opening and
project states, a 390px mobile viewport, and the monochrome / pause controls.
Reduced motion has a CSS and lifecycle implementation; OS-level emulation was
not part of the browser review.

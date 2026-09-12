# First Light — alternate portfolio

## Direction and scope

The user's September 10 screenshot is the visual reference for this revision: broad morning window light, soft botanical shadows, tactile material, serif typography, a three-column work gallery, and a shallow curved section transition. The initial typography-only interpretation was rejected and has been replaced.

The six documents extracted unchanged into `design-references/portfolio_direction_kit_v2/` inform the alternate. Their internal instructions do not supersede the user's request or govern the current DAYBREAK track. This is an independent `/alternate` homepage, not a replacement for `/`.

## Implementation

- `src/app/alternate/page.tsx`: reference-led composition, Uday's actual professional identity, Gathr/VibeGrid/Murmur, existing case-study and contact destinations.
- `src/app/alternate/Atmosphere.tsx`: decorative light layers, a working pause/resume control, and tab-visibility pausing.
- `src/app/alternate/surface.module.css`: self-hosted Cormorant Garamond, responsive gallery, curved section surface, 24-second light movement, 13-second botanical drift, scroll-linked warmth and shadow translation, and reduced-motion support. Optional shallow perspective affects project imagery only, using CSS view timelines where supported.
- The existing navigation's scroll progress variable feeds the atmosphere. There is no additional scroll listener or WebGL renderer.
- The shared navigation/footer are hidden only while the alternate exists; this route supplies its own navigation. The current design's source and server remain untouched.
- Project thumbnails use the existing Gathr capture and VibeGrid art; Murmur is explicitly labeled as an interface study.

## Art assets

Generated with the built-in image generation tool, then converted to WebP for the site. Both assets are 1536 × 1024. The botanical overlay preserves alpha. No generated text or fabricated project screenshot is used.

- `public/images/first-light/window-light.webp` — 309,500 bytes.
- `public/images/first-light/botanical-shadow.webp` — 236,828 bytes.
- `public/fonts/first-light/cormorant-garamond.ttf` and accompanying `OFL.txt` — sourced from the Google Fonts repository.

### Background generation prompt

Use case: photorealistic-natural. Asset type: background-only photographic art for a refined portfolio webpage. Generate ONE landscape image at least 1536x1024 pixels, edge to edge. A tactile ivory pale plaster surface viewed straight on, broad warm honey/apricot morning window light entering from upper left, diagonal window mullion shadows passing toward lower right, soft rose grey penumbra, right/lower right dappled botanical shadows. Significant left center luminous blank area for dark text. Fine visible natural grain, elegant photographic optical softness, rich visible daylight; tangible peaceful dawn atmosphere. Think sunlit pale textured wall, almost abstract and flat-on: creamy bright light patches, long soft grey rose diagonal shadow bars, warm apricot glow near lower right, softly blurred leaf silhouettes at right. No text, letters, numbers, UI, sun disk, horizon, objects, actual window, frames, scenic room. Fill image edge to edge; no border.

### Botanical overlay generation prompt

Use case: photorealistic-natural. Asset type: transparent PNG botanical shadow overlay for a plaster webpage, landscape at least 1536x1024. Generate ONE transparent background cutout layer of soft botanical shadows cast by narrow olive-like leaves and branching stems. ONLY shadows, no actual physical leaves, plant, pot, wall, backdrop or objects. Photoreal penumbra: translucent warm grey shadows with feathered optical edges and variable density, naturally branching leaf silhouettes. Foliage shadow concentrated in right half and bottom-right; left half mostly fully transparent. Designed to drift gently over existing pale plaster background. Genuinely transparent background with true alpha channel, NOT white, cream or checkerboard painted pixels. Preserve semitransparent shadow softness. No text, no UI, no frame, no full-opacity black foliage.

## Preview and verification

Local preview: `http://localhost:4175/alternate`. It is served from the isolated snapshot `/private/tmp/first-light-review.OHr5M5`; later workspace edits must be synchronized there to appear. The site is not redeployed by this exploration.

TypeScript and targeted ESLint passed. Desktop and 390px mobile browser views were inspected against the reference. Both existing project images loaded, no horizontal overflow was detected, running light animation was observed in computed styles, and the pause control changed both its accessible pressed state and the animation state to paused. The first mobile review exposed repeating texture seams; the imagery was changed to independently masked, non-repeating hero and About fields.

Reduced-motion rules remove ambient animation, perspective, and smooth scrolling while retaining static art. This is implemented in CSS; an OS-level reduced-motion setting has not been changed for testing.

The alternate treatment currently covers the homepage. Case studies, About, and Lab still open the existing editorial pages.

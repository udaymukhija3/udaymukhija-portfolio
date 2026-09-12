# DAYBREAK

Implemented September 9, 2026 after the planning brief and permission to make art-direction decisions.

## Direction

The homepage progresses through pre-dawn, blue hour, first light, sunrise, morning, and bright day. Oversized sans-serif typography is paired with restrained Georgia italics. The environment moves from midnight blue through mineral blue and warm horizon colors to an open daylight field.

Murmur introduces private voice in blue hour. VibeGrid adds repetition and social interpretation at first light. Gathr owns sunrise: a large coral disc rises behind the invitation to get out and find people. Morning presents four geometric experiment labels and six further projects. The final blue field opens into about and contact.

Graphics use geometry, repeated lines, and compact compositions. They borrow structural ideas rather than cultural ornament. No generated image, external font, or animation dependency was introduced. The second pass adds a lazy Three.js renderer for a directly manipulable folded-ribbon study in the morning section. Product artwork, captures, and UI studies are explicitly distinguished.

## Source map

- `src/components/Daybreak.tsx`: server-rendered homepage, content, media, SVG constructions.
- `src/components/Daybreak.module.css`: scene compositions, responsive layouts, environmental layers, static and print modes.
- `src/components/DaybreakController.tsx`: one scheduled scroll update, section measurement, preference subscriptions, environmental properties.
- `src/lib/daybreak.ts`: deterministic narrative, illumination, refresh-rate-independent damping, and entrance model.
- `src/components/SolarSculpture.tsx`: nearby loading, SVG fallback, and accessible interaction controls.
- `src/components/SolarSculptureRenderer.ts`: custom Möbius ribbon geometry, lighting, pointer/keyboard interaction, visibility and preference lifecycle, GPU cleanup.
- `src/app/daybreak-shell.css`: homepage navigation and footer treatment.
- `src/components/ArchiveFilter.tsx`: progressive category filtering of server-rendered project entries.
- `tests/daybreak.test.mjs`: model bounds, monotonic light, reveal timing, section independence, reverse traversal, continuity.

The earlier HomeWorkbench and its hook remain in the source but are no longer imported by the homepage. Existing case studies and the Lab remain available.

## Motion and layout

Section landmarks define narrative position; total document height does not set sunrise timing. ResizeObserver, fonts, browser restoration, and viewport changes invalidate measurement. Scroll handlers only schedule an update; no permanent document animation loop or per-frame React state update is used. A short, refresh-rate-independent settling loop follows visual scroll values; direct jumps snap immediately. The visible 3D study has its own bounded render loop, which stops when offscreen, paused, reduced-motion, or backgrounded. The same state drives sky crossfades, stars, cloud-line illumination, horizon glow, the sun, and the small journey indicator.

Scene surfaces feather into the shared sky instead of ending at hard horizontal boundaries. Their center color fields preserve reading contrast. Headings, project media, index entries, cloud strokes, SVG line drawings, and the waveform have coordinated local scroll progress. The sunrise disc is held in a sticky stage while its elevation changes. Screenshots keep their original color. This is graphic art direction, not a physical atmosphere simulation.

System reduced motion and the manual Still mode produce static compositions. System preference takes precedence. Full content is present before JavaScript; links work without finishing an animation. On narrow screens, project layouts stack, experimental labels form two columns, the journey rail disappears, and the sun receives a separate crop. Navigation keeps a fixed dark contrast surface.

## Hosting

Private preview: https://daybreak-uday-mukhija.udiboy98.chatgpt.site. The default canonical origin matches this address; `NEXT_PUBLIC_SITE_URL` overrides it for another host.

The default Next.js development and server build remain supported. A private Sites preview uses static export:

```sh
DAYBREAK_EXPORT=1 NEXT_PUBLIC_SITE_URL=<published-origin> npm run build
```

Exported media uses its original local assets; the default server deployment retains Next Image optimization. `out/` is generated and ignored. The archive filter is enhanced in the browser, so the full archive remains visible without JavaScript even when the URL contains a category query.

## Verification and limits

Lint, TypeScript, and all 15 tests passed during implementation. The static production build generated all 25 route/assets entries. Local HTTP compilation returned 200. The existing quality report describes the previous design and is not a DAYBREAK visual baseline.

No browser screenshot review, real-device performance trace, or field Core Web Vitals measurement has been performed for DAYBREAK. Model and geometry tests verify state behavior and mesh topology, not GPU rendering, the perceived quality of the animation, or every responsive composition. A local preview HTTP check was blocked by automatic approval review, which reported an account usage limit. These remain the next useful validation activities after visual review of the preview.

The new design does not upgrade any project's existing deployment status or claim new measured project outcomes. Gathr is a private-alpha product, Murmur is a web MVP, and VibeGrid artwork is labeled as artwork.

## September 10 correction: preserve DAYBREAK, curve the surface

The day-wheel redesign was rejected. It is removed from the active source. The original full-width `Daybreak` composition and its navigation are restored, including the pre-dawn opening, original project order, sunrise stage, SVG artwork, Three.js sculpture, and closing field.

The new effect is an additive motion layer on complete reading groups. A shared horizontal drift moves the composition slightly left as the visitor scrolls down. Each group follows a shallow cubic arc through the viewport: almost flat in the center, with slight lateral displacement and recession near entry and exit. No visible globe, dial, carousel, scroll interception, or wheel-event handling is used.

`src/lib/surfaceMotion.ts` bounds local lateral travel to 24px, yaw to 0.32 degrees, pitch to 0.18 degrees, and recession to 9px. At 9000px perspective this keeps depth small. Mobile applies 45% of these amounts. Shared travel is capped at 16px desktop and 7px mobile across the complete document. The center reading region stays within half a pixel of local lateral displacement. Existing scroll damping provides short, refresh-rate-independent settling.

`data-surface` marks complete headings, text/image compositions, and index groups. Their typography is not animated letter by letter. Layout measurements use untransformed offsets, so their own movement cannot feed back into the next measurement. Offscreen groups stop receiving local transform updates until nearby, except during restoration, resizing, or motion-preference changes. Keyboard focus removes the local perspective. System reduced motion and Still mode neutralize the new surface transforms entirely.

The source model tests cover the flat center, continuous leftward motion, bounded edge recession, mobile strength, reduced motion, reverse reading, restored positions, and retention of the original homepage composition. This is source/build verification; perceived motion and real-device frame pacing have not been verified in a browser.

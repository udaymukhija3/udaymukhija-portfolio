# 02 — Design System

## 1. System principle

The system should stay compact and coherent.

The site derives richness from:
- color relationships
- spacing
- typography
- materiality
- shadow
- motion

not from decorative components.

---

## 2. Updated color system

Use a neutral-first system enriched by a **measured dawn palette**.

### 2.1 Semantic roles

#### Surface neutrals
- `surface-pre-dawn` — cool misted off-white
- `surface-base` — warm rice-paper neutral
- `surface-morning` — softly illuminated warm ivory
- `surface-day` — clean pale neutral with gentle warmth

#### Text
- `text-primary` — soft charcoal
- `text-secondary` — warm grey
- `text-muted` — muted grey with safe contrast

#### Dawn light colors
- `light-cool` — pearl / mist-grey / blue-grey
- `light-blush` — blush-tinted cream
- `light-peach` — soft peach
- `light-apricot` — pale apricot
- `light-gold` — dusty straw / muted gold
- `light-coral-muted` — highly restrained coral

#### Optional deep accents
Only if necessary:
- `accent-umber`
- `accent-ink`
- `accent-moss`

### 2.2 Palette behavior

The top of the page should feel:
- quieter
- cooler
- paler
- less saturated

As the page progresses:
- warmth increases
- slight chromatic richness appears
- pale peach/apricot/gold notes may emerge
- contrast becomes cleaner

Important:
- color should bloom softly, not snap
- colors should feel suspended in light, not painted on as blocks
- avoid a generic “pink-orange gradient” look

### 2.3 Rules
- No rainbow palette.
- No neon.
- Use color primarily in light fields, shadow transitions, and subtle accents.
- Preserve accessibility contrast.
- Let neutrals dominate; let dawn colors support.

---

## 3. Typography

### Goals
Typography must still be the main design anchor.

It should provide:
- hierarchy
- calm
- rhythm
- elegance

### Structure
Use no more than:
- 1 display family
- 1 body/system family
- optional mono for utility use

### Behavior
Color should support type, not compete with it.

Type may sit against:
- faint warm washes
- soft shadow passages
- low-contrast material fields

But body copy must remain easy to read.

Avoid:
- low contrast aesthetic text
- over-styled display text
- too many font weights
- too many accent colors in type

---

## 4. Spacing and rhythm

Maintain a disciplined spacing system.

Example scale:
- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 72
- 96
- 144

Large spaces are important because the atmosphere needs room to breathe.

---

## 5. Grid

Use a simple responsive grid:
- strong outer margins
- a clear text column
- controlled asymmetry
- room for surfaces and shadow passages to be visible

The atmosphere should not depend on clutter.

---

## 6. Surfaces and materials

The background should remain mostly plain.

Surface richness may come from:
- 1–3% tonal variation
- faint grain
- subtle paper/plaster irregularity
- large low-contrast light fields
- soft color-inflected glow

The surface should feel like it can **hold light**.

Avoid:
- obvious texture overlays
- heavy noise
- visible filters
- fake vintage effects

---

## 7. Light and shadow system

This is the primary atmospheric system.

### Main light field
One main compositional light system should govern:
- direction
- color progression
- shadow logic
- emotional tone

### Components
Use:
- large soft light planes
- faint shadow bars
- slow color-tinted highlights
- gentle blending between cool and warm dawn tones

A good sequence might feel like:
- cool mist
- blush warmth
- pale apricot
- dusty gold clarity

### UI shadows
Use only when needed for hierarchy and keep them subtle.

Avoid:
- floaty card shadows
- competing shadow systems
- default component-library shadow look

---

## 8. Borders and dividers

Prefer:
- space
- alignment
- tonal change
- light passage

over:
- boxes
- heavy dividers
- card outlines

---

## 9. Project presentation

Projects should feel editorial, not dashboard-like.

Prefer:
- titles with breathing room
- concise descriptions
- restrained thumbnails
- minimal metadata
- subtle hover response

Avoid:
- chip clutter
- multiple accent colors
- generic portfolio cards with thick shadow and radius

---

## 10. Interaction states

Hover and focus should remain quiet.

Allowed:
- subtle contrast shifts
- understated underline motion
- tiny translation
- slight warming/light response

Avoid:
- bounce
- dramatic scaling
- theatrical springs

---

## 11. Responsive principles

Desktop may show the richest light/color interplay.

Tablet:
- reduce complexity
- keep the atmosphere

Mobile:
- simplify perspective
- preserve materiality and dawn-color story
- use smaller, calmer shadow geometry
- keep motion very light

---

## 12. Accessibility

Requirements:
- usable contrast at all states
- semantic structure
- keyboard navigation
- visible focus states
- reduced motion
- no essential information conveyed only by motion or color

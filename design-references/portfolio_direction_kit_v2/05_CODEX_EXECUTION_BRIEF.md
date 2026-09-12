# 05 — Codex Execution Brief

## Role

Act as a senior design engineer and frontend engineer.

You are not inventing the visual direction from scratch.

You are implementing a defined direction and refining it carefully.

Read every file in this folder before changing code.

The priority hierarchy is authoritative.

---

## Objective

Build a portfolio site with this core experience:

> A minimalist portfolio on a mostly plain, material-feeling surface that gradually fills with the effects and colors of daybreak through light, shadow, subtle chromatic warming, disciplined typography, and restrained motion.

A secondary spatial effect should make scrolling feel gently dimensional, as though the viewport is observing a tiny portion of an enormous curved surface.

This globe-like behavior must be almost imperceptible.

The animation must reflect the dawn-color story.

---

## First task: inspect before implementing

Before making changes:

1. Inspect the codebase and identify:
   - framework
   - styling system
   - routing
   - component structure
   - typography setup
   - motion libraries
   - asset pipeline

2. Preserve sound architecture unless there is a compelling reason not to.

3. Do not rewrite the stack for aesthetic reasons.

Then produce a short implementation plan with:
- design tokens
- layout
- typography
- surface/material treatment
- light/shadow system
- dawn-color progression
- motion
- responsive behavior
- accessibility
- testing

Do not begin with animation.

---

## Implementation order

### Phase 1 — Static visual foundation
Implement first:
- spacing system
- page grid
- width constraints
- typography hierarchy
- base surface palette
- project presentation
- responsive structure

Success criterion:
The static site already looks elegant and calm.

### Phase 2 — Light, shadow, and color system
Add:
- one main directional light/shadow composition
- neutral-to-dawn color logic
- faint material response
- a richer sunrise palette expressed subtly

The site should now feel like morning is possible even before motion is added.

### Phase 3 — Motion
Add:
- scroll-linked dawn-color progression
- soft shadow drift
- very subtle globe-like perspective behavior
- restrained micro-interactions

Do not alter native scrolling behavior.

### Phase 4 — Reduced motion and mobile
Implement:
- `prefers-reduced-motion`
- mobile simplifications
- no essential dependency on motion
- strong readability and performance

### Phase 5 — Polish
Audit:
- spacing
- typographic rhythm
- color restraint
- shadow softness
- motion subtlety
- accessibility
- performance

---

## Color and atmosphere implementation guidance

The site should carry **more dawn color than the first version**, but in a restrained, minimal way.

Do not rely on a single hero gradient.

Instead, distribute the dawn-color story through:
- subtle background-light transitions
- soft tinted light fields
- slight shadow hue evolution
- restrained accents
- calm tonal progression through the page

A good emotional color sequence may move through:
- mist grey
- pearl
- blush cream
- pale peach
- apricot
- dusty gold
- warm ivory

These should feel like **light passing over a surface**, not like graphic fills pasted behind content.

---

## Motion implementation guidance

The animation must reflect the atmospheric color idea.

As the user scrolls, the page should feel like:
- light is arriving
- shadows are shifting
- the surface is warming
- color is blooming very softly
- the site is becoming more awake

Use one unified motion pipeline if possible.

Avoid separate disconnected animations.

---

## Globe-like scroll implementation guidance

Start with the lightest solution capable of producing the effect.

Preferred order:
1. CSS transforms + perspective
2. lightweight JS scroll interpolation
3. motion library if already present or clearly useful
4. WebGL only if absolutely necessary

For visible content blocks, derive a normalized position relative to the viewport center.

Use that to apply a **tiny** amount of:
- rotation
- scale
- translation
- depth

At viewport center:
- transform should be nearly identity

At extremes:
- a subtle receding effect is enough

If it reads as a rotating globe, reduce it.

This effect must remain less noticeable than the dawn light/color behavior.

---

## Typography implementation guidance

Typography outranks atmosphere.

Requirements:
- stable rendering
- strong hierarchy
- comfortable measure
- responsive scaling
- no perspective distortion on body text
- no low-contrast “aesthetic” copy

Let the atmospheric background support the type.

Never let colored light fields reduce readability.

---

## Interaction guidance

Keep interactive behavior quiet and precise.

Allowed:
- subtle underline reveal
- slight local contrast shift
- tiny translation
- tiny warmth/light response on hover

Avoid:
- aggressive card hover
- floaty animations
- exaggerated springs
- gimmick cursors

---

## Accessibility

Must include:
- semantic landmarks
- keyboard navigation
- visible focus states
- sufficient contrast at every atmospheric state
- reduced motion
- no scroll trapping
- accessible buttons/links
- logical heading hierarchy

Important:
Test contrast across the full color progression, not just at one point in the scroll.

---

## Performance

Target:
- smooth scrolling
- lightweight atmospheric effects
- minimal work per frame
- no layout thrash
- no unnecessary WebGL
- progressive enhancement

The page should remain performant even if the color/light system is layered.

---

## Responsive behavior

Desktop:
- richest atmospheric treatment

Tablet:
- simplify perspective
- preserve color/light story

Mobile:
- prioritize typography and spacing
- simplify or remove globe effect
- keep the dawn-color and material idea
- reduce the size/complexity of shadow fields

The design should still feel like the same concept.

---

## Anti-goals

Do not build:
- a literal sunrise illustration
- a visible sun or horizon
- a visible globe
- an orange-pink gradient landing page
- a motion-first demo
- a Japanese-themed visual cliché set
- floaty portfolio cards
- an over-saturated palette
- heavy cinematic effects
- aggressive parallax
- gratuitous WebGL

---

## Decision protocol

When uncertain, evaluate in this order:

1. Does it improve typography and composition?
2. Does it improve usability and portfolio clarity?
3. Does it improve the dawn atmosphere through light, shadow, and color?
4. Does it improve materiality?
5. Does motion add value without calling attention to itself?
6. Does the globe-like effect remain nearly imperceptible?
7. Is the technical complexity justified?

If a decision fails at a higher level, do not justify it with a lower one.

---

## Review protocol

After each meaningful visual change, check:

### Static
- Does this still look good as a screenshot?

### Color
- Does the page feel richer in dawn color without becoming loud?

### Motion
- Does the animation feel like morning arriving rather than interface performance?

### Typography
- Is every line still easy to read?

### Atmosphere
- Does it feel like light and color are behaving on a surface?

### Globe effect
- Is it barely perceptible?

### Mobile
- Does the concept survive if most motion is reduced?

---

## Final quality bar

The finished site should feel:

- authored
- calm
- materially believable
- spatial
- softly radiant
- precise
- contemporary
- highly legible

The primary impression should be the work and the composition.

The atmospheric color and motion should be what make the site memorable.

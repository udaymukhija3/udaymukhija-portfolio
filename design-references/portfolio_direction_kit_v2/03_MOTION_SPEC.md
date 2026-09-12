# 03 — Motion Specification

## 1. Motion philosophy

Motion should make the page feel like **morning is arriving**.

This means animation should express:
- light movement
- shadow drift
- tonal warming
- slight chromatic blooming
- soft dimensionality

It should not feel like:
- UI choreography for its own sake
- a motion-design reel
- a flashy animation system

Motion exists to create:
- atmosphere
- continuity
- subtle life
- temporal progression

---

## 2. Primary motion systems

Only four main motion systems are needed:

1. **Daybreak color progression**
2. **Window-shadow drift**
3. **Globe-like scroll dimensionality**
4. **Micro-interactions**

No extra motion gimmicks unless truly necessary.

---

## 3. Daybreak color progression

This is now a major part of the experience.

As the user scrolls, interpolate subtly across:
- background tone
- warmth
- color richness
- light hue
- shadow softness
- text clarity if appropriate

The color story should feel like dawn opening up.

### Suggested color arc
- **0–20% scroll**: cool mist / blue-grey neutral / faint pearl light
- **20–45%**: blush cream / warm off-white / first warmth
- **45–70%**: soft peach / pale apricot / growing light
- **70–90%**: dusty gold / apricot-gold clarity
- **90–100%**: calm warm daylight with residual dawn softness

This is a conceptual guide, not a hard map.

### Strong constraint
The transitions must be smooth and quiet.

If the user sees “color sections,” the effect is too strong.

---

## 4. Window-shadow drift

Use one main shadow/light composition.

Possible motion:
- slight shadow position shift with scroll
- tiny angle adjustment
- soft blur/intensity adjustment
- gentle color tint evolution

Example:
- shadow begins cooler and more diffuse
- light patch gains faint peach/apricot warmth
- later it carries a hint of pale gold

Keep the motion small.

The shadow should never interfere with text legibility.

---

## 5. Globe-like scroll dimensionality

### Core metaphor
The viewport sees a tiny patch of an enormous curved surface.

### Desired behavior
At viewport center:
- content is close to flat
- scale ≈ 1
- rotation ≈ 0

Toward edges:
- tiny receding effect
- slight perspective shift
- optional minor lateral drift

### Suggested ranges
Starting points only:
- rotation X: ±0.5° to ±1.25°
- rotation Y: ±0.25° to ±0.75°
- scale: 0.985–1.0
- large perspective distance

Keep this subtler than the atmospheric color/light motion.

If the user notices “rotation,” it is too strong.

---

## 6. Relationship between motion systems

All motion systems should feel like one world.

As the page scrolls:
- the light changes
- the color warms
- the shadow shifts
- the page feels slightly spatial

These should feel unified.

Do not make the color progression, shadow drift, and globe effect feel like separate layers.

---

## 7. Typography motion

Typography should remain stable.

Allowed:
- tiny opacity refinement
- very small vertical settle
- slight contrast increase
- gentle reveal if entering the viewport

Avoid:
- character-level animation
- big blur-to-sharp reveals
- perspective warping
- dramatic masking

Type must remain dominant and calm.

---

## 8. Micro-interactions

Use:
- soft underline movement
- tiny position shift
- restrained opacity/contrast response
- slight local warmth/light response

Example:
- a link hover could brighten subtly or catch a slightly warmer tone

Avoid:
- obvious springiness
- playful bounce
- large scale changes

---

## 9. Timing

Guidance:
- hover transitions: ~120–220ms
- small state changes: ~160–260ms
- content reveal: ~300–650ms if used
- atmospheric interpolation: continuous with scroll
- ambient motion: extremely slow or omitted

The atmosphere should feel patient.

---

## 10. Reduced motion

Respect `prefers-reduced-motion`.

Reduced-motion mode should:
- remove globe dimensionality
- greatly reduce shadow drift
- keep a mostly static but beautiful dawn palette
- preserve materiality and compositional light
- use minimal fades only if needed

The site should still feel like dawn without active movement.

---

## 11. Performance

Prefer:
- CSS variables
- transform
- opacity
- one coherent scroll state pipeline
- GPU-friendly properties

Avoid:
- unnecessary WebGL
- multiple independent scroll listeners
- layout thrashing
- expensive blur stacks if they hurt performance

Three.js is not required.

The atmospheric goal should be achieved with the lightest system possible.

---

## 12. Calibration tests

The motion is too strong if:
- people comment on the animation before the design
- the page reads like a creative dev demo
- the globe effect becomes visible
- the color transitions feel staged or theatrical
- the shadows distract from reading

The motion is right if:
- the page feels alive
- the atmosphere gently opens as one scrolls
- the color story is noticeable only after a moment
- everything still feels calm and legible

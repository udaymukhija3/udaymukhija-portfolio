/* Morning light for the homepage strip: 0 is silver dawn, 1 is gold. */

/** The opening sunrise takes about eight seconds. */
export const sunriseDuration = 8000;

/** Session memory: the sunrise is a first-arrival moment, so coming back home finds the morning already here. */
export const morningKey = "morning-light";

/** How quickly the painted light closes on its target, per second. */
export const lightRates = { rising: 3, held: 10, settling: 1.1 };

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Quiet first light, a warming middle, and a slow settle into gold. */
export function sunriseAt(elapsed: number) {
  const t = clamp(elapsed / sunriseDuration);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** One light value, four moments of a dawn: the high cloud catches it first, then the sky, then the sun, and the water last. */
export function lightLayers(light: number) {
  const l = clamp(light);
  return { cloud: 1 - (1 - l) ** 3, sky: 1 - (1 - l) ** 1.8, sun: l, water: l ** 1.6 };
}

/** What a screen reader hears as the light moves. */
export function lightName(light: number) {
  if (light < .2) return "silver dawn";
  if (light < .5) return "first light";
  if (light < .85) return "warming";
  return "golden";
}

/** Horizontal position across the strip, with a margin so either end is reachable without leaving it. */
export function scrubAt(x: number, width: number) {
  return width > 0 ? clamp((x / width - .06) / .88) : 0;
}

/** A touch fling (pixels per millisecond) carries the light a little past the finger. */
export function flingOffset(velocity: number, width: number) {
  return width > 0 ? (velocity * 90) / (width * .88) : 0;
}

/** Arrow keys move in tenths; Home and End jump to silver or gold. Other keys are left alone. */
export function scrubKey(key: string, light: number) {
  switch (key) {
    case "ArrowLeft": case "ArrowDown": return clamp(light - .1);
    case "ArrowRight": case "ArrowUp": return clamp(light + .1);
    case "Home": return 0;
    case "End": return 1;
    default: return undefined;
  }
}

/** Frame-rate independent easing toward a target; snaps once the difference stops being visible. */
export function approach(light: number, target: number, rate: number, dt: number) {
  const next = light + (target - light) * (1 - Math.exp(-rate * dt));
  return Math.abs(target - next) < .0005 ? target : next;
}

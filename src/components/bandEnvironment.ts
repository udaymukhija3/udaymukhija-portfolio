/* The drawn morning behind the six exposures.

   No photographs. The park is rendered as material: a skyline of thin
   vertical marks along one horizon (glass, distant architecture), a treeline
   mass in front of it (foliage), a ruled water plane below with the skyline
   reflected in it, and the stone of the rail. The sun rises behind the marks.

   Each exposure sets the world's state: how dense the skyline is (density
   against openness), how much foliage stands in front, how still the water
   is, and where the sun is on its arc. The stage interpolates between them. */

export const GRID_COLUMNS = 12;
export const GRID_ROWS = 8;

/* The horizon is the page's datum: one line, everything measured from it. */
export const HORIZON = 62;

export type ExposureWorld = {
  /** The sun's azimuth, as a percentage of the viewport width. */
  sun: number;
  /** Fraction of the skyline's marks standing: 1 is dense, 0 is open. */
  density: number;
  /** Presence of the treeline in front of the skyline. */
  foliage: number;
  /** Stillness of the water: 1 is glass, 0 is broken. */
  still: number;
  /** The figure this exposure focuses on. */
  figure: string;
  subject: string;
};

export const worlds: readonly ExposureWorld[] = [
  { sun: 60, density: 1, foliage: 0.95, still: 0.92, figure: "Fig. 01", subject: "The horizon, calibrated" },
  { sun: 57, density: 0.9, foliage: 0.8, still: 0.75, figure: "Fig. 02", subject: "A ninety-second cap" },
  { sun: 54, density: 0.78, foliage: 0.6, still: 0.85, figure: "Fig. 03", subject: "Twelve fragments, four chosen" },
  { sun: 51, density: 0.64, foliage: 0.45, still: 0.55, figure: "Fig. 04", subject: "One tap, one locked transaction" },
  { sun: 48, density: 0.48, foliage: 0.3, still: 0.7, figure: "Fig. 05", subject: "Four studies, indexed" },
  { sun: 45, density: 0.28, foliage: 0.15, still: 0.95, figure: "Fig. 06", subject: "Openness" },
];

/* The skyline: forty-eight marks on a 1000-unit line, deterministic. Some
   are glass — drawn as outlines that catch the sun — and a few are the thin
   supertalls. Each mark has a threshold; it stands while density ≥ t, so the
   skyline thins from the same drawing rather than swapping drawings. */
export type Mark = { x: number; w: number; h: number; t: number; glass: boolean };

export function skyline(count = 48): Mark[] {
  let seed = 20260913;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const marks: Mark[] = [];
  for (let i = 0; i < count; i++) {
    const x = 8 + i * (984 / count) + (rand() - 0.5) * 8;
    const tall = rand() < 0.12;
    const w = tall ? 3 + rand() * 3 : 6 + rand() * 12;
    const h = tall ? 180 + rand() * 110 : 24 + rand() ** 1.6 * 120;
    // Openness keeps the tall, thin marks longest; the low mass goes first.
    const t = tall ? rand() * 0.3 : 0.15 + rand() * 0.72;
    marks.push({ x, w, h, t, glass: rand() < 0.3 });
  }
  return marks;
}

/* The treeline: a soft irregular mass along the horizon, as a path. */
export function treeline(points = 28): string {
  let seed = 4111;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const step = 1000 / (points - 1);
  let d = "M0 100";
  for (let i = 0; i < points; i++) {
    const x = i * step;
    const y = 100 - (18 + rand() * 42) * (0.6 + 0.4 * Math.sin(i * 0.9));
    const cx = x - step / 2;
    d += ` Q${cx.toFixed(1)} ${(y - 14 - rand() * 20).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + " L1000 100 Z";
}

/* Central Park. The coordinates are the place; the clock is the page. */
export const place = { name: "Central Park", city: "New York, NY", lat: "40.7812° N", lon: "73.9665° W" };

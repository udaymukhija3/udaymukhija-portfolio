/* The print: one landscape in three inks and a crimson, drawn once in a 1600 × 1000 space.
   Everything here is deterministic so the server and the client pull the same impression. */

export const sheet = { width: 1600, height: 1000, horizon: 600 };

/** Named after the pigments: ai is indigo, sumi the near-black, kinari the unbleached paper, beni the crimson. */
export const inks = {
  paper: "#EFE9DC",
  skyHigh: "#8E9DBC",
  sky: "#BAC3D3",
  skyLow: "#D8D8D5",
  kinari: "#F1DFB5",
  snow: "#D6DDE8",
  aiPale: "#5674AE",
  ai: "#2F4E8E",
  aiDeep: "#213E78",
  aiShade: "#1B3468",
  sumi: "#0D1830",
  water: "#25437E",
  waterPale: "#AEBBD2",
  beni: "#C8322F",
};

type Point = [number, number];

/** A small seeded generator (mulberry32) so the strokes fall the same way every time. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;
const pt = ([x, y]: Point) => `${round(x)} ${round(y)}`;

/** Subdivides a ridge of control peaks into a jagged skyline; the control points themselves stay put so a peak stays a peak. */
function ridge(controls: Point[], r: () => number, rough: number, steps: number): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < controls.length - 1; i++) {
    const [x0, y0] = controls[i], [x1, y1] = controls[i + 1];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const jitter = s === 0 ? 0 : (r() - 0.5) * rough * 2 * Math.sin(t * Math.PI);
      out.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t + jitter]);
    }
  }
  out.push(controls[controls.length - 1]);
  return out;
}

/** The skyline closed down to the horizon as a path. */
function massPath(skyline: Point[]): string {
  const [first] = skyline, last = skyline[skyline.length - 1];
  return `M${round(first[0])} ${sheet.horizon} ` + skyline.map(p => `L${pt(p)}`).join(" ") + ` L${round(last[0])} ${sheet.horizon} Z`;
}

/** Height of a skyline at x, by linear interpolation. */
function heightAt(skyline: Point[], x: number) {
  for (let i = 0; i < skyline.length - 1; i++) {
    const [x0, y0] = skyline[i], [x1, y1] = skyline[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
  }
  return sheet.horizon;
}

/** Indices into the subdivided skyline of the control points that are peaks. */
function peaks(controls: Point[], steps: number) {
  const out: number[] = [];
  for (let i = 1; i < controls.length - 1; i++) {
    if (controls[i][1] < controls[i - 1][1] && controls[i][1] < controls[i + 1][1]) out.push(i * steps);
  }
  return out;
}

/* Far ranges: a paler ridge at the back, a fuller one in front that carries the snow, and a mid mass at the right that steps toward the dark shoulder. */
const backControls: Point[] = [[0, 396], [70, 342], [150, 388], [240, 292], [320, 352], [410, 258], [500, 336], [580, 204], [640, 262], [700, 190], [770, 250], [840, 222], [920, 286], [1010, 326], [1110, 372], [1220, 440], [1330, 534], [1400, 600]];
const frontControls: Point[] = [[0, 486], [60, 436], [120, 468], [200, 372], [270, 438], [340, 334], [410, 412], [470, 262], [520, 318], [580, 382], [640, 300], [700, 368], [780, 292], [860, 356], [930, 378], [1010, 424], [1100, 472], [1200, 530], [1280, 600]];
const midControls: Point[] = [[860, 600], [920, 520], [1000, 430], [1090, 372], [1180, 336], [1270, 330], [1360, 352], [1450, 392], [1540, 430], [1600, 452]];

export const backRidge = ridge(backControls, rng(11), 10, 5);
export const frontRidge = ridge(frontControls, rng(23), 13, 6);
const frontPeaks = peaks(frontControls, 6);
const midRidge = ridge(midControls, rng(31), 7, 4);
export const backMass = massPath(backRidge);
export const frontMass = massPath(frontRidge);
export const midMass = massPath(midRidge);

/* The near mass on the right: one dark shoulder, drawn as a curve rather than a jag. */
export const nearMass = (() => {
  const shoulder: Point[] = [[950, 600], [980, 556], [1020, 498], [1070, 444], [1130, 394], [1200, 346], [1280, 304], [1360, 278], [1430, 284], [1500, 300], [1560, 316], [1600, 320]];
  const line = ridge(shoulder, rng(5), 5, 4);
  return `M950 ${sheet.horizon} ` + line.map(p => `L${pt(p)}`).join(" ") + ` L1600 ${sheet.horizon} Z`;
})();

/** Shadow faces: the right-hand slope under each front peak is a darker plane. */
export const facets = (() => {
  const out: string[] = [];
  for (const i of frontPeaks) {
    // Walk right from the peak down to the col.
    let j = i;
    while (j + 1 < frontRidge.length && frontRidge[j + 1][1] >= frontRidge[j][1]) j++;
    if (j === i) continue;
    const top = frontRidge[i], col = frontRidge[j];
    const drop = Math.min(sheet.horizon, col[1] + 30 + (col[1] - top[1]) * 0.8);
    const face = [top, ...frontRidge.slice(i + 1, j + 1), [col[0] - (col[0] - top[0]) * 0.35, drop] as Point, [top[0] + 4, top[1] + (drop - top[1]) * 0.5] as Point];
    out.push("M" + face.map(pt).join(" L") + " Z");
  }
  return out;
})();

/** Snow caps: the upper faces of each front peak are pale, closed below by a ragged line. */
export const snowCaps = (() => {
  const r = rng(41);
  const caps: string[] = [];
  for (const i of frontPeaks) {
    const [px, py] = frontRidge[i];
    // Some peaks carry their snow a long way down.
    const depth = r() < 0.35 ? 130 + r() * 90 : 56 + r() * 70;
    const reach = 70 + r() * 70;
    let a = i, b = i;
    while (a > 0 && frontRidge[a - 1][1] > py && frontRidge[a - 1][1] < py + depth && px - frontRidge[a - 1][0] < reach) a--;
    while (b < frontRidge.length - 1 && frontRidge[b + 1][1] > py && frontRidge[b + 1][1] < py + depth && frontRidge[b + 1][0] - px < reach) b++;
    if (b - a < 2) continue;
    const along = frontRidge.slice(a, b + 1);
    const floor: Point[] = [];
    const steps = 9;
    for (let k = steps; k >= 0; k--) {
      const t = k / steps;
      const x = along[0][0] + (along[along.length - 1][0] - along[0][0]) * t;
      const y = Math.min(sheet.horizon - 6, heightAt(frontRidge, x) + depth * (0.5 + 0.5 * Math.sin(t * Math.PI)) + (r() - 0.5) * 44);
      floor.push([x, y]);
    }
    caps.push("M" + [...along, ...floor].map(pt).join(" L") + " Z");
  }
  return caps;
})();

/** Rock ribs: dark diagonal strokes through the snow, and pale gully lines below it. */
export const rockRibs = (() => {
  const r = rng(43);
  const ribs: { d: string; width: number; opacity: number }[] = [];
  for (const i of frontPeaks) {
    const [px] = frontRidge[i];
    const count = 5 + Math.floor(r() * 6);
    for (let k = 0; k < count; k++) {
      const side = r() < 0.5 ? -1 : 1;
      const x = px + side * r() * 60, y = heightAt(frontRidge, x) + 4 + r() * 30;
      const slope = side * (0.3 + r() * 0.8), length = 18 + r() * 60;
      ribs.push({
        d: `M${round(x)} ${round(y)} q${round(slope * length * 0.45)} ${round(length * 0.5)} ${round(slope * length)} ${round(length)}`,
        width: 1.2 + r() * 2,
        opacity: 0.5 + r() * 0.45,
      });
    }
  }
  return ribs;
})();

export const gullies = (() => {
  const r = rng(47);
  const lines: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 22; k++) {
    const x = 30 + r() * 1150, top = heightAt(frontRidge, x);
    const y = top + 70 + r() * 80;
    if (y > 560) continue;
    const dx = (r() - 0.5) * 30, dy = 18 + r() * 50;
    lines.push({ d: `M${round(x)} ${round(y)} q${round(dx * 0.4)} ${round(dy * 0.5)} ${round(dx)} ${round(dy)}`, width: 1.2 + r() * 1.6, opacity: 0.5 + r() * 0.4 });
  }
  return lines;
})();

/** Rock: faint diagonal strokes over the lower faces of the front range, the way a brush leaves the block. */
export const rockStrokes = (() => {
  const r = rng(61);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 90; k++) {
    const x = 20 + r() * 1200, top = heightAt(frontRidge, x);
    const y = top + 90 + r() * (sheet.horizon - top - 100);
    if (y > 585 || y < top + 60) continue;
    const lean = (r() < 0.5 ? -1 : 1) * (0.4 + r() * 0.9), length = 14 + r() * 40;
    strokes.push({ d: `M${round(x)} ${round(y)} l${round(lean * length * 0.5)} ${round(length)}`, width: 1 + r() * 1.6, opacity: 0.18 + r() * 0.26 });
  }
  return strokes;
})();

/** The shoulder's grain: a few long strokes that follow its slope, barely lighter than the mass. */
export const shoulderStrokes = (() => {
  const r = rng(67);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 26; k++) {
    const x = 1010 + r() * 560, y = 330 + r() * 250;
    const length = 40 + r() * 120;
    strokes.push({ d: `M${round(x)} ${round(y)} q${round(length * 0.28)} ${round(length * 0.36)} ${round(length * 0.62)} ${round(length * 0.66)}`, width: 0.9 + r() * 1.4, opacity: 0.07 + r() * 0.12 });
  }
  return strokes;
})();

/** Cloud bands: cream horizontal strokes in three loose tiers across the middle sky. */
export const cloudStrokes = (() => {
  const r = rng(77);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  const tiers: [number, number, number][] = [[228, 16, 40], [292, 24, 64], [372, 32, 60]];
  for (const [centre, spread, count] of tiers) {
    for (let i = 0; i < count; i++) {
      const y = centre + (r() + r() - 1) * spread;
      const x = -60 + r() * 1300;
      const length = 40 + r() * r() * 560;
      const lift = (r() - 0.5) * 4;
      strokes.push({
        d: `M${round(x)} ${round(y)} q${round(length / 2)} ${round(lift)} ${round(length)} 0`,
        width: 1 + r() * r() * 3.8,
        opacity: 0.55 + r() * 0.45,
      });
    }
  }
  return strokes;
})();

/** Short dashes on the water just under the horizon. */
export const ripples = (() => {
  const r = rng(99);
  const dashes: { x: number; y: number; length: number; width: number; opacity: number }[] = [];
  for (let i = 0; i < 90; i++) {
    const y = 604 + r() * r() * 150;
    dashes.push({ x: round(r() * 1560), y: round(y), length: round(6 + r() * r() * 110), width: round(1 + r() * 1.5), opacity: 0.3 + r() * 0.5 });
  }
  return dashes;
})();

/* The boat and its wake: a fan of broad cream bands opening behind the boat toward the bottom of the sheet. */
export const boat = { x: 600, y: 770 };

export const wakeArcs = (() => {
  const r = rng(3);
  const arcs: { d: string; width: number; opacity: number; dash: string }[] = [];
  const cx = boat.x, cy = boat.y - 8;
  for (let i = 0; i < 11; i++) {
    const radius = 24 + i * 20 + i * i * 3.2;
    const rx = radius * 1.05, ry = radius * 0.5;
    const half = 0.5 + i * 0.04;
    const start = Math.PI / 2 - half - r() * 0.05, end = Math.PI / 2 + half + r() * 0.05;
    const x0 = cx + rx * Math.cos(start), y0 = cy + ry * Math.sin(start);
    const x1 = cx + rx * Math.cos(end), y1 = cy + ry * Math.sin(end);
    const a = 120 + r() * 260, b = 8 + r() * 22, c = 180 + r() * 320, e = 6 + r() * 26;
    arcs.push({
      d: `M${round(x0)} ${round(y0)} A${round(rx)} ${round(ry)} 0 0 1 ${round(x1)} ${round(y1)}`,
      width: 2 + i * 1.15,
      opacity: 0.55 + Math.min(0.4, i * 0.04),
      dash: `${round(a)} ${round(b)} ${round(c)} ${round(e)}`,
    });
  }
  return arcs;
})();

/** A canoe with one figure, as a single dark shape. */
export const boatPath = `M${boat.x - 34} ${boat.y} q34 11 70 0 l-7 -4 q-28 7 -56 0 z M${boat.x + 4} ${boat.y - 21} q7 -5 11 0 v18 h-12 z M${boat.x + 5} ${boat.y - 25} a4 4 0 1 1 8 0 a4 4 0 1 1 -8 0`;

export const sun = { x: 1192, y: 196, r: 42 };

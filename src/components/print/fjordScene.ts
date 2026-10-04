/* The second sheet: a fjord in spring. A forested ridge at left, snow peaks at right, green fields, still water,
   and a red boathouse on a stone pier as the one warm mark. Same 1600 × 1000 space, same deterministic drawing. */

import { rng, sheet } from "./scene";

/** Five inks and a red: sora (sky), ai (water), moegi (the green), sumi, kinari (paper and snow), bengara, the deep iron red of the barn. */
export const fjordInks = {
  skyHigh: "#3F6DAF",
  skyMid: "#86A9D2",
  skyLow: "#C6D4E4",
  snow: "#EBF0F5",
  snowShade: "#A7BBD3",
  rock: "#3B4860",
  rockPale: "#6F7F98",
  ridge: "#5C5B45",
  ridgeTop: "#7A7358",
  ridgeFoot: "#3F4A36",
  ridgeDark: "#3A4433",
  ridgeBirch: "#7F7860",
  ridgeClearing: "#8FA25C",
  field: "#8A9E5E",
  fieldLight: "#ABBB7A",
  fieldDark: "#66793F",
  tree: "#47573B",
  birch: "#8D7F5F",
  water: "#2F5688",
  waterDeep: "#24466F",
  waterLight: "#8FB0D2",
  grass: "#74904E",
  grassTop: "#86A05A",
  grassFoot: "#5E7C45",
  grassLight: "#9CB26C",
  grassDark: "#4F6E38",
  weed: "#4D4A30",
  stone: "#66635A",
  stoneDark: "#48463E",
  stoneLight: "#8A867A",
  house: "#EEEBE2",
  roof: "#43464D",
  van: "#D8D6CD",
  bengara: "#9E3129",
  bengaraDark: "#6B2019",
};

type Point = [number, number];
const round = (n: number) => Math.round(n * 10) / 10;
const pt = ([x, y]: Point) => `${round(x)} ${round(y)}`;
const horizon = 608;
export const fjordHorizon = horizon;

function ridgeLine(controls: Point[], r: () => number, rough: number, steps: number): Point[] {
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
function heightAt(line: Point[], x: number) {
  for (let i = 0; i < line.length - 1; i++) {
    const [x0, y0] = line[i], [x1, y1] = line[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
  }
  return horizon;
}
function closeDown(line: Point[], floor: number): string {
  const [first] = line, last = line[line.length - 1];
  return `M${round(first[0])} ${floor} ` + line.map(p => `L${pt(p)}`).join(" ") + ` L${round(last[0])} ${floor} Z`;
}

/* ---- Snow peaks at right ---- */
const peakControls: Point[] = [[760, 600], [820, 548], [880, 500], [930, 470], [970, 482], [1010, 456], [1060, 470], [1110, 428], [1160, 396], [1200, 372], [1236, 322], [1262, 388], [1300, 394], [1330, 366], [1362, 402], [1412, 430], [1446, 410], [1476, 380], [1500, 366], [1536, 350], [1581, 328], [1600, 340]];
export const peakLine = ridgeLine(peakControls, rng(101), 7, 5);
export const peakMass = closeDown(peakLine, 600);
const peakIndices = (() => {
  const out: number[] = [];
  for (let i = 1; i < peakControls.length - 1; i++) if (peakControls[i][1] < peakControls[i - 1][1] && peakControls[i][1] < peakControls[i + 1][1]) out.push(i * 5);
  return out;
})();

/** Shadow faces: the right slope of each peak in pale blue; the two big peaks carry dark rock on their left flank. */
export const peakShade = (() => {
  const out: string[] = [];
  for (const i of peakIndices) {
    let j = i;
    while (j + 1 < peakLine.length && peakLine[j + 1][1] >= peakLine[j][1]) j++;
    if (j === i) continue;
    const top = peakLine[i], col = peakLine[j];
    const drop = Math.min(598, col[1] + 26 + (col[1] - top[1]) * 0.7);
    const face = [top, ...peakLine.slice(i + 1, j + 1), [col[0] - (col[0] - top[0]) * 0.4, drop] as Point, [top[0] + 3, top[1] + (drop - top[1]) * 0.45] as Point];
    out.push("M" + face.map(pt).join(" L") + " Z");
  }
  return out;
})();
export const peakRock = (() => {
  const r = rng(103);
  const out: string[] = [];
  for (const i of peakIndices) {
    const [px, py] = peakLine[i];
    if (py > 400) continue;
    let a = i;
    while (a > 0 && peakLine[a - 1][1] >= peakLine[a][1] && px - peakLine[a - 1][0] < 70) a--;
    const along = peakLine.slice(a, i + 1);
    const depth = 60 + r() * 60;
    const floor: Point[] = [];
    for (let k = 4; k >= 0; k--) {
      const t = k / 4, x = along[0][0] + (px - along[0][0]) * t;
      floor.push([x, heightAt(peakLine, x) + depth * (0.45 + 0.55 * t) + (r() - 0.5) * 24]);
    }
    out.push("M" + [...along, ...floor].map(pt).join(" L") + " Z");
  }
  return out;
})();
/** Snow gullies: pale strokes running down through the rock faces. */
export const peakGullies = (() => {
  const r = rng(105);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (const i of peakIndices) {
    const [px, py] = peakLine[i];
    if (py > 400) continue;
    for (let k = 0; k < 9; k++) {
      const x = px - 4 - r() * 60, y = heightAt(peakLine, x) + 6 + r() * 20;
      const length = 20 + r() * 60, lean = -0.15 - r() * 0.35;
      strokes.push({ d: `M${round(x)} ${round(y)} q${round(lean * length * 0.4)} ${round(length * 0.5)} ${round(lean * length)} ${round(length)}`, width: 1.2 + r() * 2, opacity: 0.6 + r() * 0.4 });
    }
  }
  return strokes;
})();
/** Rock ribs through the snow: dense on the steep upper faces, scattered lower down. */
export const peakRibs = (() => {
  const r = rng(107);
  const ribs: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 420; k++) {
    const x = 780 + r() * 820, top = heightAt(peakLine, x);
    if (top > 590) continue;
    const y = top + 3 + r() * (596 - top) * (0.3 + r() * 0.7);
    const lean = (r() < 0.5 ? -1 : 1) * (0.1 + r() * 0.5), length = 6 + r() * 22;
    ribs.push({ d: `M${round(x)} ${round(y)} q${round(lean * length * 0.4)} ${round(length * 0.5)} ${round(lean * length)} ${round(length)}`, width: 0.8 + r() * 1.4, opacity: 0.35 + r() * 0.5 });
  }
  return ribs;
})();

/** The rock foot: the lower faces are bare, a dark band with a ragged top and snow gullies running into it. */
export const rockFoot = (() => {
  const r = rng(109);
  const top: Point[] = [];
  for (let x = 770; x <= 1600; x += 22) {
    const ridgeY = heightAt(peakLine, x);
    top.push([x, Math.max(ridgeY + 30, 486 + (r() - 0.5) * 50 + Math.sin(x / 90) * 18)]);
  }
  return "M770 600 " + top.map(p => `L${pt(p)}`).join(" ") + " L1600 600 Z";
})();
export const footGullies = (() => {
  const r = rng(115);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 70; k++) {
    const x = 790 + r() * 800, y = 470 + r() * 60;
    const length = 16 + r() * 60, lean = (r() - 0.5) * 0.5;
    strokes.push({ d: `M${round(x)} ${round(y)} q${round(lean * length * 0.4)} ${round(length * 0.5)} ${round(lean * length)} ${round(length)}`, width: 1 + r() * 2.2, opacity: 0.35 + r() * 0.5 });
  }
  return strokes;
})();

/* ---- The forested ridge at left ---- */
const ridgeControls: Point[] = [[0, 372], [80, 360], [160, 362], [240, 376], [330, 396], [420, 412], [520, 428], [620, 446], [720, 464], [820, 484], [900, 498], [980, 514], [1060, 530], [1140, 546], [1220, 558], [1300, 572], [1380, 584], [1460, 592], [1600, 600]];
export const ridge = ridgeLine(ridgeControls, rng(111), 4, 8);
export const ridgeMass = closeDown(ridge, horizon);
/** Tree tips along the skyline, so the edge reads as forest rather than rock. */
export const ridgeFringe = (() => {
  const r = rng(113);
  const tips: { x: number; y: number; h: number; w: number }[] = [];
  for (let x = 2; x < 1300; x += 2.5 + r() * 3) {
    const y = heightAt(ridge, x);
    const clump = r() < 0.06;
    tips.push({ x: round(x), y: round(y + 1.5), h: round(clump ? 6 + r() * 8 : 2 + r() * r() * 6), w: clump ? 3 : 1.2 });
  }
  return tips;
})();
/** Spruce: darker stands on the slope. */
export const spruce = (() => {
  const r = rng(117);
  const stands: string[] = [];
  const spots: [number, number, number, number][] = [[150, 484, 180, 24], [440, 520, 200, 22], [740, 544, 150, 18], [250, 428, 100, 14]];
  for (const [cx, cy, rx, ry] of spots) {
    const points: Point[] = [];
    const tilt = 0.19;
    for (let k = 0; k < 18; k++) {
      const a = (k / 18) * Math.PI * 2, w = 0.7 + r() * 0.6;
      const x = Math.cos(a) * rx * w, y = Math.sin(a) * ry * w;
      points.push([cx + x, cy + y + x * tilt]);
    }
    stands.push("M" + points.map(pt).join(" L") + " Z");
  }
  return stands;
})();
/** Clearings: pale green fields cut into the lower slope. */
export const clearings = [
  "M0 456 L60 448 L120 462 L96 486 L30 494 L0 490 Z",
  "M250 514 L330 506 L420 520 L400 548 L300 552 L240 540 Z",
  "M640 536 L720 530 L790 546 L760 566 L660 566 Z",
  "M900 548 L980 546 L1020 560 L960 572 L890 566 Z",
];
/** Birch: thin pale trunks scattered over the ridge, the brush's vertical grain. */
export const birchStrokes = (() => {
  const r = rng(119);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 420; k++) {
    const x = r() * 1280, top = heightAt(ridge, x);
    const y = top + 4 + r() * r() * (horizon - 60 - top);
    if (y > 560) continue;
    const length = 5 + r() * 16;
    strokes.push({ d: `M${round(x)} ${round(y)} l${round((r() - 0.5) * 2)} ${round(length)}`, width: 0.8 + r() * 1.3, opacity: 0.35 + r() * 0.45 });
  }
  return strokes;
})();

/** Contour strokes: long faint lines that follow the slope. */
export const contourStrokes = (() => {
  const r = rng(120);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 40; k++) {
    const x = r() * 1150, top = heightAt(ridge, x);
    const y = top + 20 + r() * (horizon - 70 - top);
    if (y > 556) continue;
    const length = 40 + r() * 160, slope = 0.16 + r() * 0.1;
    strokes.push({ d: `M${round(x)} ${round(y)} q${round(length / 2)} ${round(length * slope * 0.4)} ${round(length)} ${round(length * slope)}`, width: 1 + r() * 1.6, opacity: 0.18 + r() * 0.3 });
  }
  return strokes;
})();

/* ---- Fields between the slope and the water ---- */
const fieldControls: Point[] = [[0, 536], [120, 548], [260, 556], [400, 560], [560, 556], [720, 562], [880, 556], [1040, 558], [1200, 562], [1380, 566], [1600, 570]];
export const fieldLine = ridgeLine(fieldControls, rng(121), 3, 4);
export const fieldMass = closeDown(fieldLine, horizon);
export const fieldBands = (() => {
  const r = rng(123);
  const bands: { d: string; width: number; opacity: number; light: boolean }[] = [];
  for (let k = 0; k < 110; k++) {
    const x = r() * 1600, y = heightAt(fieldLine, x) + 3 + r() * (horizon - 8 - heightAt(fieldLine, x));
    const length = 30 + r() * r() * 300;
    bands.push({ d: `M${round(x)} ${round(y)} h${round(length)}`, width: 1.5 + r() * 4, opacity: 0.35 + r() * 0.5, light: r() < 0.55 });
  }
  return bands;
})();
/** Houses along the shore and up the slope: a wall and a roof, a few of them red. */
export const houses: { x: number; y: number; w: number; h: number; red?: boolean }[] = [
  { x: 6, y: 588, w: 26, h: 16 }, { x: 96, y: 580, w: 40, h: 18 }, { x: 150, y: 584, w: 28, h: 14, red: true }, { x: 236, y: 576, w: 34, h: 18 },
  { x: 740, y: 578, w: 22, h: 10 }, { x: 1246, y: 582, w: 16, h: 8 }, { x: 1306, y: 586, w: 12, h: 7, red: true }, { x: 1400, y: 586, w: 14, h: 8 },
];
export const treeClumps: { x: number; y: number; r: number; birch?: boolean }[] = [
  { x: 380, y: 586, r: 10 }, { x: 560, y: 590, r: 8, birch: true }, { x: 640, y: 596, r: 7 }, { x: 700, y: 592, r: 9, birch: true }, { x: 900, y: 592, r: 6, birch: true },
  { x: 960, y: 596, r: 8 }, { x: 1020, y: 592, r: 6 }, { x: 1120, y: 596, r: 7, birch: true }, { x: 1180, y: 594, r: 5 }, { x: 1340, y: 596, r: 6 }, { x: 1520, y: 598, r: 5, birch: true },
];

/* ---- The point: stone pier, sheds, the barn ---- */
export const pier = { left: 296, right: 830, top: 660, bottom: 719 };
export const pierMass = `M0 646 L60 640 L140 644 L230 650 L${pier.left} ${pier.top} L${pier.right - 40} ${pier.top} L${pier.right} ${pier.top + 14} L${pier.right - 14} ${pier.bottom} L${pier.left + 20} ${pier.bottom} L120 ${pier.bottom - 6} L0 ${pier.bottom} Z`;
export const pierStones = (() => {
  const r = rng(131);
  const stones: { x: number; y: number; w: number; h: number; light: boolean }[] = [];
  for (const row of [pier.top + 8, pier.top + 24, pier.top + 40]) {
    let x = 4 + r() * 10;
    while (x < pier.right - 16) {
      const w = 8 + r() * 14, h = 6 + r() * 8;
      stones.push({ x: round(x), y: round(row + (r() - 0.5) * 6), w: round(w), h: round(h), light: r() < 0.45 });
      x += w + 2 + r() * 6;
    }
  }
  return stones;
})();
export const shoreRocks = (() => {
  const r = rng(133);
  const rocks: { x: number; y: number; rx: number; ry: number }[] = [];
  for (let x = 10; x < pier.right; x += 18 + r() * 30) rocks.push({ x: round(x), y: round(pier.bottom - 2 + r() * 6), rx: round(8 + r() * 14), ry: round(4 + r() * 5) });
  return rocks;
})();
export const sheds: { x: number; y: number; w: number; h: number }[] = [
  { x: 0, y: 670, w: 52, h: 40 }, { x: 100, y: 662, w: 112, h: 36 },
];
export const van = { x: 312, y: 648, w: 62, h: 30 };
export const tractor = { x: 252, y: 660, w: 34, h: 22 };

/** The barn: a tall gable, a low wing to the left, a lean-to at right, planks drawn as strokes. */
export const barn = {
  main: { x: 456, y: 606, w: 220, h: 58 },
  gable: "M456 606 L566 564 L676 606 Z",
  roof: "M444 610 L566 562 L688 610 L684 615 L566 570 L448 615 Z",
  wing: { x: 392, y: 630, w: 64, h: 34 },
  wingGable: "M392 630 L424 606 L456 630 Z",
  wingRoof: "M384 634 L424 604 L464 634 L461 638 L424 610 L387 638 Z",
  leanTo: { x: 676, y: 636, w: 22, h: 28 },
  leanRoof: "M674 638 L700 648 L700 652 L674 642 Z",
  windows: [[482, 622, 10, 12], [522, 622, 10, 12], [566, 622, 10, 12], [606, 622, 10, 12], [410, 642, 8, 10], [558, 586, 12, 14]],
  door: [630, 636, 24, 28],
  base: 664,
};
export const barnPlanks = (() => {
  const strokes: { x: number; y0: number; y1: number }[] = [];
  for (let x = barn.main.x + 6; x < barn.main.x + barn.main.w; x += 7) strokes.push({ x, y0: barn.main.y + 2, y1: barn.base - 1 });
  for (let x = barn.wing.x + 5; x < barn.wing.x + barn.wing.w; x += 7) strokes.push({ x, y0: barn.wing.y + 2, y1: barn.base - 1 });
  return strokes;
})();

/* ---- Water ---- */
export const waterStrokes = (() => {
  const r = rng(141);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 150; k++) {
    const y = horizon + 4 + r() * r() * (870 - horizon);
    const x = r() * 1600, length = 12 + r() * r() * 300;
    if (y < pier.bottom + 4 && x < pier.right + 20) continue;
    strokes.push({ d: `M${round(x)} ${round(y)} h${round(length)}`, width: 1 + r() * 2.2, opacity: 0.3 + r() * 0.5 });
  }
  return strokes;
})();
export const buoys: [number, number][] = [[1256, 722], [1231, 748]];

/* ---- The near bank ---- */
export const bankLine = ridgeLine([[0, 900], [200, 894], [400, 890], [600, 896], [800, 892], [1000, 888], [1200, 892], [1400, 896], [1600, 894]], rng(151), 3, 4);
export const bankMass = closeDown(bankLine, sheet.height);
export const weedStrokes = (() => {
  const r = rng(153);
  const strokes: { d: string; width: number; opacity: number }[] = [];
  for (let k = 0; k < 160; k++) {
    const x = r() * 1600, y = heightAt(bankLine, x) - 2 + r() * 12;
    const length = 6 + r() * 26;
    strokes.push({ d: `M${round(x)} ${round(y)} h${round(length)}`, width: 1.2 + r() * 2.6, opacity: 0.3 + r() * 0.5 });
  }
  return strokes;
})();
export const grassStrokes = (() => {
  const r = rng(157);
  const strokes: { d: string; width: number; opacity: number; light: boolean }[] = [];
  for (let k = 0; k < 460; k++) {
    const x = r() * 1600, y = 906 + r() * 94;
    const length = 5 + r() * 14;
    strokes.push({ d: `M${round(x)} ${round(y)} l${round((r() - 0.5) * 4)} ${round(-length)}`, width: 1 + r() * 1.8, opacity: 0.3 + r() * 0.45, light: r() < 0.5 });
  }
  return strokes;
})();

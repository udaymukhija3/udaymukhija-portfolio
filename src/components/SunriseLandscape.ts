import { clamp, smooth } from "../lib/daybreak";

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);
const rgb = (c: number[], alpha = 1) => `rgba(${c.map(Math.round).join(",")},${alpha})`;
const hash = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
const palettes = [
  { at: 0, top: [6, 17, 33], middle: [18, 36, 56], low: [48, 63, 79], ground: [8, 23, 39] },
  { at: .24, top: [23, 48, 71], middle: [68, 89, 108], low: [200, 142, 122], ground: [24, 46, 65] },
  { at: .52, top: [75, 102, 126], middle: [159, 160, 161], low: [255, 183, 135], ground: [47, 70, 91] },
  { at: .76, top: [151, 180, 194], middle: [210, 202, 185], low: [255, 220, 167], ground: [76, 103, 126] },
  { at: 1, top: [158, 197, 217], middle: [208, 215, 209], low: [251, 227, 188], ground: [76, 111, 139] },
];

/** Painted atmosphere, continuous light, one consistently sized sun. */
export function createSunriseLandscape(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return { resize() {}, draw() {} };
  let width = 1, height = 1;
  const grain = document.createElement("canvas");
  grain.width = grain.height = 192;
  const grainCtx = grain.getContext("2d")!;
  const pixels = grainCtx.createImageData(192, 192);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const value = hash(i) > .5 ? 255 : 0;
    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = value;
    pixels.data[i + 3] = 10 + hash(i + 1) * 14;
  }
  grainCtx.putImageData(pixels, 0, 0);
  const texture = ctx.createPattern(grain, "repeat");

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    width = Math.max(1, box.width); height = Math.max(1, box.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (progress: number, seconds: number, still: boolean) => {
    const p = clamp(progress);
    const next = palettes.findIndex(palette => palette.at >= p);
    const a = palettes[Math.max(0, next - 1)], b = palettes[Math.max(0, next)];
    const t = smooth((p - a.at) / Math.max(.001, b.at - a.at));
    const top = mix(a.top, b.top, t), mid = mix(a.middle, b.middle, t), low = mix(a.low, b.low, t), ground = mix(a.ground, b.ground, t);
    const sky = ctx.createLinearGradient(0, 0, 0, height * .83);
    sky.addColorStop(0, rgb(top)); sky.addColorStop(.46, rgb(mid)); sky.addColorStop(1, rgb(low));
    ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height);

    const small = width < 700;
    const longitude = still ? 0 : (p - .5) * (small ? 12 : 32);
    const horizon = height * (small ? .78 : .77);
    const sunX = width * (small ? .78 : .79) - longitude * .5;
    const radius = Math.min(width * (small ? .18 : .108), height * .23);
    const sunY = horizon + radius * .92 - smooth(p * .95 + .05) * (radius * 2.18 + height * .07);
    const glow = ctx.createRadialGradient(sunX, sunY, radius * .35, sunX, sunY, radius * 3.4);
    glow.addColorStop(0, `rgba(255,173,104,${.07 + smooth(p) * .31})`);
    glow.addColorStop(.38, `rgba(255,169,120,${.02 + smooth(p) * .16})`);
    glow.addColorStop(1, "rgba(255,162,116,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);

    // Distant stars have fixed positions; only the increasing light erases them.
    const stars = 1 - smooth(p / .23);
    if (stars > 0) for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(226,235,245,${stars * (.13 + hash(i + 7) * .32)})`;
      ctx.beginPath(); ctx.arc(hash(i + 4) * width, hash(i + 80) * height * .5, .4 + hash(i + 20) * .5, 0, Math.PI * 2); ctx.fill();
    }

    const disc = ctx.createLinearGradient(sunX, sunY - radius, sunX, sunY + radius);
    disc.addColorStop(0, rgb(mix([255, 102, 83], [255, 217, 125], smooth(p))));
    disc.addColorStop(.55, rgb(mix([255, 95, 76], [255, 164, 99], smooth(p))));
    disc.addColorStop(1, rgb(mix([246, 103, 81], [250, 143, 93], smooth(p))));
    ctx.shadowColor = `rgba(255,139,94,${.12 + p * .15})`; ctx.shadowBlur = radius * .17;
    ctx.fillStyle = disc; ctx.beginPath(); ctx.arc(sunX, sunY, radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;

    // Broad, barely visible bands of atmospheric haze soften the geometric sun.
    for (let i = 0; i < 3; i++) {
      const y = horizon - height * (.02 + i * .038);
      const haze = ctx.createLinearGradient(0, y - height * .035, 0, y + height * .035);
      haze.addColorStop(0, rgb(low, 0)); haze.addColorStop(.5, rgb(low, .025 + p * .025)); haze.addColorStop(1, rgb(low, 0));
      ctx.fillStyle = haze; ctx.fillRect(0, y - height * .035, width, height * .07);
    }

    const crestX = width * .68 - longitude;
    const groundPath = (offset: number) => {
      ctx.beginPath(); ctx.moveTo(-40, horizon + height * .037 + offset);
      ctx.quadraticCurveTo(crestX, horizon - height * .025 + offset, width + 40, horizon + offset);
      ctx.lineTo(width + 40, height); ctx.lineTo(-40, height); ctx.closePath();
    };
    const earth = ctx.createLinearGradient(0, horizon, 0, height);
    earth.addColorStop(0, rgb(mix(ground, low, .08 + p * .13))); earth.addColorStop(.34, rgb(ground)); earth.addColorStop(1, rgb(mix(ground, [5, 21, 34], .4)));
    groundPath(0); ctx.fillStyle = earth; ctx.fill();
    ctx.save(); groundPath(0); ctx.clip();
    const rim = ctx.createLinearGradient(0, horizon - 3, 0, horizon + height * .042);
    rim.addColorStop(0, rgb(low, .1 + p * .17)); rim.addColorStop(1, rgb(low, 0)); ctx.fillStyle = rim; ctx.fillRect(0, horizon - 3, width, height * .08);
    // Wind crosses connected masses of low meadow growth. Broad tonal patches
    // suggest distance; there are no isolated, curled strokes behind the labels.
    const meadow = mix(ground, [103, 129, 119], smooth(p) * .28);
    for (let layer = 0; layer < 3; layer++) {
      const base = height * (.865 + layer * .047);
      const drift = still ? 0 : Math.sin(seconds * .19 + layer * 1.7) * 2;
      const wash = ctx.createLinearGradient(0, base - 14, 0, height);
      wash.addColorStop(0, rgb(mix(meadow, low, .05), .09 + layer * .025));
      wash.addColorStop(1, rgb(mix(meadow, [7, 27, 37], .22), .32));
      ctx.beginPath(); ctx.moveTo(-40, height);
      for (let step = 0; step <= 100; step++) {
        const x = step / 100 * (width + 80) - 40;
        const terrainX = x + longitude * (1 + layer * .15) + drift;
        const swell = Math.sin(terrainX / width * 8 + layer * 1.9) * 6
          + Math.sin(terrainX / width * 19 + layer) * 2;
        const edge = Math.pow(Math.abs(x / width - .5) * 2, 2);
        ctx.lineTo(x, base + swell - edge * height * .018);
      }
      ctx.lineTo(width + 40, height); ctx.closePath();
      ctx.fillStyle = wash; ctx.fill();
    }
    // Soft pools of windblown texture remain peripheral to the reading surface.
    for (let patch = 0; patch < 9; patch++) {
      const x = (patch % 2 === 0 ? .02 : .98) * width + (hash(patch + 17) - .5) * width * .22;
      const y = height * (.875 + hash(patch + 39) * .15);
      const spread = width * (.035 + hash(patch + 83) * .045);
      const breeze = still ? 0 : Math.sin(seconds * .28 - patch * .6) * 1.5;
      ctx.save(); ctx.translate(x + breeze - longitude, y); ctx.scale(1, .13);
      const cluster = ctx.createRadialGradient(0, 0, 0, 0, 0, spread);
      cluster.addColorStop(0, rgb(mix(meadow, low, .12), .1 + p * .06));
      cluster.addColorStop(1, rgb(meadow, 0));
      ctx.fillStyle = cluster; ctx.fillRect(-spread, -spread, spread * 2, spread * 2);
      ctx.restore();
    }
    ctx.restore();
    // Protect editorial contrast without boxing the text in a card.
    const veil = ctx.createLinearGradient(0, 0, width * .7, 0);
    veil.addColorStop(0, `rgba(5,17,31,${(1 - smooth((p - .36) / .28)) * .2})`); veil.addColorStop(1, "rgba(5,17,31,0)");
    ctx.fillStyle = veil; ctx.fillRect(0, 0, width, height);
    if (texture) { ctx.globalAlpha = .28; ctx.fillStyle = texture; ctx.fillRect(0, 0, width, height); ctx.globalAlpha = 1; }
  };
  resize();
  return { resize, draw };
}

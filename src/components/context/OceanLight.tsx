import { Fragment, type CSSProperties } from "react";
import styles from "./OceanLight.module.css";

const palettes = {
  silver: { sky: "#fffaf0", horizon: "#ebd6b9", water: "#a29e98", middle: "#898582", deep: "#575553", light: "#fff4dd", glow: "#fffdf2", shade: "#393938", cloud: "#ece6da", underside: "#d3cbbd" },
  gold: { sky: "#fff1bb", horizon: "#ffbc53", water: "#e1902f", middle: "#bd651f", deep: "#39251c", light: "#ffd36c", glow: "#fffacb", shade: "#33221b", cloud: "#fff6dc", underside: "#f2a94a" },
};
type Phase = keyof typeof palettes;
/** The silver scene is one drawing; the gold scene is three layers so the sky can warm before the water does. */
type Layer = "scene" | "sky" | "water" | "sun";

// Fixed, irregular bands keep the water quiet and deterministic on the server.
const bands = [
  [195, 3, .18], [203, 2, .26], [214, 4, .21], [224, 2, .32],
  [235, 6, .24], [248, 3, .42], [259, 5, .31], [274, 7, .4],
  [286, 3, .27], [299, 9, .42], [317, 4, .32], [331, 8, .5],
  [347, 5, .34], [362, 10, .4], [380, 6, .3],
];
const reflections = [
  [190, 470, 3, .7], [201, 390, 2, .6], [212, 440, 4, .65],
  [228, 330, 3, .8], [242, 490, 3, .65], [256, 365, 5, .9],
  [271, 420, 3, .7], [287, 330, 4, .85], [307, 475, 5, .72],
  [328, 340, 4, .85], [348, 440, 5, .66], [370, 360, 4, .6],
];
// Loose bands that drift once the sunrise has settled, ordered by depth: the nearest (lowest) travels furthest
// and slowest, the farthest barely moves. Each lives in its own small SVG so the compositor moves it without
// repainting the blurred water beneath. Travel is in CSS pixels, timings in seconds, everything else scene units.
const drifts = [
  { cx: 906, cy: 238, rx: 350, ry: 4, opacity: .55, travel: 8, period: 21, swell: 11, shimmer: 7, arrive: 0 },
  { cx: 942, cy: 270, rx: 430, ry: 6, opacity: .5, travel: -14, period: 27, swell: 13, shimmer: 9, arrive: .3 },
  { cx: 914, cy: 306, rx: 300, ry: 5, opacity: .45, travel: 20, period: 35, swell: 15, shimmer: 11, arrive: .6 },
  { cx: 932, cy: 336, rx: 390, ry: 7, opacity: .35, travel: -28, period: 43, swell: 17, shimmer: 13, arrive: .9 },
];
// Sun glitter: points scattered down the reflection column, as x offset from the column, y, and radius.
const glints = [
  [-38, 214, 3.6], [22, 226, 3], [-6, 241, 4], [54, 252, 3.2], [82, 246, 2.8], [-70, 263, 3.4],
  [12, 279, 4.2], [-28, 294, 3], [66, 308, 3.6], [-52, 322, 3.2], [30, 337, 4], [-12, 352, 3.4],
];

const percent = (x: number, y: number, width: number, height: number): CSSProperties =>
  ({ left: `${x / 14.4}%`, top: `${y / 4}%`, width: `${width / 14.4}%`, height: `${height / 4}%` });

function Ocean({ phase, layer, className = "" }: { phase: Phase; layer: Layer; className?: string }) {
  const p = palettes[phase];
  const id = `ocean-${phase}-${layer}`;
  // The gold sun sits a little higher and its reflection runs a little tighter, so the cross-fade reads as the sun rising.
  const lift = phase === "gold" ? 12 : 0, tighten = phase === "gold" ? .9 : 1;
  const sky = layer === "scene" || layer === "sky", water = layer === "scene" || layer === "water", sun = layer === "scene" || layer === "sun";
  return <svg className={`${styles.scene} ${className}`} viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-sky`} x2="0" y2="1">
        <stop stopColor="#fff" /><stop offset=".5" stopColor={p.sky} /><stop offset="1" stopColor={p.horizon} />
      </linearGradient>
      <linearGradient id={`${id}-water`} x2="0" y2="1">
        <stop stopColor={p.water} /><stop offset=".48" stopColor={p.middle} /><stop offset="1" stopColor={p.deep} />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop stopColor={p.glow} stopOpacity=".95" /><stop offset=".4" stopColor={p.light} stopOpacity=".6" /><stop offset="1" stopColor={p.light} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-streak`}>
        <stop stopColor={p.glow} /><stop offset=".35" stopColor={p.light} stopOpacity=".8" /><stop offset="1" stopColor={p.light} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-drift`}>
        <stop stopColor={p.glow} stopOpacity=".9" /><stop offset=".3" stopColor={p.light} stopOpacity=".55" /><stop offset="1" stopColor={p.light} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-fade`} x2="0" y2="1">
        <stop offset=".78" stopColor="#fff" /><stop offset="1" stopColor="#000" />
      </linearGradient>
      <mask id={`${id}-mask`}><rect width="1440" height="400" fill={`url(#${id}-fade)`} /></mask>
      <filter id={`${id}-soft`} x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="10 2" /></filter>
      <filter id={`${id}-haze`} x="-25%" y="-100%" width="150%" height="300%"><feGaussianBlur stdDeviation="18 8" /></filter>
    </defs>
    <g mask={`url(#${id}-mask)`}>
      {sky && <rect width="1440" height="194" fill={`url(#${id}-sky)`} />}
      {water && <>
        <rect y="190" width="1440" height="210" fill={`url(#${id}-water)`} filter={`url(#${id}-soft)`} />
        <g filter={`url(#${id}-soft)`}>
          {bands.map(([y, height, opacity], i) => <path key={y} d={`M-100 ${y} Q${440 + i * 23} ${y + (i % 2 ? 7 : -7)} 1540 ${y + 1}`} fill="none" stroke={p.shade} strokeWidth={height} opacity={opacity * .8} />)}
          {bands.filter((_, i) => i % 2 === 0).map(([y], i) => <path key={y} d={`M-100 ${y + 6} Q700 ${y + 3} 1540 ${y + 8}`} fill="none" stroke={p.light} strokeWidth={2 + i % 3} opacity=".32" />)}
        </g>
      </>}
      {sun && <>
        <g>
          <ellipse cx="920" cy={178 - lift} rx="570" ry="115" fill={`url(#${id}-glow)`} />
          <ellipse cx="920" cy={188 - lift} rx="370" ry="18" fill={`url(#${id}-streak)`} filter={`url(#${id}-haze)`} />
          <ellipse cx="920" cy={284 - lift / 2} rx="255" ry="150" fill={`url(#${id}-glow)`} opacity=".9" />
        </g>
        <g filter={`url(#${id}-soft)`}>
          {reflections.map(([y, radius, height, opacity], i) => <ellipse key={y} cx={920 + (i % 3 - 1) * 28} cy={y} rx={radius * tighten} ry={height} fill={`url(#${id}-streak)`} opacity={opacity} />)}
        </g>
      </>}
    </g>
  </svg>;
}

/** One high, thin cloud left of the sun; its underside catches the gold before the horizon does. */
function Cloud() {
  return <svg className={styles.cloud} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" style={percent(200, 56, 720, 36)}>
    <defs>
      {(["silver", "gold"] as const).map(phase => <Fragment key={phase}>
        <radialGradient id={`ocean-cloud-${phase}-body`}>
          <stop stopColor={palettes[phase].cloud} stopOpacity=".7" /><stop offset=".5" stopColor={palettes[phase].cloud} stopOpacity=".4" /><stop offset="1" stopColor={palettes[phase].cloud} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`ocean-cloud-${phase}-underside`}>
          <stop stopColor={palettes[phase].underside} stopOpacity=".55" /><stop offset=".55" stopColor={palettes[phase].underside} stopOpacity=".22" /><stop offset="1" stopColor={palettes[phase].underside} stopOpacity="0" />
        </radialGradient>
      </Fragment>)}
    </defs>
    {(["silver", "gold"] as const).map(phase => <g key={phase} className={phase === "gold" ? styles.cloudGold : undefined}>
      <ellipse cx="500" cy="44" rx="500" ry="40" fill={`url(#ocean-cloud-${phase}-body)`} />
      <ellipse cx="520" cy="62" rx="440" ry="26" fill={`url(#ocean-cloud-${phase}-underside)`} />
    </g>)}
  </svg>;
}

/** Everything that wakes on the water once the sun is up: drifting bands, then the glitter. */
function Drift() {
  return <div className={styles.drift}>
    {drifts.map(band => <span key={band.cy} className={styles.bandSlot}
      style={{ ...percent(band.cx - band.rx, band.cy - band.ry, band.rx * 2, band.ry * 2), "--arrive": `${band.arrive}s` } as CSSProperties}>
      <svg className={styles.band} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"
        style={{ "--travel": `${band.travel}px`, "--period": `${band.period}s`, "--swell": `${band.swell}s`, "--shimmer": `${band.shimmer}s`, "--band-light": band.opacity } as CSSProperties}>
        <ellipse cx="500" cy="50" rx="500" ry="50" fill="url(#ocean-silver-scene-drift)" />
        <ellipse cx="500" cy="50" rx="500" ry="50" fill="url(#ocean-gold-water-drift)" className={styles.bandGold} />
      </svg>
    </span>)}
    <span className={styles.glitterSlot} style={{ ...percent(780, 200, 280, 160), "--arrive": "1.2s" } as CSSProperties}>
      <svg className={styles.glitter} viewBox="0 0 280 160" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {glints.map(([dx, y, r], i) => <circle key={y} cx={140 + dx} cy={y - 200} r={r} fill="#fffbe6"
          style={{ animationDuration: `${2.3 + (i % 5) * .6}s`, animationDelay: `${-i * .7}s` }} />)}
      </svg>
    </span>
  </div>;
}

export function OceanLight() {
  return <div className={styles.field} data-artwork="ocean-light" aria-hidden="true">
    <Ocean phase="silver" layer="scene" />
    <Ocean phase="gold" layer="sky" className={styles.goldSky} />
    <Ocean phase="gold" layer="water" className={styles.goldWater} />
    <Ocean phase="gold" layer="sun" className={styles.goldSun} />
    <div className={styles.haze} />
    <Cloud />
    <Drift />
    <div className={styles.wake} />
    <div className={styles.bloom} />
    <div className={styles.grain} />
  </div>;
}

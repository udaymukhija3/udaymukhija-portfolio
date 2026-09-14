import styles from "./OceanLight.module.css";

const palettes = {
  silver: { sky: "#fffaf0", horizon: "#ebd6b9", water: "#a29e98", middle: "#898582", deep: "#575553", light: "#fff4dd", glow: "#fffdf2", shade: "#393938" },
  gold: { sky: "#fff1bb", horizon: "#ffbc53", water: "#e1902f", middle: "#bd651f", deep: "#39251c", light: "#ffd36c", glow: "#fffacb", shade: "#33221b" },
};

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

function Ocean({ phase }: { phase: keyof typeof palettes }) {
  const p = palettes[phase];
  const id = `ocean-${phase}`;
  return <svg className={styles[phase]} viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
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
      <linearGradient id={`${id}-fade`} x2="0" y2="1">
        <stop offset=".87" stopColor="#fff" /><stop offset="1" stopColor="#000" />
      </linearGradient>
      <mask id={`${id}-mask`}><rect width="1440" height="400" fill={`url(#${id}-fade)`} /></mask>
      <filter id={`${id}-soft`} x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="10 2" /></filter>
      <filter id={`${id}-haze`} x="-25%" y="-100%" width="150%" height="300%"><feGaussianBlur stdDeviation="18 8" /></filter>
    </defs>
    <g mask={`url(#${id}-mask)`}>
      <rect width="1440" height="194" fill={`url(#${id}-sky)`} />
      <rect y="190" width="1440" height="210" fill={`url(#${id}-water)`} filter={`url(#${id}-soft)`} />
      <g filter={`url(#${id}-soft)`}>
        {bands.map(([y, height, opacity], i) => <path key={y} d={`M-100 ${y} Q${440 + i * 23} ${y + (i % 2 ? 7 : -7)} 1540 ${y + 1}`} fill="none" stroke={p.shade} strokeWidth={height} opacity={opacity * .8} />)}
        {bands.filter((_, i) => i % 2 === 0).map(([y], i) => <path key={y} d={`M-100 ${y + 6} Q700 ${y + 3} 1540 ${y + 8}`} fill="none" stroke={p.light} strokeWidth={2 + i % 3} opacity=".32" />)}
      </g>
      <g className={styles.light}>
        <ellipse cx="920" cy="178" rx="570" ry="115" fill={`url(#${id}-glow)`} />
        <ellipse cx="920" cy="188" rx="370" ry="18" fill={`url(#${id}-streak)`} filter={`url(#${id}-haze)`} />
        <ellipse cx="920" cy="284" rx="255" ry="150" fill={`url(#${id}-glow)`} opacity=".9" />
      </g>
      <g className={styles.reflection} filter={`url(#${id}-soft)`}>
        {reflections.map(([y, radius, height, opacity], i) => <ellipse key={y} cx={920 + (i % 3 - 1) * 28} cy={y} rx={radius} ry={height} fill={`url(#${id}-streak)`} opacity={opacity} />)}
      </g>
    </g>
  </svg>;
}

export function OceanLight() {
  return <div className={styles.field} data-artwork="ocean-light" aria-hidden="true">
    <Ocean phase="silver" />
    <Ocean phase="gold" />
  </div>;
}

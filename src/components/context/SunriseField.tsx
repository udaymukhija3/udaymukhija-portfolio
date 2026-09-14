import type { IndexProject } from "../../data/projects";
import styles from "./ContextPortfolio.module.css";

const reflections = [
  [225, 153, 1050, 1.1, .30], [510, 166, 1110, 1.4, .55],
  [70, 180, 1240, 1.0, .28], [380, 193, 1170, 2.0, .68],
  [150, 209, 1010, 1.1, .34], [480, 226, 1300, 1.8, .54],
  [-80, 246, 1120, 1.0, .35], [400, 264, 1190, 2.0, .58],
  [90, 285, 1370, 1.2, .38], [270, 309, 1110, 1.4, .28],
];

export function SunriseField({ id, hero = false, type = "horizon" }: {
  id: string; hero?: boolean; type?: IndexProject["artworkType"];
}) {
  return <div className={`${styles.field} ${hero ? styles.heroField : styles.projectField}`} data-artwork={type} aria-hidden="true">
    {hero && <><div className={styles.warmPhase} data-light-phase="warm" /><div className={styles.dawnPhase} data-light-phase="dawn" /><div className={styles.solarLight} /></>}
    <div className={styles.lightWash} />
    <svg className={styles.water} viewBox="0 0 1440 360" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id={`${id}-light`}>
          <stop stopColor="#F6E7DE" stopOpacity="0" />
          <stop offset=".4" stopColor="#EBC9B4" stopOpacity=".5" />
          <stop offset=".66" stopColor="#F6E7DE" />
          <stop offset=".79" stopColor="#F6E7DE" stopOpacity=".6" />
          <stop offset="1" stopColor="#D99886" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x2="0" y2="1">
          <stop stopColor="#BC7A7B" stopOpacity="0" />
          <stop offset=".5" stopColor="#8F4B52" stopOpacity=".20" />
          <stop offset="1" stopColor="#BC7A7B" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-haze`} x="-15%" y="-100%" width="130%" height="300%">
          <feGaussianBlur stdDeviation="10 5" />
        </filter>
        <filter id={`${id}-soft`} x="-10%" y="-100%" width="120%" height="300%">
          <feGaussianBlur stdDeviation="2 .65" />
        </filter>
      </defs>
      <g filter={`url(#${id}-haze)`}>
        <path d="M-50 167 Q480 160 820 173 T1490 160 L1490 197 Q1000 183 720 198 T-50 189Z" fill={`url(#${id}-water)`} />
        <path d="M-50 260 Q350 230 780 257 T1490 240 L1490 288 Q1000 271 660 281 T-50 300Z" fill={`url(#${id}-water)`} />
        <path d="M100 190 Q700 186 1400 194" stroke={`url(#${id}-light)`} strokeWidth="15" opacity=".8" />
      </g>
      <g className={styles.reflections} filter={`url(#${id}-soft)`}>
        {reflections.map(([x, y, end, width, opacity], i) =>
          <path key={i} d={`M${x} ${y} Q${(x + end) / 2} ${y - 3} ${end} ${y + 2}`} stroke={`url(#${id}-light)`} strokeWidth={width} opacity={opacity} />)}
      </g>
    </svg>
    {type !== "horizon" && <svg className={styles.motif} viewBox="0 0 1000 300" fill="none">
      {type === "connections" && <g className={styles.connections}>
        <path pathLength="1" d="M180 188L340 116L523 178L705 91L837 156M340 116L705 91M523 178L740 229" />
        {[[180,188],[340,116],[523,178],[705,91],[837,156],[740,229]].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r="3" />)}
      </g>}
      {type === "grid" && <g className={styles.gridMotif}>
        {Array.from({ length: 16 }, (_, i) => <rect key={i} x={384 + i % 4 * 60} y={36 + Math.floor(i / 4) * 60} width="48" height="48" opacity={.25 + i % 3 * .16} />)}
      </g>}
      {type === "waveform" && <g className={styles.waveMotif}>
        {Array.from({ length: 53 }, (_, i) => {
          const amplitude = 5 + Math.pow(Math.sin(i * .43), 2) * 54 * Math.sin(i / 52 * Math.PI);
          return <path key={i} d={`M${188 + i * 12} ${150 - amplitude}V${150 + amplitude}`} />;
        })}
      </g>}
    </svg>}
  </div>;
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { anchors, exposures } from "./bandExposures";
import { GRID_COLUMNS, GRID_ROWS, environmentDirectory, exposurePhotos, place } from "./bandEnvironment";
import styles from "./Band.module.css";

/* The stage: a viewfinder held over a morning.

   A 12 × 8 grid is drawn over the viewport. Each exposure allocates the
   focus frame to a range of its cells; between exposures the frame glides
   from one allocation to the next and pulls focus as it settles. Outside
   the frame the world is soft and slowly drifting; inside it, sharp and
   correctly exposed. The readout reports what the instrument sees: frame,
   focus cells, exposure, time, place. All of it is driven by one scroll
   fraction; nothing runs unless the page moves, except the ambient drift,
   which stops under reduced motion. */

/* The sky opens: night indigo → dawn violet → clear day blue. */
const FIELD = ["#0e1733", "#1b2550", "#2e3566", "#46527f", "#93b0d2", "#c2daec"];
const BAND = ["#7a3b4a", "#b03a34", "#d2402a", "#e2452c", "#d9401f", "#c8371b"];
const HEIGHT = [0.28, 0.28, 0.3, 0.3, 0.32, 0.32];

/* The light's treatment of the photographs: exposure in stops relative to
   the source, saturation, contrast, and the cool tint before sunrise.
   Outside the focus frame the frame is a further two-thirds of a stop under. */
const EV = [-0.9, -0.7, -0.45, -0.12, 0.08, 0.18];
const SAT = [0.55, 0.6, 0.7, 0.85, 0.84, 0.8];
const CONTRAST = [1.3, 1.24, 1.14, 1.05, 0.98, 0.95];
const TINT = [0.62, 0.52, 0.36, 0.14, 0.04, 0];

/* The sunrise, composed over the photographs: a painted sky, the sun on the
   horizon with its path on the water, a dark canopy at the top, then paper. */
const SUN_RISE = [0, 0.06, 0.22, 0.48, 0.78, 1];
const SUN_C = ["#ffb27a", "#ffbd88", "#ffd0a2", "#ffe3c4", "#fff1de", "#fff8ec"];
const SUN_A = [0.95, 1, 1, 0.9, 0.72, 0.55];
const SUN_R = [48, 46, 42, 38, 34, 32];
const SKY_TOP = ["#0b1734", "#132247", "#2a4074", "#6c8dbb", "#a6c1de", "#c6daee"];
const SKY_MID = ["#223466", "#374b84", "#6a7ea8", "#a6b6cf", "#d2dce8", "#e3ebf3"];
const SKY_LOW = ["#ff9a5e", "#ffad70", "#ffc48e", "#ffdcb2", "#f5e5cf", "#efe9dd"];
const WATER = ["#08101f", "#0f1a34", "#26365a", "#5b7191", "#a5b4c4", "#d4dce3"];
const SKY = [0.92, 0.88, 0.78, 0.58, 0.42, 0.32];
const GLOW = [0.85, 0.85, 0.65, 0.38, 0.16, 0.05];
const BLOOM = [0.2, 0.24, 0.28, 0.28, 0.24, 0.18];
const CANOPY = [0.9, 0.85, 0.72, 0.55, 0.4, 0.3];

/* The clock is the page: it runs from the edge to openness. */
const CLOCK_START = 5 * 60 + 48;
const CLOCK_END = 7 * 60 + 12;

/* Once the sky is brighter than the type, the ink changes in one step. */
const DAYBREAK_AT = 0.62;
const NIGHT_INK = { ink: "#f4ecda", dim: "#ccd2e2", accent: "#ffc78e", hair: "#ffffff2b", plate: "#0a0f24" };
const DAY_INK = { ink: "#14233f", dim: "#2b3750", accent: "#7a1d0e", hair: "#14233f30", plate: "#f7f1e4" };

const DRIFT = 36;
const REVEAL_PX = 36;

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const smooth = (n: number) => n * n * (3 - 2 * n);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const channels = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));

function rampColor(stops: string[], p: number) {
  const x = clamp(p) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  const t = x - i;
  const a = channels(stops[i]);
  const b = channels(stops[i + 1]);
  return `rgb(${a.map((v, n) => Math.round(v + (b[n] - v) * t)).join(",")})`;
}

function rampNumber(stops: number[], p: number) {
  const x = clamp(p) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  return stops[i] + (stops[i + 1] - stops[i]) * (x - i);
}

function clockAt(p: number) {
  const minutes = Math.round(CLOCK_START + (CLOCK_END - CLOCK_START) * clamp(p));
  const h = minutes / 60 | 0;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} AM`;
}

const evLabel = (ev: number) => `${ev >= 0 ? "+" : "−"}${Math.abs(ev).toFixed(1)} EV`;
const column = (c: number) => String.fromCharCode(64 + Math.round(c));
const cells = (f: { c0: number; r0: number; c1: number; r1: number }) =>
  `${column(f.c0)}${f.r0} – ${column(f.c1)}${f.r1}`;

type BandStageProps = {
  children: ReactNode;
  /** Which exposure photographs are present on disk, by exposure index. */
  environment: readonly boolean[];
};

export function BandStage({ children, environment }: BandStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 1000px)");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-exposure]"));
    const frames = envRef.current ? Array.from(envRef.current.querySelectorAll<HTMLElement>("[data-frame]")) : [];
    // The readout's cells, by name: written directly each frame, no React state.
    const r: Record<string, HTMLElement | undefined> = {};
    root.querySelectorAll<HTMLElement>("[data-readout]").forEach(el => { r[el.dataset.readout ?? ""] = el; });
    let frame = 0;
    let index = 0;
    let day: boolean | undefined;
    let shade = "";
    type Block = { el: HTMLElement; end: number };
    const blocks: Block[][] = sections.map(() => []);

    const measure = () => {
      sections.forEach((section, i) => {
        section.style.setProperty("--reserve", `calc(${HEIGHT[i]}vh + var(--ground-h) + ${REVEAL_PX + 12}px)`);
      });
      sections.forEach((section, i) => {
        blocks[i] = (Array.from(section.children) as HTMLElement[]).map(el => ({
          el,
          end: el.offsetTop + el.offsetHeight,
        }));
      });
      schedule();
    };

    const paint = () => {
      frame = 0;
      const still = motion.matches;
      const view = window.innerHeight;
      const width = window.innerWidth;
      const span = Math.max(1, html.scrollHeight - view);
      const scrolled = clamp(window.scrollY / span);

      // One continuous position over the exposures: integer when an exposure
      // is centred in the viewport, fractional between two. Everything —
      // light, frame, readout — reads from it, so they agree.
      const rects = sections.map(section => section.getBoundingClientRect());
      const centres = rects.map(rect => rect.top + rect.height / 2);
      const mid = view / 2;
      let x = 0;
      if (mid >= centres[centres.length - 1]) {
        x = centres.length - 1;
      } else if (mid > centres[0]) {
        for (let i = 0; i < centres.length - 1; i++) {
          if (mid <= centres[i + 1]) {
            x = i + (mid - centres[i]) / Math.max(1, centres[i + 1] - centres[i]);
            break;
          }
        }
      }
      // At the end of the document the last exposure is the one on show,
      // however short it is.
      if (window.scrollY >= span - 2) x = centres.length - 1;
      index = Math.round(x);
      if (still) x = index;

      const p = x / (exposures.length - 1);
      const eased = smooth(p);
      const groundPx = groundRef.current?.getBoundingClientRect().height ?? 0;
      const horizonPx = view - groundPx - (rampNumber(HEIGHT, eased) / 100) * view;

      rects.forEach((rect, i) => {
        for (const block of blocks[i]) {
          const local = still ? 1 : clamp((horizonPx - (rect.top + block.end) - 6) / (REVEAL_PX - 6));
          block.el.style.setProperty("--local", local.toFixed(3));
        }
      });

      const field = rampColor(FIELD, p);
      root.style.setProperty("--field", field);
      html.style.setProperty("--field", field);
      root.style.setProperty("--band-c", rampColor(BAND, p));
      root.style.setProperty("--band-h", `${rampNumber(HEIGHT, eased).toFixed(2)}vh`);
      root.style.setProperty("--progress", scrolled.toFixed(4));
      const drift = Math.min(DRIFT, width * 0.025);
      root.style.setProperty("--drift", still ? "0px" : `${(-drift * eased).toFixed(1)}px`);

      // ── the environment: which frames are on show ──
      frames.forEach(el => {
        const i = Number(el.dataset.frame);
        el.style.opacity = clamp(1 - Math.abs(x - i)).toFixed(3);
      });
      const lower = Math.min(exposurePhotos.length - 1, Math.floor(x));
      const upper = Math.min(exposurePhotos.length - 1, lower + 1);
      const k = x - lower;
      const a = exposurePhotos[lower];
      const b = exposurePhotos[upper];

      // ── the sunrise ──
      const skyline = lerp(a.horizon, b.horizon, k);
      const sunX = lerp(a.sun, b.sun, k);
      const rise = rampNumber(SUN_RISE, p);
      const sunY = skyline + 7 - rise * (skyline - 10);
      root.style.setProperty("--horizon", `${skyline.toFixed(1)}%`);
      root.style.setProperty("--sun-x", `${sunX.toFixed(1)}%`);
      root.style.setProperty("--sun-y", `${sunY.toFixed(1)}%`);
      root.style.setProperty("--sun-c", rampColor(SUN_C, p));
      root.style.setProperty("--sun-a", rampNumber(SUN_A, p).toFixed(3));
      root.style.setProperty("--sun-r", `${rampNumber(SUN_R, p).toFixed(1)}vmin`);
      root.style.setProperty("--sky-top", rampColor(SKY_TOP, p));
      root.style.setProperty("--sky-mid", rampColor(SKY_MID, p));
      root.style.setProperty("--sky-low", rampColor(SKY_LOW, p));
      root.style.setProperty("--water", rampColor(WATER, p));
      root.style.setProperty("--glow", rampNumber(GLOW, p).toFixed(3));
      root.style.setProperty("--sky", rampNumber(SKY, p).toFixed(3));
      root.style.setProperty("--bloom", rampNumber(BLOOM, p).toFixed(3));
      root.style.setProperty("--canopy", rampNumber(CANOPY, p).toFixed(3));

      const ev = rampNumber(EV, p);
      root.style.setProperty("--env-b", Math.pow(2, ev).toFixed(3));
      root.style.setProperty("--env-s", rampNumber(SAT, p).toFixed(3));
      root.style.setProperty("--env-c", rampNumber(CONTRAST, p).toFixed(3));
      root.style.setProperty("--env-tint", rampNumber(TINT, p).toFixed(3));
      root.style.setProperty("--day", smooth(clamp((p - 0.57) / 0.1)).toFixed(3));

      // ── the focus frame: cells → pixels, gliding between allocations ──
      const gutter = Math.max(20, width * 0.0625);
      const gap = Math.min(24, width * 0.0167);
      const top = 4.75 * 16;
      const bottom = view - groundPx - 2;
      const contentW = width - gutter * 2;
      const colW = (contentW - gap * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
      const rowH = (bottom - top) / GRID_ROWS;
      const colX = (c: number) => gutter + (c - 1) * (colW + gap);
      const colEnd = (c: number) => gutter + c * (colW + gap) - gap;
      const rowY = (r: number) => top + (r - 1) * rowH;
      const rowEnd = (r: number) => top + r * rowH;
      const fa = a.frame;
      const fb = b.frame;
      const kk = still ? Math.round(k) : smooth(k);
      let fx0 = lerp(colX(fa.c0), colX(fb.c0), kk);
      let fx1 = lerp(colEnd(fa.c1), colEnd(fb.c1), kk);
      let fy0 = lerp(rowY(fa.r0), rowY(fb.r0), kk);
      let fy1 = lerp(rowEnd(fa.r1), rowEnd(fb.r1), kk);
      if (narrow.matches) {
        // One column: the frame is the lower part of the viewport, under the copy.
        fx0 = gutter;
        fx1 = width - gutter;
        fy0 = top + (bottom - top) * 0.46;
        fy1 = bottom;
      }
      root.style.setProperty("--fx0", `${fx0.toFixed(1)}px`);
      root.style.setProperty("--fx1", `${fx1.toFixed(1)}px`);
      root.style.setProperty("--fy0", `${fy0.toFixed(1)}px`);
      root.style.setProperty("--fy1", `${fy1.toFixed(1)}px`);
      // The figure caption sits under the frame, or inside its lower edge
      // when the frame reaches the rail.
      const capY = fy1 < bottom - 28 ? fy1 + 8 : fy1 - 24;
      root.style.setProperty("--cap-y", `${capY.toFixed(1)}px`);
      root.style.setProperty("--grid-top", `${top}px`);
      root.style.setProperty("--grid-bottom", `${(view - bottom).toFixed(1)}px`);
      // Focus pulls while the frame is travelling and settles as it lands.
      const travel = still ? 0 : 1 - Math.abs(1 - 2 * k);
      root.style.setProperty("--pull", `${(travel * 3.5).toFixed(2)}px`);
      const side = sections[index]?.dataset.shade ?? "left";
      if (side !== shade) {
        shade = side;
        root.dataset.shade = side;
      }

      // ── the readout ──
      const clock = clockAt(p);
      const current = exposurePhotos[index];
      if (r.frame) r.frame.textContent = `${String(index + 1).padStart(2, "0")} / ${String(exposures.length).padStart(2, "0")}`;
      if (r.focus) r.focus.textContent = narrow.matches ? "A5 – L8" : cells(current.frame);
      if (r.exposure) r.exposure.textContent = evLabel(ev);
      if (r.time) r.time.textContent = clock;
      if (r.subject) r.subject.textContent = current.subject;
      if (r.meter) r.meter.style.setProperty("--ev", ((ev + 2) / 4).toFixed(3));
      if (r.caption) r.caption.textContent = `Fig. ${String(index + 1).padStart(2, "0")} — ${exposures[index]} · ${current.subject} · ${clock}`;
      if (r.railClock) r.railClock.textContent = clock;

      const isDay = p >= DAYBREAK_AT;
      if (isDay !== day) {
        day = isDay;
        const set = isDay ? DAY_INK : NIGHT_INK;
        root.style.setProperty("--cream", set.ink);
        root.style.setProperty("--dim", set.dim);
        root.style.setProperty("--ember", set.accent);
        root.style.setProperty("--hairline", set.hair);
        root.style.setProperty("--plate-bg", set.plate);
        root.dataset.light = isDay ? "day" : "night";
      }

      setActive(index);
    };

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    root.toggleAttribute("data-still", motion.matches);
    const onMotion = () => {
      root.toggleAttribute("data-still", motion.matches);
      measure();
    };

    measure();
    const settled = new ResizeObserver(measure);
    sections.forEach(section => settled.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    motion.addEventListener("change", onMotion);
    narrow.addEventListener("change", measure);

    return () => {
      cancelAnimationFrame(frame);
      settled.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", onMotion);
      narrow.removeEventListener("change", measure);
      html.style.removeProperty("--field");
    };
  }, []);

  const hasEnvironment = environment.some(Boolean);

  return (
    <div ref={rootRef} className={styles.root} data-band-route data-environment={hasEnvironment ? "true" : undefined}>
      {/* The environment: soft outside the focus frame, sharp inside it. */}
      <div ref={envRef} className={styles.env} aria-hidden="true">
        <div className={styles.envSoft}>
          {exposurePhotos.map((photo, i) =>
            environment[i] ? (
              <div
                key={photo.file}
                className={styles.envFrame}
                data-frame={i}
                style={{ ["--focus" as string]: photo.focus, ["--focus-narrow" as string]: photo.focusNarrow }}
              >
                <div className={styles.envBase}>
                  <Image src={`${environmentDirectory}/${photo.file}`} alt="" fill sizes="100vw" priority={i === 0} quality={78} />
                </div>
                <div className={styles.envBloom}>
                  <Image src={`${environmentDirectory}/${photo.file}`} alt="" fill sizes="100vw" quality={60} />
                </div>
              </div>
            ) : null,
          )}
        </div>
        <div className={styles.envSharp}>
          {exposurePhotos.map((photo, i) =>
            environment[i] ? (
              <div
                key={photo.file}
                className={styles.envFrame}
                data-frame={i}
                style={{ ["--focus" as string]: photo.focus, ["--focus-narrow" as string]: photo.focusNarrow }}
              >
                <div className={styles.envBase}>
                  <Image src={`${environmentDirectory}/${photo.file}`} alt="" fill sizes="100vw" quality={82} />
                </div>
              </div>
            ) : null,
          )}
        </div>
        <div className={styles.envTint} />
        <div className={styles.envSky} />
        <div className={styles.envGlow} />
        <div className={styles.envPath} />
        <div className={styles.envSun} />
        <div className={styles.envCanopy} />
        <div className={styles.envHaze} />
        <div className={styles.envPaper} />
        <div className={`${styles.shade} ${styles.shadeNight}`} />
        <div className={`${styles.shade} ${styles.shadeDay}`} />
        <div className={styles.envGrain} />
      </div>

      {/* The focusing screen: the grid, its coordinates, the frame, the figure caption. */}
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.gridLines} />
        <div className={styles.gridColumns}>
          {Array.from({ length: GRID_COLUMNS }, (_, i) => <span key={i}>{column(i + 1)}</span>)}
        </div>
        <div className={styles.gridRows}>
          {Array.from({ length: GRID_ROWS }, (_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <div className={styles.frameMarks}>
          <i /><i /><i /><i />
          <span data-readout="caption" className={styles.frameCaption}>Fig. 01 — The edge</span>
        </div>
      </div>

      {children}

      {/* The readout: what the instrument sees. */}
      <dl className={styles.readout} aria-label="Viewfinder readout">
        <div><dt>Frame</dt><dd data-readout="frame">01 / 06</dd></div>
        <div><dt>Focus</dt><dd data-readout="focus">F1 – L6</dd></div>
        <div><dt>Exposure</dt><dd data-readout="exposure">−0.9 EV</dd></div>
        <div className={styles.readoutMeter}>
          <span data-readout="meter" className={styles.meter} style={{ ["--ev" as string]: 0.275 }}>
            {["−2", "−1", "0", "+1", "+2"].map(mark => <b key={mark}>{mark}</b>)}
          </span>
        </div>
        <div><dt>Time</dt><dd data-readout="time">05:48 AM</dd></div>
        <div><dt>Place</dt><dd>{place.name}</dd></div>
        <div><dt>Lat</dt><dd>{place.lat}</dd></div>
        <div><dt>Lon</dt><dd>{place.lon}</dd></div>
        <div><dt>Subject</dt><dd data-readout="subject">Foliage, water, towers</dd></div>
      </dl>

      <div className={styles.band} aria-hidden="true" />
      <div ref={groundRef} className={styles.ground}>
        <nav className={styles.measure} aria-label="Exposures">
          {exposures.map((name, i) => (
            <a
              key={name}
              href={`#${anchors[i]}`}
              data-on={active === i ? "true" : undefined}
              aria-current={active === i ? "true" : undefined}
            >
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>{name}</span>
            </a>
          ))}
        </nav>
        <span className={styles.groundMark} aria-hidden="true">
          Daybreak · MMXXVI · <b data-readout="railClock">05:48 AM</b>
        </span>
      </div>
    </div>
  );
}

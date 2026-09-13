"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { anchors, exposures } from "./bandExposures";
import { GRID_COLUMNS, GRID_ROWS, HORIZON, place, skyline, treeline, worlds } from "./bandEnvironment";
import styles from "./Band.module.css";

/* The stage: a drawn morning, measured.

   One scroll position runs everything. The sun rises along its arc behind
   a skyline of marks that thins from dense to open; a treeline stands in
   front and lightens as the day comes; the water below rules itself with
   the skyline in it. A 12 × 8 grid is drawn over the viewport; the copy,
   the figures and the readout are modules on it. Nothing runs unless the
   page moves, except the slow ambient drift, which stops under reduced
   motion. */

/* The sky: zenith, mid-sky and horizon colours per moment; the water below. */
const SKY_TOP = ["#0a1430", "#112044", "#27406f", "#6a8db8", "#a8c3df", "#c9dcee"];
const SKY_MID = ["#1c2f5f", "#33497f", "#6a80a8", "#a8b8d0", "#d3dde9", "#e5ecf4"];
const SKY_LOW = ["#ff9455", "#ffab6c", "#ffc48e", "#ffdcb2", "#f6e7d1", "#f1ebdf"];
const WATER = ["#070e1e", "#0e1a34", "#24365a", "#5a7191", "#a4b4c6", "#d3dbe3"];
const WATER_DEEP = ["#04091a", "#080f24", "#151f3d", "#3d5070", "#8797ab", "#c2cbd5"];
const FIELD = ["#0e1733", "#1b2550", "#2e3566", "#46527f", "#93b0d2", "#c2daec"];
const BAND = ["#7a3b4a", "#b03a34", "#d2402a", "#e2452c", "#d9401f", "#c8371b"];
const HEIGHT = [0.28, 0.28, 0.3, 0.3, 0.32, 0.32];

/* The sun — kept. A small hot core on the horizon with a wide soft light,
   a horizon band, a path on the water; higher, paler and tighter as it climbs. */
const SUN_RISE = [0, 0.06, 0.22, 0.48, 0.78, 1];
const SUN_C = ["#ffb27a", "#ffbd88", "#ffd0a2", "#ffe3c4", "#fff1de", "#fff8ec"];
const SUN_A = [0.95, 1, 1, 0.9, 0.72, 0.55];
const SUN_R = [48, 46, 42, 38, 34, 32];
const GLOW = [0.85, 0.85, 0.65, 0.38, 0.16, 0.05];
const CANOPY = [0.85, 0.8, 0.66, 0.5, 0.36, 0.26];
const EV = [-0.9, -0.7, -0.45, -0.12, 0.08, 0.18];

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

const signed = (n: number, digits = 1, unit = "") =>
  `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(digits)}${unit}`;
const column = (c: number) => String.fromCharCode(64 + Math.round(c));

export function BandStage({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const marks = useMemo(() => skyline(), []);
  const trees = useMemo(() => treeline(), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-exposure]"));
    const r: Record<string, HTMLElement | undefined> = {};
    root.querySelectorAll<HTMLElement>("[data-readout]").forEach(el => { r[el.dataset.readout ?? ""] = el; });
    let frame = 0;
    let index = 0;
    let day: boolean | undefined;
    type Block = { el: HTMLElement; end: number };
    const blocks: Block[][] = sections.map(() => []);

    const measure = () => {
      sections.forEach((section, i) => {
        section.style.setProperty("--reserve", `calc(${HEIGHT[i]}vh + var(--ground-h) + ${REVEAL_PX + 12}px)`);
      });
      sections.forEach((section, i) => {
        blocks[i] = (Array.from(section.children) as HTMLElement[]).map(el => ({
          el,
          end: el.offsetTop,
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
      // is centred, fractional between two. Everything reads from it.
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
      if (window.scrollY >= span - 2) x = centres.length - 1;
      index = Math.round(x);
      if (still) x = index;
      const p = x / (exposures.length - 1);
      const eased = smooth(p);
      const groundPx = groundRef.current?.getBoundingClientRect().height ?? 0;
      const horizonPx = view - groundPx - (rampNumber(HEIGHT, eased) / 100) * view;

      // Blocks resolve as their top rises clear of the rail's horizon.
      rects.forEach((rect, i) => {
        for (const block of blocks[i]) {
          const local = still ? 1 : clamp((horizonPx - (rect.top + block.end) - REVEAL_PX) / 120);
          block.el.style.setProperty("--local", local.toFixed(3));
        }
      });
      // Each exposure's figure is in focus when its exposure is centred.
      sections.forEach((section, i) => {
        const focus = 1 - clamp(Math.abs(x - i) * 1.6);
        section.style.setProperty("--focus", focus.toFixed(3));
        section.toggleAttribute("data-focused", focus > 0.8);
      });

      const field = rampColor(FIELD, p);
      root.style.setProperty("--field", field);
      html.style.setProperty("--field", field);
      root.style.setProperty("--band-c", rampColor(BAND, p));
      root.style.setProperty("--band-h", `${rampNumber(HEIGHT, eased).toFixed(2)}vh`);
      root.style.setProperty("--progress", scrolled.toFixed(4));
      const drift = Math.min(DRIFT, width * 0.025);
      root.style.setProperty("--drift", still ? "0px" : `${(-drift * eased).toFixed(1)}px`);

      // ── the world between two exposures ──
      const lower = Math.min(worlds.length - 1, Math.floor(x));
      const upper = Math.min(worlds.length - 1, lower + 1);
      const k = x - lower;
      const a = worlds[lower];
      const b = worlds[upper];
      const sunX = lerp(a.sun, b.sun, k);
      const density = lerp(a.density, b.density, k);
      const foliage = lerp(a.foliage, b.foliage, k);
      const stillness = lerp(a.still, b.still, k);
      const rise = rampNumber(SUN_RISE, p);
      const sunY = HORIZON + 1.5 - rise * (HORIZON - 12);
      const elevation = -2 + rise * 24;

      root.style.setProperty("--sun-x", `${sunX.toFixed(2)}%`);
      root.style.setProperty("--sun-y", `${sunY.toFixed(2)}%`);
      root.style.setProperty("--sun-c", rampColor(SUN_C, p));
      root.style.setProperty("--sun-a", rampNumber(SUN_A, p).toFixed(3));
      root.style.setProperty("--sun-r", `${rampNumber(SUN_R, p).toFixed(1)}vmin`);
      root.style.setProperty("--glow", rampNumber(GLOW, p).toFixed(3));
      root.style.setProperty("--canopy", rampNumber(CANOPY, p).toFixed(3));
      root.style.setProperty("--sky-top", rampColor(SKY_TOP, p));
      root.style.setProperty("--sky-mid", rampColor(SKY_MID, p));
      root.style.setProperty("--sky-low", rampColor(SKY_LOW, p));
      root.style.setProperty("--water", rampColor(WATER, p));
      root.style.setProperty("--water-deep", rampColor(WATER_DEEP, p));
      root.style.setProperty("--density", density.toFixed(3));
      root.style.setProperty("--foliage", foliage.toFixed(3));
      root.style.setProperty("--still", stillness.toFixed(3));
      root.style.setProperty("--day", smooth(clamp((p - 0.57) / 0.1)).toFixed(3));

      // ── the readout ──
      const ev = rampNumber(EV, p);
      const clock = clockAt(p);
      const world = worlds[index];
      const standing = marks.filter(m => density >= m.t).length;
      if (r.frame) r.frame.textContent = `${String(index + 1).padStart(2, "0")} / ${String(exposures.length).padStart(2, "0")}`;
      if (r.focus) r.focus.textContent = world.figure;
      if (r.exposure) r.exposure.textContent = signed(ev, 1, " EV");
      if (r.meter) r.meter.style.setProperty("--ev", ((ev + 2) / 4).toFixed(3));
      if (r.time) r.time.textContent = clock;
      if (r.sun) r.sun.textContent = `${sunX.toFixed(0)} % · ${signed(elevation, 0, "°")}`;
      if (r.density) r.density.textContent = `${String(standing).padStart(2, "0")} / ${marks.length}`;
      if (r.subject) r.subject.textContent = world.subject;
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

    return () => {
      cancelAnimationFrame(frame);
      settled.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", onMotion);
      html.style.removeProperty("--field");
    };
  }, [marks]);

  return (
    <div ref={rootRef} className={styles.root} data-band-route>
      {/* ── the world ─────────────────────────────────────────── */}
      <div className={styles.world} aria-hidden="true">
        <div className={styles.sky} />
        <div className={styles.sunGlow} />
        <div className={styles.sun} />

        {/* the skyline: marks that stand while density ≥ their threshold */}
        <svg className={styles.skyline} viewBox="0 0 1000 300" preserveAspectRatio="none">
          {marks.map((m, i) => (
            <rect
              key={i}
              className={m.glass ? styles.glass : styles.mass}
              x={m.x}
              y={300 - m.h}
              width={m.w}
              height={m.h}
              style={{ ["--t" as string]: m.t }}
            />
          ))}
        </svg>
        {/* the treeline in front of it */}
        <svg className={styles.treeline} viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d={trees} />
        </svg>
        {/* the water: the skyline reflected, and ruled */}
        <svg className={styles.reflection} viewBox="0 0 1000 300" preserveAspectRatio="none">
          {marks.map((m, i) => (
            <rect
              key={i}
              className={styles.mass}
              x={m.x}
              y={0}
              width={m.w}
              height={m.h * 0.7}
              style={{ ["--t" as string]: m.t }}
            />
          ))}
        </svg>
        <div className={styles.sunPath} />
        <div className={styles.ripples} />
        <div className={styles.horizonLine} />

        <div className={styles.canopy} />
        <div className={styles.haze} />
        <div className={styles.paper} />
        <div className={`${styles.shade} ${styles.shadeNight}`} />
        <div className={`${styles.shade} ${styles.shadeDay}`} />
        <div className={styles.grain} />

        {/* the instrument on the sun: a reticle, and the place */}
        <div className={styles.reticle}>
          <span className={styles.reticleLabel}>
            <span>{place.lat}</span>
            <span>{place.lon}</span>
          </span>
        </div>
      </div>

      {/* ── the grid ───────────────────────────────────────────── */}
      <div className={styles.screen} aria-hidden="true">
        <div className={styles.gridLines} />
        <div className={styles.gridColumns}>
          {Array.from({ length: GRID_COLUMNS }, (_, i) => <span key={i}>{column(i + 1)}</span>)}
        </div>
        <div className={styles.gridRows}>
          {Array.from({ length: GRID_ROWS }, (_, i) => <span key={i}>{i + 1}</span>)}
        </div>
      </div>

      {children}

      {/* ── the readout: what the instrument sees ─────────────── */}
      <dl className={styles.readout} aria-label="Readout">
        <div><dt>Frame</dt><dd data-readout="frame">01 / 06</dd></div>
        <div><dt>Focus</dt><dd data-readout="focus">Fig. 01</dd></div>
        <div><dt>Exposure</dt><dd data-readout="exposure">−0.9 EV</dd></div>
        <div className={styles.readoutMeter}>
          <span data-readout="meter" className={styles.meter} style={{ ["--ev" as string]: 0.275 }}>
            {["−2", "−1", "0", "+1", "+2"].map(mark => <b key={mark}>{mark}</b>)}
          </span>
        </div>
        <div><dt>Time</dt><dd data-readout="time">05:48 AM</dd></div>
        <div><dt>Horizon</dt><dd>{HORIZON} %</dd></div>
        <div><dt>Sun</dt><dd data-readout="sun">60 % · −2°</dd></div>
        <div><dt>Skyline</dt><dd data-readout="density">48 / 48</dd></div>
        <div><dt>Place</dt><dd>{place.name}</dd></div>
        <div><dt>Subject</dt><dd data-readout="subject">The horizon, calibrated</dd></div>
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

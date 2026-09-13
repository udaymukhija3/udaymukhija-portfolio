"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { anchors, exposures } from "./bandExposures";
import { environmentDirectory, exposurePhotos, place } from "./bandEnvironment";
import styles from "./Band.module.css";

/* The sky opens: night indigo → dawn violet → clear day blue. The field is
   the ground under the photographs and the colour the shadows take before
   the light arrives. The horizon stays in the vermilion family throughout. */
const FIELD = ["#0e1733", "#1b2550", "#2e3566", "#46527f", "#93b0d2", "#c2daec"];
const BAND = ["#7a3b4a", "#b03a34", "#d2402a", "#e2452c", "#d9401f", "#c8371b"];
/* The horizon is a line, not a slab: the photographs carry the light now. */
const HEIGHT = [0.28, 0.28, 0.3, 0.3, 0.32, 0.32];

/* How the light treats the photographs across the page: exposure in stops
   relative to the source, saturation, contrast, and the cool tint that the
   world carries before sunrise. Front-loaded like the field, so the first
   frame already has depth rather than three black screens. */
const EV = [-1.25, -0.95, -0.55, -0.15, 0.1, 0.25];
const SAT = [0.6, 0.68, 0.8, 0.92, 1, 1];
const CONTRAST = [1.18, 1.14, 1.08, 1.02, 1, 1];
const TINT = [0.7, 0.55, 0.35, 0.12, 0.03, 0];

/* The sunrise, composited over the photographs. The sun begins below the
   horizon of the first frame as a glow and climbs to a high pale disc by
   openness; the horizon band and the dawn sky grading fade as it climbs;
   highlights bloom most at first light. Positions are per photograph
   (bandEnvironment.ts) and interpolate across the cross-fade. */
const SUN_RISE = [0, 0.1, 0.3, 0.55, 0.8, 1]; // 0 = at the horizon, 1 = high
const SUN_C = ["#ff7a3a", "#ff9752", "#ffb066", "#ffcf8f", "#ffe9c4", "#fff6e6"];
const SUN_A = [0.8, 0.9, 0.95, 0.85, 0.65, 0.5];
const SUN_R = [40, 38, 34, 30, 27, 25]; // halo radius, vmin
const GLOW = [0.75, 0.8, 0.65, 0.4, 0.18, 0.06]; // horizon band
const SKY = [0.85, 0.85, 0.75, 0.55, 0.38, 0.25]; // dawn grading
const BLOOM = [0.32, 0.38, 0.44, 0.44, 0.4, 0.34]; // highlight bloom

/* The clock is the page: it runs from the edge to openness. */
const CLOCK_START = 5 * 60 + 48;
const CLOCK_END = 7 * 60 + 12;

/* Once the sky is brighter than the type, the ink changes in one step rather
   than interpolating through a low-contrast middle. */
const DAYBREAK_AT = 0.62;
const NIGHT_INK = { ink: "#f4ecda", dim: "#ccd2e2", accent: "#ffc78e", hair: "#ffffff2b", plate: "#0a0f24" };
const DAY_INK = { ink: "#14233f", dim: "#2b3750", accent: "#7a1d0e", hair: "#14233f30", plate: "#f7f1e4" };

const DRIFT = 36;
/* Clearance above the horizon at which a block is fully revealed. */
const REVEAL_PX = 36;

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const smooth = (n: number) => n * n * (3 - 2 * n);
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

function evLabel(ev: number) {
  return `${ev >= 0 ? "+" : "−"}${Math.abs(ev).toFixed(1)}`;
}

type BandStageProps = {
  children: ReactNode;
  /** Which exposure photographs are present on disk, by exposure index. */
  environment: readonly boolean[];
};

export function BandStage({ children, environment }: BandStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const clockRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const evRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-exposure]"));
    const frames = envRef.current
      ? Array.from(envRef.current.querySelectorAll<HTMLElement>("[data-frame]"))
      : [];
    let frame = 0;
    let index = 0;
    let day: boolean | undefined;
    let shade = "";
    // Each block (copy, plate, notebook, margin note) reveals on its own once it
    // has cleared the horizon. Ends are read from untransformed offsets, relative
    // to the positioned section, so the reveal can never feed its own input.
    type Block = { el: HTMLElement; end: number };
    const blocks: Block[][] = sections.map(() => []);

    const measure = () => {
      sections.forEach((section, i) => {
        // The gutter must exceed the reveal distance, or the last exposure
        // could never resolve at the bottom of the page.
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
      const span = Math.max(1, document.documentElement.scrollHeight - view);
      const scrolled = clamp(window.scrollY / span);

      let nearest = 0;
      let best = Infinity;
      const rects = sections.map(section => section.getBoundingClientRect());
      rects.forEach((rect, i) => {
        const distance = Math.abs(rect.top + rect.height / 2 - view / 2);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      // At the end of the document the last exposure is the one on show,
      // however short it is.
      index = window.scrollY >= span - 2 ? sections.length - 1 : nearest;

      const p = still ? index / (exposures.length - 1) : scrolled;
      const eased = smooth(p);
      // Read the ground as rendered: its token is a max() expression, which
      // computed style hands back unresolved.
      const groundPx = groundRef.current?.getBoundingClientRect().height ?? 0;
      const horizon = view - groundPx - (rampNumber(HEIGHT, eased) / 100) * view;

      // A block resolves only once it has risen clear of the horizon, so nothing
      // is ever half-swallowed on the way in. Hidden while inside it; fully
      // shown REVEAL_PX above it.
      rects.forEach((rect, i) => {
        for (const block of blocks[i]) {
          const local = still ? 1 : clamp((horizon - (rect.top + block.end) - 6) / (REVEAL_PX - 6));
          block.el.style.setProperty("--local", local.toFixed(3));
        }
      });

      const field = rampColor(FIELD, p);
      root.style.setProperty("--field", field);
      html.style.setProperty("--field", field);
      root.style.setProperty("--band-c", rampColor(BAND, p));
      root.style.setProperty("--band-h", `${rampNumber(HEIGHT, eased).toFixed(2)}vh`);
      root.style.setProperty("--progress", scrolled.toFixed(4));
      // One shared lateral travel: the reading surface slides a little left as
      // the visitor descends, as though it belongs to a much larger surface.
      // Bounded by the viewport, so a phone's narrow gutter is never overrun.
      const drift = Math.min(DRIFT, window.innerWidth * 0.025);
      root.style.setProperty("--drift", still ? "0px" : `${(-drift * eased).toFixed(1)}px`);

      // The environment: the exposure on show is the photograph on show, the
      // neighbours cross-fade in as the visitor approaches them. The light
      // treats whichever is visible.
      const x = still ? index : p * (exposures.length - 1);
      frames.forEach(el => {
        const i = Number(el.dataset.frame);
        el.style.opacity = clamp(1 - Math.abs(x - i)).toFixed(3);
      });
      // The sunrise: horizon and sun-x follow the frames on show; the sun's
      // height is the page's.
      const lower = Math.min(exposurePhotos.length - 1, Math.floor(x));
      const upper = Math.min(exposurePhotos.length - 1, lower + 1);
      const k = x - lower;
      const skyline = exposurePhotos[lower].horizon + (exposurePhotos[upper].horizon - exposurePhotos[lower].horizon) * k;
      const sunX = exposurePhotos[lower].sun + (exposurePhotos[upper].sun - exposurePhotos[lower].sun) * k;
      const rise = rampNumber(SUN_RISE, p);
      const sunY = skyline + 7 - rise * (skyline - 10);
      root.style.setProperty("--horizon", `${skyline.toFixed(1)}%`);
      root.style.setProperty("--sun-x", `${sunX.toFixed(1)}%`);
      root.style.setProperty("--sun-y", `${sunY.toFixed(1)}%`);
      root.style.setProperty("--sun-c", rampColor(SUN_C, p));
      root.style.setProperty("--sun-a", rampNumber(SUN_A, p).toFixed(3));
      root.style.setProperty("--sun-r", `${rampNumber(SUN_R, p).toFixed(1)}vmin`);
      root.style.setProperty("--glow", rampNumber(GLOW, p).toFixed(3));
      root.style.setProperty("--sky", rampNumber(SKY, p).toFixed(3));
      root.style.setProperty("--bloom", rampNumber(BLOOM, p).toFixed(3));
      const ev = rampNumber(EV, p);
      root.style.setProperty("--env-b", Math.pow(2, ev).toFixed(3));
      root.style.setProperty("--env-s", rampNumber(SAT, p).toFixed(3));
      root.style.setProperty("--env-c", rampNumber(CONTRAST, p).toFixed(3));
      root.style.setProperty("--env-tint", rampNumber(TINT, p).toFixed(3));
      // The shade flips with the ink: navy holds until daybreak, then paper.
      root.style.setProperty("--day", smooth(clamp((p - 0.57) / 0.1)).toFixed(3));
      // Text sits on whichever side the exposure keeps its copy.
      const side = sections[index]?.dataset.shade ?? "left";
      if (side !== shade) {
        shade = side;
        root.dataset.shade = side;
      }

      // The instruments report the page's own state.
      const clock = clockAt(p);
      clockRefs.current.forEach(el => { if (el) el.textContent = clock; });
      if (evRef.current) {
        evRef.current.textContent = evLabel(ev);
        evRef.current.style.setProperty("--ev", ((ev + 2) / 4).toFixed(3));
      }

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

    measure();
    // Images and fonts change a section's height after mount; the reveal
    // must be measured against the settled layout, not the first paint.
    const settled = new ResizeObserver(measure);
    sections.forEach(section => settled.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    motion.addEventListener("change", measure);

    return () => {
      cancelAnimationFrame(frame);
      settled.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
      html.style.removeProperty("--field");
    };
  }, []);

  const hasEnvironment = environment.some(Boolean);

  return (
    <div ref={rootRef} className={styles.root} data-band-route data-environment={hasEnvironment ? "true" : undefined}>
      {/* The environment: one photograph per exposure, fixed behind the page. */}
      <div ref={envRef} className={styles.env} aria-hidden="true">
        {exposurePhotos.map((photo, i) =>
          environment[i] ? (
            <div
              key={photo.file}
              className={styles.envFrame}
              data-frame={i}
              style={{ ["--focus" as string]: photo.focus, ["--focus-narrow" as string]: photo.focusNarrow }}
            >
              <div className={styles.envBase}>
                <Image
                  src={`${environmentDirectory}/${photo.file}`}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  quality={80}
                />
              </div>
              {/* the same frame, softened and screened over itself: highlights bloom */}
              <div className={styles.envBloom}>
                <Image src={`${environmentDirectory}/${photo.file}`} alt="" fill sizes="100vw" quality={80} />
              </div>
            </div>
          ) : null,
        )}
        <div className={styles.envSky} />
        <div className={styles.envTint} />
        <div className={styles.envGlow} />
        <div className={styles.envSun} />
        <div className={styles.envVignette} />
        <div className={`${styles.shade} ${styles.shadeNight}`} />
        <div className={`${styles.shade} ${styles.shadeDay}`} />
        <div className={styles.envGrain} />
        <div className={styles.horizonLine} />
      </div>

      {children}

      {/* Instruments: the place, and the page's own exposure and clock. */}
      <div className={`${styles.instrument} ${styles.instrumentTop}`} aria-hidden="true">
        <span>{place.city}</span>
        <span>{place.lat}</span>
        <span>{place.lon}</span>
        <span ref={el => { clockRefs.current[0] = el; }}>05:48 AM</span>
      </div>
      <div className={styles.ruler} aria-hidden="true">
        <span className={styles.rulerLabel}>EV</span>
        <span className={styles.rulerTrack}>
          {["+2", "+1", "0", "−1", "−2"].map(mark => <b key={mark}>{mark}</b>)}
          <span ref={evRef} className={styles.rulerMark} style={{ ["--ev" as string]: 0 }}>−1.9</span>
        </span>
      </div>
      <div className={`${styles.instrument} ${styles.instrumentBottom}`} aria-hidden="true">
        <span>{place.name}</span>
        <span>{place.city}</span>
        <span ref={el => { clockRefs.current[1] = el; }}>05:48 AM</span>
      </div>

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
          Daybreak · MMXXVI · <b ref={el => { clockRefs.current[2] = el; }}>05:48 AM</b>
        </span>
      </div>
    </div>
  );
}

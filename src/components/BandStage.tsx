"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { anchors, exposures } from "./bandExposures";
import styles from "./Band.module.css";

/* The sky opens: night indigo → dawn violet → clear day blue.
   The band stays in the vermilion family the whole way — yellow on blue is a
   flag, and this never goes yellow. Heat is front-loaded, so there is real
   colour in the first frame instead of three dark screens first. */
const FIELD = ["#0e1733", "#1b2550", "#2e3566", "#46527f", "#93b0d2", "#c2daec"];
const BAND = ["#7a3b4a", "#b03a34", "#d2402a", "#e2452c", "#d9401f", "#c8371b"];
/* The disc does turn yellow as it climbs — that is what the sun does. It stays
   a circle, so it never becomes a stripe of yellow sitting on a blue field. */
const SUN = ["#8e3a3e", "#c33b2c", "#e2452c", "#ee5a22", "#f4902a", "#f7c342"];
/* The band is a horizon line that thickens a little, not a slab: the sky and
   the sun carry the growth. */
const HEIGHT = [3, 4, 5, 6, 7, 8];
/* The sun travels: centre x as a fraction of the viewport width, centre y in
   vh above the horizon, diameter in vh. It rises, drifts west, and shrinks as
   it clears the air — cropped by the band until the fifth exposure, free in
   the sixth. */
const SUN_X = [0.92, 0.89, 0.85, 0.8, 0.75, 0.7];
const SUN_Y = [-25, -18, -8, 2, 12, 22];
const SUN_D = [62, 56, 50, 44, 38, 32];

/* Once the sky is brighter than the type, the ink changes in one step rather
   than interpolating through a low-contrast middle. Flat fields make that free. */
const DAYBREAK_AT = 0.62;
const NIGHT_INK = { ink: "#f4ecda", dim: "#ccd2e2", accent: "#ffc78e", hair: "#ffffff2b", plate: "#0a0f24" };
const DAY_INK = { ink: "#14233f", dim: "#2b3750", accent: "#7a1d0e", hair: "#14233f30", plate: "#f7f1e4" };

const DRIFT = 36;
/* Clearance above the band at which a block is fully revealed. */
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

export function BandStage({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-exposure]"));
    let frame = 0;
    let index = 0;
    let day: boolean | undefined;
    // Each block (copy, plate, notebook, margin note) reveals on its own once it
    // has cleared the band. Ends are read from untransformed offsets, relative
    // to the positioned section, so the reveal can never feed its own input.
    type Block = { el: HTMLElement; end: number };
    const blocks: Block[][] = sections.map(() => []);

    const measure = () => {
      sections.forEach((section, i) => {
        // An exposure only ever meets the band at its own height, so it
        // reserves that much rather than the widest band on the page.
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

      // A block resolves only once it has risen clear of the band, so nothing
      // is ever half-swallowed by the horizon on the way in. Hidden while
      // inside it; fully shown REVEAL_PX above it.
      rects.forEach((rect, i) => {
        for (const block of blocks[i]) {
          const local = still ? 1 : clamp((horizon - (rect.top + block.end) - 6) / (REVEAL_PX - 6));
          block.el.style.setProperty("--local", local.toFixed(3));
        }
      });

      root.style.setProperty("--field", rampColor(FIELD, p));
      root.style.setProperty("--band-c", rampColor(BAND, p));
      root.style.setProperty("--sun-c", rampColor(SUN, p));
      root.style.setProperty("--band-h", `${rampNumber(HEIGHT, eased).toFixed(2)}vh`);
      root.style.setProperty("--sun-x", `${(rampNumber(SUN_X, eased) * 100).toFixed(2)}vw`);
      root.style.setProperty("--sun-y", `${rampNumber(SUN_Y, eased).toFixed(2)}vh`);
      root.style.setProperty("--sun-d", `${rampNumber(SUN_D, eased).toFixed(2)}vh`);
      // One shared lateral travel: the reading surface slides a little left as
      // the visitor descends, as though it belongs to a much larger surface.
      // Bounded by the viewport, so a phone's narrow gutter is never overrun.
      const drift = Math.min(DRIFT, window.innerWidth * 0.025);
      root.style.setProperty("--drift", still ? "0px" : `${(-drift * eased).toFixed(1)}px`);

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
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} data-band-route>
      <div className={styles.disc} aria-hidden="true" />
      {children}
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
      </div>
    </div>
  );
}

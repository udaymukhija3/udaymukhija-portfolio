"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { anchors, exposures } from "./bandExposures";
import styles from "./Band.module.css";

// Sunrise is expressed in light and material, with no illustrated scene.
// Native scroll controls the phase; CSS carries the slow ambient movement.
const BASE = ["#171d2c", "#242335", "#433748", "#d5c6bd", "#e1e1d4", "#eeece1"];
const WARM = ["#db9277", "#e6a184", "#f0b59a", "#f6c49c", "#f5dbb1", "#f8e8cd"];
const COOL = ["#586487", "#747499", "#b6a3be", "#b8c5d7", "#b8d3cd", "#d9dfcf"];
const PHASES = ["Before the light", "First warmth", "The horizon opens", "Light arrives", "A softer morning", "Room for the day"];
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function ramp(stops: string[], progress: number) {
  const x = clamp(progress) * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(x));
  const channel = (hex: string, at: number) => parseInt(hex.slice(at, at + 2), 16);
  return `rgb(${[1, 3, 5].map(at => Math.round(lerp(channel(stops[i], at), channel(stops[i + 1], at), x - i))).join(",")})`;
}
function clockAt(progress: number) {
  const minutes = Math.round(348 + progress * 84);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function BandStage({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [monochrome, setMonochrome] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-exposure]"));
    const clock = root.querySelector<HTMLElement>("[data-readout=time]");
    let frame = 0, previous = 0;
    let current: number | undefined;
    const paint = (time: number) => {
      frame = 0;
      const still = motion.matches || paused;
      const dt = previous ? Math.min(.05, (time - previous) / 1000) : 1 / 60;
      previous = time;
      const view = window.innerHeight;
      const rects = sections.map(section => section.getBoundingClientRect());
      const centres = rects.map(rect => rect.top + rect.height / 2);
      let target = 0;
      for (let i = 0; i < centres.length - 1; i++) {
        if (view / 2 > centres[i]) target = i + clamp((view / 2 - centres[i]) / (centres[i + 1] - centres[i]));
      }
      if (window.scrollY + view >= html.scrollHeight - 2) target = sections.length - 1;
      current = current === undefined || still ? target : lerp(current, target, 1 - Math.exp(-dt * 7));
      if (Math.abs(current - target) < .0001) current = target;
      const p = current / (sections.length - 1);
      const day = p >= .53;
      root.dataset.light = day ? "day" : "night";
      root.style.setProperty("--field", ramp(BASE, p));
      html.style.setProperty("--field", ramp(BASE, p));
      root.style.setProperty("--warm", ramp(WARM, p));
      root.style.setProperty("--cool", ramp(COOL, p));
      root.style.setProperty("--light-level", String(.5 + Math.sin(p * Math.PI) * .35));
      root.style.setProperty("--seam", `${70 - p * 28}%`);
      root.style.setProperty("--light-x", `${77 - p * 23}%`);
      root.style.setProperty("--shadow-x", `${-32 + p * 44}px`);
      root.style.setProperty("--shadow-y", `${46 - p * 32}px`);
      root.style.setProperty("--shadow-blur", `${64 - p * 34}px`);
      root.style.setProperty("--progress", String(p));
      root.style.setProperty("--reading-x", `${lerp(24, 55, Math.max(0, 1 - Math.abs(current - 2)))}%`);
      if (clock) clock.textContent = clockAt(p);
      sections.forEach((section, i) => {
        const rect = rects[i];
        const visible = rect.top < view && rect.bottom > 0;
        const reveal = still ? 1 : clamp((view * .92 - rect.top) / (view * .4));
        section.style.setProperty("--reveal", String(reveal));
        section.toggleAttribute("data-visible", visible);
      });
      setActive(Math.round(current));
      if (!still && current !== target) schedule();
    };
    function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); }
    const onMotion = () => { root.toggleAttribute("data-still", motion.matches || paused); schedule(); };
    const onVisibility = () => {
      root.toggleAttribute("data-hidden", document.hidden);
      cancelAnimationFrame(frame); frame = 0; previous = 0; schedule();
    };
    onMotion(); onVisibility();
    const size = new ResizeObserver(schedule);
    sections.forEach(section => size.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      cancelAnimationFrame(frame); size.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      html.style.removeProperty("--field");
    };
  }, [paused]);

  return <div ref={rootRef} className={styles.root} data-band-route data-monochrome={monochrome || undefined}>
    <div className={styles.world} aria-hidden="true">
      <div className={styles.colorAir} />
      <div className={styles.lightBloom} />
      <div className={styles.lightSeam} />
      <div className={styles.shadowPlane} />
      <div className={styles.readingShade} />
    </div>
    {children}
    <div className={styles.readout} aria-label="Sunrise progression">
      <span className={styles.statusDot} aria-hidden="true" />
      <span>{PHASES[active]}</span><span data-readout="time">05:48</span>
    </div>
    <div className={styles.viewControls}>
      <button className={styles.colorControl} type="button" title="Monochrome" aria-pressed={monochrome} onClick={() => setMonochrome(value => !value)}>
        <span className={styles.colorDisc} aria-hidden="true" /><span className={styles.controlLabel}>Monochrome</span>
      </button>
      <button className={styles.motionControl} type="button" title={paused ? "Resume motion" : "Pause motion"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span className={styles.controlLabel}>{paused ? "Resume motion" : "Pause motion"}</span>
      </button>
    </div>
    <div className={styles.ground}>
      <nav className={styles.measure} aria-label="Exposures">
        {exposures.map((name, i) => <a key={name} href={`#${anchors[i]}`} aria-current={active === i ? "true" : undefined} aria-label={`${String(i + 1).padStart(2, "0")} ${name}`}><b>{String(i + 1).padStart(2, "0")}</b><span>{name}</span></a>)}
      </nav>
      <span className={styles.groundMark}>First light / 2026</span>
    </div>
  </div>;
}

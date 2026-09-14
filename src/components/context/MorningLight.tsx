"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { approach, lightRates, scrubAt, scrubKey, sunriseAt, sunriseDuration } from "../../lib/oceanLight";
import styles from "./OceanLight.module.css";

/**
 * Gives the server-rendered ocean its morning. On arrival the light warms from silver to gold;
 * moving across the strip, dragging on touch, or pressing the arrow keys scrubs between the two,
 * and letting go eases the scene back to wherever the morning has reached. Reduced motion keeps
 * the CSS-defined static scene and never starts the loop.
 */
export function MorningLight({ children, className = "", labelId }: { children: ReactNode; className?: string; labelId: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const strip = ref.current;
    const control = strip?.querySelector<HTMLButtonElement>("[data-light-control]");
    if (!strip || !control) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, previous = 0, light = 0, rate = lightRates.rising;
    let hold: number | null = null;
    let sunriseStart = 0, pausedAt = 0, visible = false;
    let press: { id: number; x: number; y: number; touch: boolean } | null = null;
    let rest: { x: number; y: number } | null = null;

    const running = () => visible && !document.hidden && !reduced.matches;
    const morning = (now: number) => sunriseStart ? sunriseAt(now - sunriseStart) : 0;
    const schedule = () => {
      if (!frame && running()) frame = requestAnimationFrame(tick);
    };
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(.05, previous ? (now - previous) / 1000 : 1 / 60);
      previous = now;
      const target = hold ?? morning(now);
      light = approach(light, target, rate, dt);
      strip.style.setProperty("--gold-light", light.toFixed(4));
      const rising = now - sunriseStart < sunriseDuration;
      if (!rising && strip.dataset.settled !== "true") strip.dataset.settled = "true";
      if (light !== target || (rising && hold === null)) schedule();
    };
    const pause = () => {
      release();
      cancelAnimationFrame(frame); frame = 0; previous = 0; press = null;
      if (sunriseStart && !pausedAt) pausedAt = performance.now();
    };
    const resume = () => {
      if (!running()) return;
      const now = performance.now();
      if (!sunriseStart) sunriseStart = now;
      else if (pausedAt) sunriseStart += now - pausedAt;
      pausedAt = 0; previous = 0;
      schedule();
    };
    const grab = (value: number) => {
      hold = value; rate = lightRates.held;
      schedule();
    };
    const release = () => {
      if (hold === null) return;
      hold = null; rate = lightRates.settling;
      schedule();
    };
    const replay = () => {
      hold = null; rate = lightRates.rising;
      sunriseStart = performance.now(); pausedAt = 0;
      strip.dataset.settled = "false";
      schedule();
    };
    const aim = (event: PointerEvent) => {
      const bounds = control.getBoundingClientRect();
      grab(scrubAt(event.clientX - bounds.left, bounds.width));
    };
    const onPointerDown = (event: PointerEvent) => {
      press = { id: event.pointerId, x: event.clientX, y: event.clientY, touch: event.pointerType === "touch" };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        // A finger only takes the light once it has clearly moved sideways; taps and vertical scrolls pass through.
        if (!press?.touch || press.id !== event.pointerId) return;
        if (hold === null) {
          if (Math.abs(event.clientX - press.x) < 6) return;
          control.setPointerCapture(event.pointerId);
        }
      } else if (rest) {
        // After a click the mouse may sit still to watch the replay; small drift should not interrupt it.
        if (Math.hypot(event.clientX - rest.x, event.clientY - rest.y) < 8) return;
        rest = null;
      }
      aim(event);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") release();
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "touch") release();
    };
    const onPointerCancel = () => {
      press = null; release();
    };
    const onClick = (event: MouseEvent) => {
      // Enter, Space, a click, or a tap replays the sunrise; a drag that ended here does not.
      const dragged = press && Math.hypot(event.clientX - press.x, event.clientY - press.y) >= 6;
      press = null;
      if (dragged) return;
      replay();
      if (event.detail) rest = { x: event.clientX, y: event.clientY };
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (hold !== null) { event.preventDefault(); release(); }
        return;
      }
      const next = scrubKey(event.key, hold ?? light);
      if (next === undefined) return;
      event.preventDefault();
      grab(next);
    };
    const onVisibility = () => {
      if (document.hidden) pause(); else resume();
    };
    const onPreference = () => {
      control.hidden = reduced.matches;
      if (reduced.matches) {
        pause();
        strip.style.removeProperty("--gold-light");
        strip.dataset.settled = "true";
      } else {
        light = 0; sunriseStart = 0; pausedAt = 0;
        strip.style.setProperty("--gold-light", "0");
        strip.dataset.settled = "false";
        resume();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      strip.dataset.lit = String(visible);
      if (visible) resume(); else pause();
    });

    control.hidden = reduced.matches;
    if (reduced.matches) strip.dataset.settled = "true";
    observer.observe(strip);
    control.addEventListener("pointerdown", onPointerDown);
    control.addEventListener("pointermove", onPointerMove);
    control.addEventListener("pointerup", onPointerUp);
    control.addEventListener("pointerleave", onPointerLeave);
    control.addEventListener("pointercancel", onPointerCancel);
    control.addEventListener("click", onClick);
    control.addEventListener("keydown", onKey);
    control.addEventListener("blur", release);
    reduced.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      control.removeEventListener("pointerdown", onPointerDown);
      control.removeEventListener("pointermove", onPointerMove);
      control.removeEventListener("pointerup", onPointerUp);
      control.removeEventListener("pointerleave", onPointerLeave);
      control.removeEventListener("pointercancel", onPointerCancel);
      control.removeEventListener("click", onClick);
      control.removeEventListener("keydown", onKey);
      control.removeEventListener("blur", release);
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      control.hidden = true;
      strip.style.removeProperty("--gold-light");
      delete strip.dataset.lit; delete strip.dataset.settled;
    };
  }, []);

  return <section ref={ref} className={`${styles.strip} ${className}`} aria-labelledby={labelId} data-lit="false" data-settled="false">
    {children}
    <button type="button" data-light-control hidden className={styles.control}
      aria-label="Play with the morning light" aria-describedby={`${labelId}-controls`}>
      <span id={`${labelId}-controls`} className={styles.hint}>Arrow keys scrub from silver to gold. Enter replays the sunrise. Esc lets it settle.</span>
    </button>
  </section>;
}

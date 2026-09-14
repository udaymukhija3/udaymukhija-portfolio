"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { approach, flingOffset, lightLayers, lightName, lightRates, morningKey, scrubAt, scrubKey, sunriseAt, sunriseDuration } from "../../lib/oceanLight";
import styles from "./OceanLight.module.css";

/**
 * Gives the server-rendered ocean its morning. On arrival the light warms from silver to gold — cloud, sky,
 * sun, then water; moving across the strip, dragging on touch, or pressing the arrow keys scrubs between the
 * two, and letting go eases the scene back to wherever the morning has reached. Reduced motion keeps the
 * CSS-defined static scene and never starts the loop.
 */
export function MorningLight({ children, className = "", labelId }: { children: ReactNode; className?: string; labelId: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const strip = ref.current;
    const control = strip?.querySelector<HTMLElement>("[data-light-control]");
    if (!strip || !control) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, previous = 0, light = 0, rate = lightRates.rising, step = -1;
    let hold: number | null = null;
    let started = false, sunriseStart = 0, pausedAt = 0, visible = false;
    let press: { id: number; x: number; y: number; touch: boolean } | null = null;
    let rest: { x: number; y: number } | null = null;
    let swipe: { x: number; t: number; v: number } | null = null;
    let momentum: ReturnType<typeof setTimeout> | undefined;
    let wake = 0, wakeX = 0, wakeY = 0, wakeToX = 0, wakeToY = 0, lastMove = -1e9;

    const running = () => visible && !document.hidden && !reduced.matches;
    const morning = (now: number) => started ? sunriseAt(now - sunriseStart) : 0;
    const remembered = () => {
      try { return sessionStorage.getItem(morningKey) === "settled"; } catch { return false; }
    };
    const remember = () => {
      document.documentElement.dataset.morning = "settled";
      try { sessionStorage.setItem(morningKey, "settled"); } catch { /* Private mode: the sunrise simply plays again. */ }
    };
    const paint = () => {
      const layers = lightLayers(light);
      strip.style.setProperty("--gold-light", light.toFixed(4));
      strip.style.setProperty("--gold-sky", layers.sky.toFixed(4));
      strip.style.setProperty("--gold-water", layers.water.toFixed(4));
      strip.style.setProperty("--gold-cloud", layers.cloud.toFixed(4));
      strip.style.setProperty("--wake", wake.toFixed(3));
      strip.style.setProperty("--wake-x", `${wakeX.toFixed(1)}px`);
      strip.style.setProperty("--wake-y", `${wakeY.toFixed(1)}px`);
      const next = Math.round(light * 10);
      if (next !== step) {
        step = next;
        control.setAttribute("aria-valuenow", String(step * 10));
        control.setAttribute("aria-valuetext", lightName(light));
      }
    };
    const settle = () => {
      if (strip.dataset.settled === "true") return;
      strip.dataset.settled = "true";
      remember();
    };
    const schedule = () => {
      if (!frame && running()) frame = requestAnimationFrame(tick);
    };
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(.05, previous ? (now - previous) / 1000 : 1 / 60);
      previous = now;
      const target = hold ?? morning(now);
      light = approach(light, target, rate, dt);
      const wakeTo = now - lastMove < 120 ? 1 : 0;
      wake = approach(wake, wakeTo, wakeTo ? 6 : 2.5, dt);
      wakeX = approach(wakeX, wakeToX, 12, dt);
      wakeY = approach(wakeY, wakeToY, 12, dt);
      paint();
      const rising = now - sunriseStart < sunriseDuration;
      if (!rising) settle();
      else if (hold === null && morning(now) >= .5 && strip.dataset.risen !== "true") strip.dataset.risen = "true";
      if (light !== target || (rising && hold === null) || wake !== wakeTo || wakeX !== wakeToX || wakeY !== wakeToY) schedule();
    };
    const pause = () => {
      release(); clearTimeout(momentum);
      cancelAnimationFrame(frame); frame = 0; previous = 0; press = null; swipe = null;
      if (started && !pausedAt) pausedAt = performance.now();
    };
    const resume = () => {
      if (!running()) return;
      const now = performance.now();
      if (!started) { started = true; sunriseStart = now; }
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
      clearTimeout(momentum);
      hold = null; rate = lightRates.rising;
      started = true; sunriseStart = performance.now(); pausedAt = 0;
      strip.dataset.settled = "false"; strip.dataset.risen = "false";
      schedule();
    };
    const aim = (event: PointerEvent) => {
      const bounds = control.getBoundingClientRect();
      const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
      wakeToX = x; wakeToY = Math.min(bounds.height * .9, Math.max(bounds.height * .5, y));
      // An invisible wake appears where the pointer is rather than sliding in from where it last faded.
      if (wake < .02) { wakeX = wakeToX; wakeY = wakeToY; }
      lastMove = performance.now();
      grab(scrubAt(x, bounds.width));
    };
    const onPointerDown = (event: PointerEvent) => {
      clearTimeout(momentum);
      press = { id: event.pointerId, x: event.clientX, y: event.clientY, touch: event.pointerType === "touch" };
      swipe = press.touch ? { x: event.clientX, t: event.timeStamp, v: 0 } : null;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        // A finger only takes the light once it has clearly moved sideways; taps and vertical scrolls pass through.
        if (!press?.touch || press.id !== event.pointerId) return;
        if (hold === null) {
          if (Math.abs(event.clientX - press.x) < 6) return;
          control.setPointerCapture(event.pointerId);
        }
        if (swipe) {
          const elapsed = event.timeStamp - swipe.t;
          const v = elapsed > 0 ? (event.clientX - swipe.x) / elapsed : swipe.v;
          swipe = { x: event.clientX, t: event.timeStamp, v: v * .6 + swipe.v * .4 };
        }
      } else if (rest) {
        // After a click the mouse may sit still to watch the replay; small drift should not interrupt it.
        if (Math.hypot(event.clientX - rest.x, event.clientY - rest.y) < 8) return;
        rest = null;
      }
      aim(event);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      // A quick flick carries the light a little past the finger before it settles.
      if (hold !== null && swipe && event.timeStamp - swipe.t < 100 && Math.abs(swipe.v) > .3) {
        grab(Math.min(1, Math.max(0, hold + flingOffset(swipe.v, control.getBoundingClientRect().width))));
        momentum = setTimeout(release, 220);
      } else release();
      swipe = null;
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "touch") release();
    };
    const onPointerCancel = () => {
      press = null; swipe = null; release();
    };
    const onClick = (event: MouseEvent) => {
      // A click or a tap replays the sunrise; a drag that ended here does not.
      const dragged = press && Math.hypot(event.clientX - press.x, event.clientY - press.y) >= 6;
      press = null;
      if (dragged) return;
      replay();
      rest = { x: event.clientX, y: event.clientY };
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); replay(); return; }
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
    const arrive = () => {
      if (remembered()) {
        light = 1; started = true; sunriseStart = -sunriseDuration;
        strip.dataset.risen = "true";
        paint(); settle();
      } else {
        strip.dataset.settled = "false"; strip.dataset.risen = "false";
        paint();
      }
    };
    const onPreference = () => {
      control.hidden = reduced.matches;
      if (reduced.matches) {
        pause();
        ["--gold-light", "--gold-sky", "--gold-water", "--gold-cloud", "--wake", "--wake-x", "--wake-y"].forEach(property => strip.style.removeProperty(property));
        strip.dataset.settled = "true"; strip.dataset.risen = "true";
      } else {
        light = 0; started = false; pausedAt = 0;
        arrive(); resume();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      strip.dataset.lit = String(visible);
      if (visible) resume(); else pause();
    });

    control.hidden = reduced.matches;
    if (reduced.matches) { strip.dataset.settled = "true"; strip.dataset.risen = "true"; }
    else arrive();
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
      cancelAnimationFrame(frame); clearTimeout(momentum); observer.disconnect();
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
      strip.removeAttribute("style");
      delete strip.dataset.lit; delete strip.dataset.settled; delete strip.dataset.risen;
    };
  }, []);

  return <section ref={ref} className={`${styles.strip} ${className}`} aria-labelledby={labelId}>
    {children}
    <div role="slider" tabIndex={0} data-light-control hidden className={styles.control}
      aria-label="Morning light" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} aria-valuetext="silver dawn"
      aria-describedby={`${labelId}-controls`}>
      <span id={`${labelId}-controls`} className={styles.hint}>Arrow keys scrub from silver to gold. Enter replays the sunrise. Esc lets it settle.</span>
      <span className={styles.rail} aria-hidden="true"><span>silver</span><span>gold</span></span>
    </div>
  </section>;
}

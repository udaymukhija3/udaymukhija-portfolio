"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { clamp, damp, entranceAt, environmentAt, narrativePosition, phaseNames, smooth } from "../lib/daybreak";
import { surfaceAt, surfaceTravel } from "../lib/surfaceMotion";
import styles from "./Daybreak.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

type MeasuredElement = { element: HTMLElement; top: number; height: number };

export function DaybreakController() {
  const [still, setStill] = useState(false);
  const systemReduced = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => false);

  useEffect(() => {
    const root = document.getElementById("daybreak");
    if (!root) return;
    const preference = window.matchMedia(motionQuery);
    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
    const skies = Array.from(root.querySelectorAll<HTMLElement>("[data-sky]"));
    const entries = Array.from(root.querySelectorAll<HTMLElement>("[data-enter]"));
    const surfaces = Array.from(root.querySelectorAll<HTMLElement>("[data-surface]"));
    const phaseLabel = root.querySelector<HTMLElement>("[data-phase-label]");
    const phaseNumber = root.querySelector<HTMLElement>("[data-phase-number]");
    let frame = 0;
    let dirty = true;
    let snap = true;
    let anchors: number[] = [];
    let sceneBounds: MeasuredElement[] = [];
    let entryBounds: MeasuredElement[] = [];
    let surfaceBounds: MeasuredElement[] = [];
    let extent = 1;
    let lastPhase = -1;
    let visualY = window.scrollY;
    let lastTime = performance.now();
    let viewport = window.innerHeight;
    const small = window.matchMedia("(max-width: 760px)");
    const read = (element: HTMLElement): MeasuredElement => {
      // Layout offsets are independent of transforms, including transformed ancestors.
      // This prevents resize, zoom and disclosure measurement from feeding motion back into itself.
      let top = 0;
      let node: HTMLElement | null = element;
      while (node) {
        top += node.offsetTop;
        const parent = node.offsetParent as HTMLElement | null;
        if (parent) top += parent.clientTop;
        node = parent;
      }
      return { element, top, height: element.offsetHeight };
    };
    const update = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      const reduced = preference.matches || still;
      if (dirty) {
        viewport = window.innerHeight;
        // Batch every layout read before any writes.
        sceneBounds = scenes.map(read);
        entryBounds = entries.map(read);
        surfaceBounds = surfaces.map(read);
        extent = Math.max(1, root.offsetHeight - viewport);
        anchors = sceneBounds.map(({ top }, i) => Math.max(0, top - (i ? viewport * .27 : 0)));
        dirty = false;
      }
      const actualY = window.scrollY;
      const dt = Math.min(.05, Math.max(0, (time - lastTime) / 1000));
      lastTime = time;
      visualY = snap || reduced || Math.abs(actualY - visualY) > viewport * .8
        ? actualY : damp(visualY, actualY, dt, 24);
      const refreshAll = snap;
      snap = false;
      if (Math.abs(actualY - visualY) < .15) visualY = actualY;
      const state = environmentAt(narrativePosition(visualY, anchors));
      const sunrise = sceneBounds[3];
      const solarReveal = sunrise ? smooth((visualY + viewport * .75 - sunrise.top) / (viewport * 1.05)) : state.sunRise;
      root.dataset.motion = reduced ? "still" : "live";
      root.style.setProperty("--surface-travel", `${surfaceTravel(visualY, extent, small.matches, reduced)}px`);
      surfaceBounds.forEach(({element,top,height}) => {
        const nearby = top < actualY + viewport * 1.35 && top + height > actualY - viewport * .35;
        if (!nearby && !reduced && !refreshAll) return;
        const curve = surfaceAt(top + height / 2, visualY, viewport, small.matches, reduced);
        element.style.setProperty("--surface-x", `${curve.x}px`);
        element.style.setProperty("--surface-z", `${curve.z}px`);
        element.style.setProperty("--surface-pitch", `${curve.pitch}deg`);
        element.style.setProperty("--surface-yaw", `${curve.yaw}deg`);
      });
      root.style.setProperty("--journey", String(state.position / 5));
      root.style.setProperty("--stars", String(state.stars));
      root.style.setProperty("--cloud-light", String(state.clouds));
      root.style.setProperty("--daylight", String(state.daylight));
      root.style.setProperty("--sun-rise", String(reduced ? .82 : solarReveal));
      root.style.setProperty("--warmth", String(state.warmth));
      const heroExit = clamp(visualY / Math.max(1, sceneBounds[0]?.height ?? viewport));
      root.style.setProperty("--hero-exit", String(reduced ? 0 : heroExit));
      skies.forEach((sky, i) => {
        const mix = smooth(state.position % 1);
        sky.style.opacity = String(i === state.phase ? 1 : i === state.phase + 1 ? mix : 0);
      });
      sceneBounds.forEach(({ element, top, height }) => {
        const passage = clamp((visualY + viewport - top) / (height + viewport));
        element.style.setProperty("--passage", String(passage));
        element.style.setProperty("--drift", `${reduced ? 0 : (passage - .5) * (small.matches ? 30 : 100)}px`);
        element.style.setProperty("--line-draw", String(reduced ? 1 : smooth(passage / .4)));
      });
      entryBounds.forEach(({ element, top, height }) => {
        const visible = top < actualY + viewport * 1.15 && top + height > actualY - viewport * .2;
        if (visible || reduced || refreshAll) {
          const enter = reduced ? 1 : entranceAt(top, visualY, viewport);
          element.style.setProperty("--enter", String(enter));
        }
      });
      root.dispatchEvent(new CustomEvent("daybreak:frame", { detail: { ...state, still: reduced } }));
      if (lastPhase !== state.phase) {
        lastPhase = state.phase;
        if (phaseLabel) phaseLabel.textContent = phaseNames[state.phase];
        if (phaseNumber) phaseNumber.textContent = String(state.phase + 1).padStart(2, "0");
        root.dataset.phase = String(state.phase);
      }
      if (visualY !== actualY) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => { dirty = true; snap = true; schedule(); };
    const jump = () => { snap = true; schedule(); };
    const resize = new ResizeObserver(measure);
    scenes.forEach(scene => resize.observe(scene));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("pageshow", measure);
    window.addEventListener("hashchange", jump);
    document.addEventListener("visibilitychange", measure);
    preference.addEventListener("change", jump);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    update(performance.now());
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      window.removeEventListener("hashchange", jump);
      document.removeEventListener("visibilitychange", measure);
      preference.removeEventListener("change", jump);
      root.dataset.motion = "still";
      root.dispatchEvent(new CustomEvent("daybreak:frame", { detail: { still: true, daylight: 1 } }));
    };
  }, [still]);

  return <button className={styles.motionButton} type="button" aria-pressed={still || systemReduced} disabled={systemReduced} title={systemReduced ? "Following your device’s reduced-motion preference" : undefined} onClick={() => setStill(!still)}>
    <span aria-hidden="true">{still || systemReduced ? "○" : "Ⅱ"}</span> {systemReduced ? "Reduced motion" : still ? "Motion off" : "Still mode"}
  </button>;
}

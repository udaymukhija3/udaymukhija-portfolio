"use client";

import { useEffect, useRef, useState } from "react";
import type { SculptureControls } from "./SolarSculptureRenderer";
import styles from "./Daybreak.module.css";

export function SolarSculpture({ compact = false }: { compact?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useRef<SculptureControls | null>(null);
  const [wire, setWire] = useState(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<"waiting" | "ready" | "fallback">("waiting");

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    let cancelled = false;
    let started = false;
    const load = async () => {
      if (started) return;
      started = true;
      try {
        const { createSolarSculpture } = await import("./SolarSculptureRenderer");
        if (cancelled) return;
        controls.current = createSolarSculpture(host, canvas, () => {
          if (!cancelled) setStatus("fallback");
        });
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { void load(); observer.disconnect(); }
    }, { rootMargin: "600px 0px" });
    observer.observe(host);
    return () => { cancelled = true; observer.disconnect(); controls.current?.dispose(); controls.current = null; };
  }, []);

  return <div className={styles.sculpture} data-compact={compact || undefined} data-enter data-surface>
    <div className={styles.sculptureText}>
      <span className={styles.eyebrow}>Light study / 001</span>
      <h3>Something<br /><em>to orbit.</em></h3>
      <p>A folded ribbon, a moving light.<br />A small experiment in seeing<br />the same thing differently.</p>
      <div className={styles.sculptureControls}>
        <button type="button" disabled={status !== "ready"} aria-pressed={wire} onClick={() => { controls.current?.setWireframe(!wire); setWire(!wire); }}>{wire ? "Show surface" : "See the structure"} <span aria-hidden="true">↗</span></button>
        <button type="button" disabled={status !== "ready"} aria-pressed={paused} onClick={() => { controls.current?.setPaused(!paused); setPaused(!paused); }}>{paused ? "Resume rotation" : "Pause rotation"}</button>
        <div className={styles.turnControls}>
          <button type="button" disabled={status !== "ready"} aria-label="Turn the sculpture left" onClick={() => controls.current?.turn(-1)}>←</button>
          <button type="button" disabled={status !== "ready"} aria-label="Turn the sculpture right" onClick={() => controls.current?.turn(1)}>→</button>
        </div>
      </div>
      <span className={styles.sculptureStatus} role="status">{status === "ready" ? "THREE.JS · LIVE GEOMETRY" : status === "fallback" ? "SVG STUDY · 3D UNAVAILABLE" : "SVG PREVIEW · 3D LOADS NEARBY"}</span>
    </div>
    <div ref={hostRef} className={styles.sculptureStage} data-ready={status === "ready"}>
      <svg className={styles.sculptureGuides} viewBox="0 0 600 560" fill="none" aria-hidden="true"><circle cx="300" cy="280" r="218" stroke="currentColor" strokeDasharray="1 8" /><path d="M35 280H70M530 280H565M300 15V50M300 510V545" stroke="currentColor" /><ellipse cx="300" cy="280" rx="255" ry="80" transform="rotate(-24 300 280)" stroke="currentColor" opacity=".35" /></svg>
      <svg className={styles.sculptureFallback} viewBox="0 0 600 560" fill="none" role="img" aria-hidden={status === "ready"} aria-label="An interwoven circular ribbon shown as a line study">{Array.from({ length: 28 }, (_, i) => <ellipse key={i} cx="300" cy="280" rx={100 + i * 3.1} ry={185 - i * 2.6} transform={`rotate(${i * 6.5} 300 280)`} stroke="currentColor" strokeWidth="1.4" />)}</svg>
      <canvas ref={canvasRef} tabIndex={status === "ready" ? 0 : -1} role="img" aria-hidden={status !== "ready"} aria-label="Interactive three-dimensional folded solar ribbon. Drag horizontally or use arrow keys to turn. Press Home to reset." />
      <span className={styles.sculptureHint}>{status === "ready" ? "DRAG TO TURN · ARROW KEYS TO EXPLORE" : "A STUDY IN LIGHT & REPETITION"}</span>
    </div>
  </div>;
}

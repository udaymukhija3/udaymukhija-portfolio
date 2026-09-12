"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./surface.module.css";

export function Atmosphere({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const visibility = () => { node.dataset.sleeping = String(document.hidden); };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return (
    <div ref={root} className={styles.surface} data-paused={paused}>
      <div className={styles.environment} aria-hidden="true"><div className={styles.sunlight} /><div className={styles.warmth} /><div className={styles.botanical}><div /></div></div>
      {children}
      <button className={styles.motionControl} type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Resume atmosphere" : "Pause atmosphere"}</button>
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ContextPortfolio.module.css";

/** One sleeping-until-needed loop; the artwork itself remains server-rendered. */
export function LivingHero({ children, className = "", labelId = "context-title", compact = false }: {
  children: ReactNode; className?: string; labelId?: string; compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, previous = 0, current = 0, target = 0;
    let start = 0, distance = 1, visible = true;
    const properties = ["--warm-light", "--dawn-light", "--horizon-x", "--horizon-y", "--reflection-x", "--reflection-strength"];

    function paint(progress: number) {
      if (!hero) return;
      hero.style.setProperty("--warm-light", String(Math.min(1, progress * 2)));
      hero.style.setProperty("--dawn-light", String(Math.max(0, (progress - .4) / .6)));
      hero.style.setProperty("--horizon-x", `${progress * 24}px`);
      hero.style.setProperty("--horizon-y", `${progress * -48}px`);
      hero.style.setProperty("--reflection-x", `${progress * -32}px`);
      hero.style.setProperty("--reflection-strength", String(.65 + progress * .35));
    }
    function tick(time: number) {
      frame = 0;
      const dt = Math.min(.05, previous ? (time - previous) / 1000 : 1 / 60);
      previous = time;
      current += (target - current) * (1 - Math.exp(-12 * dt));
      if (Math.abs(target - current) < .0005) current = target;
      paint(current);
      if (current !== target) schedule();
    }
    function schedule() {
      if (!frame && visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    }
    function onScroll() {
      target = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      schedule();
    }
    function measure() {
      if (!hero) return;
      start = compact ? 0 : hero.getBoundingClientRect().top + window.scrollY;
      // Even a tall viewport with a short index gets the full color journey.
      distance = Math.max(1, Math.min(hero.offsetHeight * .65, document.documentElement.scrollHeight - innerHeight));
      onScroll();
    }
    function onPreference() {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      if (reduced.matches) {
        properties.forEach(property => hero?.style.removeProperty(property));
      } else { current = target; paint(current); schedule(); }
    }
    function onVisibility() {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      schedule();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      hero.dataset.lit = String(visible);
      if (visible) { previous = 0; onScroll(); }
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(hero);
    const resize = new ResizeObserver(measure);
    resize.observe(hero);
    measure(); current = target;
    if (!reduced.matches) paint(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    reduced.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      properties.forEach(property => hero.style.removeProperty(property));
    };
  }, [compact]);

  return <section ref={ref} className={`${styles.hero} ${className}`} aria-labelledby={labelId}>{children}</section>;
}

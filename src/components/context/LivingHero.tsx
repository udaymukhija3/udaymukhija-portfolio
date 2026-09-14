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
    const control = hero.querySelector<HTMLButtonElement>("[data-light-control]");
    let frame = 0, previous = 0, current = 0, target = 0;
    let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    let start = 0, distance = 1, visible = true;
    const properties = ["--warm-light", "--dawn-light", "--gold-light", "--horizon-x", "--horizon-y", "--reflection-x", "--reflection-strength", "--light-touch-x", "--light-touch-y"];

    function paint(progress: number) {
      if (!hero) return;
      hero.style.setProperty("--warm-light", String(Math.min(1, progress * 2)));
      hero.style.setProperty("--dawn-light", String(Math.max(0, (progress - .4) / .6)));
      hero.style.setProperty("--gold-light", String(progress));
      hero.style.setProperty("--horizon-x", `${progress * 24}px`);
      hero.style.setProperty("--horizon-y", `${progress * -48}px`);
      hero.style.setProperty("--reflection-x", `${progress * -32}px`);
      hero.style.setProperty("--reflection-strength", String(.65 + progress * .35));
      hero.style.setProperty("--light-touch-x", `${pointerX * 48}px`);
      hero.style.setProperty("--light-touch-y", `${pointerY * 10}px`);
    }
    function tick(time: number) {
      frame = 0;
      const dt = Math.min(.05, previous ? (time - previous) / 1000 : 1 / 60);
      previous = time;
      current += (target - current) * (1 - Math.exp(-12 * dt));
      pointerX += (targetX - pointerX) * (1 - Math.exp(-9 * dt));
      pointerY += (targetY - pointerY) * (1 - Math.exp(-9 * dt));
      if (Math.abs(target - current) < .0005) current = target;
      if (Math.abs(targetX - pointerX) < .001) pointerX = targetX;
      if (Math.abs(targetY - pointerY) < .001) pointerY = targetY;
      paint(current);
      if (current !== target || pointerX !== targetX || pointerY !== targetY) schedule();
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
      clearTimeout(resetTimer);
      pointerX = pointerY = targetX = targetY = 0;
      if (control) control.hidden = reduced.matches;
      if (reduced.matches) {
        properties.forEach(property => hero?.style.removeProperty(property));
      } else { current = target; paint(current); schedule(); }
    }
    function onVisibility() {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      resetPointer();
      schedule();
    }
    function resetPointer() {
      clearTimeout(resetTimer);
      targetX = targetY = 0;
      schedule();
    }
    function aimAt(event: PointerEvent) {
      if (!control || reduced.matches) return;
      const bounds = control.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      schedule();
    }
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "touch") aimAt(event);
    }
    function onPointerLeave(event: PointerEvent) {
      if (event.pointerType !== "touch") resetPointer();
    }
    function onPointerUp(event: PointerEvent) {
      if (event.pointerType === "touch") {
        clearTimeout(resetTimer); aimAt(event);
        resetTimer = setTimeout(resetPointer, 1200);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (reduced.matches) return;
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Escape"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Escape") { resetPointer(); return; }
      if (event.key === "ArrowLeft") targetX = Math.max(-1, targetX - .35);
      if (event.key === "ArrowRight") targetX = Math.min(1, targetX + .35);
      if (event.key === "ArrowUp") targetY = Math.max(-1, targetY - .35);
      if (event.key === "ArrowDown") targetY = Math.min(1, targetY + .35);
      schedule();
    }
    function onActivate(event: MouseEvent) {
      // Native Enter/Space activation gives the same light shift as a tap.
      if (event.detail === 0 && !reduced.matches) {
        targetX = targetX > 0 ? -.65 : .65;
        schedule();
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      hero.dataset.lit = String(visible);
      if (visible) { previous = 0; onScroll(); }
      else {
        cancelAnimationFrame(frame); frame = 0;
        resetPointer(); pointerX = pointerY = 0;
      }
    });
    observer.observe(hero);
    const resize = new ResizeObserver(measure);
    resize.observe(hero);
    measure(); current = target;
    if (!reduced.matches) paint(current);
    if (control) control.hidden = reduced.matches;
    control?.addEventListener("pointermove", onPointerMove);
    control?.addEventListener("pointerleave", onPointerLeave);
    control?.addEventListener("pointerup", onPointerUp);
    control?.addEventListener("pointercancel", resetPointer);
    control?.addEventListener("keydown", onKey);
    control?.addEventListener("click", onActivate);
    control?.addEventListener("blur", resetPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    reduced.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect();
      clearTimeout(resetTimer);
      control?.removeEventListener("pointermove", onPointerMove);
      control?.removeEventListener("pointerleave", onPointerLeave);
      control?.removeEventListener("pointerup", onPointerUp);
      control?.removeEventListener("pointercancel", resetPointer);
      control?.removeEventListener("keydown", onKey);
      control?.removeEventListener("click", onActivate);
      control?.removeEventListener("blur", resetPointer);
      if (control) control.hidden = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      properties.forEach(property => hero.style.removeProperty(property));
    };
  }, [compact]);

  return <section ref={ref} className={`${styles.hero} ${className}`} aria-labelledby={labelId}>
    {children}
    {compact && <button type="button" data-light-control hidden className={styles.lightControl}
      aria-label="Play with the morning light" aria-describedby={`${labelId}-controls`}>
      <span id={`${labelId}-controls`} className={styles.lightHint}>Arrow keys move the light. Enter shifts it. Esc resets.</span>
    </button>}
  </section>;
}

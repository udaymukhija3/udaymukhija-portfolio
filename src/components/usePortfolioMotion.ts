"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export function usePortfolioMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const continuity = root.querySelector<HTMLElement>("[data-continuity]");
    const gathr = root.querySelector<HTMLElement>(".featured-project-gathrly");
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const tiltItems = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
    const liveMotionItems = Array.from(root.querySelectorAll<HTMLElement>("[data-live-motion]"));
    const observedMotionItems = Array.from(new Set([...tiltItems, ...liveMotionItems]));
    let frame = 0;
    let pressTimer = 0;

    const showEverything = () => {
      revealItems.forEach((item) => item.setAttribute("data-visible", "true"));
    };

    if (reducedMotion.matches) {
      root.dataset.motion = "reduced";
      showEverything();
      return;
    }

    root.dataset.motion = "ready";

    const activateFrame = window.requestAnimationFrame(() => {
      root.dataset.motion = "active";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.setAttribute("data-in-view", entry.isIntersecting ? "true" : "false");
        });
      },
      { rootMargin: "18% 0px", threshold: 0.01 },
    );

    observedMotionItems.forEach((item) => projectObserver.observe(item));

    const writeScrollState = () => {
      frame = 0;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const documentHeight = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);
      const pageProgress = clamp(window.scrollY / documentHeight);
      const heroProgress = clamp(window.scrollY / (viewportHeight * 0.78));

      root.style.setProperty("--page-progress", pageProgress.toFixed(4));
      root.style.setProperty("--hero-shift", `${Math.round(heroProgress * -64)}px`);
      root.style.setProperty("--hero-opacity", `${1 - heroProgress * 0.56}`);
      root.toggleAttribute("data-hero-active", heroProgress < 0.98);

      if (continuity) {
        const rect = continuity.getBoundingClientRect();
        const rawProgress = clamp((viewportHeight * 0.88 - rect.top) / (viewportHeight * 0.72 + rect.height));
        const journeyProgress = smoothstep(rawProgress);
        root.style.setProperty("--journey-progress", journeyProgress.toFixed(4));
        root.style.setProperty("--journey-right", `${journeyProgress * 42}%`);
        root.style.setProperty("--journey-scale", `${1 + journeyProgress * 3.6}`);
      }

      if (gathr) {
        const rect = gathr.getBoundingClientRect();
        const rawProgress = clamp((viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.8));
        const gathrProgress = smoothstep(rawProgress);
        root.style.setProperty("--gathr-progress", gathrProgress.toFixed(4));
        root.style.setProperty("--gathr-scale", `${0.72 + gathrProgress * 0.28}`);
        root.style.setProperty("--gathr-shift", `${Math.round((1 - gathrProgress) * 112)}px`);
        root.style.setProperty("--gathr-inset-x", `${(1 - gathrProgress) * 39}%`);
        root.style.setProperty("--gathr-inset-y", `${(1 - gathrProgress) * 44}%`);
        root.style.setProperty("--gathr-radius", `${(1 - gathrProgress) * 160}px`);
        root.style.setProperty("--gathr-opacity", `${0.2 + gathrProgress * 0.8}`);
      }

    };

    const scheduleScrollState = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(writeScrollState);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      if (!finePointer.matches) {
        return;
      }

      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      root.style.setProperty("--pointer-shift-x", `${(x * 18).toFixed(2)}px`);
      root.style.setProperty("--pointer-shift-y", `${(y * 14).toFixed(2)}px`);
      root.style.setProperty("--pointer-glow-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-glow-y", `${event.clientY}px`);
    };

    const pressProject = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        return;
      }

      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-tilt]")
        : null;

      if (!target) {
        return;
      }

      target.setAttribute("data-pressed", "true");
      window.clearTimeout(pressTimer);
      pressTimer = window.setTimeout(() => target.removeAttribute("data-pressed"), 520);
    };

    const tiltCleanups = tiltItems.map((item) => {
      const move = (event: PointerEvent) => {
        if (!finePointer.matches) {
          return;
        }

        const bounds = item.getBoundingClientRect();
        const x = clamp((event.clientX - bounds.left) / Math.max(bounds.width, 1));
        const y = clamp((event.clientY - bounds.top) / Math.max(bounds.height, 1));
        item.style.setProperty("--tilt-x", `${((0.5 - y) * 2.4).toFixed(2)}deg`);
        item.style.setProperty("--tilt-y", `${((x - 0.5) * 3.2).toFixed(2)}deg`);
        item.style.setProperty("--media-glow-x", `${(x * 100).toFixed(1)}%`);
        item.style.setProperty("--media-glow-y", `${(y * 100).toFixed(1)}%`);
      };

      const leave = () => {
        item.style.setProperty("--tilt-x", "0deg");
        item.style.setProperty("--tilt-y", "0deg");
      };

      item.addEventListener("pointermove", move, { passive: true });
      item.addEventListener("pointerleave", leave, { passive: true });

      return () => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", leave);
      };
    });

    writeScrollState();
    window.addEventListener("scroll", scheduleScrollState, { passive: true });
    window.addEventListener("resize", scheduleScrollState, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    root.addEventListener("pointerdown", pressProject, { passive: true });

    return () => {
      window.cancelAnimationFrame(activateFrame);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(pressTimer);
      observer.disconnect();
      projectObserver.disconnect();
      tiltCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", scheduleScrollState);
      window.removeEventListener("resize", scheduleScrollState);
      window.removeEventListener("pointermove", updatePointer);
      root.removeEventListener("pointerdown", pressProject);
      root.removeAttribute("data-hero-active");
    };
  }, [rootRef]);
}

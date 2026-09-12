"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { contactLinks } from "../data/siteContent";
import { experiments } from "../data/experiments";
import { clamp, damp } from "../lib/daybreak";
import { exposureAt, exposurePose, exposureProgress, exposures, exposureStops, surfaceLongitude } from "../lib/sunrise";
import { createSunriseLandscape } from "./SunriseLandscape";
import { SolarSculpture } from "./SolarSculpture";
import styles from "./SunrisePortfolio.module.css";

type ArchiveProject = { slug: string; title: string; label: string };
const wave = [12, 23, 15, 39, 24, 61, 34, 78, 49, 92, 57, 72, 41, 87, 64, 100, 60, 83, 47, 72, 40, 56, 26, 45, 20, 31, 12];
const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotion = () => true;

function Arrow() { return <span aria-hidden="true">↗</span>; }

export function SunrisePortfolio({ archive }: { archive: ArchiveProject[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const progressRef = useRef(0);
  const jumpRef = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [reader, setReader] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, serverMotion);
  const still = quiet || reduced || reader;
  const [collection, setCollection] = useState<"work" | "about">("work");
  const jump = useCallback((index: number) => jumpRef.current(index), []);
  const saveReturn = () => {
    try { sessionStorage.setItem("daybreak-return", String(progressRef.current)); } catch { /* Storage is optional. */ }
  };
  const openCollection = useCallback((kind: "work" | "about") => {
    setCollection(kind);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current;
    if (!root || !canvas) return;
    const landscape = createSunriseLandscape(canvas);
    const frames = Array.from(root.querySelectorAll<HTMLElement>("[data-exposure]"));
    const stops = Array.from(root.querySelectorAll<HTMLElement>("[data-stop]"));
    let start = 0, distance = 1, small = false;
    let target = progressRef.current, current = target;
    let raf = 0, previous = 0, lastPaint = 0, elapsed = 0, lastIndex = -1;
    let lastChromeDay: boolean | undefined;
    let focused = document.hasFocus();
    const measure = () => {
      start = window.scrollY + root.getBoundingClientRect().top;
      distance = Math.max(1, root.offsetHeight - canvas.getBoundingClientRect().height);
      small = window.innerWidth < 700;
      landscape.resize();
      target = reader ? progressRef.current : clamp((window.scrollY - start) / distance);
      schedule();
    };
    const paint = (time: number) => {
      raf = 0;
      const dt = Math.min(.05, previous ? (time - previous) / 1000 : 1 / 60);
      previous = time;
      const settling = Math.abs(current - target) > .000025;
      current = still ? target : settling ? damp(current, target, dt, 13) : target;
      progressRef.current = current;
      const index = exposureAt(current);
      const light = reader ? .94 : still ? exposureStops[index] : current;
      if (time - lastPaint > 32 || still || settling) {
        if (!still && focused && !dialogRef.current?.open) elapsed += Math.min(.05, (time - lastPaint) / 1000);
        lastPaint = time;
        landscape.draw(light, elapsed, still);
        root.style.setProperty("--longitude", `${surfaceLongitude(current, small, still)}px`);
        root.style.setProperty("--day-progress", String(current));
        root.style.setProperty("--contour-drift", `${still ? 0 : current * -30}px`);
        root.style.setProperty("--contour-opacity", String(.025 + Math.sin(current * Math.PI) * .1));
        const chromeDay = reader || light >= .66;
        if (chromeDay !== lastChromeDay) {
          document.documentElement.style.setProperty("--dawn-ink", chromeDay ? "#122b3c" : "#f7f0e3");
          document.documentElement.style.setProperty("--dawn-muted", chromeDay ? "#314858" : "#d3dce2");
          lastChromeDay = chromeDay;
        }
        root.dataset.light = index >= 3 ? "day" : "night";
        frames.forEach((frame, i) => {
          const pose = exposurePose(current, i, small, still);
          frame.style.setProperty("--exposure-opacity", String(pose.opacity));
          frame.style.setProperty("--exposure-x", `${pose.x}px`);
          frame.style.setProperty("--exposure-yaw", `${pose.yaw}deg`);
          frame.style.setProperty("--exposure-z", `${pose.z}px`);
          stops[i]?.style.setProperty("--stop-progress", String(exposureProgress(current, i)));
        });
      }
      if (index !== lastIndex) {
        // Keyboard focus cannot disappear inside a newly inert exposure.
        const prior = frames[lastIndex];
        if (prior?.contains(document.activeElement)) root.querySelector<HTMLButtonElement>(`[data-stop="${index}"]`)?.focus({ preventScroll: true });
        frames.forEach((frame, i) => {
          frame.inert = !reader && i !== index;
          frame.setAttribute("aria-hidden", String(!reader && i !== index));
        });
        lastIndex = index;
        setActive(index);
      }
      root.dispatchEvent(new CustomEvent("daybreak:frame", { detail: { position: current * 5, daylight: current, still } }));
      if (!document.hidden && (settling || (!still && focused && !dialogRef.current?.open))) raf = requestAnimationFrame(paint);
    };
    function schedule() { if (!raf && !document.hidden) raf = requestAnimationFrame(paint); }
    const onScroll = () => { if (!reader) target = clamp((window.scrollY - start) / distance); schedule(); };
    const jumpTo = (index: number) => {
      if (reader) { frames[index]?.scrollIntoView({ behavior: "instant", block: "start" }); return; }
      target = exposureStops[clamp(index, 0, 5)];
      // Native position is immediate; one animation loop controls the gentle settling.
      window.scrollTo({ top: start + target * distance, behavior: "instant" });
      schedule();
    };
    jumpRef.current = jumpTo;
    const onVisibility = () => { previous = 0; if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else schedule(); };
    const onFocus = () => { focused = true; previous = 0; schedule(); };
    const onBlur = () => { focused = false; };
    const onNavigate = (event: Event) => {
      const destination = (event as CustomEvent<string>).detail;
      if (destination === "work") jumpTo(1);
      if (destination === "lab") jumpTo(4);
      if (destination === "about") openCollection("about");
      if (destination === "contact") jumpTo(5);
      if (destination === "home") jumpTo(0);
    };
    measure();
    try {
      const saved = sessionStorage.getItem("daybreak-return");
      if (saved !== null && !reader) {
        sessionStorage.removeItem("daybreak-return");
        target = current = clamp(Number(saved));
        window.scrollTo({ top: start + target * distance, behavior: "instant" });
      }
    } catch { /* Browser history remains available if storage is disabled. */ }
    const hashTargets: Record<string, number> = { "#work": 1, "#sunrise": 3, "#more-work": 4, "#contact": 5 };
    if (window.location.hash in hashTargets) jumpTo(hashTargets[window.location.hash]);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("daybreak:navigate", onNavigate);
    window.addEventListener("focus", onFocus); window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure);
      window.removeEventListener("daybreak:navigate", onNavigate);
      window.removeEventListener("focus", onFocus); window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility); dialog?.removeEventListener("close", schedule);
      document.documentElement.style.removeProperty("--dawn-ink"); document.documentElement.style.removeProperty("--dawn-muted");
    };
  }, [still, reader, openCollection]);

  return <div id="daybreak" ref={rootRef} className={styles.journey} data-motion={still ? "still" : "live"} data-reader={reader || undefined}>
    <div className={styles.stage}>
      <canvas ref={canvasRef} className={styles.landscape} aria-hidden="true" />
      <svg className={styles.contours} viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M 900 ${300 + i * 11} C 1190 ${300 + i * 9}, 1320 ${220 + i * 9}, 1570 ${170 + i * 10}`} stroke="currentColor" strokeWidth=".7" />)}
      </svg>
      <div className={styles.runningHead}><span>One sunrise / six exposures</span><span>Selected works · 2026</span></div>
      <div className={styles.surface}>
        <section className={`${styles.exposure} ${styles.intro}`} data-exposure="0" aria-labelledby="intro-title">
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Uday Mukhija / Software engineer</span>
            <h1 id="intro-title">A little curiosity.<br /><em>A lot of building.</em></h1>
            <p>I build thoughtful products<br />and the systems beneath them.</p>
            <button className={styles.textLink} onClick={() => jump(1)}>Take a closer look <span aria-hidden="true">→</span></button>
          </div>
          <span className={styles.marginNote}>A new day.<br />Another possibility.</span>
        </section>

        <section className={styles.exposure} data-exposure="1" aria-hidden="true" inert aria-labelledby="murmur-title">
          <div className={styles.copy}>
            <span className={styles.eyebrow}>01 / Murmur · Private voice</span>
            <h2 id="murmur-title">Some things<br />are better <em>heard.</em></h2>
            <p>A small, private place for the voices that matter. Invite-only rooms. Short voice notes. A little closer, from wherever.</p>
            <span className={styles.proof}>Go-backed web MVP · Room-scoped private media</span>
            <Link className={styles.textLink} href="/projects/murmur" onClick={saveReturn}>Explore Murmur <Arrow /></Link>
          </div>
          <figure className={`${styles.artifact} ${styles.voiceFigure}`}>
            <div className={styles.voiceCard}>
              <div className={styles.voiceTop}><strong>murmur</strong><span>YOUR INNER CIRCLE</span></div>
              <div className={styles.voiceMeta}><span className={styles.avatar}>M</span><span>A familiar voice<small>In your private room</small></span><span>00:12</span></div>
              <svg viewBox="0 0 330 100" className={styles.waveform} aria-hidden="true">{wave.map((n, i) => <line key={i} x1={i * 12 + 6} x2={i * 12 + 6} y1={50 - n * .4} y2={50 + n * .4} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />)}</svg>
              <blockquote>“Made chai.<br /><em>Miss you.</em>”</blockquote>
              <div className={styles.voiceFoot}><span>A moment, kept close.</span><span>HEARD ✓</span></div>
            </div>
            <figcaption>Interface study · illustrative voice note</figcaption>
          </figure>
        </section>

        <section className={styles.exposure} data-exposure="2" aria-hidden="true" inert aria-labelledby="vibe-title">
          <div className={styles.copy}>
            <span className={styles.eyebrow}>02 / VibeGrid · A daily social ritual</span>
            <h2 id="vibe-title">Same pieces.<br /><em>Different people.</em></h2>
            <p>Four fragments. One title. Your crew’s wildly different interpretations. Make today, judge tomorrow, come back for the reveal.</p>
            <span className={styles.proof}>Go / PostgreSQL · Hidden authors, fair votes, safe retries</span>
            <Link className={styles.textLink} href="/projects/vibegrid" onClick={saveReturn}>Explore VibeGrid <Arrow /></Link>
          </div>
          <figure className={`${styles.artifact} ${styles.vibeFigure}`}>
            <div className={styles.vibeCard}><Image src="/images/projects/vibegrid-social-card.png" width={1200} height={630} sizes="(max-width: 700px) 75vw, 35vw" alt="VibeGrid product artwork: four fragments for the daily crew ritual" /><div className={styles.ritual}><span>01 Make</span><span>02 Judge</span><span>03 Reveal</span></div></div>
            <figcaption>Real product artwork · VibeGrid</figcaption>
          </figure>
        </section>

        <section className={styles.exposure} data-exposure="3" aria-hidden="true" inert aria-labelledby="gathr-title">
          <div className={styles.copy}>
            <span className={styles.eyebrow}>03 / Gathr · Local social planning</span>
            <h2 id="gathr-title">Get out.<br />Find your <em>people.</em></h2>
            <p>Less “we should hang out.” More actually showing up. Small local plans, real group chat, and a path from finding something to being there.</p>
            <span className={styles.proof}>Private alpha · Java / Spring Boot / Expo</span>
            <Link className={styles.textLink} href="/projects/gathrly" onClick={saveReturn}>Meet Gathr <Arrow /></Link>
          </div>
          <figure className={`${styles.artifact} ${styles.gathrFigure}`}>
            <div className={styles.phone}><Image src="/images/projects/gathr-plans.png" width={1206} height={2622} sizes="(max-width: 700px) 33vw, 18vw" alt="Gathr Plans screen showing upcoming plans and planning tools" /></div>
            <figcaption>Real product capture · Gathr Plans</figcaption>
          </figure>
        </section>

        <section className={`${styles.exposure} ${styles.lab}`} data-exposure="4" aria-hidden="true" inert aria-labelledby="lab-title">
          <div className={styles.copy}>
            <span className={styles.eyebrow}>The open notebook / Experiments & other work</span>
            <h2 id="lab-title">Always<br /><em>making.</em></h2>
            <p>Products, pipelines, small experiments. Different questions. The same curiosity.</p>
            <div className={styles.studyLinks}>{experiments.map((experiment, i) => <Link key={experiment.slug} href={experiment.route} onClick={saveReturn}><span>0{i + 1}</span>{experiment.title}<Arrow /></Link>)}</div>
            <button className={styles.textLink} onClick={() => openCollection("work")}>Browse all {archive.length} projects <span aria-hidden="true">+</span></button>
          </div>
          <div className={`${styles.artifact} ${styles.sculptureWrap}`}>
            {(active === 4 || reader) ? <SolarSculpture compact /> : <span className={styles.sculpturePlaceholder} aria-hidden="true">◎</span>}
          </div>
        </section>

        <section className={`${styles.exposure} ${styles.contact}`} data-exposure="5" aria-hidden="true" inert aria-labelledby="contact-title">
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Uday Mukhija / Based in India</span>
            <h2 id="contact-title">Let’s make<br />something <em>good.</em></h2>
            <p>I like useful ideas, thoughtful interfaces, and understanding what happens beneath the surface.</p>
            <a className={styles.email} href="mailto:udaymukhija3@gmail.com">udaymukhija3@gmail.com <Arrow /></a>
            <div className={styles.contactLinks}>{contactLinks.filter(link => link.label !== "Email").map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <Arrow /></a>)}</div>
            <button className={styles.textLink} onClick={() => openCollection("about")}>A little about me <span aria-hidden="true">+</span></button>
          </div>
          <span className={styles.marginNote}>The day<br />is yours.</span>
        </section>
      </div>
      <footer className={styles.instrument}>
        <div className={styles.instrumentTop}><span><b>{String(active + 1).padStart(2, "0")}</b> / {exposures[active]}</span><span className={styles.scrollHint}>{active === 5 ? "A new day. Another possibility." : "Scroll to advance the light"}</span><div className={styles.utilities}><button onClick={() => { setReader(!reader); window.scrollTo({ top: 0, behavior: "instant" }); }} aria-pressed={reader}>{reader ? "Sunrise view" : "Reading view"}</button><button disabled={reduced} aria-pressed={still} onClick={() => setQuiet(!quiet)}>{reduced ? "Reduced motion" : quiet ? "Motion off" : "Motion on"}</button></div></div>
        <nav className={styles.timeline} aria-label="Sunrise chapters">{exposures.map((name, i) => <button key={name} data-stop={i} aria-label={`${i + 1}. ${name}`} aria-current={active === i ? "step" : undefined} onClick={() => jump(i)}><span className={styles.tick} /><span className={styles.stopNumber}>0{i + 1}</span><span className={styles.stopName}>{name}</span></button>)}</nav>
      </footer>
    </div>
    <dialog ref={dialogRef} aria-label={collection === "work" ? "The collected work" : "About Uday"} className={styles.collection} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className={styles.collectionInner}><div className={styles.collectionTop}><span>DAYBREAK / {collection === "work" ? "The collected work" : "Field notes"}</span><button onClick={() => dialogRef.current?.close()} aria-label="Close and return to the sunrise">Close <span aria-hidden="true">×</span></button></div>
        {collection === "work" ? <><h2>Things I’ve <em>built.</em></h2><div className={styles.archive}>{archive.map((project, i) => <Link key={project.slug} href={`/projects/${project.slug}`} onClick={saveReturn}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{project.title}</h3><p>{project.label}</p></div><Arrow /></Link>)}</div></> : <><h2>A little<br /><em>about me.</em></h2><div className={styles.aboutCopy}><p>I’m Uday, a software engineer based in India. I build across product, backend, data, and applied AI—with a particular interest in the systems that make an interface dependable.</p><p>My work ranges from private voice rooms and local social planning to data pipelines and human-approved AI workflows. I care about clear boundaries, useful feedback, and what happens when things don’t go to plan.</p><dl><div><dt>Education</dt><dd>M.S., Electrical Engineering<br />Columbia University · 2022</dd></div><div><dt>Previously</dt><dd>Software Development Engineer<br />MyNotedApp · 2025</dd></div></dl><Link className={styles.textLink} href="/about" onClick={saveReturn}>Experience & background <Arrow /></Link></div></>}
      </div>
    </dialog>
    <noscript><div className={styles.noScript}><p>Explore the complete portfolio:</p><Link href="/projects">All projects</Link><Link href="/lab">Experiments</Link><Link href="/about">About Uday</Link><a href="mailto:udaymukhija3@gmail.com">Contact</a></div></noscript>
  </div>;
}

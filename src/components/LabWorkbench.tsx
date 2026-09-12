"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

const ConstraintField = dynamic(
  () => import("./ConstraintField").then((module) => module.ConstraintField),
  { ssr: false },
);

type RouteState = "nominal" | "retry" | "recovery";
type Tempo = "response" | "state" | "spatial";

const routeCopy: Record<RouteState, { title: string; detail: string }> = {
  nominal: {
    title: "Accepted",
    detail: "The request passes policy, commits once, and resolves at the output boundary.",
  },
  retry: {
    title: "Duplicate absorbed",
    detail: "The same identity returns through the retry path; the commit boundary does not repeat its effect.",
  },
  recovery: {
    title: "Recovered",
    detail: "A failed delivery rejoins after the durable boundary and finishes without replaying the write.",
  },
};

const tempoOptions: Array<{ id: Tempo; label: string; duration: string; note: string }> = [
  { id: "response", label: "Response", duration: "180ms", note: "Press and hover feedback" },
  { id: "state", label: "State", duration: "480ms", note: "Selection and disclosure" },
  { id: "spatial", label: "Spatial", duration: "920ms", note: "Continuity across distance" },
];

export function SignalRoutingStudy() {
  const titleId = useId();
  const descriptionId = useId();
  const [routeState, setRouteState] = useState<RouteState>("nominal");

  return (
    <div className="routing-study" data-route-state={routeState}>
      <div className="lab-control-row" aria-label="Signal route state">
        {(Object.keys(routeCopy) as RouteState[]).map((state) => (
          <button
            key={state}
            type="button"
            aria-pressed={routeState === state}
            onClick={() => setRouteState(state)}
          >
            {state}
          </button>
        ))}
      </div>

      <svg
        className="routing-map"
        viewBox="0 0 760 360"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>Request state routing diagram</title>
        <desc id={descriptionId}>
          Four labeled stages show an input moving through policy and commit boundaries to an output, with alternate retry and recovery paths.
        </desc>
        <path className="route-line route-line-base" d="M76 178H242C280 178 286 112 326 112H452C494 112 500 178 542 178H686" />
        <path className="route-line route-line-retry" d="M448 112C520 24 294 8 246 102C218 158 258 210 326 208" />
        <path className="route-line route-line-recovery" d="M542 178C502 178 494 268 448 268H326C286 268 278 214 242 214" />
        <path className="route-active route-active-nominal" pathLength="1" d="M76 178H242C280 178 286 112 326 112H452C494 112 500 178 542 178H686" />
        <path className="route-active route-active-retry" pathLength="1" d="M76 178H242C280 178 286 112 326 112H448C520 24 294 8 246 102C218 158 258 210 326 208C388 206 448 180 448 112C488 112 500 178 542 178H686" />
        <path className="route-active route-active-recovery" pathLength="1" d="M76 178H242C280 178 286 112 326 112H452C494 112 500 178 542 178C502 178 494 268 448 268H326C286 268 278 214 242 214C282 214 292 178 326 178H686" />

        {[
          { x: 22, y: 140, width: 108, label: "input", detail: "identity" },
          { x: 192, y: 140, width: 108, label: "policy", detail: "authorize" },
          { x: 394, y: 74, width: 108, label: "commit", detail: "write once" },
          { x: 632, y: 140, width: 108, label: "output", detail: "resolve" },
        ].map((block) => (
          <g key={block.label} className={`route-block route-block-${block.label}`}>
            <rect x={block.x} y={block.y} width={block.width} height="76" rx="3" />
            <text x={block.x + 14} y={block.y + 29}>{block.label}</text>
            <text className="route-block-detail" x={block.x + 14} y={block.y + 51}>{block.detail}</text>
          </g>
        ))}
        <circle className="route-packet" r="6" />
      </svg>

      <div className="routing-result" aria-live="polite">
        <span>Current output</span>
        <strong>{routeCopy[routeState].title}</strong>
        <p>{routeCopy[routeState].detail}</p>
      </div>
    </div>
  );
}

export function SpatialFieldStudy() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "360px 0px", threshold: 0.01 });

    observer.observe(loader);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={loaderRef} className="spatial-field-loader">
      {shouldLoad ? (
        <ConstraintField />
      ) : (
        <div className="spatial-field-poster" aria-label="Three-dimensional surface study loading when near the viewport">
          <span>Spatial study</span>
          <strong>Depth is loaded only when it has a job.</strong>
        </div>
      )}
    </div>
  );
}

export function TransitionTempoStudy() {
  const [tempo, setTempo] = useState<Tempo>("state");
  const [run, setRun] = useState(0);
  const activeOption = tempoOptions.find((option) => option.id === tempo) ?? tempoOptions[1];

  return (
    <div className="tempo-study" data-tempo={tempo}>
      <div className="tempo-options" aria-label="Motion role">
        {tempoOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={tempo === option.id}
            onClick={() => {
              setTempo(option.id);
              setRun((value) => value + 1);
            }}
          >
            <span>{option.label}</span>
            <small>{option.duration}</small>
          </button>
        ))}
      </div>

      <button
        className="tempo-stage"
        type="button"
        onClick={() => setRun((value) => value + 1)}
        aria-label={`Replay ${activeOption.label.toLowerCase()} transition`}
      >
        <span key={`${tempo}-${run}`} className="tempo-object"><i /></span>
        <span className="tempo-track" aria-hidden="true" />
        <span className="tempo-replay">Replay</span>
      </button>

      <div className="tempo-readout" aria-live="polite">
        <strong>{activeOption.duration}</strong>
        <span>{activeOption.note}</span>
      </div>
    </div>
  );
}

export function ReadingMeasureStudy() {
  const [measure, setMeasure] = useState(52);
  const measureId = useId();

  return (
    <div className="measure-study" style={{ "--reading-measure": `${measure}ch` } as CSSProperties}>
      <div className="measure-control">
        <label htmlFor={measureId}>Text measure</label>
        <output htmlFor={measureId}>{measure}ch</output>
        <input
          id={measureId}
          type="range"
          min="34"
          max="68"
          step="1"
          value={measure}
          onChange={(event) => setMeasure(Number(event.target.value))}
        />
        <span aria-hidden="true">Narrow</span>
        <span aria-hidden="true">Wide</span>
      </div>

      <article className="measure-copy">
        <p className="measure-kicker">A note on systems</p>
        <h3>Simple interfaces move complexity; they do not erase it.</h3>
        <p>
          A dependable product gives difficult behavior a clear owner. Permissions belong at the resource boundary. Retries need stable identity. Failure needs a visible next step. The interface can stay quiet because the underlying contract is explicit.
        </p>
      </article>
    </div>
  );
}

export function LabWorkbench() {
  return (
    <>
      <section id="signal-routing" className="lab-study lab-study-routing" aria-labelledby="signal-routing-title">
        <div className="container lab-study-grid">
          <header>
            <p className="eyebrow">01 / SVG + interaction</p>
            <h2 id="signal-routing-title">Signal routing</h2>
            <p>An authored map of one request moving through nominal, retry, and recovery paths.</p>
          </header>
          <SignalRoutingStudy />
        </div>
      </section>

      <section id="transition-tempo" className="lab-study lab-study-tempo" aria-labelledby="transition-tempo-title">
        <div className="container lab-study-grid">
          <header>
            <p className="eyebrow">02 / Motion</p>
            <h2 id="transition-tempo-title">Transition tempo</h2>
            <p>Three durations for three jobs. Choose a role, then replay its spatial change.</p>
          </header>
          <TransitionTempoStudy />
        </div>
      </section>

      <section id="reading-measure" className="lab-study lab-study-measure" aria-labelledby="reading-measure-title">
        <div className="container lab-study-grid">
          <header>
            <p className="eyebrow">03 / Typography</p>
            <h2 id="reading-measure-title">Reading measure</h2>
            <p>Change the line length and watch the paragraph move between density and drift.</p>
          </header>
          <ReadingMeasureStudy />
        </div>
      </section>

      <section id="constraint-field" className="lab-study lab-study-field" aria-labelledby="constraint-field-title">
        <div className="container lab-study-grid">
          <header>
            <p className="eyebrow">04 / Three.js</p>
            <h2 id="constraint-field-title">Constraint field</h2>
            <p>A spatial surface for feeling how one input changes a whole system—not a decorative object floating above the work.</p>
          </header>
          <SpatialFieldStudy />
        </div>
      </section>
    </>
  );
}

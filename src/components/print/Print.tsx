import type { CSSProperties } from "react";
import { FjordSymbol } from "./Fjord";
import { backMass, boatPath, cloudStrokes, facets, frontMass, gullies, inks, midMass, nearMass, ripples, rockRibs, rockStrokes, sheet, shoulderStrokes, snowCaps, sun, wakeArcs } from "./scene";

const block = (n: number) => ({ "--block": n } as CSSProperties);

export type Sheet = "lake" | "fjord";

/**
 * Each print is defined once per page as a symbol, then any number of crops look through it.
 * Every block carries its printing order so the page can pull the impression one colour at a time.
 */
export function PrintDefs() {
  return <svg className="print-defs" aria-hidden="true" focusable="false">
    <defs>
      <FjordSymbol />
      <linearGradient id="print-sky" x2="0" y2="1">
        <stop stopColor={inks.skyHigh} /><stop offset=".3" stopColor={inks.sky} /><stop offset=".78" stopColor={inks.skyLow} /><stop offset="1" stopColor={inks.skyLow} />
      </linearGradient>
      <linearGradient id="print-warmth" x2="0" y2="1">
        <stop stopColor={inks.kinari} stopOpacity="0" /><stop offset=".45" stopColor={inks.kinari} stopOpacity=".26" /><stop offset="1" stopColor={inks.kinari} stopOpacity="0" />
      </linearGradient>
      {/* The water is the sky lying down: indigo at the horizon, paling toward the viewer. */}
      <linearGradient id="print-water" x2="0" y2="1">
        <stop stopColor={inks.aiShade} /><stop offset=".18" stopColor={inks.water} /><stop offset=".62" stopColor={inks.aiPale} /><stop offset="1" stopColor={inks.waterPale} />
      </linearGradient>
      {/* Carved edges: the block was cut by hand, so nothing is perfectly straight. */}
      <filter id="print-carve" x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".014" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* Frayed strokes: a finer wobble for anything drawn with a brush. */}
      <filter id="print-fray" x="-3%" y="-6%" width="106%" height="112%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="9" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* Water: the reflection is pushed sideways only, in long horizontal bands. */}
      <filter id="print-ripple" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".003 .06" numOctaves="2" seed="5" result="n" />
        <feColorMatrix in="n" type="matrix" values="1 0 0 0 0  0 0 0 0 .5  0 0 1 0 0  0 0 0 0 1" result="x" />
        <feDisplacementMap in="SourceGraphic" in2="x" scale="22" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <clipPath id="print-below"><rect y={sheet.horizon} width={sheet.width} height={sheet.height - sheet.horizon} /></clipPath>

      <symbol id="print-lake" viewBox={`0 0 ${sheet.width} ${sheet.height}`} overflow="visible">
        {/* 1 · sky */}
        <g className="print-block" style={block(0)}>
          <rect width={sheet.width} height={sheet.horizon + 2} fill="url(#print-sky)" />
          <rect y="150" width={sheet.width} height="330" fill="url(#print-warmth)" />
        </g>
        {/* 2 · cloud bands, in cream */}
        <g id="print-clouds" className="print-block" style={block(1)} filter="url(#print-fray)" fill="none" stroke={inks.kinari} strokeLinecap="round">
          {cloudStrokes.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
        {/* 3 · far ridge, 4 · front ridge with its shadow faces and snow, 5 · the mid mass and the dark shoulder */}
        <g id="print-far" className="print-block" style={block(2)} filter="url(#print-carve)">
          <path d={backMass} fill={inks.aiPale} />
        </g>
        <g id="print-front" className="print-block" style={block(3)} filter="url(#print-carve)">
          <path d={frontMass} fill={inks.ai} />
          <g fill={inks.snow} opacity=".92">{snowCaps.map(d => <path key={d} d={d} />)}</g>
          <g fill="none" stroke={inks.aiDeep} strokeLinecap="round">
            {rockRibs.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
          </g>
          <g fill={inks.aiShade} opacity=".38">{facets.map(d => <path key={d} d={d} />)}</g>
          <g fill="none" stroke={inks.aiShade} strokeLinecap="round">
            {rockStrokes.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
          </g>
          <g fill="none" stroke={inks.snow} strokeLinecap="round">
            {gullies.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
          </g>
        </g>
        <g id="print-near" className="print-block" style={block(4)} filter="url(#print-carve)">
          <path d={midMass} fill={inks.aiDeep} />
          <path d={nearMass} fill={inks.sumi} />
          <g fill="none" stroke={inks.aiPale} strokeLinecap="round">
            {shoulderStrokes.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
          </g>
          <path d={nearMass} fill="none" stroke={inks.aiPale} strokeWidth="2.5" opacity=".3" />
        </g>
        {/* 6 · water */}
        <g className="print-block" style={block(5)}>
          <rect y={sheet.horizon} width={sheet.width} height={sheet.height - sheet.horizon} fill="url(#print-water)" />
        </g>
        {/* 7 · the reflection: the same blocks upside down, pushed about by the water; the dark shoulder holds, the rest softens */}
        <g className="print-block" style={block(6)} clipPath="url(#print-below)">
          <g transform={`matrix(1 0 0 -1 0 ${sheet.horizon * 2})`} filter="url(#print-ripple)">
            <use href="#print-clouds" opacity=".45" />
            <use href="#print-far" opacity=".38" />
            <use href="#print-front" opacity=".44" />
            <use href="#print-near" opacity=".82" />
          </g>
        </g>
        {/* 8 · the lit shore, ripples, the wake, the boat */}
        <g className="print-block" style={block(7)}>
          <g fill="none" stroke={inks.kinari} strokeLinecap="round" filter="url(#print-fray)">
            <path d={`M0 ${sheet.horizon} h560`} strokeWidth="2.2" opacity=".85" />
            <path d={`M590 ${sheet.horizon} h330`} strokeWidth="1.8" opacity=".7" />
            {ripples.map((r, i) => <path key={i} d={`M${r.x} ${r.y} h${r.length}`} strokeWidth={r.width} opacity={r.opacity} />)}
          </g>
          <g fill="none" stroke={inks.kinari} strokeLinecap="round" filter="url(#print-fray)">
            {wakeArcs.map((a, i) => <path key={i} d={a.d} strokeWidth={a.width} strokeDasharray={a.dash} opacity={a.opacity} />)}
          </g>
          <path d={boatPath} fill={inks.sumi} />
        </g>
        {/* 9 · the sun, last, in crimson */}
        <g className="print-block" style={block(8)} filter="url(#print-carve)">
          <circle cx={sun.x} cy={sun.y} r={sun.r} fill={inks.beni} />
        </g>
      </symbol>
    </defs>
  </svg>;
}

type CropProps = {
  /** Which print to look through. */
  sheet?: Sheet;
  /** The window onto the sheet, in sheet units. Defaults to the whole print. */
  viewBox?: string;
  /** slice fills the box and crops; meet shows the whole window. */
  fit?: "slice" | "meet";
  align?: "xMinYMin" | "xMidYMin" | "xMaxYMin" | "xMinYMid" | "xMidYMid" | "xMaxYMid" | "xMinYMax" | "xMidYMax" | "xMaxYMax";
  className?: string;
  /** Paper weave and pigment grain over the impression. On by default. */
  material?: boolean;
};

/** One window onto the print. Needs a PrintDefs somewhere on the page. */
export function Print({ sheet: which = "lake", viewBox = `0 0 ${sheet.width} ${sheet.height}`, fit = "slice", align = "xMidYMid", className = "", material = true }: CropProps) {
  return <div className={`print-window ${className}`} aria-hidden="true">
    <svg className="print-crop" viewBox={viewBox} preserveAspectRatio={`${align} ${fit}`} focusable="false">
      <use href={`#print-${which}`} width={sheet.width} height={sheet.height} />
    </svg>
    {material && <><span className="print-weave" /><span className="print-grain" /></>}
  </div>;
}

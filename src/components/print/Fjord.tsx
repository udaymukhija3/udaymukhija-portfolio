import type { CSSProperties } from "react";
import { sheet } from "./scene";
import { bankMass, barn, barnPlanks, birchStrokes, buoys, clearings, fieldBands, fieldMass, contourStrokes, fjordHorizon, fjordInks as ink, footGullies, grassStrokes, houses, peakGullies, peakMass, peakRibs, peakRock, peakShade, pier, pierMass, pierStones, ridgeFringe, ridgeMass, rockFoot, sheds, shoreRocks, spruce, tractor, treeClumps, van, waterStrokes, weedStrokes } from "./fjordScene";

const block = (n: number) => ({ "--block": n } as CSSProperties);
const rect = ([x, y, w, h]: number[]) => ({ x, y, width: w, height: h });
const box = (b: { x: number; y: number; w: number; h: number }) => ({ x: b.x, y: b.y, width: b.w, height: b.h });

/** The fjord sheet as a symbol, with the same carved edges, frayed strokes, and rippled water as the lake. */
export function FjordSymbol() {
  return <>
    <linearGradient id="fjord-sky" x2="0" y2="1">
      <stop stopColor="#33609F" /><stop offset=".1" stopColor={ink.skyHigh} /><stop offset=".38" stopColor="#7DA1CD" /><stop offset=".72" stopColor={ink.skyMid} /><stop offset="1" stopColor={ink.skyLow} />
    </linearGradient>
    <linearGradient id="fjord-ridge" gradientUnits="userSpaceOnUse" x1="0" y1="360" x2="0" y2="608">
      <stop stopColor={ink.ridgeTop} /><stop offset=".5" stopColor={ink.ridge} /><stop offset="1" stopColor={ink.ridgeFoot} />
    </linearGradient>
    <linearGradient id="fjord-water" x2="0" y2="1">
      <stop stopColor="#5C88BC" /><stop offset=".12" stopColor="#3E699F" /><stop offset=".45" stopColor={ink.water} /><stop offset="1" stopColor={ink.waterDeep} />
    </linearGradient>
    <linearGradient id="fjord-grass" gradientUnits="userSpaceOnUse" x1="0" y1="888" x2="0" y2="1000">
      <stop stopColor={ink.grassTop} /><stop offset=".45" stopColor={ink.grass} /><stop offset="1" stopColor={ink.grassFoot} />
    </linearGradient>
    <linearGradient id="fjord-field" gradientUnits="userSpaceOnUse" x1="0" y1="536" x2="0" y2="608">
      <stop stopColor={ink.fieldLight} /><stop offset=".5" stopColor={ink.field} /><stop offset="1" stopColor={ink.fieldDark} />
    </linearGradient>
    <clipPath id="fjord-below"><rect y={fjordHorizon} width={sheet.width} height={sheet.height - fjordHorizon} /></clipPath>
    <clipPath id="fjord-below-pier"><rect y={pier.bottom} width={sheet.width} height={sheet.height - pier.bottom} /></clipPath>

    <symbol id="print-fjord" viewBox={`0 0 ${sheet.width} ${sheet.height}`} overflow="visible">
      {/* 1 · sky: a deep band at the top, paling to the peaks */}
      <g className="print-block" style={block(0)}>
        <rect width={sheet.width} height={fjordHorizon + 2} fill="url(#fjord-sky)" />
      </g>
      {/* 2 · snow peaks: the mass is snow; shadow lies on the right faces, rock on the steep left flanks, ribs everywhere */}
      <g id="fjord-peaks" className="print-block" style={block(1)} filter="url(#print-carve)">
        <path d={peakMass} fill={ink.snow} />
        <g fill={ink.snowShade} opacity=".9">{peakShade.map(d => <path key={d} d={d} />)}</g>
        <g fill={ink.rock} opacity=".86">{peakRock.map(d => <path key={d} d={d} />)}</g>
        <path d={rockFoot} fill={ink.rock} opacity=".72" />
        <g fill="none" stroke={ink.snow} strokeLinecap="round">
          {footGullies.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
        <g fill="none" stroke={ink.snow} strokeLinecap="round">
          {peakGullies.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
        <g fill="none" stroke={ink.rock} strokeLinecap="round">
          {peakRibs.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
      </g>
      {/* 3 · the ridge: bare birch and spruce, with a fringe of tree tips along the sky */}
      <g id="fjord-ridge" className="print-block" style={block(2)}>
        <g filter="url(#print-carve)">
          <path d={ridgeMass} fill="url(#fjord-ridge)" />
          <g fill={ink.ridgeDark} opacity=".42">{spruce.map(d => <path key={d} d={d} />)}</g>
          <g fill={ink.ridgeClearing} opacity=".75">{clearings.map(d => <path key={d} d={d} />)}</g>
        </g>
        <g fill="none" stroke={ink.ridgeDark} strokeLinecap="round" opacity=".85">
          {ridgeFringe.map((t, i) => <path key={i} d={`M${t.x} ${t.y} v${-t.h}`} strokeWidth={t.w} />)}
        </g>
        <g fill="none" stroke={ink.ridgeBirch} strokeLinecap="round">
          {birchStrokes.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
        <g fill="none" stroke={ink.ridgeDark} strokeLinecap="round" filter="url(#print-fray)">
          {contourStrokes.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
      </g>
      {/* 4 · fields, trees, and the houses along the shore */}
      <g id="fjord-fields" className="print-block" style={block(3)}>
        <path d={fieldMass} fill="url(#fjord-field)" filter="url(#print-carve)" />
        <g fill="none" strokeLinecap="round" filter="url(#print-fray)">
          {fieldBands.map((s, i) => <path key={i} d={s.d} stroke={s.light ? ink.fieldLight : ink.fieldDark} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
        {treeClumps.map((t, i) => <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.birch ? ink.birch : ink.tree} />)}
        {houses.filter(h => !h.red).map((h, i) => <g key={i}>
          <rect x={h.x} y={h.y} width={h.w} height={h.h} fill={ink.house} />
          <path d={`M${h.x - 2} ${h.y} L${h.x + h.w / 2} ${h.y - h.h * 0.4} L${h.x + h.w + 2} ${h.y} Z`} fill={ink.roof} />
        </g>)}
      </g>
      {/* 5 · water */}
      <g className="print-block" style={block(4)}>
        <rect y={fjordHorizon} width={sheet.width} height={sheet.height - fjordHorizon} fill="url(#fjord-water)" />
      </g>
      {/* 6 · the far shore lying on the water */}
      <g className="print-block" style={block(5)} clipPath="url(#fjord-below)">
        <g transform={`matrix(1 0 0 -1 0 ${fjordHorizon * 2})`} filter="url(#print-ripple)">
          <use href="#fjord-peaks" opacity=".24" />
          <use href="#fjord-ridge" opacity=".26" />
          <use href="#fjord-fields" opacity=".2" />
        </g>
      </g>
      {/* 7 · the point, the pier, the van, and the near bank */}
      <g className="print-block" style={block(6)}>
        <g id="fjord-pier" filter="url(#print-carve)">
          <path d={pierMass} fill={ink.stone} />
          {shoreRocks.map((k, i) => <ellipse key={i} cx={k.x} cy={k.y} rx={k.rx} ry={k.ry} fill={ink.stoneDark} />)}
          {pierStones.map((s, i) => <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx="2" fill={s.light ? ink.stoneLight : ink.stoneDark} opacity=".7" />)}
        </g>
        <rect x={tractor.x} y={tractor.y} width={tractor.w} height={tractor.h} rx="3" fill={ink.rock} opacity=".9" />
        <circle cx={tractor.x + 8} cy={tractor.y + tractor.h} r="6" fill={ink.rock} />
        <circle cx={tractor.x + 26} cy={tractor.y + tractor.h} r="7" fill={ink.rock} />
        <rect x={van.x} y={van.y} width={van.w} height={van.h} rx="3" fill={ink.van} />
        <rect x={van.x + 4} y={van.y + 5} width={van.w - 8} height="9" fill={ink.rock} opacity=".5" />
        <circle cx={van.x + 12} cy={van.y + van.h} r="4" fill={ink.rock} />
        <circle cx={van.x + van.w - 12} cy={van.y + van.h} r="4" fill={ink.rock} />
        {/* The near bank can be left off a window (a layout may want open water): custom properties reach into a <use>, selectors do not. */}
        <g style={{ opacity: "var(--fjord-bank, 1)" } as CSSProperties}>
          <path d={bankMass} fill="url(#fjord-grass)" filter="url(#print-carve)" />
          <g fill="none" strokeLinecap="round" filter="url(#print-fray)">
            {weedStrokes.map((s, i) => <path key={i} d={s.d} stroke={ink.weed} strokeWidth={s.width} opacity={s.opacity} />)}
            {grassStrokes.map((s, i) => <path key={i} d={s.d} stroke={s.light ? ink.grassLight : ink.grassDark} strokeWidth={s.width} opacity={s.opacity} />)}
          </g>
        </g>
      </g>
      {/* 8 · the far shore's edge, light on the water, the pier on the water */}
      <g className="print-block" style={block(7)}>
        <g clipPath="url(#fjord-below-pier)">
          <g transform={`matrix(1 0 0 -1 0 ${pier.bottom * 2})`} filter="url(#print-ripple)" opacity=".3"><use href="#fjord-pier" /></g>
        </g>
        <g fill="none" stroke={ink.waterLight} strokeLinecap="round" filter="url(#print-fray)">
          <path d={`M0 ${fjordHorizon + 1} H1600`} strokeWidth="2.4" opacity=".75" />
          {waterStrokes.map((s, i) => <path key={i} d={s.d} strokeWidth={s.width} opacity={s.opacity} />)}
        </g>
      </g>
      {/* 9 · the red block, last: the barn and its planks, the sheds, the red houses, two buoys, and the barn on the water */}
      <g className="print-block" style={block(8)}>
        <g id="fjord-barn">
          <g filter="url(#print-carve)">
            <rect {...box(barn.wing)} fill={ink.bengara} />
            <path d={barn.wingGable} fill={ink.bengara} />
            <rect {...box(barn.main)} fill={ink.bengara} />
            <path d={barn.gable} fill={ink.bengara} />
            <rect {...box(barn.leanTo)} fill={ink.bengara} />
            <path d={barn.wingRoof} fill={ink.roof} />
            <path d={barn.roof} fill={ink.roof} />
            <path d={barn.leanRoof} fill={ink.roof} />
          </g>
          <g stroke={ink.bengaraDark} strokeWidth="1" opacity=".45">
            {barnPlanks.map(p => <path key={p.x} d={`M${p.x} ${p.y0} V${p.y1}`} />)}
          </g>
          <g fill={ink.rock}>
            {barn.windows.map((w, i) => <rect key={i} {...rect(w)} />)}
            <rect {...rect(barn.door)} />
          </g>
          {sheds.map((s, i) => <g key={i} filter="url(#print-carve)">
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={ink.bengara} />
            <path d={`M${s.x - 2} ${s.y} L${s.x + s.w / 2} ${s.y - 12} L${s.x + s.w + 2} ${s.y} Z`} fill={ink.roof} />
          </g>)}
        </g>
        {houses.filter(h => h.red).map((h, i) => <g key={i}>
          <rect x={h.x} y={h.y} width={h.w} height={h.h} fill={ink.bengara} />
          <path d={`M${h.x - 2} ${h.y} L${h.x + h.w / 2} ${h.y - h.h * 0.4} L${h.x + h.w + 2} ${h.y} Z`} fill={ink.roof} />
        </g>)}
        {buoys.map(([x, y]) => <g key={x}><circle cx={x} cy={y} r="4.5" fill={ink.bengara} /><circle cx={x} cy={y - 1} r="1.6" fill={ink.snow} /></g>)}
        <g clipPath="url(#fjord-below-pier)">
          <g transform={`matrix(1 0 0 -1 0 ${pier.bottom * 2})`} filter="url(#print-ripple)" opacity=".26">
            <use href="#fjord-barn" />
          </g>
        </g>
      </g>
    </symbol>
  </>;
}

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const compiled = ts.transpileModule(await read("src/lib/oceanLight.ts"), {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 },
}).outputText;
const { approach, flingOffset, lightLayers, lightName, lightRates, morningKey, scrubAt, scrubKey, sunriseAt, sunriseDuration } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("the opening sunrise takes about eight seconds, starts quiet, and settles into gold", () => {
  assert.equal(sunriseDuration, 8000);
  assert.equal(sunriseAt(0), 0);
  assert.equal(sunriseAt(-500), 0);
  assert.equal(sunriseAt(sunriseDuration), 1);
  assert.equal(sunriseAt(sunriseDuration * 3), 1);
  assert.ok(sunriseAt(1000) < .05, "first light is barely visible after one second");
  assert.ok(Math.abs(sunriseAt(4000) - .5) < 1e-9, "halfway through the morning the light is halfway to gold");
  assert.ok(sunriseAt(7000) > .95, "the last second only settles");
  let previous = 0;
  for (let elapsed = 0; elapsed <= sunriseDuration; elapsed += 10) {
    const light = sunriseAt(elapsed);
    assert.ok(light >= previous && light <= 1);
    assert.ok(light - previous < .003, "no visible step between frames");
    previous = light;
  }
});

test("one light value unfolds in dawn order: cloud, then sky, then sun, then water", () => {
  assert.deepEqual(lightLayers(0), { cloud: 0, sky: 0, sun: 0, water: 0 });
  assert.deepEqual(lightLayers(1), { cloud: 1, sky: 1, sun: 1, water: 1 });
  let previous = lightLayers(0);
  for (let step = 1; step <= 1000; step++) {
    const layers = lightLayers(step / 1000);
    assert.ok(layers.cloud >= layers.sky && layers.sky >= layers.sun && layers.sun >= layers.water);
    for (const key of Object.keys(layers)) assert.ok(layers[key] >= previous[key] && layers[key] <= 1);
    previous = layers;
  }
  const half = lightLayers(.5);
  assert.ok(half.cloud > .85 && half.sky > .7 && half.water < .35, "at half light the sky is warm while the water is still mostly silver");
  assert.deepEqual(lightLayers(-1), lightLayers(0));
  assert.deepEqual(lightLayers(2), lightLayers(1));
});

test("the slider names the light and a flick carries it a little past the finger", () => {
  assert.equal(lightName(0), "silver dawn");
  assert.equal(lightName(.19), "silver dawn");
  assert.equal(lightName(.2), "first light");
  assert.equal(lightName(.5), "warming");
  assert.equal(lightName(.85), "golden");
  assert.equal(lightName(1), "golden");
  assert.equal(morningKey, "morning-light");
  assert.ok(flingOffset(1, 672) > .1 && flingOffset(1, 672) < .2, "a one pixel-per-millisecond flick moves the light by a noticeable but bounded amount");
  assert.ok(flingOffset(-1, 672) < 0);
  assert.equal(flingOffset(1, 0), 0);
});

test("horizontal position scrubs from silver at the left to gold at the right", () => {
  assert.equal(scrubAt(0, 672), 0);
  assert.equal(scrubAt(30, 672), 0, "a small margin makes silver reachable without leaving the strip");
  assert.equal(scrubAt(672, 672), 1);
  assert.equal(scrubAt(650, 672), 1);
  assert.ok(Math.abs(scrubAt(336, 672) - .5) < 1e-9);
  assert.equal(scrubAt(-40, 672), 0);
  assert.equal(scrubAt(900, 672), 1);
  assert.equal(scrubAt(100, 0), 0, "an unmeasured strip never throws or yields NaN");
  let previous = 0;
  for (let x = 0; x <= 672; x++) {
    const light = scrubAt(x, 672);
    assert.ok(light >= previous);
    previous = light;
  }
});

test("arrow keys move the light in tenths, Home and End jump, and other keys are left alone", () => {
  assert.equal(scrubKey("ArrowRight", .5), .6);
  assert.equal(scrubKey("ArrowUp", .5), .6);
  assert.equal(scrubKey("ArrowLeft", .5), .4);
  assert.equal(scrubKey("ArrowDown", .5), .4);
  assert.equal(scrubKey("ArrowRight", 1), 1);
  assert.equal(scrubKey("ArrowLeft", 0), 0);
  assert.equal(scrubKey("Home", .7), 0);
  assert.equal(scrubKey("End", .2), 1);
  for (const key of ["Tab", "Enter", " ", "Escape", "PageDown", "a"]) assert.equal(scrubKey(key, .5), undefined);
});

test("the light approaches its target at a frame-rate independent pace and snaps when settled", () => {
  const one = approach(0, 1, lightRates.held, 1 / 30);
  const two = approach(approach(0, 1, lightRates.held, 1 / 60), 1, lightRates.held, 1 / 60);
  assert.ok(Math.abs(one - two) < 1e-9, "two half frames equal one whole frame");
  assert.ok(approach(0, 1, lightRates.held, .1) > .6, "a held light follows within a few frames");
  assert.ok(approach(0, 1, lightRates.settling, .1) < .15, "a released light returns slowly");
  assert.ok(lightRates.settling < lightRates.rising && lightRates.rising < lightRates.held);
  let light = 0;
  for (let frame = 0; frame < 600; frame++) light = approach(light, 1, lightRates.settling, 1 / 60);
  assert.equal(light, 1, "the loop reaches an exact target so it can sleep");
  assert.equal(approach(.9997, 1, lightRates.settling, 1 / 60), 1);
});

test("reduced motion gets a static, settled scene and never starts the loop", async () => {
  const css = await read("src/components/context/OceanLight.module.css");
  const controller = await read("src/components/context/MorningLight.tsx");
  const page = await read("src/app/quiet/quiet.css");
  const reduced = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.match(reduced, /\.goldSky, \.goldWater, \.goldSun, \.bandGold, \.cloudGold, \.bandSlot, \.glitterSlot \{ opacity: 1; \}/);
  assert.match(reduced, /\.haze, \.bloom, \.wake \{ opacity: 0; \}/);
  assert.match(reduced, /\.band, \.cloud, \.glitter circle, \.bloom \{ animation: none; \}/);
  for (const layer of ["goldSky", "goldWater", "goldSun"]) assert.match(css, new RegExp(`\\.${layer} \\{[^}]*will-change: opacity`));
  assert.match(controller, /const running = \(\) => visible && !document\.hidden && !reduced\.matches;/);
  assert.match(controller, /control\.hidden = reduced\.matches;/);
  assert.match(page, /details::details-content \{[^}]*content-visibility 380ms allow-discrete/);
  assert.match(page, /@media \(prefers-reduced-motion: reduce\)[\s\S]*#quiet-portfolio \*[^}]*transition: none !important/);
});

test("a remembered morning paints gold before hydration and is only written once settled", async () => {
  const page = await read("src/components/context/QuietPortfolio.tsx");
  const layout = await read("src/app/layout.tsx");
  const css = await read("src/components/context/OceanLight.module.css");
  const controller = await read("src/components/context/MorningLight.tsx");
  assert.match(page, /sessionStorage\.getItem\(\$\{JSON\.stringify\(morningKey\)\}\)==="settled"\)document\.documentElement\.dataset\.morning="settled"/);
  assert.match(page, /<script dangerouslySetInnerHTML=\{\{ __html: rememberMorning \}\} \/>/);
  assert.match(layout, /<html[^>]*suppressHydrationWarning>/);
  assert.match(css, /:global\(html\[data-morning=settled\]\) \.strip:not\(\[data-settled\]\) :is\(\.goldSky, \.goldWater, \.goldSun, [^)]*\) \{ opacity: 1; \}/);
  const settle = controller.slice(controller.indexOf("const settle = () => {"), controller.indexOf("const schedule"));
  assert.match(settle, /remember\(\);/);
  assert.match(controller, /sessionStorage\.setItem\(morningKey, "settled"\)/);
  assert.doesNotMatch(controller.replace(settle, ""), /remember\(\)/, "nothing but settling writes the memory");
});

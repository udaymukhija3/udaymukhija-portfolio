import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/daybreak.ts", import.meta.url), "utf8");
const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } }).outputText;
const { environmentAt, narrativePosition } = await import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);

test("light progression is bounded, finite, and monotonic across the complete journey", () => {
  let previous = environmentAt(0);
  for (let p = 0; p <= 5; p += .005) {
    const state = environmentAt(p);
    for (const field of ["daylight", "warmth", "stars", "clouds", "sunRise"]) assert.ok(Number.isFinite(state[field]) && state[field] >= 0 && state[field] <= 1);
    assert.ok(state.daylight >= previous.daylight);
    assert.ok(state.stars <= previous.stars);
    assert.ok(state.sunRise >= previous.sunRise);
    previous = state;
  }
});

test("sun is withheld until its reveal and horizon warmth recedes in daylight", () => {
  assert.equal(environmentAt(2.65).sunRise, 0);
  assert.ok(environmentAt(3).sunRise > 0);
  assert.equal(environmentAt(3.6).sunRise, 1);
  assert.equal(environmentAt(3).warmth, 1);
  assert.equal(environmentAt(5).warmth, 0);
  assert.equal(environmentAt(2).stars, 0);
});

test("section landmarks keep earlier scenes stable when later content grows", () => {
  const before = [0, 900, 1900, 2900, 4300, 6000];
  const after = [0, 900, 1900, 2900, 4300, 9600];
  assert.equal(narrativePosition(2400, before), 2.5);
  assert.equal(narrativePosition(2400, after), 2.5);
  assert.equal(narrativePosition(-100, before), 0);
  assert.equal(narrativePosition(10000, before), 5);
});

test("direct jumps and reverse reading evaluate the same state without history", () => {
  const anchors = [0, 800, 1700, 2900, 4300, 6200];
  const initial = environmentAt(narrativePosition(3000, anchors));
  environmentAt(narrativePosition(6000, anchors));
  assert.deepEqual(environmentAt(narrativePosition(3000, anchors)), initial);
  assert.equal(narrativePosition(4300, anchors), 4);
  assert.ok(Number.isFinite(narrativePosition(3, [0, 0, 5])));
});

test("interpolation is continuous around each phase boundary", () => {
  for (const p of [1, 2, 3, 4]) {
    const a = environmentAt(p - .000001), b = environmentAt(p + .000001);
    for (const key of ["daylight", "warmth", "stars", "clouds", "sunRise", "elevation"]) assert.ok(Math.abs(a[key] - b[key]) < .0001);
  }
});

const { damp, entranceAt } = await import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);

test("scroll settling is independent of display refresh rate and never overshoots", () => {
  const settle = (fps) => {
    let value = 0;
    for (let frame = 0; frame < fps; frame++) {
      value = damp(value, 1000, 1 / fps);
      assert.ok(value >= 0 && value <= 1000);
    }
    return value;
  };
  assert.ok(Math.abs(settle(60) - settle(120)) < .000001);
  assert.ok(Math.abs(settle(60) - 1000) < .001);
  assert.equal(damp(100, 200, 0), 100);
  assert.ok(damp(100, 0, .1) >= 0);
});

test("content is fully settled in the reading region and reverses deterministically", () => {
  assert.equal(entranceAt(1000, 0, 800), 0);
  assert.equal(entranceAt(1000, 600, 800), 1);
  const middle = entranceAt(1000, 400, 800);
  assert.ok(middle > 0 && middle < 1);
  assert.equal(entranceAt(1000, 400, 800), middle);
  assert.ok(Number.isFinite(entranceAt(0, 0, 0)));
});

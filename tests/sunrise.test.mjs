import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const compile = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 },
}).outputText).toString("base64")}`;
const light = compile(await readFile(new URL("../src/lib/daybreak.ts", import.meta.url), "utf8"));
const source = (await readFile(new URL("../src/lib/sunrise.ts", import.meta.url), "utf8")).replace('"./daybreak"', JSON.stringify(light));
const { exposureAt, exposurePose, exposureProgress, exposureStops, surfaceLongitude } = await import(compile(source));

test("every chapter destination is readable, flat, and uniquely active", () => {
  exposureStops.forEach((progress, index) => {
    assert.equal(exposureAt(progress), index);
    for (let frame = 0; frame < 6; frame++) {
      const pose = exposurePose(progress, frame);
      assert.equal(pose.opacity, Number(frame === index));
      if (frame === index) {
        assert.equal(Math.abs(pose.x), 0);
        assert.equal(Math.abs(pose.yaw), 0);
        assert.equal(Math.abs(pose.z), 0);
      }
    }
  });
});

test("scrubbing remains continuous with bounded perspective and monotonic progress", () => {
  let prior = exposureStops.map((_, frame) => exposurePose(0, frame));
  let longitude = surfaceLongitude(0);
  for (let step = 1; step <= 10000; step++) {
    const progress = step / 10000;
    assert.ok(surfaceLongitude(progress) <= longitude);
    longitude = surfaceLongitude(progress);
    const poses = exposureStops.map((_, frame) => exposurePose(progress, frame));
    poses.forEach((pose, frame) => {
      assert.ok(Math.abs(pose.opacity - prior[frame].opacity) < .01);
      assert.ok(Math.abs(pose.x) <= 18 && Math.abs(pose.yaw) <= .28);
      assert.ok(pose.opacity >= 0 && pose.opacity <= 1 && pose.z <= 0);
      assert.ok(exposureProgress(progress, frame) >= exposureProgress(progress - .0001, frame));
    });
    prior = poses;
  }
});

test("reduced motion leaves exactly one visible exposure and neutral geometry", () => {
  for (const progress of [0, .115, .475, .865, 1]) {
    let visible = 0;
    for (let frame = 0; frame < 6; frame++) {
      const pose = exposurePose(progress, frame, false, true);
      assert.equal(pose.x, 0); assert.equal(pose.yaw, 0); assert.equal(pose.z, 0);
      visible += pose.opacity;
    }
    assert.equal(visible, 1);
    assert.equal(surfaceLongitude(progress, true, true), 0);
  }
});

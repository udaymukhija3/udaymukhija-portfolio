import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/components/SolarSculptureRenderer.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } }).outputText;
const code = compiled.replace('"three"', JSON.stringify(new URL("../node_modules/three/build/three.module.js", import.meta.url).href));
const { createRibbonGeometry } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);

test("the solar ribbon has finite normals, valid triangles, and a closed boundary", () => {
  const { geometry, edgeGeometry } = createRibbonGeometry();
  try {
    const positions = geometry.getAttribute("position");
    const normals = geometry.getAttribute("normal");
    assert.ok(positions.count > 1000 && positions.count < 10000);
    for (const number of positions.array) assert.ok(Number.isFinite(number));
    for (let i = 0; i < normals.count; i++) {
      const length = Math.hypot(normals.getX(i), normals.getY(i), normals.getZ(i));
      assert.ok(length > .99 && length < 1.01);
    }
    for (const index of geometry.index.array) assert.ok(index >= 0 && index < positions.count);
    const points = edgeGeometry.getAttribute("position");
    const last = points.count - 1;
    assert.ok(Math.hypot(points.getX(0) - points.getX(last), points.getY(0) - points.getY(last), points.getZ(0) - points.getZ(last)) < .00001);
    // A Möbius seam identifies opposite sides of the strip after a full turn.
    const row = 23;
    for (let j = 0; j < row; j++) {
      const end = positions.count - 1 - j;
      assert.ok(Math.hypot(positions.getX(j) - positions.getX(end), positions.getY(j) - positions.getY(end), positions.getZ(j) - positions.getZ(end)) < .00001);
    }
  } finally {
    geometry.dispose();
    edgeGeometry.dispose();
  }
});

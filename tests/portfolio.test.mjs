import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("core portfolio routes and documentation exist", async () => {
  const requiredFiles = [
    "src/app/page.tsx",
    "src/app/projects/page.tsx",
    "src/app/projects/[slug]/page.tsx",
    "src/app/lab/page.tsx",
    "src/app/about/page.tsx",
    "DESIGN_DIRECTION.md",
    "CONTENT_TODO.md",
    "QUALITY_REPORT.md",
  ];

  await Promise.all(requiredFiles.map((path) => stat(new URL(path, root))));
});

test("project slugs are unique and every project has a generated detail route", async () => {
  const source = await read("src/data/projects.ts");
  const slugs = [...source.matchAll(/^\s{4}slug: "([^"]+)",$/gm)].map((match) => match[1]);

  assert.equal(slugs.length, 14);
  assert.equal(new Set(slugs).size, slugs.length);

  const routeSource = await read("src/app/projects/[slug]/page.tsx");
  assert.match(routeSource, /projects\.map\(\(project\) => \(\{ slug: project\.slug \}\)\)/);
});

test("the Lab content model maps implemented experiments to same-page routes", async () => {
  const source = await read("src/data/experiments.ts");
  const slugs = [...source.matchAll(/^\s{4}slug: "([^"]+)",$/gm)].map((match) => match[1]);
  const routes = [...source.matchAll(/^\s{4}route: "\/lab#([^"]+)",$/gm)].map((match) => match[1]);

  assert.deepEqual(routes, slugs);
  assert.equal(slugs.length, 4);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("primary navigation exposes Work, Lab, About, and Contact", async () => {
  const source = await read("src/components/NavBar.tsx");

  assert.match(source, /href="\/projects"/);
  assert.match(source, /href="\/lab"/);
  assert.match(source, /href="\/about"/);
  assert.match(source, /href=\{emailHref\}/);
});

test("motion has an explicit reduced-motion completion state", async () => {
  const css = await read("src/app/globals.css");
  const motionHook = await read("src/components/usePortfolioMotion.ts");

  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.route-active[\s\S]*stroke-dashoffset: 0/);
  assert.match(motionHook, /reducedMotion\.matches/);
  assert.match(motionHook, /showEverything\(\)/);
});

test("the WebGL study is isolated behind a lazy, capability-aware boundary", async () => {
  const lab = await read("src/components/LabWorkbench.tsx");
  const field = await read("src/components/ConstraintField.tsx");

  assert.match(lab, /dynamic\(/);
  assert.match(lab, /IntersectionObserver/);
  assert.match(field, /prefers-reduced-motion: reduce/);
  assert.match(field, /renderer\.setPixelRatio\(Math\.min\(window\.devicePixelRatio, 1\.5\)\)/);
  assert.match(field, /geometry\.dispose\(\)/);
  assert.match(field, /renderer\.forceContextLoss\(\)/);
});

test("internal source contains no empty hash links or casual any annotations", async () => {
  const files = [
    "src/components/HomeWorkbench.tsx",
    "src/components/LabWorkbench.tsx",
    "src/components/NavBar.tsx",
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/lab/page.tsx",
  ];
  const source = (await Promise.all(files.map(read))).join("\n");

  assert.doesNotMatch(source, /href=["']#["']/);
  assert.doesNotMatch(source, /:\s*any\b/);
});

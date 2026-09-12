import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source=await readFile(new URL("../src/lib/surfaceMotion.ts",import.meta.url),"utf8");
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ES2020}}).outputText;
const {surfaceAt,surfaceTravel}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("the center is front-facing and the reading region remains almost flat",()=>{
  assert.deepEqual(surfaceAt(450,0,900),{x:0,z:-0,pitch:-0,yaw:0});
  for(let center=300;center<=600;center++) {
    const state=surfaceAt(center,0,900);
    assert.ok(Math.abs(state.x)<.5);
    assert.ok(Math.abs(state.yaw)<.006);
    assert.ok(Math.abs(state.pitch)<.004);
    assert.ok(Math.abs(state.z)<.6);
  }
});

test("downward scrolling moves the surface left, with continuous bounded edge recession",()=>{
  let previous=surfaceAt(1200,0,900);
  for(let y=1;y<=2400;y++) {
    const state=surfaceAt(1200,y,900);
    assert.ok(state.x<=previous.x);
    assert.ok(Math.abs(state.x-previous.x)<.13);
    assert.ok(Math.abs(state.x)<=24);
    assert.ok(state.z<=0 && state.z>=-9);
    assert.ok(Math.abs(state.yaw)<=.32);
    assert.ok(Math.abs(state.pitch)<=.18);
    previous=state;
  }
});

test("shared travel remains small and follows the same direction across the full page",()=>{
  let previous=0;
  for(let y=0;y<=20000;y+=10){
    const travel=surfaceTravel(y,12000);
    assert.ok(travel<=previous && travel>=-16);
    previous=travel;
  }
  assert.equal(surfaceTravel(-500,12000),-0);
  assert.equal(surfaceTravel(20000,12000),-16);
  assert.equal(surfaceTravel(12000,12000,true),-7);
});

test("mobile reduces the effect and reduced motion produces exactly neutral geometry",()=>{
  const desktop=surfaceAt(900,0,900);
  const mobile=surfaceAt(900,0,900,true);
  for(const key of Object.keys(desktop)) assert.ok(Math.abs(mobile[key])<Math.abs(desktop[key]));
  for(const y of [0,400,2000]) {
    assert.deepEqual(surfaceAt(1200,y,900,false,true),{x:0,z:0,pitch:0,yaw:0});
    assert.equal(surfaceTravel(y,900,false,true),0);
  }
});

test("restored positions and reverse reading are deterministic, with safe invalid inputs",()=>{
  const state=surfaceAt(1500,800,900);
  surfaceAt(1500,2200,900);
  assert.deepEqual(surfaceAt(1500,800,900),state);
  for(const value of [NaN,Infinity]) {
    assert.deepEqual(surfaceAt(value,0,900),{x:0,z:0,pitch:0,yaw:0});
    assert.equal(surfaceTravel(value,10000),0);
  }
});

test("the homepage is the BAND composition with native scrolling; DAYBREAK stays reachable",async()=>{
  const page=await readFile(new URL("../src/app/page.tsx",import.meta.url),"utf8");
  assert.match(page,/<Band \/>/);
  assert.doesNotMatch(page,/Orbit|Daybreak/);
  const band=await readFile(new URL("../src/components/Band.tsx",import.meta.url),"utf8");
  for(const id of ['edge-title','voice-title','possibility-title','connection-title','curiosity-title','openness-title']) assert.ok(band.includes(id));
  // Real links, real document flow: nothing inert, nothing hijacked, no WebGL.
  assert.doesNotMatch(band,/inert|preventDefault|SolarSculpture|three/);
  const stage=await readFile(new URL("../src/components/BandStage.tsx",import.meta.url),"utf8");
  assert.match(stage,/window\.scrollY/);
  assert.doesNotMatch(stage,/preventDefault|wheel/);
  const daybreakRoute=await readFile(new URL("../src/app/daybreak/page.tsx",import.meta.url),"utf8");
  assert.match(daybreakRoute,/<Daybreak \/>/);
  const sunrise=await readFile(new URL("../src/components/SunrisePortfolio.tsx",import.meta.url),"utf8");
  for(const id of ['intro-title','murmur-title','vibe-title','gathr-title','lab-title','contact-title']) assert.ok(sunrise.includes(id));
  assert.match(sunrise,/<SolarSculpture compact/);
  assert.match(sunrise,/window\.scrollY/);
  assert.match(sunrise,/daybreak:frame/);
  assert.doesNotMatch(sunrise,/preventDefault\(\)/);
});

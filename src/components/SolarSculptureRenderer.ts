import * as THREE from "three";

/** Shared by the renderer and topology checks; does not allocate a WebGL context. */
export function createRibbonGeometry() {
  // Three half twists form one continuous, non-orientable ribbon.
  const around = 180;
  const across = 22;
  const positions: number[] = [];
  const indices: number[] = [];
  const point = (u: number, v: number) => {
    const radius = 1.35 + .13 * Math.cos(u * 3);
    return new THREE.Vector3(
      (radius + v * Math.cos(u * 1.5)) * Math.cos(u),
      (radius + v * Math.cos(u * 1.5)) * Math.sin(u),
      v * Math.sin(u * 1.5) + .18 * Math.sin(u * 3),
    );
  };
  for (let i = 0; i <= around; i++) {
    for (let j = 0; j <= across; j++) {
      const vertex = point(i / around * Math.PI * 2, (j / across - .5) * 1.3);
      positions.push(vertex.x, vertex.y, vertex.z);
      if (i < around && j < across) {
        const a = i * (across + 1) + j;
        indices.push(a, a + across + 1, a + 1, a + 1, a + across + 1, a + across + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const edgePoints: THREE.Vector3[] = [];
  for (let i = 0; i <= around * 2; i++) edgePoints.push(point(i / around * Math.PI * 2, .65));
  const edgeGeometry = new THREE.BufferGeometry().setFromPoints(edgePoints);
  return { geometry, edgeGeometry };
}

export type SculptureControls = {
  setWireframe: (enabled: boolean) => void;
  setPaused: (paused: boolean) => void;
  turn: (direction: number) => void;
  dispose: () => void;
};

/** An explicitly bounded renderer, loaded only when its study nears the viewport. */
export function createSolarSculpture(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  onUnavailable: () => void,
): SculptureControls {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.25 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 30);
  camera.position.set(0, .1, 7.2);
  const sculpture = new THREE.Group();
  scene.add(sculpture);

  const { geometry, edgeGeometry } = createRibbonGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xcd844d, metalness: .38, roughness: .32,
    clearcoat: .5, clearcoatRoughness: .3, side: THREE.DoubleSide,
  });
  const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xf3d699, wireframe: true, transparent: true, opacity: .55 });
  const mesh = new THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial | THREE.MeshBasicMaterial>(geometry, material);
  sculpture.add(mesh);

  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xf6c790, transparent: true, opacity: .6 });
  sculpture.add(new THREE.Line(edgeGeometry, edgeMaterial));
  const ambient = new THREE.HemisphereLight(0xe9f2ec, 0x2c3a35, 2.3);
  const key = new THREE.DirectionalLight(0xffce99, 5);
  key.position.set(-3, 4, 5);
  const fill = new THREE.DirectionalLight(0xa9dce4, 2.5);
  fill.position.set(4, -1, 2);
  const rim = new THREE.DirectionalLight(0xf3ae68, 4);
  rim.position.set(1, 3, -3);
  scene.add(ambient, key, fill, rim);

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.getElementById("daybreak");
  let reduced = preference.matches || root?.dataset.motion === "still";
  let paused = false;
  let visible = false;
  let disposed = false;
  let lost = false;
  let frame = 0;
  let lastTime = 0;
  let rotation = 0;
  let dragX = -.25;
  let dragY = -.35;
  let targetX = dragX;
  let targetY = dragY;
  let activePointer: number | null = null;
  let lastPointerX = 0;
  let daylight = .8;
  const draw = (time: number) => {
    frame = 0;
    if (disposed || lost || !visible || document.hidden) return;
    const dt = Math.min(.05, Math.max(0, (time - lastTime) / 1000));
    lastTime = time;
    if (!reduced && !paused && activePointer === null) rotation += dt * .12;
    const blend = reduced ? 1 : 1 - Math.exp(-12 * dt);
    dragX += (targetX - dragX) * blend;
    dragY += (targetY - dragY) * blend;
    sculpture.rotation.set(dragY, dragX + rotation, -.25);
    key.position.x = -3 + daylight * 3;
    renderer.render(scene, camera);
    const settling = Math.abs(targetX - dragX) + Math.abs(targetY - dragY) > .001;
    if (!reduced && (!paused || settling)) frame = requestAnimationFrame(draw);
  };
  const schedule = () => {
    if (!frame && !disposed && !lost && visible && !document.hidden) {
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    }
  };
  const resize = new ResizeObserver(() => {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < .8 ? 8.7 : 7.2;
    camera.updateProjectionMatrix();
    schedule();
  });
  resize.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule(); else { cancelAnimationFrame(frame); frame = 0; }
  }, { rootMargin: "60px 0px" });
  intersection.observe(host);

  const pointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    activePointer = event.pointerId;
    lastPointerX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerId !== activePointer) return;
    targetX += (event.clientX - lastPointerX) * .012;
    lastPointerX = event.clientX;
    schedule();
  };
  const pointerUp = () => { activePointer = null; };
  const keyDown = (event: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") targetX -= .18;
    if (event.key === "ArrowRight") targetX += .18;
    if (event.key === "ArrowUp") targetY -= .18;
    if (event.key === "ArrowDown") targetY += .18;
    if (event.key === "Home") { targetX = -.25; targetY = -.35; rotation = 0; }
    schedule();
  };
  const visibility = () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else schedule();
  };
  const environment = (event: Event) => {
    const state = (event as CustomEvent<{ still: boolean; daylight: number }>).detail;
    reduced = preference.matches || state.still;
    daylight = state.daylight ?? daylight;
    schedule();
  };
  const preferenceChange = () => {
    reduced = preference.matches || root?.dataset.motion === "still";
    schedule();
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    onUnavailable();
  };
  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointermove", pointerMove, { passive: true });
  canvas.addEventListener("pointerup", pointerUp);
  canvas.addEventListener("pointercancel", pointerUp);
  canvas.addEventListener("lostpointercapture", pointerUp);
  canvas.addEventListener("keydown", keyDown);
  canvas.addEventListener("webglcontextlost", contextLost);
  document.addEventListener("visibilitychange", visibility);
  preference.addEventListener("change", preferenceChange);
  root?.addEventListener("daybreak:frame", environment);

  return {
    setWireframe(enabled) { mesh.material = enabled ? wireMaterial : material; schedule(); },
    setPaused(value) { paused = value; schedule(); },
    turn(direction) { targetX += direction * .3; schedule(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      canvas.removeEventListener("lostpointercapture", pointerUp);
      canvas.removeEventListener("keydown", keyDown);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", preferenceChange);
      root?.removeEventListener("daybreak:frame", environment);
      geometry.dispose();
      edgeGeometry.dispose();
      material.dispose();
      wireMaterial.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

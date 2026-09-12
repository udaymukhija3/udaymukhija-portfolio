"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type FieldMode = "calm" | "pressure" | "release";

const fieldModes: Record<FieldMode, { label: string; note: string }> = {
  calm: { label: "Calm", note: "A low-amplitude surface with a slow spatial rhythm." },
  pressure: { label: "Pressure", note: "Pointer input produces a tighter, more reactive deformation." },
  release: { label: "Release", note: "The field opens into longer waves and a wider response." },
};

export function ConstraintField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<FieldMode>("calm");
  const drawRef = useRef<(() => void) | null>(null);
  const [mode, setMode] = useState<FieldMode>("calm");

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch {
      host.dataset.supported = "false";
      canvas.setAttribute("aria-hidden", "true");
      host.querySelector(".constraint-field-fallback")?.removeAttribute("aria-hidden");
      const caption = host.querySelector(".constraint-field-caption");
      if (caption) {
        caption.textContent = "CSS surface / WebGL unavailable";
      }
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151918);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.15, 6.4);

    const geometry = new THREE.PlaneGeometry(7.8, 4.8, 42, 26);
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const initialPositions = new Float32Array(positions.array as ArrayLike<number>);
    const material = new THREE.MeshStandardMaterial({
      color: 0xcbd3c8,
      emissive: 0x18201d,
      metalness: 0.02,
      roughness: 0.88,
      side: THREE.DoubleSide,
    });
    const surface = new THREE.Mesh(geometry, material);
    surface.rotation.x = -0.72;
    surface.rotation.z = -0.035;
    scene.add(surface);

    const ambient = new THREE.HemisphereLight(0xf8f5ed, 0x24302c, 2.25);
    const key = new THREE.DirectionalLight(0xfaf8f2, 3.8);
    key.position.set(-2.8, 4.5, 5.4);
    const edge = new THREE.DirectionalLight(0x72867d, 2.1);
    edge.position.set(4, -1.8, 2.5);
    scene.add(ambient, key, edge);

    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const daybreak = document.getElementById("daybreak");
    let reducedMotion = preference.matches || daybreak?.dataset.motion === "still";
    let visible = true;
    let frame = 0;

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const draw = (time = 0) => {
      const seconds = time * 0.001;
      const settings = modeRef.current === "pressure"
        ? { amplitude: 0.42, frequency: 1.55, response: 0.72 }
        : modeRef.current === "release"
          ? { amplitude: 0.3, frequency: 0.72, response: 0.38 }
          : { amplitude: 0.2, frequency: 0.95, response: 0.34 };

      pointer.lerp(pointerTarget, reducedMotion ? 1 : 0.055);

      for (let index = 0; index < positions.count; index += 1) {
        const offset = index * 3;
        const x = initialPositions[offset];
        const y = initialPositions[offset + 1];
        const pointerX = pointer.x * 3.2;
        const pointerY = pointer.y * 1.9;
        const distance = Math.hypot(x - pointerX, y - pointerY);
        const input = Math.exp(-(distance * distance) * 0.72) * settings.response;
        const drift = reducedMotion ? 0 : seconds * (modeRef.current === "pressure" ? 0.7 : 0.34);
        const wave = Math.sin((x * settings.frequency) + drift) * settings.amplitude;
        const crossWave = Math.cos((y * (settings.frequency + 0.45)) - drift * 0.72) * settings.amplitude * 0.42;
        positions.setZ(index, wave + crossWave + input);
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      surface.rotation.z = -0.035 + pointer.x * 0.018;
      surface.rotation.x = -0.72 - pointer.y * 0.025;
      renderer.render(scene, camera);
    };

    drawRef.current = () => draw(performance.now());

    const animate = (time: number) => {
      draw(time);
      if (visible && !document.hidden && !reducedMotion) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (visible && !document.hidden && !reducedMotion) {
        frame = window.requestAnimationFrame(animate);
      } else {
        draw();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
        -(((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1),
      );
    };

    const onPointerLeave = () => pointerTarget.set(0, 0);
    const onVisibilityChange = () => start();
    const onMotionChange = () => {
      const next = preference.matches || daybreak?.dataset.motion === "still";
      if (next !== reducedMotion) { reducedMotion = next; start(); }
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    }, { rootMargin: "20% 0px", threshold: 0.01 });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    preference.addEventListener("change", onMotionChange);
    daybreak?.addEventListener("daybreak:frame", onMotionChange);
    resize();
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      preference.removeEventListener("change", onMotionChange);
      daybreak?.removeEventListener("daybreak:frame", onMotionChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      drawRef.current = null;
    };
  }, []);

  const chooseMode = (nextMode: FieldMode) => {
    modeRef.current = nextMode;
    setMode(nextMode);
    window.requestAnimationFrame(() => drawRef.current?.());
  };

  return (
    <div className="constraint-field-study" data-mode={mode}>
      <div
        ref={hostRef}
        className="constraint-field-stage"
        data-supported="true"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="A quiet three-dimensional surface that deforms with pointer position and the selected constraint mode"
        />
        <div className="constraint-field-fallback" role="img" aria-label="Static folded surface fallback" aria-hidden="true">
          <i /><i /><i />
        </div>
        <span className="constraint-field-caption">Move across the surface</span>
      </div>
      <div className="constraint-field-controls" aria-label="Surface constraint mode">
        {(Object.keys(fieldModes) as FieldMode[]).map((fieldMode) => (
          <button
            key={fieldMode}
            type="button"
            aria-pressed={mode === fieldMode}
            onClick={() => chooseMode(fieldMode)}
          >
            <span>{fieldModes[fieldMode].label}</span>
            <small>{fieldModes[fieldMode].note}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

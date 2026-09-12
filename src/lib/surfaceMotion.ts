/** A tiny visible patch of a very large surface; no sphere mesh or scroll interception. */
export function surfaceAt(center: number, scroll: number, viewport: number, small = false, still = false) {
  if (still || !Number.isFinite(center) || !Number.isFinite(scroll) || !Number.isFinite(viewport) || viewport <= 0) {
    return { x: 0, z: 0, pitch: 0, yaw: 0 };
  }
  const position = Math.min(1, Math.max(-1, (center - scroll - viewport * .5) / (viewport * .65)));
  // Cubic motion leaves the reading region almost flat. Downward scroll moves the surface left.
  const arc = position * position * position;
  const strength = small ? .45 : 1;
  return {
    x: arc * 24 * strength,
    z: -position * position * 9 * strength,
    pitch: arc * -.18 * strength,
    yaw: arc * .32 * strength,
  };
}

/** A small shared drift makes the complete composition travel in one direction. */
export function surfaceTravel(scroll: number, extent: number, small = false, still = false) {
  if (still || !Number.isFinite(scroll) || !Number.isFinite(extent) || extent <= 0) return 0;
  const progress = Math.min(1,Math.max(0,scroll / extent));
  return -(small ? 7 : 16) * progress;
}

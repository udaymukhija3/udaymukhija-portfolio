import { clamp, smooth } from "./daybreak";

/** Six reading holds joined by short dissolves, all on one stationary surface. */
export const exposures = ["The edge", "A voice", "Possibility", "Connection", "Curiosity", "Openness"] as const;
export const exposureStops = [0, .18, .36, .54, .74, .94] as const;
const boundaries = [.115, .29, .475, .665, .865];
const transitionWidth = .06;

export function exposureAt(progress: number) {
  return boundaries.filter(boundary => clamp(progress) >= boundary).length;
}

export function exposureWeight(progress: number, index: number) {
  const p = clamp(progress);
  const enter = index === 0 ? 1 : smooth((p - boundaries[index - 1] + transitionWidth / 2) / transitionWidth);
  const leave = index === 5 ? 0 : smooth((p - boundaries[index] + transitionWidth / 2) / transitionWidth);
  return clamp(enter - leave);
}

/** A tiny patch of a very large surface: no vertical translation or roll. */
export function exposurePose(progress: number, index: number, small = false, still = false) {
  const weight = exposureWeight(progress, index);
  const entering = progress < exposureStops[index];
  const edge = (1 - weight) * (entering ? 1 : -1);
  const scale = small ? .5 : 1;
  return {
    // Let the outgoing words clear before the incoming title gains contrast.
    opacity: still ? Number(exposureAt(progress) === index) : weight ** 1.7,
    x: still ? 0 : edge * 18 * scale,
    yaw: still ? 0 : edge * .28 * scale,
    z: still ? 0 : -(1 - weight) * 7 * scale,
  };
}

export function exposureProgress(progress: number, index: number) {
  const start = index === 0 ? 0 : boundaries[index - 1];
  const end = index === 5 ? 1 : boundaries[index];
  return clamp((clamp(progress) - start) / (end - start));
}

/** Travel advances during disclosure, becoming perfectly still on each reading hold. */
export function surfaceLongitude(progress: number, small = false, still = false) {
  if (still) return 0;
  const travel = boundaries.reduce((sum, boundary) => sum + smooth((progress - boundary + transitionWidth / 2) / transitionWidth), 0);
  return (10 - travel * 4) * (small ? .5 : 1);
}

/** An authored light model. Elevation is narrative, not an astronomical clock. */
export const phaseNames = ["Pre-dawn", "Blue hour", "First light", "Sunrise", "Morning", "Bright day"] as const;
export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
export const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

/** Refresh-rate-independent settling without replacing the browser's scroll. */
export const damp = (current: number, target: number, seconds: number, rate = 24) =>
  target + (current - target) * Math.exp(-rate * Math.max(0, seconds));

export const entranceAt = (top: number, scroll: number, viewport: number) =>
  smooth((scroll + viewport * .96 - top) / Math.max(1, viewport * .36));

export function narrativePosition(scroll: number, anchors: readonly number[]) {
  if (!Number.isFinite(scroll)) return 0;
  if (anchors.length < 2) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (scroll < anchors[i + 1]) return i + clamp((scroll - anchors[i]) / Math.max(1, anchors[i + 1] - anchors[i]));
  }
  return anchors.length - 1;
}

export function environmentAt(position: number) {
  const p = clamp(position, 0, 5);
  const elevation = -12 + 36 * smooth(p / 5);
  return {
    position: p,
    phase: Math.min(5, Math.floor(p)),
    daylight: smooth((p - 1) / 3.4),
    warmth: Math.max(0, 1 - Math.abs(p - 3) / 1.8),
    stars: 1 - smooth((p - 0.35) / 1.65),
    clouds: smooth((p - 0.6) / 1.7),
    sunRise: smooth((p - 2.65) / 0.9),
    elevation,
  };
}

export interface SmoothScrollSettings {
  lerp: number;
  duration: number;
  easing: (t: number) => number;
  anchorOffset: number;
  lookupIntervalMs: number;
  lookupMaxAttempts: number;
  anchorLockMs: number;
}

export const smoothScrollSettings: SmoothScrollSettings = {
  lerp: 0.1,
  duration: 1.4,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  anchorOffset: 0,
  lookupIntervalMs: 50,
  lookupMaxAttempts: 60,
  anchorLockMs: 2500,
};

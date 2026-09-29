export type DividerShape = 'dome' | 'tilt';
/** top: invade a seção ACIMA; bottom: invade a seção ABAIXO. */
export type DividerPlacement = 'top' | 'bottom';
export type DividerTone = 'dark' | 'bg';

export interface SectionDividerConfig {
  viewBox: string;
  svg: string;
  placements: Record<DividerPlacement, string>;
  tones: Record<DividerTone, string>;
  paths: Record<DividerShape, Record<DividerPlacement, string>>;
}

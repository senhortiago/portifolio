export type BadgeVariant = 'solid' | 'tinted' | 'glass' | 'ghost';
export type BadgeColor = 'primary' | 'secondary' | 'accent' | 'inverse';

export interface BadgeConfig {
  base: string;
  matrix: Record<BadgeVariant, Record<BadgeColor, string>>;
}

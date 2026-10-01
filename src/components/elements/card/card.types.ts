export type CardVariant = 'glass' | 'solid' | 'solid-dark' | 'outline' | 'popup-dark';
export type CardPadding = 'none' | 'md' | 'lg';

export interface CardConfig {
  host: string;
  base: string;
  variants: Record<CardVariant, string>;
  paddings: Record<CardPadding, string>;
}

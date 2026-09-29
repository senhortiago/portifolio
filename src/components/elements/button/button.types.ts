export type ButtonVariant =
  | 'solid'
  | 'accent'
  | 'soft'
  | 'outline'
  | 'outline-inverse'
  | 'ghost'
  | 'ghost-inverse'
  /** Sem estética própria: o pai define estrutura e visual via layoutClass. */
  | 'bare';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonType = 'button' | 'submit';
export type ButtonTarget = '_self' | '_blank';

export interface ButtonConfig {
  host: string;
  hostFullWidth: string;
  base: string;
  fullWidth: string;
  disabled: string;
  variants: Record<ButtonVariant, string>;
  sizes: Record<ButtonSize, string>;
}

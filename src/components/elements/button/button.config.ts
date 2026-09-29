import { ButtonConfig } from './button.types';

export const buttonConfig: ButtonConfig = {
  host: 'inline-flex',
  hostFullWidth: 'flex w-full',
  base:
    'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight ' +
    'transition-[background-color,color,border-color,transform] duration-300 ease-standard active:scale-[0.97] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2',
  fullWidth: 'w-full',
  disabled: 'pointer-events-none opacity-50',
  variants: {
    solid: 'bg-brand-ink text-brand-bg hover:bg-brand-ink-soft focus-visible:ring-offset-brand-bg',
    accent: 'bg-brand-accent text-brand-ink hover:bg-brand-accent-strong focus-visible:ring-offset-brand-bg',
    soft: 'border border-brand-ink/15 bg-brand-bg-soft text-brand-ink hover:bg-brand-accent focus-visible:ring-offset-brand-bg',
    // Vazados: o fundo emula a superfície onde estão inseridos; no hover a cor da borda acende com baixa opacidade.
    outline:
      'border border-brand-ink/70 bg-brand-bg text-brand-ink hover:bg-brand-ink/15 focus-visible:ring-offset-brand-bg',
    'outline-inverse':
      'border border-brand-on-dark/60 bg-brand-dark text-brand-on-dark hover:bg-brand-on-dark/15 focus-visible:ring-offset-brand-dark',
    ghost: 'bg-transparent text-brand-ink hover:bg-brand-ink/10 focus-visible:ring-offset-brand-bg',
    'ghost-inverse': 'bg-transparent text-brand-on-dark hover:bg-brand-on-dark/10 focus-visible:ring-offset-brand-dark',
    bare: '',
  },
  sizes: {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-[0.95rem]',
    lg: 'h-14 px-8 text-base',
    icon: 'h-10 w-10 p-0',
  },
};

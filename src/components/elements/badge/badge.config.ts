import { BadgeConfig } from './badge.types';

export const badgeConfig: BadgeConfig = {
  base: 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium leading-none tracking-tight',
  matrix: {
    solid: {
      primary: 'bg-brand-ink text-brand-bg',
      secondary: 'bg-brand-secondary text-white',
      accent: 'bg-brand-accent text-brand-ink',
      inverse: 'bg-brand-on-dark text-brand-dark',
    },
    tinted: {
      primary: 'bg-brand-ink/10 text-brand-ink',
      secondary: 'bg-brand-secondary/15 text-brand-secondary',
      accent: 'bg-brand-accent/40 text-brand-ink',
      inverse: 'bg-brand-on-dark/10 text-brand-on-dark',
    },
    glass: {
      primary: 'border border-white/60 bg-white/50 text-brand-ink backdrop-blur-md',
      secondary: 'border border-white/60 bg-brand-secondary/10 text-brand-secondary backdrop-blur-md',
      accent: 'border border-white/60 bg-brand-accent/30 text-brand-ink backdrop-blur-md',
      inverse: 'border border-white/15 bg-white/10 text-brand-on-dark backdrop-blur-md',
    },
    ghost: {
      primary: 'border border-brand-ink/30 text-brand-ink',
      secondary: 'border border-brand-secondary/40 text-brand-secondary',
      accent: 'border border-brand-accent-deep/60 text-brand-ink',
      inverse: 'border border-brand-on-dark/30 text-brand-on-dark',
    },
  },
};

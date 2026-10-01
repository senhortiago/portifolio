import { CardConfig } from './card.types';

export const cardConfig: CardConfig = {
  host: 'block',
  base: 'relative h-full w-full rounded-2xl transition-[box-shadow,transform,background-color] duration-300 ease-standard',
  variants: {
    glass: 'border border-white/50 bg-brand-glass/80 shadow-[0_20px_60px_-30px_rgba(48,35,30,0.35)] backdrop-blur-md',
    solid: 'border border-brand-ink/10 bg-brand-surface shadow-[0_24px_60px_-36px_rgba(48,35,30,0.45)]',
    'solid-dark': 'border border-white/10 bg-brand-dark-soft',
    outline: 'border border-brand-ink/15 bg-brand-bg',
    'popup-dark': 'border border-white/40 bg-popup-dark shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md',
  },
  paddings: {
    none: 'p-0',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  },
};

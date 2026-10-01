import { SectionDividerConfig } from './section-divider.types';

/**
 * viewBox fixo 1440x100 + preserveAspectRatio="none".
 * Altura travada por breakpoint (h-8 / h-12 / h-16 = 32 / 48 / 64px) — use esses valores
 * no padding compensatório da seção vizinha.
 * Curvas Q com ponto de controle no DOBRO do limite (200 / -100) para nascerem na borda.
 */
export const sectionDividerConfig: SectionDividerConfig = {
  viewBox: '0 0 1440 100',
  svg: 'pointer-events-none absolute left-0 block h-8 w-full md:h-12 lg:h-16',
  placements: {
    top: 'top-0 -translate-y-[99%]',
    bottom: 'bottom-0 translate-y-[99%]',
  },
  tones: {
    dark: 'fill-brand-dark',
    bg: 'fill-brand-bg',
  },
  paths: {
    dome: {
      top: 'M0,100 Q720,-100 1440,100 Z',
      bottom: 'M0,0 Q720,200 1440,0 Z',
    },
    tilt: {
      top: 'M0,100 L1440,0 L1440,100 Z',
      bottom: 'M0,0 L1440,0 L0,100 Z',
    },
  },
};

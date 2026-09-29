import { LayoutLinesConfig } from './layout-lines.types';

const settled = 'bg-brand-ink opacity-[0.12]';
const intro = 'left-1/2 bg-brand-ink/30 opacity-100';

export const layoutLinesConfig: LayoutLinesConfig = {
  wrapper: 'pointer-events-none fixed inset-0 z-lines hidden md:block',
  lineBase: 'absolute bottom-0 top-0 w-px',
  left: {
    pending: intro,
    converge: `left-gutter-start ${settled}`,
    reveal: `left-gutter-start ${settled}`,
    done: `left-gutter-start ${settled}`,
  },
  right: {
    pending: intro,
    converge: `left-[calc(100%-theme(spacing.gutter-end))] ${settled}`,
    reveal: `left-[calc(100%-theme(spacing.gutter-end))] ${settled}`,
    done: `left-[calc(100%-theme(spacing.gutter-end))] ${settled}`,
  },
  transition:
    'transition-[left,opacity,background-color] [transition-duration:1200ms,2000ms,2000ms] ease-intro',
};

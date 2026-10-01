import { brandConstant } from '../../../../core/constants/brand.constant';
import { HeroConfig } from './hero.types';

const lineConverge = 'transition-[transform,opacity,background-color] [transition-duration:500ms,2000ms,2000ms] ease-intro';
const lineReveal = 'transition-[transform,opacity,background-color] [transition-duration:350ms,2000ms,2000ms] ease-intro';

export const heroConfig: HeroConfig = {
  section: 'relative h-[100svh] min-h-[620px] w-full touch-pan-y select-none overflow-hidden',
  srOnly: 'sr-only',
  cursors: {
    prev: 'cursor-arrow-left',
    next: 'cursor-arrow-right',
    down: 'cursor-arrow-down',
  },

  background: 'pointer-events-none absolute inset-0 will-change-transform',
  backgroundGradient: 'absolute inset-0 bg-hero-gradient',
  backgroundLines: 'absolute -inset-x-1/2 -inset-y-full bg-hero-lines opacity-[0.12]',
  backgroundFade: 'absolute inset-0 bg-hero-fade',
  blobAccent:
    'absolute -left-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-brand-accent/60 blur-[120px] md:-left-24',
  blobSecondary:
    'absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-secondary-soft/50 blur-[120px]',

  horizontalLine: 'pointer-events-none absolute inset-x-0 z-lines hidden h-px md:block',
  horizontalLines: [
    { top: 149, opacity: 0.12 },
    { top: 260, opacity: 0.08 },
    { top: 371, opacity: 0.05 },
    { top: 482, opacity: 0.03 },
  ],
  lineColors: {
    intro: 'bg-brand-ink/5',
    settled: 'bg-brand-ink',
  },
  lineTransitions: {
    pending: '',
    converge: lineConverge,
    reveal: lineReveal,
    done: lineReveal,
  },

  mediaParallax:
    'pointer-events-none absolute inset-x-0 top-[4.75rem] z-[35] mx-auto h-[56%] w-fit will-change-transform ' +
    'md:inset-x-auto md:bottom-0 md:right-[max(0px,calc(theme(spacing.gutter-end)-6rem))] md:top-auto md:mx-0 md:h-[88%]',
  media: {
    hidden: 'relative h-full scale-[0.96] opacity-0 transition-[opacity,transform] duration-1200 ease-expo-out',
    visible: 'relative h-full scale-100 opacity-100 transition-[opacity,transform] duration-1200 ease-expo-out',
  },
  mediaGlow:
    'absolute left-[8%] top-[6%] aspect-square w-[84%] rounded-full bg-brand-accent/45 blur-[70px]',
  video:
    'relative aspect-[9/16] h-full [mask-composite:intersect] ' +
    '[mask-image:linear-gradient(to_bottom,#000_42%,transparent_94%),linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] ' +
    'md:[mask-image:linear-gradient(to_bottom,#000_58%,transparent_97%),linear-gradient(to_right,transparent,#000_16%,#000_88%,transparent)]',

  headlineWrap:
    'pointer-events-none absolute inset-x-4 bottom-[6.5rem] z-40 md:bottom-[clamp(6rem,13vh,8.5rem)] md:left-gutter-start md:right-gutter-end',
  headlineIntro: {
    hidden: 'translate-y-6 opacity-0 transition-[opacity,transform] duration-700 ease-expo-out',
    visible: 'translate-y-0 opacity-100 transition-[opacity,transform] delay-300 duration-700 ease-expo-out',
  },
  kicker:
    'mb-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-ink-soft md:mb-7 md:text-xs',
  kickerDot: 'h-1.5 w-1.5 rounded-full bg-brand-secondary',
  headline: 'flex flex-col items-start',
  headlineSwap: {
    out: 'translate-y-3 opacity-0 transition-[opacity,transform] duration-400 ease-out',
    in: 'translate-y-0 opacity-100 transition-[opacity,transform] duration-400 ease-in',
  },
  titleLine: 'block w-fit whitespace-nowrap text-display font-bold text-brand-ink',
  compactText:
    '!text-[clamp(1.85rem,8.6vw,3.6rem)] !leading-[0.95] md:!text-[clamp(3rem,5.4vw,6rem)]',
  highlightWrap: 'relative block w-fit whitespace-nowrap text-display font-bold text-brand-ink',
  highlightMarker: {
    out: 'absolute -inset-x-[0.06em] bottom-[0.04em] h-[0.4em] origin-left scale-x-0 rounded-[0.08em] bg-brand-accent transition-transform duration-300 ease-out',
    in: 'absolute -inset-x-[0.06em] bottom-[0.04em] h-[0.4em] origin-left scale-x-100 rounded-[0.08em] bg-brand-accent transition-transform delay-200 duration-700 ease-expo-out',
  },
  highlightText: 'relative',

  bottomBar:
    'absolute inset-x-4 bottom-6 z-40 flex items-center justify-between gap-4 md:bottom-8 md:left-gutter-start md:right-gutter-end',
  controls: 'flex items-center gap-3 transition-opacity duration-700',
  controlsHidden: 'opacity-0',
  counter: 'font-mono text-xs tabular-nums text-brand-muted',
  counterCurrent: 'text-brand-ink',
  progressTrack: 'relative hidden h-px w-24 overflow-hidden bg-brand-ink/15 sm:block',
  progressBar: 'absolute inset-0 origin-left animate-slide-progress bg-brand-ink',
  scrollHint:
    'pointer-events-auto inline-flex items-center gap-2 rounded-full font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-ink-soft transition-colors hover:text-brand-ink',
  scrollHintIcon: 'animate-scroll-hint',

  texts: {
    kicker: `${brandConstant.role} · ${brandConstant.location}`,
    videoLabel: `Vídeo de apresentação de ${brandConstant.fullName}`,
    carouselLabel: 'Frases de apresentação',
    previous: 'Frase anterior',
    next: 'Próxima frase',
    scrollHint: 'Role para explorar',
    counterSeparator: '/',
  },

  slides: [
    { lines: ['Oi, eu sou o'], highlight: 'Tiago Barcelos.' },
    { lines: ['Desenvolvo', 'software para'], highlight: 'problemas reais' },
    { lines: ['Transformo', 'problemas', 'complexos em'], highlight: 'soluções simples.', compact: true },
    { lines: ['Java, Spring,', 'e Python com'], highlight: 'resultados' },
  ],
  loopsPerSlide: 2,
  timerSlideMs: 8000,
  swapDurationMs: 420,
  parallaxFactor: 0.4,
  downZoneRatio: 0.28,
  tapThresholdPx: 10,
  swipeThresholdPx: 40,
};

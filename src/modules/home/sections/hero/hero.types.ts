import { IntroPhase } from '../../../../core/services/intro-animation/intro-animation.types';

export interface HeroSlide {
  lines: string[];
  highlight: string;
}

export type HeroPointerZone = 'prev' | 'next' | 'down';
export type HeroAutoAdvance = 'video' | 'timer' | 'off';

export interface HeroHorizontalLine {
  top: number;
  opacity: number;
}

export interface HeroLineStyle {
  transform: string;
  opacity: number;
  delayMs: number;
}

export interface HeroConfig {
  section: string;
  srOnly: string;
  cursors: Record<HeroPointerZone, string>;

  background: string;
  backgroundGradient: string;
  backgroundLines: string;
  backgroundFade: string;
  blobAccent: string;
  blobSecondary: string;

  horizontalLine: string;
  horizontalLines: HeroHorizontalLine[];
  lineColors: Record<'intro' | 'settled', string>;
  lineTransitions: Record<IntroPhase, string>;

  mediaParallax: string;
  media: Record<'hidden' | 'visible', string>;
  mediaGlow: string;
  video: string;

  headlineWrap: string;
  headlineIntro: Record<'hidden' | 'visible', string>;
  kicker: string;
  kickerDot: string;
  headline: string;
  headlineSwap: Record<'out' | 'in', string>;
  titleLine: string;
  highlightWrap: string;
  highlightMarker: Record<'out' | 'in', string>;
  highlightText: string;

  bottomBar: string;
  controls: string;
  controlsHidden: string;
  counter: string;
  counterCurrent: string;
  progressTrack: string;
  progressBar: string;
  scrollHint: string;
  scrollHintIcon: string;

  texts: {
    kicker: string;
    videoLabel: string;
    carouselLabel: string;
    previous: string;
    next: string;
    scrollHint: string;
    counterSeparator: string;
  };

  slides: HeroSlide[];
  loopsPerSlide: number;
  timerSlideMs: number;
  swapDurationMs: number;
  parallaxFactor: number;
  downZoneRatio: number;
  tapThresholdPx: number;
  swipeThresholdPx: number;
}

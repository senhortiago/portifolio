import { IntroPhase } from '../../../core/services/intro-animation/intro-animation.types';

export interface LayoutLinesConfig {
  wrapper: string;
  lineBase: string;
  left: Record<IntroPhase, string>;
  right: Record<IntroPhase, string>;
  transition: string;
}

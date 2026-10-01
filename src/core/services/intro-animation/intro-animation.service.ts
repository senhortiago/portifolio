import { isPlatformBrowser } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { featureFlagsConstant } from '../../constants/feature-flags.constant';
import { IntroPhase, introTimeline } from './intro-animation.types';

/**
 * Orquestra a animação de entrada (inspirada no site do Sebastian Wittig):
 * linhas de layout saem do centro, se abrem em leque e só então o conteúdo aparece.
 */
@Injectable({ providedIn: 'root' })
export class IntroAnimationService {
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly phaseState = signal<IntroPhase>(this.shouldPlay() ? 'pending' : 'done');

  readonly phase = this.phaseState.asReadonly();
  /** Conteúdo (header, headline, vídeo) liberado para aparecer. */
  readonly isContentVisible = computed(() => this.phaseState() === 'reveal' || this.phaseState() === 'done');

  private started = false;

  play(): void {
    if (this.started || this.phaseState() === 'done') {
      return;
    }
    this.started = true;

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.phaseState.set('converge'), introTimeline.convergeDelayMs);
      setTimeout(() => this.phaseState.set('reveal'), introTimeline.revealDelayMs);
      setTimeout(() => this.phaseState.set('done'), introTimeline.doneDelayMs);
    });
  }

  private shouldPlay(): boolean {
    if (!featureFlagsConstant.heroIntroAnimation || !isPlatformBrowser(this.platformId)) {
      return false;
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasAnchor = window.location.hash.length > 1;
    return !reducedMotion && !hasAnchor && window.scrollY < 50;
  }
}

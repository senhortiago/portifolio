import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../components/elements/button/button.component';
import { ChromaVideoComponent } from '../../../../components/elements/chroma-video/chroma-video.component';
import { ChromaRenderer } from '../../../../components/elements/chroma-video/chroma-video.types';
import { InViewDirective } from '../../../../core/directives/in-view.directive';
import { anchorsConstant } from '../../../../core/constants/anchors.constant';
import { brandConstant } from '../../../../core/constants/brand.constant';
import { featureFlagsConstant } from '../../../../core/constants/feature-flags.constant';
import { linksConstant } from '../../../../core/constants/links.constant';
import { IntroAnimationService } from '../../../../core/services/intro-animation/intro-animation.service';
import { introTimeline } from '../../../../core/services/intro-animation/intro-animation.types';
import { heroConfig } from './hero.config';
import { HeroAutoAdvance, HeroLineStyle, HeroPointerZone } from './hero.types';

/**
 * Hero inspirado no site do Sebastian Wittig: headline gigante em slides que trocam
 * sincronizados com a animação (aqui, cada volta do vídeo), navegação por clique
 * esquerda/direita/baixo com cursor customizado, swipe no touch e intro com linhas de layout.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, ChromaVideoComponent, RouterLink, InViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      appInView
      [inViewOnce]="false"
      [inViewThreshold]="0"
      [inViewRootMargin]="'0px'"
      [class]="sectionClasses()"
      [attr.aria-label]="config.texts.carouselLabel"
      (pointermove)="onPointerMove($event)"
      (pointerleave)="pointerZone.set(null)"
      (pointerdown)="onPointerDown($event)"
      (pointerup)="onPointerUp($event)"
      (pointercancel)="pointerActive = false"
    >
      <div #background [class]="config.background" aria-hidden="true">
        <div [class]="config.backgroundGradient"></div>
        <div [class]="config.backgroundLines"></div>
        <div [class]="config.backgroundFade"></div>
        <div [class]="config.blobAccent"></div>
        <div [class]="config.blobSecondary"></div>
      </div>

      @for (line of config.horizontalLines; track line.top; let i = $index) {
        <div
          [class]="lineClasses()"
          [style.top.px]="line.top"
          [style.transform]="lineStyles()[i].transform"
          [style.opacity]="lineStyles()[i].opacity"
          [style.transition-delay.ms]="lineStyles()[i].delayMs"
          aria-hidden="true"
        ></div>
      }

      <div #media [class]="config.mediaParallax">
        <div [class]="intro.isContentVisible() ? config.media.visible : config.media.hidden">
          <div [class]="config.mediaGlow" aria-hidden="true"></div>
          @if (flags.heroChromaKey) {
            <app-chroma-video
              [class]="config.video"
              [src]="links.media.heroVideo"
              [label]="config.texts.videoLabel"
              [playing]="videoPlaying()"
              (loopCompleted)="onVideoLoop()"
              (ready)="onVideoReady($event)"
            />
          }
        </div>
      </div>

      <div [class]="config.headlineWrap">
        <div [class]="intro.isContentVisible() ? config.headlineIntro.visible : config.headlineIntro.hidden">
          <p [class]="config.kicker">
            <span [class]="config.kickerDot" aria-hidden="true"></span>
            {{ config.texts.kicker }}
          </p>
          <h1 [class]="config.srOnly">{{ brand.fullName }} — {{ brand.role }}</h1>
          <p [class]="config.headline" aria-hidden="true">
            <span [class]="swapping() ? config.headlineSwap.out : config.headlineSwap.in">
              @for (line of slide().lines; track $index) {
                <span [class]="slide().compact ? config.titleLine + ' ' + config.compactText : config.titleLine">{{ line }}</span>
              }
              <span [class]="slide().compact ? config.highlightWrap + ' ' + config.compactText : config.highlightWrap">
                <span [class]="swapping() ? config.highlightMarker.out : config.highlightMarker.in"></span>
                <span [class]="config.highlightText">{{ slide().highlight }}</span>
              </span>
            </span>
          </p>
        </div>
      </div>

      <div [class]="config.bottomBar">
        <div [class]="intro.isContentVisible() ? config.controls : config.controls + ' ' + config.controlsHidden">
          <app-button variant="outline" size="icon" [ariaLabel]="config.texts.previous" (pressed)="previous()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </app-button>
          <span [class]="config.counter" aria-live="polite">
            <span [class]="config.counterCurrent">{{ counterLabel(activeIndex()) }}</span>
            {{ config.texts.counterSeparator }} {{ counterLabel(config.slides.length - 1) }}
          </span>
          <app-button variant="outline" size="icon" [ariaLabel]="config.texts.next" (pressed)="next()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </app-button>
          @if (autoAdvance() !== 'off') {
            <span [class]="config.progressTrack" aria-hidden="true">
              @for (key of [progressKey()]; track key) {
                <span [class]="config.progressBar" [style.--slide-duration]="slideDurationMs() + 'ms'"></span>
              }
            </span>
          }
        </div>

        <a routerLink="/" [fragment]="anchors.about" [class]="config.scrollHint">
          {{ config.texts.scrollHint }}
          <svg [class]="config.scrollHintIcon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M7 12l-4.5-4.5M7 12l4.5-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly config = heroConfig;
  protected readonly brand = brandConstant;
  protected readonly links = linksConstant;
  protected readonly anchors = anchorsConstant;
  protected readonly flags = featureFlagsConstant;
  protected readonly intro = inject(IntroAnimationService);

  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly heroView = viewChild.required(InViewDirective);
  private readonly backgroundRef = viewChild.required<ElementRef<HTMLElement>>('background');
  private readonly mediaRef = viewChild.required<ElementRef<HTMLElement>>('media');

  private readonly reducedMotion =
    isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly finePointer =
    isPlatformBrowser(this.platformId) && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  protected readonly activeIndex = signal(0);
  private readonly displayedIndex = signal(0);
  protected readonly swapping = signal(false);
  protected readonly pointerZone = signal<HeroPointerZone | null>(null);
  protected readonly autoAdvance = signal<HeroAutoAdvance>(this.reducedMotion ? 'off' : 'video');
  protected readonly progressKey = signal(0);
  private readonly videoDurationMs = signal(4000);

  protected readonly slide = computed(() => this.config.slides[this.displayedIndex()] ?? this.config.slides[0]!);

  protected readonly slideDurationMs = computed(() =>
    this.autoAdvance() === 'timer' ? this.config.timerSlideMs : this.videoDurationMs() * this.config.loopsPerSlide,
  );

  protected readonly videoPlaying = computed(
    () => !this.reducedMotion && this.intro.isContentVisible() && this.heroView().isInView(),
  );

  protected readonly sectionClasses = computed(() => {
    const zone = this.pointerZone();
    return zone ? `${this.config.section} ${this.config.cursors[zone]}` : this.config.section;
  });

  protected readonly lineClasses = computed(() => {
    const phase = this.intro.phase();
    const color = phase === 'pending' ? this.config.lineColors.intro : this.config.lineColors.settled;
    return `${this.config.horizontalLine} ${color} ${this.config.lineTransitions[phase]}`;
  });

  protected readonly lineStyles = computed<HeroLineStyle[]>(() => {
    const phase = this.intro.phase();
    const lines = this.config.horizontalLines;
    const firstTop = lines[0]?.top ?? 0;

    return lines.map((line, index): HeroLineStyle => {
      switch (phase) {
        case 'pending':
          return { transform: `translateY(${-(line.top + 20)}px)`, opacity: 0.5, delayMs: 0 };
        case 'converge':
          return { transform: `translateY(${firstTop - line.top}px)`, opacity: line.opacity, delayMs: 0 };
        default:
          return {
            transform: 'translateY(0)',
            opacity: line.opacity,
            delayMs: phase === 'reveal' ? Math.max(0, index - 1) * introTimeline.horizontalStaggerMs : 0,
          };
      }
    });
  });

  private loopCount = 0;
  private swapTimer: ReturnType<typeof setTimeout> | null = null;
  private autoTimer: ReturnType<typeof setInterval> | null = null;
  private pointerStart = { x: 0, y: 0 };
  protected pointerActive = false;

  constructor() {
    afterNextRender(() => {
      this.intro.play();
      this.setupParallax();
      if (!this.flags.heroChromaKey && !this.reducedMotion) {
        this.startTimer();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.clearSwapTimer();
      this.stopTimer();
    });
  }

  protected counterLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected next(): void {
    this.goTo((this.activeIndex() + 1) % this.config.slides.length);
  }

  protected previous(): void {
    const total = this.config.slides.length;
    this.goTo((this.activeIndex() - 1 + total) % total);
  }

  protected onVideoReady(renderer: ChromaRenderer): void {
    if (this.reducedMotion) {
      return;
    }
    if (renderer === 'native') {
      this.startTimer();
    }
  }

  protected onVideoLoop(): void {
    if (this.autoAdvance() !== 'video') {
      return;
    }
    this.loopCount += 1;
    if (this.loopCount >= this.config.loopsPerSlide) {
      this.next();
    }
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.finePointer || event.pointerType !== 'mouse') {
      return;
    }
    this.pointerZone.set(this.isInteractive(event) ? null : this.zoneAt(event));
  }

  protected onPointerDown(event: PointerEvent): void {
    this.pointerStart = { x: event.clientX, y: event.clientY };
    this.pointerActive = true;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.pointerActive || this.isInteractive(event)) {
      this.pointerActive = false;
      return;
    }
    this.pointerActive = false;

    const dx = event.clientX - this.pointerStart.x;
    const dy = event.clientY - this.pointerStart.y;
    const isTap = Math.abs(dx) < this.config.tapThresholdPx && Math.abs(dy) < this.config.tapThresholdPx;

    if (isTap) {
      const zone = this.finePointer && event.pointerType === 'mouse' ? this.zoneAt(event) : 'next';
      if (zone === 'down') {
        void this.router.navigate(['/'], { fragment: this.anchors.about });
      } else if (zone === 'prev') {
        this.previous();
      } else {
        this.next();
      }
      return;
    }

    if (Math.abs(dx) > this.config.swipeThresholdPx && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        this.next();
      } else {
        this.previous();
      }
    }
  }

  private goTo(index: number): void {
    if (index === this.activeIndex()) {
      return;
    }
    this.activeIndex.set(index);
    this.loopCount = 0;
    this.progressKey.update((key) => key + 1);
    if (this.autoAdvance() === 'timer') {
      this.startTimer();
    }

    if (this.reducedMotion) {
      this.displayedIndex.set(index);
      return;
    }

    this.clearSwapTimer();
    this.swapping.set(true);
    this.swapTimer = setTimeout(() => {
      this.displayedIndex.set(this.activeIndex());
      this.swapping.set(false);
    }, this.config.swapDurationMs);
  }

  private zoneAt(event: PointerEvent): HeroPointerZone {
    const target = event.currentTarget;
    const rect =
      target instanceof HTMLElement ? target.getBoundingClientRect() : new DOMRect(0, 0, innerWidth, innerHeight);
    if (event.clientY >= rect.top + rect.height * (1 - this.config.downZoneRatio)) {
      return 'down';
    }
    return event.clientX < rect.left + rect.width / 2 ? 'prev' : 'next';
  }

  private isInteractive(event: Event): boolean {
    return event.target instanceof Element && event.target.closest('a, button') !== null;
  }

  private startTimer(): void {
    this.stopTimer();
    this.autoAdvance.set('timer');
    this.ngZone.runOutsideAngular(() => {
      this.autoTimer = setInterval(() => {
        if (this.heroView().isInView()) {
          this.next();
        }
      }, this.config.timerSlideMs);
    });
  }

  private stopTimer(): void {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
  }

  private clearSwapTimer(): void {
    if (this.swapTimer) {
      clearTimeout(this.swapTimer);
      this.swapTimer = null;
    }
  }

  /** Paralaxe frontal: conteúdo e fundo recebem o MESMO fator de translação. */
  private setupParallax(): void {
    if (!isPlatformBrowser(this.platformId) || !this.flags.heroParallax || this.reducedMotion) {
      return;
    }
    const media = this.mediaRef().nativeElement;
    const background = this.backgroundRef().nativeElement;

    this.ngZone.runOutsideAngular(() => {
      const onScroll = (): void => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight * 1.2) {
          return;
        }
        const transform = `translate3d(0, ${scrollY * this.config.parallaxFactor}px, 0)`;
        media.style.transform = transform;
        background.style.transform = transform;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../../components/elements/button/button.component';
import { CardComponent } from '../../../../components/elements/card/card.component';
import { anchorsConstant } from '../../../../core/constants/anchors.constant';
import { CountUpDirective } from '../../../../core/directives/count-up.directive';
import { InViewDirective } from '../../../../core/directives/in-view.directive';
import { journeyConfig } from './journey.config';
import { JourneySide } from './journey.types';

/**
 * Linha do tempo inspirada no site do Nesh: cards em cascata ligados por uma espinha
 * que se desenha com o scroll, ano com contador e popup "Ler mais".
 */
@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [ButtonComponent, CardComponent, CountUpDirective, InViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()' },
  template: `
    <section [id]="anchors.journey" [class]="config.section">
      <div [class]="config.inner">
        <header [class]="config.header">
          <p [class]="config.label">{{ config.texts.label }}</p>
          <h2 [class]="config.title">
            {{ config.texts.titleStart }}
            <span [class]="config.titleAmp">{{ config.texts.titleAmp }}</span>
            {{ config.texts.titleEnd }}
          </h2>
          <p [class]="config.lead">{{ config.texts.lead }}</p>
        </header>

        <div #timeline [class]="config.timeline">
          <div [class]="config.spine" aria-hidden="true">
            <div #spineFill [class]="config.spineFill"></div>
          </div>

          <ol [class]="config.list">
            @for (entry of config.entries; track entry.year; let i = $index) {
              <li
                appInView
                #view="inView"
                [inViewThreshold]="0.25"
                [class]="itemClasses(i)"
                [style.grid-row]="i + 1"
              >
                <span [class]="config.connector[side(i)]" aria-hidden="true"></span>
                <span [class]="config.dot[side(i)]" aria-hidden="true"></span>

                <app-card
                  variant="glass"
                  padding="lg"
                  [class]="view.isInView() ? config.cardReveal[side(i)].visible : config.cardReveal[side(i)].hidden"
                >
                  <span [class]="config.srOnly">{{ entry.year }}</span>
                  <span [class]="config.year" aria-hidden="true">
                    <span [class]="config.yearApostrophe">'</span><span
                      [appCountUp]="entry.year % 100"
                      [countUpActive]="view.isInView()"
                    >00</span>
                  </span>
                  <h3 [class]="config.cardTitle">{{ entry.title }}</h3>
                  <p [class]="config.cardSummary">{{ entry.summary }}</p>

                  <div [class]="config.cardBottom">
                    <div [class]="config.cardBottomLeft">
                      <span [class]="config.marks" aria-hidden="true">
                        <span [class]="config.mark">{{ entry.marks[0] }}</span>
                        <span [class]="config.mark + ' ' + config.markSecond">{{ entry.marks[1] }}</span>
                      </span>
                      <p [class]="config.meta">
                        {{ entry.handle }}<br />{{ relativeTime(entry.year) }}
                      </p>
                    </div>
                    <app-button
                      variant="soft"
                      size="sm"
                      [elementId]="'journey-more-' + i"
                      [ariaLabel]="config.texts.readMoreAria + ' ' + entry.title"
                      [ariaExpanded]="openIndex() === i"
                      [ariaControls]="'journey-popup-' + i"
                      (pressed)="open(i)"
                    >
                      {{ config.texts.readMore }}
                    </app-button>
                  </div>

                  <div
                    [id]="'journey-popup-' + i"
                    role="dialog"
                    [attr.aria-labelledby]="'journey-popup-title-' + i"
                    [attr.aria-hidden]="openIndex() !== i"
                    [attr.inert]="openIndex() === i ? null : ''"
                    [class]="openIndex() === i ? config.popup.open : config.popup.closed"
                  >
                    <app-card variant="popup-dark" padding="lg">
                      <div [class]="config.popupTop">
                        <span [class]="config.popupYear">{{ entry.year }}</span>
                        <app-button
                          variant="ghost-inverse"
                          size="icon"
                          [elementId]="'journey-close-' + i"
                          [ariaLabel]="config.texts.close"
                          (pressed)="close()"
                        >
                          <span [class]="config.popupCloseBar" aria-hidden="true"></span>
                          <span [class]="config.popupCloseBarSecond" aria-hidden="true"></span>
                        </app-button>
                      </div>
                      <h4 [id]="'journey-popup-title-' + i" [class]="config.popupTitle">{{ entry.title }}</h4>
                      <p [class]="config.popupStory">{{ entry.story }}</p>
                    </app-card>
                  </div>
                </app-card>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
})
export class JourneyComponent {
  protected readonly config = journeyConfig;
  protected readonly anchors = anchorsConstant;
  protected readonly openIndex = signal<number | null>(null);

  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly timelineRef = viewChild.required<ElementRef<HTMLElement>>('timeline');
  private readonly spineFillRef = viewChild.required<ElementRef<HTMLElement>>('spineFill');
  private readonly currentYear = new Date().getFullYear();

  constructor() {
    afterNextRender(() => this.setupSpineProgress());
  }

  protected side(index: number): JourneySide {
    return index % 2 === 0 ? 'left' : 'right';
  }

  protected itemClasses(index: number): string {
    const base = this.config.item[this.side(index)];
    return this.openIndex() === index ? `${base} ${this.config.itemRaised}` : base;
  }

  protected relativeTime(year: number): string {
    const diff = this.currentYear - year;
    if (diff <= 0) {
      return this.config.texts.now;
    }
    return `${diff} ${diff === 1 ? this.config.texts.yearAgo : this.config.texts.yearsAgo}`;
  }

  protected open(index: number): void {
    this.openIndex.set(index);
    this.focusLater(`journey-close-${index}`);
  }

  protected close(): void {
    const index = this.openIndex();
    if (index === null) {
      return;
    }
    this.openIndex.set(null);
    this.focusLater(`journey-more-${index}`);
  }

  private focusLater(id: string): void {
    setTimeout(() => this.document.getElementById(id)?.focus(), 60);
  }

  /** A espinha central se preenche conforme o usuário rola pela linha do tempo. */
  private setupSpineProgress(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const timeline = this.timelineRef().nativeElement;
    const fill = this.spineFillRef().nativeElement;

    this.ngZone.runOutsideAngular(() => {
      const update = (): void => {
        const rect = timeline.getBoundingClientRect();
        const anchor = window.innerHeight * 0.65;
        const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
        fill.style.transform = `scaleY(${progress})`;
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });
  }
}

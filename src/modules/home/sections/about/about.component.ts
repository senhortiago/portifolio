import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  NgZone,
  PLATFORM_ID,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { BadgeComponent } from '../../../../components/elements/badge/badge.component';
import { CardComponent } from '../../../../components/elements/card/card.component';
import { anchorsConstant } from '../../../../core/constants/anchors.constant';
import { InViewDirective } from '../../../../core/directives/in-view.directive';
import { aboutConfig } from './about.config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BadgeComponent, CardComponent, InViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="anchors.about" [class]="config.section">
      <div [class]="config.inner">
        <div appInView #intro="inView" [class]="intro.isInView() ? config.reveal.visible : config.reveal.hidden">
          <h2 [class]="config.label">{{ config.texts.label }}</h2>
          <p [class]="config.statement">
            {{ config.texts.statement }}
            <span [class]="config.statementMuted">{{ config.texts.statementMuted }}</span>
          </p>
          <p [class]="config.rotatingRow">
            <span [class]="config.rotatingPrefix">{{ config.texts.rotatingPrefix }}</span>
            <span [class]="config.srOnly">{{ config.rotatingTerms.join(', ') }}</span>
            <span [class]="config.rotatingBadge" aria-hidden="true">
              {{ typedText() }}<span [class]="config.rotatingCaret" aria-hidden="true"></span>
            </span>
          </p>
        </div>

        <div appInView #body="inView" [class]="config.grid">
          <div [class]="config.bioColumn">
            @for (paragraph of config.texts.bio; track $index) {
              <p [class]="config.bio">{{ paragraph }}</p>
            }
            <ul [class]="config.traitList">
              @for (trait of config.traits; track trait) {
                <li>
                  <app-badge variant="glass" color="primary">
                    <span [class]="config.traitIcon" aria-hidden="true"></span>
                    {{ trait }}
                  </app-badge>
                </li>
              }
            </ul>
          </div>

          <div [class]="config.statsGrid">
            @for (stat of config.stats; track stat.value; let i = $index) {
              <app-card
                variant="glass"
                padding="md"
                [class]="body.isInView() ? config.reveal.visible : config.reveal.hidden"
                [style.transition-delay.ms]="i * 90"
              >
                <div [class]="config.statCard">
                  <span [class]="config.statValue">{{ stat.value }}</span>
                  <span [class]="config.statLabel">{{ stat.label }}</span>
                </div>
              </app-card>
            }
          </div>
        </div>
      </div>

      <div [class]="config.marquee" [attr.aria-label]="config.texts.stackLabel" role="region">
        <div [class]="config.marqueeTrack">
          @for (copy of [0, 1]; track copy) {
            <ul [class]="config.marqueeList" [attr.aria-hidden]="copy === 1 ? 'true' : null">
              @for (tech of config.stack; track tech) {
                <li [class]="config.marqueeItem">
                  {{ tech }}
                  <span [class]="config.marqueeDot" aria-hidden="true"></span>
                </li>
              }
            </ul>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly config = aboutConfig;
  protected readonly anchors = anchorsConstant;
  protected readonly typedText = signal(aboutConfig.rotatingTerms[0] ?? '');

  private readonly introView = viewChild.required<InViewDirective>('intro');
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private termIndex = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private running = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());

    const reducedMotion =
      isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    effect(() => {
      if (this.introView().isInView() && !reducedMotion && !this.running) {
        this.running = true;
        this.ngZone.runOutsideAngular(() => this.schedule(() => this.erase(), this.config.typing.holdMs));
      }
    });
  }

  /** Efeito de digitação: apaga caractere a caractere e digita o próximo termo. */
  private erase(): void {
    const current = this.typedText();
    if (current.length === 0) {
      this.termIndex = (this.termIndex + 1) % this.config.rotatingTerms.length;
      this.schedule(() => this.type(), this.config.typing.pauseMs);
      return;
    }
    this.typedText.set(current.slice(0, -1));
    this.schedule(() => this.erase(), this.config.typing.deleteMs);
  }

  private type(): void {
    const target = this.config.rotatingTerms[this.termIndex] ?? '';
    const current = this.typedText();
    if (current.length >= target.length) {
      this.schedule(() => this.erase(), this.config.typing.holdMs);
      return;
    }
    this.typedText.set(target.slice(0, current.length + 1));
    this.schedule(() => this.type(), this.config.typing.typeMs);
  }

  private schedule(fn: () => void, delay: number): void {
    this.timer = setTimeout(fn, delay);
  }

  private stop(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

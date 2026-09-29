import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { brandConstant } from '../../../core/constants/brand.constant';
import { linksConstant } from '../../../core/constants/links.constant';
import { IntroAnimationService } from '../../../core/services/intro-animation/intro-animation.service';
import { SmoothScrollService } from '../../../core/services/smooth-scroll/smooth-scroll.service';
import { ButtonComponent } from '../../elements/button/button.component';
import { headerConfig } from './header.config';
import { HeaderTone } from './header.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMenu()' },
  template: `
    <div [class]="config.blurStrip" aria-hidden="true"></div>

    <header [class]="barClasses()">
      <div [class]="config.brandGroup">
        <a routerLink="/" [class]="config.logo + ' ' + tone().logo" [attr.aria-label]="config.logoAriaLabel" (click)="closeMenu()">
          <span [class]="config.logoMark" aria-hidden="true">TB</span>
          <span>{{ brand.fullName }}</span>
        </a>
        <span [class]="config.status + ' ' + tone().status">
          <span [class]="config.statusDot" aria-hidden="true">
            <span [class]="config.statusPulse"></span>
            <span [class]="config.statusDotCore"></span>
          </span>
          {{ brand.availability }}
        </span>
      </div>

      <nav [class]="config.nav + ' ' + tone().nav" [attr.aria-label]="config.navAriaLabel">
        @for (item of config.items; track item.fragment; let i = $index) {
          <a routerLink="/" [fragment]="item.fragment" [class]="config.navLink + ' ' + tone().navLink">
            <span [class]="config.navIndex + ' ' + tone().navIndex" aria-hidden="true">0{{ i + 1 }}</span>
            {{ item.label }}
          </a>
        }
      </nav>

      <div [class]="config.actions">
        <app-button
          [variant]="tone().buttonVariant"
          size="sm"
          [href]="links.resume.url"
          target="_blank"
          [ariaLabel]="config.resumeAriaLabel"
          [class]="config.resumeHost"
        >
          {{ config.resumeLabel }}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </app-button>

        <app-button
          [variant]="tone().buttonVariant"
          size="md"
          [class]="config.menuHost"
          [ariaExpanded]="menuOpen()"
          ariaControls="mobile-menu"
          (pressed)="toggleMenu()"
        >
          {{ menuOpen() ? config.menuLabelClose : config.menuLabelOpen }}
          <span [class]="config.menuIcon" aria-hidden="true">
            <span [class]="menuOpen() ? config.menuIconBar + ' ' + config.menuIconBarTopOpen : config.menuIconBar"></span>
            <span [class]="menuOpen() ? config.menuIconBar + ' ' + config.menuIconBarBottomOpen : config.menuIconBar"></span>
          </span>
        </app-button>
      </div>
    </header>

    <div
      id="mobile-menu"
      [class]="panelClasses()"
      [attr.aria-hidden]="!menuOpen()"
      [attr.inert]="menuOpen() ? null : ''"
    >
      <nav [attr.aria-label]="config.navAriaLabel">
        @for (item of config.items; track item.fragment; let i = $index) {
          <a routerLink="/" [fragment]="item.fragment" [class]="config.mobileLink" (click)="closeMenu()">
            <span [class]="config.mobileIndex" aria-hidden="true">0{{ i + 1 }}</span>
            {{ item.label }}
          </a>
        }
      </nav>
      <div [class]="config.mobileFooter">
        <app-button variant="accent" size="lg" [fullWidth]="true" [href]="links.resume.url" target="_blank">
          {{ config.mobileResumeLabel }}
        </app-button>
      </div>
    </div>
  `,
})
export class HeaderComponent {
  protected readonly config = headerConfig;
  protected readonly brand = brandConstant;
  protected readonly links = linksConstant;

  private readonly intro = inject(IntroAnimationService);
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly menuOpen = signal(false);
  private readonly overDark = signal(false);

  protected readonly tone = computed(() => {
    const key: HeaderTone = this.menuOpen() || this.overDark() ? 'dark' : 'light';
    return this.config.tones[key];
  });

  protected readonly barClasses = computed(
    () =>
      `${this.config.inner} ${this.intro.isContentVisible() || this.menuOpen() ? this.config.bar.visible : this.config.bar.hidden}`,
  );

  protected readonly panelClasses = computed(
    () => `${this.config.mobileNav} ${this.menuOpen() ? this.config.mobilePanel.open : this.config.mobilePanel.closed}`,
  );

  constructor() {
    afterNextRender(() => this.watchSectionTone());
  }

  protected toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    if (next) {
      this.smoothScroll.stop();
    } else {
      this.smoothScroll.start();
    }
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.smoothScroll.start();
  }

  /** Inverte as cores do header quando ele passa sobre seções marcadas com data-header-theme="dark". */
  private watchSectionTone(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      const probe = (): void => {
        const y = this.config.toneProbeY;
        const sections = this.document.querySelectorAll<HTMLElement>(this.config.darkSectionSelector);
        let dark = false;
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= y && rect.bottom >= y) {
            dark = true;
          }
        });
        if (dark !== this.overDark()) {
          this.overDark.set(dark);
        }
      };
      probe();
      window.addEventListener('scroll', probe, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', probe));
    });
  }
}

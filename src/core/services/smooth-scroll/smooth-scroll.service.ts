import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import Lenis from 'lenis';
import { filter } from 'rxjs';
import { smoothScrollSettings } from './smooth-scroll.types';

/**
 * Motor global de scroll (Lenis) + Matriz de Navegação de âncoras.
 * O laço de `requestAnimationFrame` roda fora da zona do Angular.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private lenis: Lenis | null = null;
  private rafId = 0;
  private lookupTimer: ReturnType<typeof setInterval> | null = null;
  private previousPath: string | null = null;
  private reducedMotion = false;
  private anchorLockRelease: (() => void) | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.lenis) {
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        lerp: smoothScrollSettings.lerp,
        smoothWheel: !this.reducedMotion,
      });

      const loop = (time: number): void => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(loop);
      };
      this.rafId = requestAnimationFrame(loop);
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.handleNavigation(event.urlAfterRedirects));

    this.destroyRef.onDestroy(() => this.destroy());
  }

  /** Bloqueia o scroll (ex: menu mobile aberto). */
  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  private handleNavigation(url: string): void {
    this.releaseAnchorLock();
    const tree = this.router.parseUrl(url);
    const path = url.split(/[?#]/)[0] ?? '/';
    const fragment = tree.fragment;
    const isSamePage = this.previousPath === path;
    this.previousPath = path;

    this.clearLookup();

    if (fragment && !isSamePage) {
      // 1. Página diferente COM âncora
      this.scrollToTop(true);
      this.lenis?.resize();
      this.waitForElementAndScroll(fragment);
      return;
    }

    if (fragment && isSamePage) {
      // 2. Mesma página COM âncora
      this.lenis?.resize();
      const target = this.document.getElementById(fragment);
      if (target) {
        this.scrollToElement(target);
      }
      return;
    }

    // 3. Página diferente SEM âncora → salto instantâneo
    // 4. Mesma página SEM âncora → desliza até o topo
    this.scrollToTop(!isSamePage);
  }

  private waitForElementAndScroll(fragment: string): void {
    let attempts = 0;
    this.ngZone.runOutsideAngular(() => {
      this.lookupTimer = setInterval(() => {
        attempts += 1;
        const target = this.document.getElementById(fragment);
        if (target) {
          this.clearLookup();
          this.lenis?.resize();
          this.scrollToElement(target);
        } else if (attempts >= smoothScrollSettings.lookupMaxAttempts) {
          this.clearLookup();
        }
      }, smoothScrollSettings.lookupIntervalMs);
    });
  }

  private scrollToElement(target: HTMLElement): void {
    if (!this.lenis) {
      target.scrollIntoView();
      return;
    }
    this.lenis.scrollTo(target, {
      offset: smoothScrollSettings.anchorOffset,
      duration: smoothScrollSettings.duration,
      easing: smoothScrollSettings.easing,
      immediate: this.reducedMotion,
      force: true,
    });
    this.lockToAnchor(target);
  }

  /**
   * Anchor lock: enquanto o layout ainda se estabiliza (fontes, dados assíncronos),
   * qualquer mudança de altura recalcula o Lenis e reposiciona o alvo.
   * Cancelado ao fim da janela ou na primeira interação do usuário.
   */
  private lockToAnchor(target: HTMLElement): void {
    this.releaseAnchorLock();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const realign = (): void => {
        if (!this.lenis) {
          return;
        }
        this.lenis.resize();
        this.lenis.scrollTo(target, {
          offset: smoothScrollSettings.anchorOffset,
          duration: smoothScrollSettings.duration,
          easing: smoothScrollSettings.easing,
          immediate: this.reducedMotion,
          force: true,
        });
      };

      const observer = new ResizeObserver(() => realign());
      observer.observe(this.document.body);
      void this.document.fonts?.ready.then(() => this.anchorLockRelease && realign());

      const userEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
      const release = (): void => this.releaseAnchorLock();
      userEvents.forEach((type) => window.addEventListener(type, release, { passive: true, once: true }));
      const timer = setTimeout(release, smoothScrollSettings.anchorLockMs);

      this.anchorLockRelease = () => {
        observer.disconnect();
        clearTimeout(timer);
        userEvents.forEach((type) => window.removeEventListener(type, release));
      };
    });
  }

  private releaseAnchorLock(): void {
    const release = this.anchorLockRelease;
    this.anchorLockRelease = null;
    release?.();
  }

  private scrollToTop(immediate: boolean): void {
    if (!this.lenis) {
      window.scrollTo(0, 0);
      return;
    }
    this.lenis.scrollTo(0, {
      immediate: immediate || this.reducedMotion,
      duration: smoothScrollSettings.duration,
      easing: smoothScrollSettings.easing,
      force: true,
    });
  }

  private clearLookup(): void {
    if (this.lookupTimer) {
      clearInterval(this.lookupTimer);
      this.lookupTimer = null;
    }
  }

  private destroy(): void {
    this.clearLookup();
    this.releaseAnchorLock();
    cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.lenis = null;
  }
}

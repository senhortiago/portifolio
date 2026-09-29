import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Expõe `isInView()` como Signal. Uso: `<div appInView #v="inView">`.
 * Sem suporte a IntersectionObserver, o conteúdo é exibido direto (graceful degradation).
 */
@Directive({
  selector: '[appInView]',
  standalone: true,
  exportAs: 'inView',
})
export class InViewDirective {
  readonly inViewThreshold = input(0.2);
  readonly inViewRootMargin = input('0px 0px -8% 0px');
  readonly inViewOnce = input(true);

  private readonly visible = signal(false);
  readonly isInView = this.visible.asReadonly();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
        this.visible.set(true);
        return;
      }

      this.ngZone.runOutsideAngular(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry) {
              return;
            }
            if (entry.isIntersecting) {
              this.visible.set(true);
              if (this.inViewOnce()) {
                observer.disconnect();
              }
            } else if (!this.inViewOnce()) {
              this.visible.set(false);
            }
          },
          { threshold: this.inViewThreshold(), rootMargin: this.inViewRootMargin() },
        );
        observer.observe(this.host.nativeElement);
        this.destroyRef.onDestroy(() => observer.disconnect());
      });
    });
  }
}

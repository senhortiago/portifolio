import { DestroyRef, Directive, ElementRef, NgZone, effect, inject, input } from '@angular/core';

/** Anima um número de 0 até `appCountUp` quando `countUpActive` vira true (easing expo.out). */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective {
  readonly appCountUp = input.required<number>();
  readonly countUpActive = input(false);
  readonly countUpDuration = input(1500);
  readonly countUpPad = input(2);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private rafId = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.rafId));

    effect(() => {
      const target = this.appCountUp();
      if (!this.countUpActive()) {
        this.write(0);
        return;
      }
      this.ngZone.runOutsideAngular(() => this.animate(target));
    });
  }

  private animate(target: number): void {
    cancelAnimationFrame(this.rafId);
    const duration = this.countUpDuration();
    const startedAt = performance.now();

    const step = (now: number): void => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      this.write(Math.round(target * eased));
      if (progress < 1) {
        this.rafId = requestAnimationFrame(step);
      }
    };
    this.rafId = requestAnimationFrame(step);
  }

  private write(value: number): void {
    this.host.nativeElement.textContent = String(value).padStart(this.countUpPad(), '0');
  }
}

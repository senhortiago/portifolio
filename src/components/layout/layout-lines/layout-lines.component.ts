import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IntroAnimationService } from '../../../core/services/intro-animation/intro-animation.service';
import { layoutLinesConfig } from './layout-lines.config';

/** Linhas verticais fixas do grid editorial. Na intro, nascem no centro e deslizam até as margens. */
@Component({
  selector: 'app-layout-lines',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config.wrapper" aria-hidden="true">
      <div [class]="leftClasses()"></div>
      <div [class]="rightClasses()"></div>
    </div>
  `,
})
export class LayoutLinesComponent {
  protected readonly config = layoutLinesConfig;
  private readonly intro = inject(IntroAnimationService);

  private readonly transition = computed(() =>
    this.intro.phase() === 'pending' ? '' : this.config.transition,
  );

  protected readonly leftClasses = computed(
    () => `${this.config.lineBase} ${this.config.left[this.intro.phase()]} ${this.transition()}`,
  );
  protected readonly rightClasses = computed(
    () => `${this.config.lineBase} ${this.config.right[this.intro.phase()]} ${this.transition()}`,
  );
}

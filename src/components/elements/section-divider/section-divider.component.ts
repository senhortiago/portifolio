import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { sectionDividerConfig } from './section-divider.config';
import { DividerPlacement, DividerShape, DividerTone } from './section-divider.types';

/**
 * Divisor geométrico entre seções. A seção hospedeira NÃO pode ter overflow-hidden.
 */
@Component({
  selector: 'app-section-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [class]="svgClasses()"
      [attr.viewBox]="config.viewBox"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path [attr.d]="path()" />
    </svg>
  `,
})
export class SectionDividerComponent {
  readonly shape = input<DividerShape>('dome');
  readonly placement = input<DividerPlacement>('top');
  readonly tone = input<DividerTone>('dark');

  protected readonly config = sectionDividerConfig;

  protected readonly path = computed(() => this.config.paths[this.shape()][this.placement()]);
  protected readonly svgClasses = computed(
    () =>
      `${this.config.svg} ${this.config.placements[this.placement()]} ${this.config.tones[this.tone()]}`,
  );
}

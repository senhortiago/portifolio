import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { badgeConfig } from './badge.config';
import { BadgeColor, BadgeVariant } from './badge.types';

/** Casca estrutural: o pai projeta texto e/ou ícones via <ng-content>. */
@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()"><ng-content /></span>`,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('tinted');
  readonly color = input<BadgeColor>('primary');

  protected readonly classes = computed(
    () => `${badgeConfig.base} ${badgeConfig.matrix[this.variant()][this.color()]}`,
  );
}

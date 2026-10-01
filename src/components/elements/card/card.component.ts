import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cardConfig } from './card.config';
import { CardPadding, CardVariant } from './card.types';

/**
 * Casca Oca: dita apenas fundo, borda, raio, sombra e padding.
 * Tipografia e composição interna pertencem à seção que consome o card.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClass' },
  template: `<div [class]="classes()"><ng-content /></div>`,
})
export class CardComponent {
  readonly variant = input<CardVariant>('solid');
  readonly padding = input<CardPadding>('md');

  protected readonly hostClass = cardConfig.host;
  protected readonly classes = computed(
    () => `${cardConfig.base} ${cardConfig.variants[this.variant()]} ${cardConfig.paddings[this.padding()]}`,
  );
}

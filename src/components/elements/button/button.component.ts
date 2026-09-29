import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { buttonConfig } from './button.config';
import { ButtonSize, ButtonTarget, ButtonType, ButtonVariant } from './button.types';

/**
 * Botão Mestre: renderiza <a routerLink>, <a href> ou <button>
 * de acordo com os atributos recebidos.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    <ng-template #content><ng-content /></ng-template>

    @if (link() !== null) {
      <a
        [routerLink]="link()"
        [fragment]="fragment() ?? undefined"
        [class]="classes()"
        [attr.id]="elementId()"
        [attr.aria-label]="ariaLabel()"
        (click)="pressed.emit($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else if (href() !== null) {
      <a
        [href]="href()"
        [attr.target]="target()"
        [attr.rel]="target() === '_blank' ? 'noopener noreferrer' : null"
        [attr.download]="download()"
        [class]="classes()"
        [attr.id]="elementId()"
        [attr.aria-label]="ariaLabel()"
        (click)="pressed.emit($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        [class]="classes()"
        [attr.id]="elementId()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-expanded]="ariaExpanded()"
        [attr.aria-controls]="ariaControls()"
        (click)="pressed.emit($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </button>
    }
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('solid');
  readonly size = input<ButtonSize>('md');
  readonly link = input<string | null>(null);
  readonly fragment = input<string | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<ButtonTarget>('_self');
  readonly download = input<string | null>(null);
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly elementId = input<string | null>(null);
  /** Classes estruturais (layout/espaçamento) ditadas pelo componente pai. */
  readonly layoutClass = input('');
  readonly ariaLabel = input<string | null>(null);
  readonly ariaExpanded = input<boolean | null>(null);
  readonly ariaControls = input<string | null>(null);

  readonly pressed = output<MouseEvent>();

  protected readonly hostClasses = computed(() =>
    this.fullWidth() ? buttonConfig.hostFullWidth : buttonConfig.host,
  );

  protected readonly classes = computed(() => {
    if (this.variant() === 'bare') {
      return this.layoutClass();
    }
    return [
      buttonConfig.base,
      buttonConfig.variants[this.variant()],
      buttonConfig.sizes[this.size()],
      this.fullWidth() ? buttonConfig.fullWidth : '',
      this.disabled() ? buttonConfig.disabled : '',
      this.layoutClass(),
    ].join(' ');
  });
}

import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { textFieldConfig } from './text-field.config';
import { TextFieldType } from './text-field.types';

/** Campo de texto acessível (label + erro associados) compatível com Reactive Forms. */
@Component({
  selector: 'app-text-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'config.host' },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextFieldComponent), multi: true }],
  template: `
    <label [for]="fieldId()" [class]="config.label">
      {{ label() }}
      @if (optionalLabel()) {
        <span [class]="config.optional">{{ optionalLabel() }}</span>
      }
    </label>

    @if (multiline()) {
      <textarea
        [id]="fieldId()"
        [class]="controlClasses()"
        [rows]="rows()"
        [value]="value()"
        [disabled]="isDisabled()"
        [attr.name]="fieldId()"
        [attr.placeholder]="placeholder()"
        [attr.required]="required() ? '' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId() : null"
        (input)="onInput($event)"
        (blur)="onTouched()"
      ></textarea>
    } @else {
      <input
        [id]="fieldId()"
        [type]="type()"
        [class]="controlClasses()"
        [value]="value()"
        [disabled]="isDisabled()"
        [attr.name]="fieldId()"
        [attr.placeholder]="placeholder()"
        [attr.autocomplete]="autocomplete()"
        [attr.required]="required() ? '' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId() : null"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
    }

    @if (error()) {
      <p [id]="errorId()" [class]="config.error">{{ error() }}</p>
    }
  `,
})
export class TextFieldComponent implements ControlValueAccessor {
  readonly fieldId = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<TextFieldType>('text');
  readonly placeholder = input<string | null>(null);
  readonly autocomplete = input<string | null>(null);
  readonly optionalLabel = input<string | null>(null);
  readonly required = input(false);
  readonly multiline = input(false);
  readonly rows = input(5);
  readonly error = input<string | null>(null);

  protected readonly config = textFieldConfig;
  protected readonly value = signal('');
  protected readonly isDisabled = signal(false);
  protected readonly errorId = computed(() => `${this.fieldId()}-error`);
  protected readonly controlClasses = computed(() =>
    [
      this.config.control,
      this.multiline() ? this.config.textarea : '',
      this.error() ? this.config.controlInvalid : '',
    ].join(' '),
  );

  private onChange: (value: string) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      this.value.set(target.value);
      this.onChange(target.value);
    }
  }
}

import { TextFieldConfig } from './text-field.types';

export const textFieldConfig: TextFieldConfig = {
  host: 'flex flex-col',
  label: 'mb-2 flex items-baseline justify-between gap-2 text-sm font-medium text-brand-ink',
  optional: 'font-mono text-[0.7rem] font-normal uppercase tracking-[0.14em] text-brand-muted',
  control:
    'w-full rounded-xl border border-brand-ink/15 bg-brand-bg-soft px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 ' +
    'transition-[border-color,box-shadow] duration-300 focus:border-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-secondary/15',
  controlInvalid: 'border-brand-danger/70 focus:border-brand-danger focus:ring-brand-danger/15',
  textarea: 'min-h-[9rem] resize-y',
  error: 'mt-1.5 text-xs font-medium text-brand-danger',
};

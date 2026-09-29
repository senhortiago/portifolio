export type TextFieldType = 'text' | 'email' | 'tel';

export interface TextFieldConfig {
  host: string;
  label: string;
  optional: string;
  control: string;
  controlInvalid: string;
  textarea: string;
  error: string;
}

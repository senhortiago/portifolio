import { recaptchaConstant } from '../../constants/recaptcha.constant';

export type RecaptchaSize = 'normal' | 'compact';
export type RecaptchaTheme = 'light' | 'dark';

/** Parâmetros aceitos por `grecaptcha.render` (subconjunto usado aqui). */
export interface RecaptchaWidgetParams {
  sitekey: string;
  size: RecaptchaSize;
  theme: RecaptchaTheme;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

/** Superfície mínima da API global `grecaptcha` (v2, renderização explícita). */
export interface RecaptchaApi {
  render(container: HTMLElement, params: RecaptchaWidgetParams): number;
  reset(widgetId?: number): void;
}

export type RecaptchaWindow = Window & { grecaptcha?: RecaptchaApi } & Partial<
    Record<typeof recaptchaConstant.onloadCallback, () => void>
  >;

export interface RecaptchaRenderOptions {
  size: RecaptchaSize;
  theme: RecaptchaTheme;
  /** Token válido emitido após o usuário resolver o desafio. */
  onToken: (token: string) => void;
  /** Token expirou ou o widget falhou: o formulário volta a exigir verificação. */
  onInvalidated: () => void;
}

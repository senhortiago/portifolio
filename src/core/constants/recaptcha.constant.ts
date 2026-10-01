/**
 * Google reCAPTCHA v2 (checkbox) — https://www.google.com/recaptcha/admin.
 * A site key é pública; a secret key fica APENAS no painel do EmailJS (template → Settings → CAPTCHA).
 */
export const recaptchaConstant = {
  siteKey: '6LcVodgtAAAAAC-BNsoDYWkaSbRi89zR2h4PNOLf',
  scriptUrl: 'https://www.google.com/recaptcha/api.js',
  language: 'pt-BR',
  /** Nome da função global chamada pelo script do Google quando a API fica pronta. */
  onloadCallback: 'portfolioRecaptchaOnload',
} as const;

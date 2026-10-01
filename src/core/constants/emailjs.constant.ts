/**
 * Credenciais públicas do EmailJS (https://dashboard.emailjs.com).
 * Não são segredos: o EmailJS foi feito para expô-las no browser. A proteção contra abuso
 * vem do reCAPTCHA (validado pelo próprio EmailJS) e da lista de domínios permitidos na conta.
 */
export const emailjsConstant = {
  /** Email Services → Service ID */
  serviceId: 'service_s4u9eu3',
  /** Email Templates → Template ID */
  templateId: 'template_i91mbhn',
  /** Account → General → Public Key */
  publicKey: 'qUxIcXDeIkqcaRf1W',
} as const;

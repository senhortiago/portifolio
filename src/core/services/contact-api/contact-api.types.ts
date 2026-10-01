import * as z from 'zod/mini';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Token do reCAPTCHA v2, validado no servidor pelo EmailJS. */
  captchaToken: string;
}

/** Variáveis disponíveis no template do EmailJS como {{name}}, {{email}}, {{phone}}, {{message}}. */
export interface ContactTemplateParams {
  name: string;
  email: string;
  phone: string;
  message: string;
  'g-recaptcha-response': string;
}

export interface EmailjsSendRequest {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: ContactTemplateParams;
}

/** O endpoint REST do EmailJS responde 200 com o corpo em texto puro "OK". */
export const contactResponseSchema = z.literal('OK');

export type ContactResult = 'sent' | 'rejected' | 'failed';

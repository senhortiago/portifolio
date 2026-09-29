import * as z from 'zod/mini';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Resposta do endpoint AJAX do FormSubmit. */
export const contactResponseSchema = z.object({
  success: z.union([z.boolean(), z.literal('true'), z.literal('false')]),
  message: z.optional(z.string()),
});

export type ContactResult = 'sent' | 'rejected' | 'failed';

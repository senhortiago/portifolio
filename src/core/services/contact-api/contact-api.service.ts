import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { apiConstant } from '../../constants/api.constant';
import { emailjsConstant } from '../../constants/emailjs.constant';
import { ContactPayload, ContactResult, EmailjsSendRequest, contactResponseSchema } from './contact-api.types';

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<ContactResult> {
    const body: EmailjsSendRequest = {
      service_id: emailjsConstant.serviceId,
      template_id: emailjsConstant.templateId,
      user_id: emailjsConstant.publicKey,
      template_params: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        'g-recaptcha-response': payload.captchaToken,
      },
    };

    return this.http.post(apiConstant.contactUrl, body, { responseType: 'text' }).pipe(
      map((response): ContactResult => (contactResponseSchema.safeParse(response).success ? 'sent' : 'failed')),
      // 4xx: EmailJS recusou (captcha inválido, credenciais, limite da conta). Demais: rede/timeout.
      catchError((error: unknown) =>
        of<ContactResult>(
          error instanceof HttpErrorResponse && error.status >= 400 && error.status < 500 ? 'rejected' : 'failed',
        ),
      ),
    );
  }
}

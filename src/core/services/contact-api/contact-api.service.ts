import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { apiConstant } from '../../constants/api.constant';
import { ContactPayload, ContactResult, contactResponseSchema } from './contact-api.types';

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<ContactResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const body = {
      ...payload,
      _subject: `Portfólio · nova mensagem de ${payload.name}`,
      _template: 'table',
      _captcha: 'false',
    };

    return this.http.post<unknown>(apiConstant.contactUrl, body, { headers }).pipe(
      map((response): ContactResult => {
        const parsed = contactResponseSchema.safeParse(response);
        if (!parsed.success) {
          return 'failed';
        }
        const ok = parsed.data.success === true || parsed.data.success === 'true';
        return ok ? 'sent' : 'rejected';
      }),
      catchError(() => of<ContactResult>('failed')),
    );
  }
}

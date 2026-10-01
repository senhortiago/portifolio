import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timeout } from 'rxjs';
import { apiConstant } from '../constants/api.constant';

/** Timeout global + uma nova tentativa para leituras (GET). */
export const httpResilienceInterceptor: HttpInterceptorFn = (req, next) => {
  const request$ = next(req).pipe(timeout(apiConstant.requestTimeoutMs));
  return req.method === 'GET' ? request$.pipe(retry({ count: 1, delay: 600 })) : request$;
};

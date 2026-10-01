import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { httpCacheInterceptor } from '../core/interceptors/http-cache.interceptor';
import { httpResilienceInterceptor } from '../core/interceptors/http-resilience.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // Scroll nativo do Router desativado: o SmoothScrollService (Lenis) controla tudo.
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' }),
      // Permite re-disparar a navegação ao clicar novamente na mesma âncora.
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideHttpClient(withFetch(), withInterceptors([httpCacheInterceptor, httpResilienceInterceptor])),
    // Reaproveita o HTML pré-renderizado no build (SEO). Sem `withEventReplay`: ele injeta
    // um <script> inline que a CSP (script-src 'self') bloquearia.
    provideClientHydration(),
  ],
};

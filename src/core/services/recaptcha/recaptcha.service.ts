import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { recaptchaConstant } from '../../constants/recaptcha.constant';
import { RecaptchaApi, RecaptchaRenderOptions, RecaptchaWindow } from './recaptcha.types';

/**
 * Carrega o script do reCAPTCHA v2 sob demanda (uma única vez) e renderiza widgets explícitos.
 * Se o script for bloqueado (adblock, rede), as Promises rejeitam e a UI exibe o fallback.
 */
@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private loader: Promise<RecaptchaApi> | null = null;

  async render(container: HTMLElement, options: RecaptchaRenderOptions): Promise<number> {
    const api = await this.load();
    return api.render(container, {
      sitekey: recaptchaConstant.siteKey,
      size: options.size,
      theme: options.theme,
      callback: options.onToken,
      'expired-callback': options.onInvalidated,
      'error-callback': options.onInvalidated,
    });
  }

  reset(widgetId: number): void {
    this.window()?.grecaptcha?.reset(widgetId);
  }

  private load(): Promise<RecaptchaApi> {
    this.loader ??= new Promise<RecaptchaApi>((resolve, reject) => {
      const win = this.window();
      if (!win) {
        reject(new Error('reCAPTCHA indisponível fora do browser.'));
        return;
      }

      const callbackName = recaptchaConstant.onloadCallback;
      win[callbackName] = () => {
        delete win[callbackName];
        if (win.grecaptcha) {
          resolve(win.grecaptcha);
        } else {
          reject(new Error('reCAPTCHA carregou sem expor a API.'));
        }
      };

      const params = new URLSearchParams({
        render: 'explicit',
        hl: recaptchaConstant.language,
        onload: callbackName,
      });
      const script = this.document.createElement('script');
      script.src = `${recaptchaConstant.scriptUrl}?${params.toString()}`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        script.remove();
        delete win[callbackName];
        // Permite nova tentativa numa próxima renderização.
        this.loader = null;
        reject(new Error('Falha ao carregar o script do reCAPTCHA.'));
      };
      this.document.head.appendChild(script);
    });
    return this.loader;
  }

  private window(): RecaptchaWindow | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return this.document.defaultView;
  }
}

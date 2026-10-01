import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../components/elements/button/button.component';
import { CardComponent } from '../../../../components/elements/card/card.component';
import { TextFieldComponent } from '../../../../components/elements/text-field/text-field.component';
import { anchorsConstant } from '../../../../core/constants/anchors.constant';
import { featureFlagsConstant } from '../../../../core/constants/feature-flags.constant';
import { linksConstant } from '../../../../core/constants/links.constant';
import { InViewDirective } from '../../../../core/directives/in-view.directive';
import { ContactApiService } from '../../../../core/services/contact-api/contact-api.service';
import { RecaptchaService } from '../../../../core/services/recaptcha/recaptcha.service';
import { contactConfig } from './contact.config';
import { ContactCaptchaState, ContactFieldName, ContactStatus } from './contact.types';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, CardComponent, TextFieldComponent, InViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="anchors.contact" [class]="config.section">
      <div [class]="config.inner">
        <div [class]="config.grid">
          <div [class]="config.intro">
            <div>
              <p [class]="config.label">{{ config.texts.label }}</p>
              <h2 [class]="config.title">{{ config.texts.title }}</h2>
              <p [class]="config.lead">{{ config.texts.lead }}</p>
            </div>

            <ul [class]="config.channels" [attr.aria-label]="config.texts.channelsAria">
              @for (social of links.social; track social.id) {
                <li>
                  <a [href]="social.url" target="_blank" rel="noopener noreferrer" [class]="config.channel">
                    <span [class]="config.channelLabel">{{ social.label }}</span>
                    <span [class]="config.channelHandle">{{ social.handle }}</span>
                    <svg [class]="config.channelArrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 10.5l7-7M10.5 3.5H5M10.5 3.5V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                  </a>
                </li>
              }
            </ul>

            <app-card variant="glass" padding="md" [class]="config.resumeCard">
              <div [class]="config.resumeRow">
                <span [class]="config.resumeIcon" aria-hidden="true">PDF</span>
                <div>
                  <h3 [class]="config.resumeTitle">{{ config.texts.resumeTitle }}</h3>
                  <p [class]="config.resumeMeta">{{ config.texts.resumeMeta }}</p>
                </div>
              </div>
              <div [class]="config.resumeActions">
                <app-button variant="outline" size="sm" [href]="links.resume.url" target="_blank">
                  {{ config.texts.resumeView }}
                </app-button>
                <app-button variant="solid" size="sm" [href]="links.resume.url" [download]="links.resume.fileName">
                  {{ config.texts.resumeDownload }}
                </app-button>
              </div>
            </app-card>
          </div>

          @if (flags.contactForm) {
            <div [class]="config.formColumn">
              <app-card variant="solid" padding="lg">
                <h3 [class]="config.formTitle">{{ config.texts.formTitle }}</h3>
                <p [class]="config.formLead">{{ config.texts.formLead }}</p>

                <form [formGroup]="form" [class]="config.form" novalidate (ngSubmit)="submit()">
                  @for (field of config.fields; track field.name) {
                    <app-text-field
                      [class]="field.span === 'full' ? config.fieldFull : config.fieldHalf"
                      [formControlName]="field.name"
                      [fieldId]="'contact-' + field.name"
                      [label]="field.label"
                      [type]="field.type"
                      [placeholder]="field.placeholder"
                      [autocomplete]="field.autocomplete"
                      [required]="field.required"
                      [multiline]="field.multiline"
                      [optionalLabel]="field.required ? null : config.texts.optional"
                      [error]="errorFor(field.name)"
                    />
                  }

                  <div [class]="config.captcha.wrapper">
                    <div
                      #captchaHost
                      appInView
                      [inViewThreshold]="0"
                      [inViewRootMargin]="config.captcha.preloadMargin"
                      [class]="config.captcha.widget"
                    ></div>
                    @if (captchaState() === 'unavailable') {
                      <p [class]="config.captcha.error" role="alert">
                        {{ config.texts.captchaUnavailable }}
                        <a [href]="linkedinUrl" target="_blank" rel="noopener noreferrer" [class]="config.statusLink">
                          {{ config.texts.errorLink }}
                        </a>
                      </p>
                    } @else if (showCaptchaError()) {
                      <p [class]="config.captcha.error" role="alert">{{ config.texts.errors.captcha }}</p>
                    }
                  </div>

                  <div aria-live="polite" [class]="config.statusRegion">
                    @if (status() === 'success') {
                      <p [class]="config.status.success" role="status">{{ config.texts.success }}</p>
                    }
                    @if (status() === 'error') {
                      <p [class]="config.status.error" role="alert">
                        {{ config.texts.error }}
                        <a [href]="linkedinUrl" target="_blank" rel="noopener noreferrer" [class]="config.statusLink">
                          {{ config.texts.errorLink }}
                        </a>
                      </p>
                    }
                  </div>

                  <div [class]="config.formFooter">
                    <p [class]="config.formNote">{{ config.texts.note }}</p>
                    <app-button type="submit" variant="accent" size="lg" [disabled]="status() === 'sending'">
                      {{ status() === 'sending' ? config.texts.sending : config.texts.submit }}
                    </app-button>
                  </div>
                </form>
              </app-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly config = contactConfig;
  protected readonly anchors = anchorsConstant;
  protected readonly links = linksConstant;
  protected readonly flags = featureFlagsConstant;
  protected readonly linkedinUrl = linksConstant.social.find((social) => social.id === 'linkedin')?.url ?? null;
  protected readonly status = signal<ContactStatus>('idle');
  protected readonly captchaState = signal<ContactCaptchaState>('idle');

  private readonly captchaToken = signal<string | null>(null);
  private readonly captchaAttempted = signal(false);
  protected readonly showCaptchaError = computed(() => this.captchaAttempted() && this.captchaToken() === null);

  private readonly captchaHost = viewChild<string, ElementRef<HTMLElement>>('captchaHost', { read: ElementRef });
  private readonly captchaView = viewChild('captchaHost', { read: InViewDirective });
  private captchaWidgetId: number | null = null;
  private captchaRequested = false;

  private readonly contactApi = inject(ContactApiService);
  private readonly recaptcha = inject(RecaptchaService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(contactConfig.messageMinLength)],
    }),
  });

  constructor() {
    // O script do Google só é baixado quando o formulário se aproxima da viewport (não pesa no LCP).
    effect(() => {
      const host = this.captchaHost();
      if (!host || !this.captchaView()?.isInView() || this.captchaRequested) {
        return;
      }
      this.captchaRequested = true;
      void this.renderCaptcha(host.nativeElement);
    });
  }

  protected errorFor(name: ContactFieldName): string | null {
    const control = this.form.controls[name];
    if (!control.touched || control.valid) {
      return null;
    }
    const errors = this.config.texts.errors;
    if (control.hasError('required')) {
      return errors.required;
    }
    if (control.hasError('email')) {
      return errors.email;
    }
    if (control.hasError('minlength')) {
      return errors.minlength;
    }
    return null;
  }

  protected submit(): void {
    if (this.status() === 'sending') {
      return;
    }
    const captchaToken = this.captchaToken();
    this.captchaAttempted.set(true);
    if (this.form.invalid || captchaToken === null) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.contactApi
      .send({ ...this.form.getRawValue(), captchaToken })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        // O token do reCAPTCHA é de uso único: sempre exige nova verificação.
        this.resetCaptcha();
        if (result === 'sent') {
          this.status.set('success');
          this.form.reset();
        } else {
          this.status.set('error');
        }
      });
  }

  private async renderCaptcha(container: HTMLElement): Promise<void> {
    const compact = this.document.defaultView?.matchMedia(this.config.captcha.compactMediaQuery).matches ?? false;
    try {
      this.captchaWidgetId = await this.recaptcha.render(container, {
        size: compact ? 'compact' : 'normal',
        theme: 'light',
        onToken: (token) => this.captchaToken.set(token),
        onInvalidated: () => this.captchaToken.set(null),
      });
      this.captchaState.set('ready');
    } catch {
      this.captchaState.set('unavailable');
    }
  }

  private resetCaptcha(): void {
    this.captchaToken.set(null);
    this.captchaAttempted.set(false);
    if (this.captchaWidgetId !== null) {
      this.recaptcha.reset(this.captchaWidgetId);
    }
  }
}

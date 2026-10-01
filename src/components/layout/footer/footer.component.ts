import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brandConstant } from '../../../core/constants/brand.constant';
import { linksConstant } from '../../../core/constants/links.constant';
import { footerConfig } from './footer.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer [class]="config.wrapper" data-header-theme="dark">
      <div [class]="config.inner">
        <div [class]="config.top">
          <p [class]="config.tagline">{{ config.taglineText }}</p>
          <ul [class]="config.socialList" [attr.aria-label]="config.socialAriaLabel">
            @for (social of links.social; track social.id) {
              <li>
                <a [href]="social.url" target="_blank" rel="noopener noreferrer" [class]="config.socialLink">
                  {{ social.label }}
                </a>
              </li>
            }
          </ul>
        </div>

        <p [class]="config.wordmark" aria-hidden="true">{{ brand.fullName }}</p>

        <div [class]="config.bottom">
          <p [class]="config.copy">© {{ year }} {{ brand.fullName }}. {{ config.rightsText }}</p>
          <a routerLink="/" [class]="config.backToTop">
            {{ config.backToTopLabel }}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly config = footerConfig;
  protected readonly brand = brandConstant;
  protected readonly links = linksConstant;
  protected readonly year = new Date().getFullYear();
}

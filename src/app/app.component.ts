import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { LayoutLinesComponent } from '../components/layout/layout-lines/layout-lines.component';
import { SmoothScrollService } from '../core/services/smooth-scroll/smooth-scroll.service';
import { appShellConfig } from './app.config.shell';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LayoutLinesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#conteudo" [class]="config.skipLink">{{ config.skipLinkText }}</a>
    <app-layout-lines />
    <app-header />
    <main id="conteudo" [class]="config.main">
      <router-outlet />
    </main>
    @defer (on viewport) {
      <app-footer />
    } @placeholder {
      <div [class]="config.footerPlaceholder"></div>
    }
  `,
})
export class AppComponent {
  protected readonly config = appShellConfig;

  constructor() {
    inject(SmoothScrollService).init();
  }
}

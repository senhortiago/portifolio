import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo/seo.service';
import { homeConfig } from './home.config';
import { AboutComponent } from './sections/about/about.component';
import { ContactComponent } from './sections/contact/contact.component';
import { HeroComponent } from './sections/hero/hero.component';
import { JourneyComponent } from './sections/journey/journey.component';
import { ProjectsComponent } from './sections/projects/projects.component';

/**
 * Orquestrador de layout da Home.
 * As seções são alvos de âncoras (#sobre, #trajetoria, #projetos, #contato), por isso
 * NÃO usam @defer: precisam renderizar com altura real no primeiro ciclo (evita Layout Shift
 * que quebraria o cálculo do scroll do Lenis em navegações entre páginas).
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, JourneyComponent, ProjectsComponent, ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config.wrapper">
      <app-hero />
      <app-about />
      <app-journey />
      <app-projects />
      <app-contact />
    </div>
  `,
})
export class HomeComponent {
  protected readonly config = homeConfig;

  constructor() {
    inject(SeoService).apply(this.config.seo);
  }
}

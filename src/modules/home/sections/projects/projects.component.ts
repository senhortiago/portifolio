import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BadgeComponent } from '../../../../components/elements/badge/badge.component';
import { ButtonComponent } from '../../../../components/elements/button/button.component';
import { CardComponent } from '../../../../components/elements/card/card.component';
import { SectionDividerComponent } from '../../../../components/elements/section-divider/section-divider.component';
import { anchorsConstant } from '../../../../core/constants/anchors.constant';
import { linksConstant } from '../../../../core/constants/links.constant';
import { ProjectsApiService } from '../../../../core/services/projects-api/projects-api.service';
import { projectsConfig } from './projects.config';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent, CardComponent, SectionDividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="anchors.projects" [class]="config.section" data-header-theme="dark">
      <app-section-divider shape="dome" placement="top" tone="dark" />
      <app-section-divider shape="dome" placement="bottom" tone="dark" />

      <div [class]="config.inner">
        <header [class]="config.header">
          <div>
            <p [class]="config.label">{{ config.texts.label }}</p>
            <h2 [class]="config.title">{{ config.texts.title }}</h2>
          </div>
          <p [class]="config.lead">{{ config.texts.lead }}</p>
        </header>

        @switch (state().status) {
          @case ('loading') {
            <div [class]="config.list" role="status" [attr.aria-label]="config.texts.loading">
              @for (row of skeletonRows; track row) {
                <div [class]="config.skeletonRow" aria-hidden="true">
                  <span [class]="config.skeletonIndex"></span>
                  <span [class]="config.skeletonTitle"></span>
                  <span [class]="config.skeletonMeta"></span>
                </div>
              }
            </div>
          }

          @case ('error') {
            <app-card variant="solid-dark" padding="lg" [class]="config.errorCard">
              <p [class]="config.errorTitle" role="alert">{{ config.texts.errorTitle }}</p>
              <p [class]="config.errorText">{{ config.texts.errorText }}</p>
              <div [class]="config.errorActions">
                <app-button variant="accent" (pressed)="api.load()">{{ config.texts.retry }}</app-button>
                <app-button variant="outline-inverse" [href]="githubUrl" target="_blank">
                  {{ config.texts.openGithub }}
                </app-button>
              </div>
            </app-card>
          }

          @case ('success') {
            <ul [class]="config.list">
              @for (project of projects(); track project.id; let i = $index) {
                <li [class]="openId() === project.id ? config.row + ' ' + config.rowOpen : config.row">
                  <app-button
                    variant="bare"
                    [fullWidth]="true"
                    [layoutClass]="config.trigger"
                    [elementId]="'project-trigger-' + project.id"
                    [ariaExpanded]="openId() === project.id"
                    [ariaControls]="'project-panel-' + project.id"
                    (pressed)="toggle(project.id)"
                  >
                    <span [class]="config.index">{{ indexLabel(i) }}</span>
                    <span [class]="config.titleWrap">
                      <span [class]="config.rowTitle">{{ project.title }}</span>
                      <span [class]="config.rowSummary">{{ project.summary }}</span>
                    </span>
                    <span [class]="config.tags">
                      @for (tag of project.tags.slice(0, 3); track tag) {
                        <app-badge variant="ghost" color="inverse">{{ tag }}</app-badge>
                      }
                    </span>
                    <span [class]="config.year">{{ project.year }}</span>
                    <span
                      [class]="openId() === project.id ? config.toggleIcon.open : config.toggleIcon.closed"
                      aria-hidden="true"
                    >
                      <span [class]="config.toggleBar"></span>
                      <span
                        [class]="openId() === project.id ? config.toggleBarVertical.open : config.toggleBarVertical.closed"
                      ></span>
                    </span>
                  </app-button>

                  <div
                    [id]="'project-panel-' + project.id"
                    role="region"
                    [attr.aria-labelledby]="'project-trigger-' + project.id"
                    [attr.inert]="openId() === project.id ? null : ''"
                    [class]="openId() === project.id ? config.panel.open : config.panel.closed"
                  >
                    <div [class]="config.panelClip">
                      <div [class]="config.panelGrid">
                        <div
                          [class]="config.cover"
                          [style.--cover-from]="project.cover.from"
                          [style.--cover-to]="project.cover.to"
                          aria-hidden="true"
                        >
                          <span [class]="config.coverChrome">
                            <span [class]="config.coverChromeDot"></span>
                            <span [class]="config.coverChromeDot"></span>
                            <span [class]="config.coverChromeDot"></span>
                          </span>
                          <span [class]="config.coverTitle">{{ project.title }}</span>
                          <span [class]="config.coverIndex">{{ indexLabel(i) }}</span>
                        </div>

                        <div [class]="config.details">
                          <p [class]="config.description">{{ project.description }}</p>
                          <dl [class]="config.facts">
                            <div [class]="config.factItem">
                              <dt [class]="config.factLabel">{{ config.texts.role }}</dt>
                              <dd [class]="config.factValue">{{ project.role }}</dd>
                            </div>
                            <div [class]="config.factItem">
                              <dt [class]="config.factLabel">{{ config.texts.year }}</dt>
                              <dd [class]="config.factValue">{{ project.year }}</dd>
                            </div>
                            <div [class]="config.factItem">
                              <dt [class]="config.factLabel">{{ config.texts.stack }}</dt>
                              <dd [class]="config.factValue">{{ project.tags.join(' · ') }}</dd>
                            </div>
                          </dl>
                          <div [class]="config.actions">
                            @if (project.links.repository) {
                              <app-button variant="accent" [href]="project.links.repository" target="_blank">
                                {{ config.texts.repository }}
                              </app-button>
                            }
                            @if (project.links.demo) {
                              <app-button variant="outline-inverse" [href]="project.links.demo" target="_blank">
                                {{ config.texts.demo }}
                              </app-button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              } @empty {
                <li [class]="config.row">
                  <p [class]="config.errorText">{{ config.texts.empty }}</p>
                </li>
              }
            </ul>
          }
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  protected readonly config = projectsConfig;
  protected readonly anchors = anchorsConstant;
  protected readonly api = inject(ProjectsApiService);
  protected readonly state = this.api.state;
  protected readonly openId = signal<string | null>(null);
  protected readonly projects = computed(() => {
    const current = this.state();
    return current.status === 'success' ? current.data : [];
  });
  protected readonly skeletonRows = Array.from({ length: projectsConfig.skeletonCount }, (_, i) => i);
  protected readonly githubUrl = linksConstant.social.find((social) => social.id === 'github')?.url ?? null;

  constructor() {
    this.api.load();
  }

  protected indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}

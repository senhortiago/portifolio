import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { apiConstant } from '../../constants/api.constant';
import { Project, RemoteState, projectsResponseSchema } from './projects-api.types';

/**
 * Server State dos projetos. O payload nunca é confiado cegamente:
 * tudo passa pelo schema Zod antes de chegar à interface.
 */
@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly stateSignal = signal<RemoteState<Project[]>>({ status: 'loading' });
  readonly state = this.stateSignal.asReadonly();

  load(): void {
    this.stateSignal.set({ status: 'loading' });

    this.http
      .get<unknown>(apiConstant.projectsUrl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (payload) => {
          const parsed = projectsResponseSchema.safeParse(payload);
          this.stateSignal.set(
            parsed.success
              ? { status: 'success', data: parsed.data.projects }
              : { status: 'error', reason: 'invalid-payload' },
          );
        },
        error: () => this.stateSignal.set({ status: 'error', reason: 'network' }),
      });
  }
}

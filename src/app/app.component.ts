import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { catchError, EMPTY, of, Subject, takeUntil, tap } from 'rxjs';

import { PATHS } from '@app/shared/constants';
import { AuthService, LoggerService } from '@app/shared/services';

@Component({
  standalone: true,
  template: '<router-outlet />',
  selector: 'app-root',
  imports: [RouterModule],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly logger = inject(LoggerService);
  private readonly destroy$ = new Subject<void>();

  private readonly authenticate$ = this.auth.authenticate().pipe(
    takeUntil(this.destroy$),
    tap(token => {
      this.logger.log('authenticate', token);

      if (token) {
        this.auth.updateToken(token);
        return;
      }
      if (location.pathname !== PATHS.LOGIN) {
        this.router.navigate([PATHS.LOGIN]);
        return;
      }
    }),
    catchError(() => {
      this.auth.removeToken();
      return of(EMPTY);
    })
  );

  constructor() {
    this.auth.initToken();
  }

  public ngOnInit(): void {
    this.auth.localStorageTokenListener();
    this.authenticate$.subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

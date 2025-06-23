import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PATHS } from '@app/shared/constants';
import { AuthService, LoggerService } from '@app/shared/services';

@Component({
  standalone: true,
  template: '<router-outlet />',
  selector: 'app-root',
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly logger = inject(LoggerService);

  constructor() {
    this.auth.initToken();
  }

  public ngOnInit(): void {
    this.auth.localStorageTokenListener();
    this.auth.authenticate().subscribe({
      next: token => {
        this.logger.log('authenticate', token);

        if (token) {
          this.auth.updateToken(token);
          return;
        }

        if (location.pathname !== PATHS.LOGIN) {
          this.router.navigate([PATHS.LOGIN]);
          return;
        }
      },
      error: () => {
        this.auth.removeToken();
      },
    });
  }
}

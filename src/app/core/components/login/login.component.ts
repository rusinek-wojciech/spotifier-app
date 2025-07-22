import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { PATHS } from '@app/shared/constants';
import {
  AuthService,
  LoggerService,
  SpotifyAuthService,
} from '@app/shared/services';

enum Status {
  MISSING = 'missing',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

const messageByStatus = {
  [Status.MISSING]: 'Waiting for user permission',
  [Status.PENDING]: 'Please wait...',
  [Status.SUCCESS]: 'You will be soon redirected',
  [Status.FAILURE]: 'Failed to gain spotify permissions. Press to try again',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly spotifyAuthHttpService = inject(SpotifyAuthService);
  private readonly router = inject(Router);
  private readonly logger = inject(LoggerService);

  readonly Status = Status;
  readonly messageByStatus = messageByStatus;
  readonly status = signal<Status>(Status.PENDING);

  private readonly redirectionDelay = 1000;
  private timeoutId?: NodeJS.Timeout;

  ngOnInit() {
    this.auth.authorize().subscribe({
      next: token => {
        this.logger.log('authorize', token);

        if (token) {
          this.status.set(Status.SUCCESS);
          clearTimeout(this.timeoutId);
          this.auth.updateToken(token);
          this.timeoutId = setTimeout(
            () => this.router.navigate([PATHS.HOME]),
            this.redirectionDelay
          );
          return;
        }

        this.auth.removeToken();
        this.status.set(Status.MISSING);
      },
      error: error => {
        this.status.set(Status.FAILURE);
        this.logger.error(error);
        this.auth.removeToken();
      },
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  handleClick(): void {
    if (
      untracked(this.status) === Status.MISSING ||
      untracked(this.status) === Status.FAILURE
    ) {
      this.spotifyAuthHttpService.authorization();
    }
  }
}

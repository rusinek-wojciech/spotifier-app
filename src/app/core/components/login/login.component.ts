import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { PATHS } from '@app/shared/constants';
import { AuthService, SpotifyAuthHttpService } from '@app/shared/services';

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
  private readonly redirectionDelay = 1000;
  readonly Status = Status;
  readonly messageByStatus = messageByStatus;

  status = Status.PENDING;
  timeoutId?: NodeJS.Timeout;

  constructor(
    private auth: AuthService,
    private spotifyAuthHttpService: SpotifyAuthHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.authorize().subscribe({
      next: token => {
        console.log('authorize', token);
        if (token) {
          this.status = Status.SUCCESS;
          this.auth.updateToken(token);
          this.timeoutId = setTimeout(
            () => this.router.navigate([PATHS.HOME]),
            this.redirectionDelay
          );
          return;
        }
        this.auth.removeToken();
        this.status = Status.MISSING;
      },
      error: error => {
        this.status = Status.FAILURE;
        console.error(error);
        this.auth.removeToken();
      },
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  handleClick(): void {
    if (this.status === Status.MISSING || this.status === Status.FAILURE) {
      this.spotifyAuthHttpService.authorization();
    }
  }
}

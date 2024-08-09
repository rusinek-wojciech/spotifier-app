import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { PATHS, SPOTIFY_AUTH_URL_LINK } from 'src/app/shared/constants';
import { AuthService } from 'src/app/shared/services';

enum Status {
  LOGIN = 'login',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

const messageByStatus = {
  [Status.LOGIN]: 'Waiting for user permission',
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
  readonly Status = Status;
  readonly messageByStatus = messageByStatus;

  status = Status.PENDING;
  timeoutId?: NodeJS.Timeout;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.authenticate$().subscribe({
      next: success => {
        if (success) {
          this.status = Status.SUCCESS;
          this.timeoutId = setTimeout(
            () => this.router.navigate([PATHS.HOME]),
            300
          );
        } else {
          this.status = Status.LOGIN;
        }
      },
      error: error => {
        this.status = Status.FAILURE;
        console.error(error);
      },
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  handleClick(): void {
    if (this.status === Status.LOGIN || this.status === Status.FAILURE) {
      window.location.href = SPOTIFY_AUTH_URL_LINK;
    }
  }
}

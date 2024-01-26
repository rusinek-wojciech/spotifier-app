import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SPOTIFY_AUTH_URL_LINK } from 'src/app/constants/auth.constants';
import { PATHS } from 'src/app/constants/paths.constants';
import { AuthService } from 'src/app/services/auth.service';

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
})
export class LoginComponent implements OnInit {
  readonly Status = Status;
  readonly messageByStatus = messageByStatus;

  status = Status.PENDING;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.authenticate$().subscribe({
      next: success => {
        if (success) {
          this.status = Status.SUCCESS;
          setTimeout(() => this.router.navigate([PATHS.HOME]), 300);
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

  handleClick(): void {
    if (this.status === Status.LOGIN || this.status === Status.FAILURE) {
      window.location.href = SPOTIFY_AUTH_URL_LINK;
    }
  }
}

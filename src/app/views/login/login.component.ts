import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

type CallbackParams = {
  code?: string;
  error?: string;
};

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

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
    this.login();
  }

  private login() {
    this.route.queryParams
      .pipe(
        mergeMap(({ code, error }: CallbackParams) => {
          const isAuth = this.auth.isAuthenticated();
          return code && !isAuth
            ? this.auth
                .fetchToken$(code)
                .pipe(map(token => ({ token, error: null, isAuth: false })))
            : of({ token: null, error, isAuth });
        })
      )
      .subscribe({
        next: ({ token, error, isAuth }) => {
          if (isAuth) {
            this.status = Status.SUCCESS;
            this.auth.login(this.auth.token);
            return;
          }
          if (token) {
            this.status = Status.SUCCESS;
            this.auth.login(token);
            return;
          }
          if (error) {
            this.status = Status.FAILURE;
            console.error(error);
            return;
          }
          this.status = Status.LOGIN;
        },
        error: error => {
          this.status = Status.FAILURE;
          console.error(error);
        },
      });
  }

  handleClick() {
    if (this.status === Status.LOGIN || this.status === Status.FAILURE) {
      this.auth.redirectToSpotify();
    }
  }
}

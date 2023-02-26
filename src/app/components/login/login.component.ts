import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

type CallbackParams = {
  code?: string;
  error?: string;
};

enum Status {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Status = Status;
  status = Status.PENDING;
  details = 'Please wait...';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        mergeMap(({ code, error }: CallbackParams) => {
          const isAuth = this.auth.isAuthenticated();
          return code && !isAuth
            ? this.auth
                .fetchToken$(code)
                .pipe(map((token) => ({ token, error: null, isAuth: false })))
            : of({ token: null, error, isAuth });
        })
      )
      .subscribe({
        next: ({ token, error, isAuth }) => {
          if (token || isAuth) {
            this.status = Status.SUCCESS;
            this.details = 'You will be soon redirect!';
            this.router.navigate(['/home']);
            return;
          }
          if (error) {
            this.status = Status.FAILURE;
            this.details = error;
            return;
          }
          this.redirect();
        },
        error: (err: HttpErrorResponse) => {
          this.status = Status.FAILURE;
          this.details = err.error.error_description;
        },
      });
  }

  redirect() {
    this.auth.redirect();
  }
}

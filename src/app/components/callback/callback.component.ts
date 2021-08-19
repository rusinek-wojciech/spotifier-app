import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Token } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  status = 'pending';
  details = 'Please wait...';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const code = params['code'];
      const error = params['error'];

      if (code) {
        this.apiService.getToken$(code).subscribe(
          (token: Token) => {
            this.authService.login(token);
            this.setSuccess('You will be soon redirect!');
          },
          (error: Error) => this.setFailure(error.message)
        );
      } else if (error) {
        this.setFailure(error);
      } else {
        this.setFailure('Parameters are invalid.');
      }
    });
  }

  setSuccess(details: string): void {
    setTimeout(() => {
      this.status = 'success';
      this.details = details;
    }, 3000);
    setTimeout(() => this.router.navigate(['home']), 6000);
  }

  setFailure(details: string): void {
    setTimeout(() => {
      this.status = 'failure';
      this.details = details;
    }, 3000);
  }
}

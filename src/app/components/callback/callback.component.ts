import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Token } from 'src/app/models';
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
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const codeParam = params['code'];
      const errorParam = params['error'];

      if (codeParam) {
        this.auth.getToken$(codeParam).subscribe(
          (token: Token) => {
            this.auth.login(token);
            this.setSuccess('You will be soon redirect!');
          },
          (e: HttpErrorResponse) => this.setFailure(e.error.error_description)
        );
      } else if (errorParam) {
        this.setFailure(errorParam);
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
    setTimeout(() => this.router.navigate(['']), 6000);
  }

  setFailure(details: string): void {
    setTimeout(() => {
      this.status = 'failure';
      this.details = details;
    }, 3000);
    setTimeout(() => this.router.navigate(['']), 6000);
  }
}

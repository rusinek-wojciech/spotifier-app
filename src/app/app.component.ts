import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PATHS } from '@app/shared/constants';
import { AuthService } from '@app/shared/services';

@Component({
  standalone: true,
  template: '<router-outlet />',
  selector: 'app-root',
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.initToken();
  }

  ngOnInit(): void {
    this.auth.localStorageTokenListener();
    this.auth.authenticate().subscribe({
      next: token => {
        console.log('authenticate', token);
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

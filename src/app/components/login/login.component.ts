import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  template: '<mat-spinner></mat-spinner>',
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      return;
    }
    this.auth.logout();
    this.auth.redirect();
  }
}

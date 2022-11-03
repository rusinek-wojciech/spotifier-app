import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  template: '<mat-spinner></mat-spinner><h2>You have logout with success</h2>',
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
      this.auth.redirect();
      return;
    }
  }
}

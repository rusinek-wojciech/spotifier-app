import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths.constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.token) {
      return true;
    }
    this.router.navigate([PATHS.LOGIN]);
    return false;
  }
}

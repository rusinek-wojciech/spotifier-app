import { Injectable } from '@angular/core';
import { Token } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static KEY = 'token';

  isAuthenticated(): boolean {
    /* cannot get token */
    const tokenString = localStorage.getItem(AuthService.KEY);
    if (!tokenString) {
      return false;
    }
    /* token timeout */
    const token: Token = JSON.parse(tokenString);
    if (Date.now() >= token.validTo) {
      return false;
    }
    return true;
  }

  login(token: Token): void {
    localStorage.setItem(AuthService.KEY, JSON.stringify(token));
  }

  logout(): void {
    localStorage.removeItem(AuthService.KEY);
  }
}

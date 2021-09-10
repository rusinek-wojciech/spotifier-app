import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clientId, clientSecret, redirectUri, scopes } from '../api.config';
import { Token, TokenResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly key = 'token';

  constructor(private http: HttpClient) {}

  login(token: Token): void {
    localStorage.setItem(this.key, JSON.stringify(token));
  }

  logout(): void {
    localStorage.removeItem(this.key);
  }

  isAuthenticated(): boolean {
    /* cannot get token */
    const tokenString = localStorage.getItem(this.key);
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

  redirect(): void {
    window.location.href =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri);
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem(this.key) || '');
  }

  getToken$(code: string): Observable<Token> {
    return this.http
      .post<TokenResponse>(
        'https://accounts.spotify.com/api/token',
        new HttpParams()
          .set('grant_type', 'authorization_code')
          .set('code', code)
          .set('redirect_uri', redirectUri),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
          }),
        }
      )
      .pipe(map((token: TokenResponse) => new Token(token)));
  }
}

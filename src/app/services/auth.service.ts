import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { scopes } from '../api.config';
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
      environment.clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(environment.redirectUri);
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem(this.key) || '');
  }

  getToken$(code: string): Observable<Token> {
    const token64 = btoa(`${environment.clientId}:${environment.clientSecret}`);
    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', environment.redirectUri);
    return this.http
      .post<TokenResponse>('https://accounts.spotify.com/api/token', params, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${token64}`,
        }),
      })
      .pipe(map((token: TokenResponse) => new Token(token)));
  }
}

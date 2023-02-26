import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { scopes } from '../api.config';
import { Token, TokenResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly TOKEN_KEY = 'token';
  private static readonly AUTH_LINK = `https://accounts.spotify.com/authorize?${new URLSearchParams(
    [
      ['response_type', 'code'],
      ['client_id', environment.clientId],
      ['scope', scopes],
      ['redirect_uri', environment.redirectUri],
    ]
  ).toString()}`;
  private static readonly AUTH_BASIC = btoa(
    `${environment.clientId}:${environment.clientSecret}`
  );

  private _token: Token | null = null;

  constructor(private http: HttpClient) {
    this._token = this.getToken();
    this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    if (!this._token) {
      this.logout();
      return false;
    }
    if (Date.now() >= this._token.validTo) {
      this.logout();
      return false;
    }
    return true;
  }

  logout() {
    // notify subscribers of token
    this.removeToken();
  }

  login(token: Token) {
    // notify subscribers of token
    this.setToken(token);
  }

  redirect(): void {
    window.location.href = AuthService.AUTH_LINK;
  }

  get token() {
    return this._token!;
  }

  fetchToken$(code: string): Observable<Token> {
    return this.http
      .post<TokenResponse>(
        'https://accounts.spotify.com/api/token',
        new HttpParams()
          .set('grant_type', 'authorization_code')
          .set('code', code)
          .set('redirect_uri', environment.redirectUri),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${AuthService.AUTH_BASIC}`,
          }),
        }
      )
      .pipe(
        map((res) => new Token(res)),
        tap((token) => this.login(token)),
        shareReplay()
      );
  }

  private removeToken() {
    this._token = null;
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

  private setToken(token: Token) {
    this._token = token;
    localStorage.setItem(AuthService.TOKEN_KEY, JSON.stringify(token));
  }

  private getToken() {
    const token = localStorage.getItem(AuthService.TOKEN_KEY);
    return token ? (JSON.parse(token) as Token) : null;
  }
}

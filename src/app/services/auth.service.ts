import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PATHS } from 'src/app/constants/paths.constants';
import { environment } from 'src/environments/environment';
import { Scope, Token, TokenResponse } from '../models';

const TOKEN_KEY = 'token';

const SCOPES = [
  Scope.UGC_IMAGE_UPLOAD,
  Scope.PLAYLIST_MODIFY_PRIVATE,
  Scope.PLAYLIST_READ_PRIVATE,
  Scope.PLAYLIST_MODIFY_PUBLIC,
  Scope.PLAYLIST_READ_COLLABORATIVE,
  Scope.USER_READ_PRIVATE,
  Scope.USER_READ_EMAIL,
  Scope.USER_READ_PLAYBACK_STATE,
  Scope.USER_MODIFY_PLAYBACK_STATE,
  Scope.USER_READ_CURRENTLY_PLAYING,
  Scope.USER_LIBRARY_MODIFY,
  Scope.USER_LIBRARY_READ,
  Scope.USER_READ_PLAYBACK_POSITION,
  Scope.USER_READ_RECENTLY_PLAYED,
  Scope.USER_TOP_READ,
  Scope.APP_REMOTE_CONTROL,
  Scope.STREAMING,
  Scope.USER_FOLLOW_MODIFY,
  Scope.USER_FOLLOW_READ,
].join(' ');

const AUTH_LINK = `https://accounts.spotify.com/authorize?${new URLSearchParams(
  [
    ['response_type', 'code'],
    ['client_id', environment.clientId],
    ['scope', SCOPES],
    ['redirect_uri', environment.redirectUri],
  ]
).toString()}`;

const AUTH_BASIC = btoa(`${environment.clientId}:${environment.clientSecret}`);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: Token | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this._token = this.getToken();
    this.isAuthenticated();
  }

  get token() {
    return this._token!;
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
    this.removeToken();
    if (location.pathname !== PATHS.LOGIN) {
      this.router.navigate([PATHS.LOGIN]);
    }
  }

  login(token: Token) {
    this.setToken(token);
    this.router.navigate([PATHS.HOME]);
  }

  redirectToSpotify() {
    window.location.href = AUTH_LINK;
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
            Authorization: `Basic ${AUTH_BASIC}`,
          }),
        }
      )
      .pipe(
        map(res => new Token(res)),
        shareReplay()
      );
  }

  private removeToken() {
    this._token = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  private setToken(token: Token) {
    this._token = token;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  private getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? (JSON.parse(token) as Token) : null;
  }
}

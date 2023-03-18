import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Scope, Token, TokenResponse } from '../models';

const scopes = [
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

const authLink = `https://accounts.spotify.com/authorize?${new URLSearchParams([
  ['response_type', 'code'],
  ['client_id', environment.clientId],
  ['scope', scopes],
  ['redirect_uri', environment.redirectUri],
]).toString()}`;

const authBasic = btoa(`${environment.clientId}:${environment.clientSecret}`);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly TOKEN_KEY = 'token';
  private static readonly AUTH_LINK = authLink;
  private static readonly AUTH_BASIC = authBasic;
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

  redirect() {
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
        map(res => new Token(res)),
        tap(token => this.login(token)),
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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, throwError, timer } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import {
  SPOTIFY_AUTH_URL_TOKEN_BODY,
  SPOTIFY_AUTH_URL_TOKEN,
} from 'src/app/constants/auth.constants';
import { PATHS } from 'src/app/constants/paths.constants';
import { environment } from 'src/environments/environment';
import { Token, TokenResponse } from '../models';

type CallbackParams = {
  code?: string;
  error?: string;
  logout?: boolean;
};

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _timerSub: Subscription = new Subscription();
  private _token: Token | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const token = this.getTokenFromStorage();
    token && Date.now() < token.validTo
      ? this.setToken(token)
      : this.removeToken();
  }

  get token() {
    return this._token;
  }

  authenticate$() {
    return this.route.queryParams.pipe(
      mergeMap(({ code, error, logout }: CallbackParams) => {
        if (logout) {
          this.removeToken();
          return of(false);
        }
        if (this.token) {
          return of(true);
        }
        if (error) {
          return throwError(() => new Error(error));
        }
        if (code) {
          return this.fetchToken$(code).pipe(
            tap(token => {
              this.setToken(token);
            }),
            map(() => true)
          );
        }
        return of(false);
      })
    );
  }

  private fetchToken$(code: string): Observable<Token> {
    return this.http
      .post<TokenResponse>(
        SPOTIFY_AUTH_URL_TOKEN,
        new HttpParams()
          .set('grant_type', 'authorization_code')
          .set('code', code)
          .set('redirect_uri', environment.redirectUri),
        SPOTIFY_AUTH_URL_TOKEN_BODY
      )
      .pipe(map(res => new Token(res)));
  }

  private removeToken() {
    this._token = null;
    localStorage.removeItem(TOKEN_KEY);
    this._timerSub.unsubscribe();
  }

  private setToken(token: Token) {
    this._token = token;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    this.setLogoutTimer(token);
  }

  private setLogoutTimer(token: Token) {
    this._timerSub.unsubscribe();
    const ms = token.validTo - Date.now();
    this._timerSub = timer(ms).subscribe(() => {
      this.removeToken();
      if (location.pathname !== PATHS.LOGIN) {
        this.router.navigate([PATHS.LOGIN]);
      }
    });
  }

  private getTokenFromStorage() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? (JSON.parse(token) as Token) : null;
  }
}

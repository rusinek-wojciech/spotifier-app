import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  of,
  Subscription,
  throwError,
  timer,
  zip,
} from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
  private _tokenSubject = new BehaviorSubject<Token | null>(null);

  public token$: Observable<Token | null> = this._tokenSubject.asObservable();

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

  public authenticate$() {
    return zip(this.route.queryParams, this.token$).pipe(
      switchMap(([params, token]: [CallbackParams, Token | null]) => {
        if (params.logout) {
          this.logout();
          return of(false);
        }
        if (token) {
          return of(true);
        }
        if (params.error) {
          return throwError(() => new Error(params.error));
        }
        if (params.code) {
          return this.fetchToken$(params.code).pipe(
            tap(token => this.setToken(token)),
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
    this._tokenSubject.next(null);
    localStorage.removeItem(TOKEN_KEY);
    this._timerSub.unsubscribe();
  }

  private setToken(token: Token) {
    this._tokenSubject.next(token);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    this.setLogoutTimer(token);
  }

  private setLogoutTimer(token: Token) {
    this._timerSub.unsubscribe();
    const ms = token.validTo - Date.now();
    this._timerSub = timer(ms).subscribe(() => this.logout());
  }

  private getTokenFromStorage() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? (JSON.parse(token) as Token) : null;
  }

  private logout() {
    this.removeToken();
    if (location.pathname !== PATHS.LOGIN) {
      this.router.navigate([PATHS.LOGIN]);
    }
  }
}

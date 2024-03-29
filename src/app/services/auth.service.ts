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

const TOKEN_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logoutTimerSub: Subscription = new Subscription();
  private tokenSubject = new BehaviorSubject<Token | null>(null);
  public token$: Observable<Token | null> = this.tokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const token = this.getTokenFromStorage();
    if (token && Date.now() < token.validTo) {
      this.setToken(token);
    } else {
      this.removeToken();
    }
  }

  public authenticate$(): Observable<boolean> {
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
    this.tokenSubject.next(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.logoutTimerSub.unsubscribe();
  }

  private setToken(token: Token) {
    this.tokenSubject.next(token);
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
    this.setLogoutTimer(token);
  }

  private setLogoutTimer(token: Token) {
    this.logoutTimerSub.unsubscribe();
    const milisecondsToExpiration = token.validTo - Date.now();
    this.logoutTimerSub = timer(milisecondsToExpiration).subscribe(() =>
      this.logout()
    );
  }

  private getTokenFromStorage(): Token | null {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    return token ? JSON.parse(token) : null;
  }

  private logout() {
    this.removeToken();
    if (location.pathname !== PATHS.LOGIN) {
      this.router.navigate([PATHS.LOGIN]);
    }
  }
}

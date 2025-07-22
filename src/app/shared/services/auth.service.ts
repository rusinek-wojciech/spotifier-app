import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LocalStorageService, SpotifyAuthService } from '@app/shared/services';
import { AuthorizationResponseParams, Token } from '@app/shared/types';
import { LoggerService } from '@app/shared/services/logger.service';

const AUTH_KEY = 'token';

@Injectable()
export class AuthService {
  private readonly logger = inject(LoggerService);
  private readonly route = inject(ActivatedRoute);
  private readonly spotifyAuthHttpService = inject(SpotifyAuthService);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly tokenSubject = new BehaviorSubject<Token | undefined>(
    undefined
  );

  readonly token$ = this.tokenSubject.asObservable();

  constructor() {
    this.localStorageTokenListener();
  }

  public authorize(): Observable<Token | undefined> {
    return of(
      this.route.snapshot.queryParams as AuthorizationResponseParams
    ).pipe(
      switchMap(params => {
        if ('error' in params) {
          return throwError(() => new Error(params.error));
        }
        if ('code' in params) {
          return this.spotifyAuthHttpService.getToken(params.code);
        }
        return of(undefined);
      })
    );
  }

  public authenticate(): Observable<Token | undefined> {
    return this.token$.pipe(
      switchMap(token =>
        token
          ? timer(this.calculateTimeToExpire(token)).pipe(
              switchMap(() => this.spotifyAuthHttpService.refreshToken(token))
            )
          : of(undefined)
      )
    );
  }

  public localStorageTokenListener(): void {
    window.addEventListener(
      'storage',
      event => {
        if (event.key === AUTH_KEY) {
          this.removeToken();
        }
      },
      false
    );
  }

  public initToken(): void {
    this.logger.log('initToken');
    const token = this.localStorageService.getItem(AUTH_KEY);
    token && !this.isExpired(token)
      ? this.updateToken(token)
      : this.removeToken();
  }

  public removeToken(): void {
    this.logger.log('removeToken');
    this.localStorageService.removeItem(AUTH_KEY);
    this.tokenSubject.next(undefined);
  }

  public updateToken(token: Token): void {
    this.logger.log('updateToken');
    this.localStorageService.setItem(AUTH_KEY, token);
    this.tokenSubject.next(token);
  }

  private calculateTimeToExpire(token: Token): number {
    return token.expireTimestamp - Date.now();
  }

  private isExpired(token: Token): boolean {
    const timeToExpire = this.calculateTimeToExpire(token);
    return timeToExpire < 0;
  }
}

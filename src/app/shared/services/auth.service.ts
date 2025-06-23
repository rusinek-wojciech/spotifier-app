import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  LocalStorageService,
  SpotifyAuthHttpService,
} from '@app/shared/services';
import { AuthorizationResponseParams, Token } from '@app/shared/types';
import { LoggerService } from '@app/shared/services/logger.service';

@Injectable()
export class AuthService {
  private readonly logger = inject(LoggerService);
  private readonly route = inject(ActivatedRoute);
  private readonly spotifyAuthHttpService = inject(SpotifyAuthHttpService);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly tokenSubject = new BehaviorSubject<Token | undefined>(
    undefined
  );

  readonly token$ = this.tokenSubject.asObservable();

  constructor() {
    this.localStorageTokenListener();
  }

  authorize(): Observable<Token | undefined> {
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

  authenticate(): Observable<Token | undefined> {
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

  localStorageTokenListener(): void {
    window.addEventListener(
      'storage',
      event => {
        if (event.key === 'token') {
          this.removeToken();
        }
      },
      false
    );
  }

  initToken(): void {
    this.logger.log('initToken');
    const token = this.localStorageService.getItem('token');
    token && !this.isExpired(token)
      ? this.updateToken(token)
      : this.removeToken();
  }

  removeToken(): void {
    this.logger.log('removeToken');
    this.localStorageService.removeItem('token');
    this.tokenSubject.next(undefined);
  }

  updateToken(token: Token): void {
    this.logger.log('updateToken');
    this.localStorageService.setItem('token', token);
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

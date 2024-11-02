import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
  LocalStorageService,
  SpotifyAuthHttpService,
} from '@app/shared/services';
import { AuthorizationResponseParams, Token } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenSubject = new BehaviorSubject<Token | undefined>(
    undefined
  );
  readonly token$ = this.tokenSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private spotifyAuthHttpService: SpotifyAuthHttpService,
    private localStorageService: LocalStorageService
  ) {
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
    console.log('initToken');
    const token = this.localStorageService.getItem('token');
    token && !this.isExpired(token)
      ? this.updateToken(token)
      : this.removeToken();
  }

  removeToken(): void {
    console.log('removeToken');
    this.localStorageService.removeItem('token');
    this.tokenSubject.next(undefined);
  }

  updateToken(token: Token): void {
    console.log('updateToken');
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

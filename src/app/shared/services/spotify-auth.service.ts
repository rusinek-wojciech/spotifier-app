import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { REQUIRED_SCOPES } from '@app/shared/constants';
import { RefreshTokenResponse, Token, TokenResponse } from '@app/shared/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpotifyAuthService {
  private readonly root = 'https://accounts.spotify.com';
  private readonly httpBackend = inject(HttpBackend);
  private readonly http = new HttpClient(this.httpBackend);

  private readonly AUTHORIZATION_PARAMS = new URLSearchParams([
    ['response_type', 'code'],
    ['client_id', environment.clientId],
    ['scope', REQUIRED_SCOPES.join(' ')],
    ['redirect_uri', environment.redirectUri],
    ['show_dialog', 'false'],
    ['state', 'TODO'],
  ]).toString();

  private readonly FETCH_TOKEN_OPTIONS = {
    headers: new HttpHeaders({
      Authorization: `Basic ${btoa(
        `${environment.clientId}:${environment.clientSecret}`
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  getToken(code: string): Observable<Token> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', environment.redirectUri);

    return this.http
      .post<TokenResponse>(
        `${this.root}/api/token`,
        body,
        this.FETCH_TOKEN_OPTIONS
      )
      .pipe(
        map(res => ({
          accessToken: res.access_token,
          expireTimestamp: Date.now() + res.expires_in * 1000,
          refreshToken: res.refresh_token,
        }))
      );
  }

  refreshToken(token: Token): Observable<Token> {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', token.refreshToken);

    return this.http
      .post<RefreshTokenResponse>(
        `${this.root}/api/token`,
        body,
        this.FETCH_TOKEN_OPTIONS
      )
      .pipe(
        map(res => ({
          accessToken: res.access_token,
          expireTimestamp: Date.now() + res.expires_in * 1000,
          refreshToken: token.refreshToken,
        }))
      );
  }

  authorization(): void {
    window.location.assign(
      `${this.root}/authorize?${this.AUTHORIZATION_PARAMS}`
    );
  }
}

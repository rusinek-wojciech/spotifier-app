import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

import { AuthService } from './auth.service';

type Params =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly root = 'https://api.spotify.com';
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  headers(): Observable<HttpHeaders> {
    return this.auth.token$.pipe(
      map(
        token =>
          new HttpHeaders({
            ...(token && {
              Authorization: `Bearer ${token.accessToken}`,
            }),
            'Content-Type': 'application/json',
          })
      )
    );
  }

  options(params?: Params) {
    return this.headers().pipe(
      map(headers => ({
        headers,
        params,
      }))
    );
  }

  get<T = unknown>(uri: string, params?: Params): Observable<T> {
    return this.options(params).pipe(
      switchMap(options => this.http.get<T>(`${this.root}/${uri}`, options))
    );
  }

  put<T = unknown>(uri: string, body: unknown, params?: Params): Observable<T> {
    return this.options(params).pipe(
      switchMap(options =>
        this.http.put<T>(`${this.root}/${uri}`, body, options)
      )
    );
  }

  post<T = unknown>(
    uri: string,
    body: unknown,
    params?: Params
  ): Observable<T> {
    return this.options(params).pipe(
      switchMap(options =>
        this.http.post<T>(`${this.root}/${uri}`, body, options)
      )
    );
  }

  delete<T = unknown>(uri: string, params?: Params): Observable<T> {
    return this.options(params).pipe(
      switchMap(options => this.http.delete<T>(`${this.root}/${uri}`, options))
    );
  }
}

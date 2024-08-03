import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map, switchMap } from 'rxjs';

type Params =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable()
export class ApiService {
  private static readonly ROOT = 'https://api.spotify.com';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

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
      switchMap(options =>
        this.http.get<T>(`${ApiService.ROOT}/${uri}`, options)
      )
    );
  }

  put<T = unknown>(uri: string, body: unknown, params?: Params): Observable<T> {
    return this.options(params).pipe(
      switchMap(options =>
        this.http.put<T>(`${ApiService.ROOT}/${uri}`, body, options)
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
        this.http.post<T>(`${ApiService.ROOT}/${uri}`, body, options)
      )
    );
  }

  delete<T = unknown>(uri: string, params?: Params): Observable<T> {
    return this.options(params).pipe(
      switchMap(options =>
        this.http.delete<T>(`${ApiService.ROOT}/${uri}`, options)
      )
    );
  }
}

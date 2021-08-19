import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clientId, clientSecret, redirectUri, scopes } from '../api.config';
import { TokenResponse, Token } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  redirect(): void {
    window.location.href =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri);
  }

  getToken$(code: string): Observable<Token> {
    return this.http
      .post<TokenResponse>(
        'https://accounts.spotify.com/api/token',
        new HttpParams()
          .set('grant_type', 'authorization_code')
          .set('code', code)
          .set('redirect_uri', redirectUri),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
          }),
        }
      )
      .pipe(map((token: TokenResponse) => new Token(token)));
  }

  // getUser$(): Observable<User> {
  //   return this.http.get<User>('https://api.spotify.com/v1/me', {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.token.access_token,
  //     }),
  //   });
  // }
}

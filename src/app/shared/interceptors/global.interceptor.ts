import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/shared/services';
import { filter, map, switchMap } from 'rxjs';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.token$.pipe(
    filter(token => !!token),
    map(token =>
      req.clone({
        url: req.url,
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
    ),
    switchMap(req => next(req))
  );
};

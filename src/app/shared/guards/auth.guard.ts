import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../services';
import { PATHS } from '../constants';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.token$.pipe(
    map(token => !!token),
    tap(token => {
      if (!token) {
        router.navigate([PATHS.LOGIN]);
      }
    })
  );
};

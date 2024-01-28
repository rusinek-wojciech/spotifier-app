import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PATHS } from 'src/app/constants/paths.constants';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

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

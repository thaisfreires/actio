import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const hasAccess = expectedRoles.some(role => authService.hasRole(role));
  if (!hasAccess) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};

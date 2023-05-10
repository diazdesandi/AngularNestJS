import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // const url = state.url;

  // localStorage.setItem('url', url);

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) return true;

  router.navigateByUrl('/auth/login');
  // console.log({ status: authService.authStatus() });

  return false;
};

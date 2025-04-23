import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log('AdminGuard check:');
  console.log('Token:', token);
  console.log('Role:', role);

  if (token && role === 'staff') {
    return true;
  }
}

  console.log('⛔ Access denied, redirecting to login');
  router.navigate(['/']);
  return false;
};

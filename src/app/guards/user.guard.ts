import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const UserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log('Token:', token);
  console.log('Role:', role);

  if (token && role === 'user') {
    return true;
  }
}

  router.navigate(['/']);
  return false;
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'staff') {
    console.log('🚫 Admin is already logged in. Redirecting to dashboard.');
    router.navigate(['/admin']);
    return false;
  }

  return true;
};


import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('success_token');
  const isStaff = localStorage.getItem('is_staff') === 'true';

  console.log('AdminGuard check:');
  console.log('Token:', token);
  console.log('is_staff:', localStorage.getItem('is_staff'), '=>', isStaff);

  if (token && isStaff) {
    console.log('✅ Admin access granted');
    return true;
  }

  console.log('⛔ Access denied, redirecting to login');
  router.navigate(['/']);
  return false;
};

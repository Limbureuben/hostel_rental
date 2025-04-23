import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'staff') {
    router.navigate(['/admin']);
    return false;
  } else if(role === 'user'){
    router.navigate(['/homepage']);
    return false;
  }
}
  return true;
};


// user.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Prevent SSR crash: Check if running in browser
    if (typeof window !== 'undefined') {
      const isStaff = localStorage.getItem('isStaff') === 'true';

      if (!isStaff) {
        return true;
      }
    }

    // Redirect staff users to admin dashboard
    this.router.navigate(['/admin/admin-dashboard']);
    return false;
  }
}

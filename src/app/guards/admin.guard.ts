// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Prevent SSR crash: Check if this is running in the browser
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      const isStaff = localStorage.getItem('isStaff') === 'true';

      if (role === 'admin' || isStaff) {
        return true;
      }
    }

    // Redirect if not authorized
    this.router.navigate(['/']);
    return false;
  }
}

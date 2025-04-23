// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      // If the user is logged in and is an admin, redirect to the admin dashboard (not allow them to access login page)
      if (token && role === 'admin') {
        this.router.navigate(['/admin/admin-dashboard']); // Redirect to the admin dashboard
        return false;  // Prevent access to the current route (like login)
      }
    }

    return true;  // Allow access to the route (only if not an admin or no token)
  }
}

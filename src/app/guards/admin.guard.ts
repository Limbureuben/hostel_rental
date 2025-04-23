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
      const token = localStorage.getItem('token');  // Check if there's a token in localStorage
      const role = localStorage.getItem('role');    // Check the role in localStorage

      // If there is no token or the user is not an admin, redirect to the login page
      if (!token || role !== 'admin') {
        this.router.navigate(['/login']);
        return false;  // Prevent access to the /admin page
      }

      return true;  // Allow access to the /admin page if authenticated and admin
    }

    return false;
  }
}

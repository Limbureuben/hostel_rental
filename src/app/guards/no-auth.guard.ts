// no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (token && role === 'admin') {
        this.router.navigate(['/admin/admin-dashboard']);
        return false;
      }

      if (token && role !== 'admin') {
        this.router.navigate(['/homepage']);
        return false;
      }
    }

    return true; // allow access to login if not logged in
  }
}

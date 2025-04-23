// user.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isStaff = localStorage.getItem('isStaff') === 'true';
    if (!isStaff) {
      return true;
    }
    this.router.navigate(['/admin/admin-dashboard']);
    return false;
  }
}

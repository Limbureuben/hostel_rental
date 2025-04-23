// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isStaff = localStorage.getItem('role') === 'admin' || localStorage.getItem('isStaff') === 'true';
    if (isStaff) {
      return true;
    }
    this.router.navigate(['/homepage']);
    return false;
  }
}

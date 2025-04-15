import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-header',
  standalone: false,
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss'
})
export class TenantHeaderComponent {
  constructor(
    private router: Router
  ) {}

  NavigateToTenant() {
    this.router.navigate(['/tenant-dashboard']);
  }

}

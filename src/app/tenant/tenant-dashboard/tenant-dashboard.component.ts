import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tenant-dashboard',
  standalone: false,
  templateUrl: './tenant-dashboard.component.html',
  styleUrl: './tenant-dashboard.component.scss'
})
export class TenantDashboardComponent {

  constructor(
    private router: Router
  ) {}

  
  goBack() {
    this.router.navigate(['/homepage']);
  }
}

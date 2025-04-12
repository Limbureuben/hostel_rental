import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tenant-dashboard',
  standalone: false,
  templateUrl: './tenant-dashboard.component.html',
  styleUrl: './tenant-dashboard.component.scss'
})
export class TenantDashboardComponent implements OnInit{
  houses: any[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
      this.loadhouse();
  }

  loadhouse() {
    
  }


  goBack() {
    this.router.navigate(['/homepage']);
  }
}

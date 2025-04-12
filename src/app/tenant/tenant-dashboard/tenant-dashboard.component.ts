import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TenantListComponent } from '../tenant-list/tenant-list.component';


@Component({
  selector: 'app-tenant-dashboard',
  standalone: false,
  templateUrl: './tenant-dashboard.component.html',
  styleUrl: './tenant-dashboard.component.scss'
})
export class TenantDashboardComponent implements OnInit{
  houses: any[] = [];

  constructor(
    private router: Router,
    private tenantservice: TenantService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.loadhouse();
  }

  loadhouse() {
    this.tenantservice.getAllHouse().subscribe({
      next:(data) => {
        this.houses = data;
      },
      error: (err) => {
        this.toastr.error('Failed to fetch houses', 'Error');
      }
    })
  }


  goBack() {
    this.router.navigate(['/homepage']);
  }

  NavigateToLogin() {
  }

    openDialog(house: any): void {
      this.dialog.open(TenantListComponent, {
       
        data: house
      });
  }
}

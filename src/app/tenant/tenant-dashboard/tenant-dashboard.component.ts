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
  pagedHouses: any[] = [];
  currentPage: number = 1;
  housesPerPage: number = 8;

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
      next: (data) => {
        this.houses = data;
        this.setPagedHouses();
      },
      error: (err) => {
        this.toastr.error('Failed to fetch houses', 'Error');
      }
    });
  }

  setPagedHouses() {
    const startIndex = (this.currentPage - 1) * this.housesPerPage;
    const endIndex = startIndex + this.housesPerPage;
    this.pagedHouses = this.houses.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.housesPerPage < this.houses.length) {
      this.currentPage++;
      this.setPagedHouses();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedHouses();
    }
  }

  NavigateToLogin() {
  }

    openDialog(house: any): void {
      this.dialog.open(TenantListComponent, {

        data: house
      });
  }
}

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
  paginatedHouses: any[] = [];

  currentPage = 1;
  pageSize = 8; // number of cards per page
  totalPages = 0;

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
        this.updatePagination();
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

  updatePagination() {
    this.totalPages = Math.ceil(this.houses.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHouses = this.houses.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}

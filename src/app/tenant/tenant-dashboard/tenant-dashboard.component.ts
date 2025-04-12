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

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 8;

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
        this.totalPages = Math.ceil(this.houses.length / this.itemsPerPage); // Calculate total pages
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

  get paginatedHouses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.houses.slice(startIndex, endIndex); // Slice the houses array to get the current page data
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.houses.length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}

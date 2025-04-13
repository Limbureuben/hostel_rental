import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-available-house',
  standalone: false,
  templateUrl: './available-house.component.html',
  styleUrl: './available-house.component.scss'
})
export class AvailableHouseComponent implements OnInit{
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
}

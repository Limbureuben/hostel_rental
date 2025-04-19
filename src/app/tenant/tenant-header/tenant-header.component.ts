import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-header',
  standalone: false,
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss'
})
export class TenantHeaderComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  NavigateToTenant() {
    this.router.navigate(['/tenant-dashboard']);
  }

  ViewTheProfile(): void {
        this.dialog.open(LandloadProfileComponent, {
          width: '400px',
          disableClose: false,
        });
     }

}
